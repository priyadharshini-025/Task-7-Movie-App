import "./App.css"
import { useState, useEffect, useCallback } from "react"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"

import FilterDropdown from "./components/FilterDropdown"
import SearchBar from "./components/SearchBar"
import MovieList from "./components/MovieList"
import MovieDetail from "./components/MovieDetail"
import Favourite from "./components/Favourite"

import { searchMovie } from "./api"

// Utility functions for localStorage
const getFavoritesFromStorage = () => {
    try {
        const stored = localStorage.getItem('favoriteMovies')
        return stored ? JSON.parse(stored) : []
    } catch (error) {
        console.log("Error reading favorites from localStorage", error)
        return []
    }
}

const saveFavoritesToStorage = (favorites) => {
    try {
        localStorage.setItem('favoriteMovies', JSON.stringify(favorites))
    } catch (error) {
        console.log("Error saving favorites to localStorage", error)
    }
}


function App() {
    const [movies, setMovies] = useState([]); //state to store the movies fetch from the api
    const [error, setError] = useState(null); //error message during the api call
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState(""); //filter applies to the movies list
    const [favourite, setFavourite] = useState(() => getFavoritesFromStorage()); //load favorites from localStorage
    const [currentPage, setCurrentPage] = useState(1)
    const moviesPerPage = 4
    const [searchTerm, setSearchTerm] = useState("love") //track current search term

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        saveFavoritesToStorage(favourite)
    }, [favourite])

    //handle search
    const handleSearch = useCallback(async (searchTerm) => {
        if (!searchTerm.trim()) {
            setError("Please enter a movie title to search")
            setLoading(false)
            return
        }
        try {
            setLoading(true)
            setError(null)      // clear previous errors
            setMovies([])       // reset movies for new search
            setCurrentPage(1)
            setSearchTerm(searchTerm)
            let page = 1;
            
            while (page < 5) {
                const data = await searchMovie(searchTerm, filter, page)

                if(data.Response === "False") {
                    if (page === 1) {
                        setError(`No results found for "${searchTerm}"`)
                    }
                    break
                }
                
                if (!Array.isArray(data.Search)) {
                    break
                }
                
                setMovies(prevMovies => [...prevMovies, ...data.Search] || [])
                page++;
            }
        }
        catch (error) {
            setError(error.message || "Failed to search movies. Please try again.")
            console.log("Search error:", error)
        }
        finally {
            setLoading(false)
        }
    }, [filter])

    //load default movies by calling the handleSearch
    useEffect(() => {
        const loadDefaultMovies = async () => {
            await handleSearch("love")
        }
        loadDefaultMovies()
    }, [handleSearch])

    //re-search when filter changes
    useEffect(() => {
        if (searchTerm && searchTerm.trim() !== "") {
            handleSearch(searchTerm);
        }
    }, [searchTerm, filter, handleSearch]);

    //add/remove movie from favorites
    const toggleFavorite = (movie) => {
        const isFavorited = favourite.some(fav => fav.imdbID === movie.imdbID)
        if (isFavorited) {
            setFavourite(favourite.filter(fav => fav.imdbID !== movie.imdbID))
        } else {
            setFavourite([...favourite, movie])
        }
    }

    //check if movie is in favorites
    const isFavorite = (movieId) => {
        return favourite.some(fav => fav.imdbID === movieId)
    }

    //filter the movies
    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    //update the current page state
    const handlePagination = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    //condition if data is loading
    if (loading) {
        return <div className="flex items-center justify-center min-h-screen"><h1 className="text-4xl font-bold text-blue-600">Loading movies...</h1></div>
    }

    //calculate the current movies to display
    const indexOfLastMovie = currentPage * moviesPerPage;
    const indexOfFirstMovie = indexOfLastMovie - moviesPerPage;
    const currentMovies = movies.slice(indexOfFirstMovie, indexOfLastMovie)


    // display total page
    const totalPages = Math.ceil(movies.length / moviesPerPage);

    //contains all the page numbers 
    const paginationNumber = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationNumber.push(i)
    }

    //pagination to display only 5 dots
    const DOT_WINDOW = 5;

    let startPage = 1;

    // Move window only when current page crosses right edge
    if (currentPage > DOT_WINDOW) {
        startPage = currentPage - DOT_WINDOW + 1;
    }

    // Clamp to total pages
    startPage = Math.min(startPage, totalPages - DOT_WINDOW + 1);
    startPage = Math.max(1, startPage);

    const endPage = Math.min(totalPages, startPage + DOT_WINDOW - 1);

    const visiblePages = [];
    for (let i = startPage; i <= endPage; i++) {
        visiblePages.push(i);
    }


    return (
        <Router>
            <header className="sticky top-0 bg-gray-900 border-b-2 border-cyan-500 p-4 mb-0 z-50 shadow-2xl">
                <div className="max-w-7xl mx-auto">
                    {/* Top Row - Logo and Search */}
                    <div className="flex flex-wrap gap-6 justify-between items-center mb-4">
                        <Link to="/" className="no-underline hover:opacity-80 transition">
                            <h1 className="text-3xl font-extrabold text-orange-700 bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">🎬 MovieFlix</h1>
                        </Link>
                        <SearchBar onSearch={handleSearch} />
                    
                    <FilterDropdown onFilterChange={handleFilterChange} currentFilter={filter} />
                        <Link to="/favorites" className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white-800 font-bold py-2 px-6 rounded-lg transition shadow-lg whitespace-nowrap">
                            ⭐ Favorites ({favourite.length})
                        </Link>
                    </div>
                </div>
            </header>

            <main className="bg-black min-h-screen">
                <div className="max-w-7xl mx-auto px-4">
                    {error && (
                        <div className="bg-red-900 border-l-4 border-red-500 text-red-100 px-6 py-2 rounded mb-8 shadow-lg">
                            <p className="font-bold text-lg">⚠️ Error:</p>
                            <p className="mt-1">{error}</p>
                        </div>
                    )}
                    <Routes>
                        <Route path="/" element={
                            <>
                                <MovieList movies={currentMovies} isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />
                                {movies.length > 0 && (
                                    <div className="flex gap-4 py-3 justify-center items-center flex-wrap">
                                        <button
                                            onClick={() => handlePagination(Math.max(1, currentPage - 1))}
                                            disabled={currentPage === 1}
                                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition shadow-lg"
                                        >
                                            ← Previous
                                        </button>

                                        {visiblePages.map((pageNumber) => (
                                            <button
                                                key={pageNumber}
                                                onClick={() => handlePagination(pageNumber)}
                                                className={`w-12 h-12 rounded-full font-bold transition-all duration-300 shadow-lg
                                                        ${currentPage === pageNumber
                                                        ? "bg-gradient-to-r from-cyan-400 to-blue-500 bg-gray-500 text-cyan-500 scale-110"
                                                        : "bg-gray-800 text-cyan-300 hover:bg-gray-700 hover:text-cyan-200"
                                                    }`}
                                                aria-label={`Page ${pageNumber}`}
                                            >
                                                {pageNumber}
                                            </button>
                                        ))}

                                        <button
                                            onClick={() => handlePagination(Math.min(totalPages, currentPage + 1))}
                                            disabled={currentPage === totalPages}
                                            className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-lg hover:from-cyan-600 hover:to-blue-700 disabled:opacity-50 disabled:cursor-not-allowed font-semibold transition shadow-lg"
                                        >
                                            Next →
                                        </button>
                                    </div>
                                )}
                            </>
                        } />
                        <Route path="/movie/:id" element={<MovieDetail isFavorite={isFavorite} onToggleFavorite={toggleFavorite} />} />
                        <Route path="/favorites" element={<Favourite favorites={favourite} onToggleFavorite={toggleFavorite} />} />
                    </Routes>
                </div>
            </main>
        </Router>
    )

}

export default App
