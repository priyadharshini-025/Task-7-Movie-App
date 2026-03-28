import { Link } from "react-router-dom"

/**
 * MovieList Component
 * Displays movies in a grid format with favorite options
 */
function MovieList({movies, isFavorite, onToggleFavorite})
{
    console.log("movies in MovieList",movies)
    if(movies.length === 0)
    {
        return <h1 className="text-3xl text-center font-bold text-red-400 uppercase py-20">🔍 Searched movie is not found</h1>
    }
    return(
        <div className="text-white grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 py-8">
            {movies.map(movie=>(
                <div key={movie.imdbID} className="flex flex-col">
                    <Link to={`/movie/${movie.imdbID}`}>
                        <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-2 border-gray-700 hover:border-cyan-500 transform transition duration-500 hover:scale-105 cursor-pointer group">
                            <div className="relative overflow-hidden">
                                <img src={movie.Poster} className="w-full h-80 object-cover group-hover:brightness-75 transition" alt={movie.Title}/>
                                {isFavorite(movie.imdbID) && (
                                    <div className="absolute top-1 right-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full p-2 text-3xl shadow-lg">
                                        ⭐
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                            </div>
                            <div className="bg-gray-900 border-t border-gray-700 py-5 px-4">
                                <h1 className="text-xl font-bold truncate text-cyan-300 group-hover:text-cyan-200 transition">{movie.Title}</h1>
                                <div className="flex justify-between mt-3 text-sm">
                                    <h3 className="text-gray-400">{movie.Year}</h3>
                                    <p className="capitalize text-orange-400 font-semibold">{movie.Type}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                    <button 
                        onClick={() => onToggleFavorite(movie)}
                        className={`mt-1 py-3 font-bold rounded-lg transition shadow-lg text-base ${
                            isFavorite(movie.imdbID) 
                            ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-olive-50' 
                            : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-olive-400'
                        }`}
                    >
                        {isFavorite(movie.imdbID) ? '❌ Remove from Favorites' : '⭐ Add to Favorites'}
                    </button>
                </div>
            ))}
        </div>
    )
}

export default MovieList