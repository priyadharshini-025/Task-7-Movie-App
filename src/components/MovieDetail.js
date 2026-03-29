import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { movieDetails } from "../api";

/**
 * MovieDetail Component
 * Displays detailed information about a movie or series
 */
function MovieDetail({ isFavorite, onToggleFavorite }) {
    const navigate = useNavigate();
    const { id } = useParams();
    const [movie, setMovie] = useState(null); // state to fetch the movie details
    const [error, setError] = useState(null); // handle the error when fetched

    // fetch the movie details from the url
    useEffect(() => {
        const fetchMovie = async () => {
            const data = await movieDetails(id);
            if (data.Response === "True") {
                setMovie(data);
                setError(null);
            } else {
                setError(data.Error);
            }
        };
        fetchMovie();
    }, [id]);

    // condition if data loading
    if (!movie && !error) {
        return (
            <div className="flex justify-center items-center min-h-screen bg-black">
                <div className="text-cyan-400 text-2xl font-bold animate-pulse">Loading movie details...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen bg-black text-center">
                <h1 className="text-4xl font-bold text-red-400 mb-4">❌ Error Loading Movie</h1>
                <p className="text-gray-400 mb-6">{error}</p>
                <button
                    onClick={() => navigate(-1)}
                    className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
                >
                    ← Go Back
                </button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white px-6">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="mb-8 bg-gradient-to-r from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 text-white font-bold py-3 px-6 rounded-lg transition shadow-lg"
            >
                ← Back to Search
            </button>

            {/* Movie Details Layout */}
            <div className="max-w-6xl mx-auto bg-gray-900 rounded-xl shadow-2xl overflow-hidden border-2 border-cyan-500">
                <div className="flex flex-col lg:flex-row">
                    {/* Poster Section */}
                    <div className="lg:w-1/3 p-6 flex justify-center">
                        <img
                            src={movie.Poster !== "N/A" ? movie.Poster : "/placeholder-poster.jpg"}
                            alt={movie.Title}
                            className="w-full sm:w-xl h-80 object-cover rounded-lg shadow-lg border-2 border-gray-700"
                        />
                    </div>

                    {/* Details Section */}
                    <div className="lg:w-2/3 p-6">
                        <h1 className="text-4xl font-bold text-cyan-300 mb-4">{movie.Title}</h1>
                        <div className="grid grid-cols-1 gap-4 mb-6">
                            <div>
                                <p className="text-gray-400"><strong>Year:</strong> {movie.Year}</p>
                                <p className="text-gray-400"><strong>Genre:</strong> {movie.Genre}</p>
                                <p className="text-gray-400"><strong>Cast:</strong> {movie.Actors}</p>
                                <p className="text-gray-400"><strong>Ratings:</strong> {movie.Ratings?.[0]?.Value || "N/A"}</p>
                                <div className="text-gray-400 leading-relaxed">
                                <strong>Plot:</strong>{" "}
                                <span>{movie.Plot}</span>
                                </div>
                            </div>
                        </div>
                                                
                        <div className="flex gap-4">
                            <button
                                onClick={() => onToggleFavorite(movie)}
                                className={`py-3 font-bold rounded-lg transition shadow-lg text-base ${
                                    isFavorite(movie.imdbID)
                                        ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white'
                                        : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
                                }`}
                            >
                                {isFavorite(movie.imdbID) ? '❌ Remove from Favorites' : '⭐ Add to Favorites'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MovieDetail;