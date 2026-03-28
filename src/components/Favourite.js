import { Link } from "react-router-dom"

/**
 * Favourite Component
 * Displays user's favorite movies with options to remove
 */
function Favourite({favorites, onToggleFavorite})
{
    if (favorites.length === 0) {
        return (
            <div className="text-center">
                <h1 className="text-6xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6">No Favorites Yet</h1>
                <p className="text-2xl text-gray-400 mb-12">Add movies to your favorites to see them here!</p>
                <Link to="/" className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-10 rounded-lg transition shadow-lg text-lg">
                    <button className="bg-gray-500 rounded-full px-3 py-2 text-cyan-200 text-center">🍿 Browse Movies</button>
                </Link>
            </div>
        )
    }

    return(
        <div>
            <p className="text-3xl font-bold text-cyan-600 bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 my-7 text-center">⭐ Your Favorite Movies</p>

            <div className="text-white grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {favorites.map(movie=>(
                    <div key={movie.imdbID} className="flex flex-col">
                        <Link to={`/movie/${movie.imdbID}`}>
                            <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl border-2 border-orange-500 hover:border-cyan-500 transform transition duration-500 hover:scale-105 cursor-pointer group">
                                <div className="relative overflow-hidden">
                                    <img src={movie.Poster} className="w-full h-80 object-cover group-hover:brightness-75 transition" alt={movie.Title}/>
                                    <div className="absolute top-4 right-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-black rounded-full p-2 text-3xl shadow-lg">
                                        ⭐
                                    </div>
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-100 transition" />
                                </div>
                                <div className="bg-gray-900 border-t-2 border-orange-500 py-5 px-4">
                                    <h1 className="text-xl font-bold truncate text-orange-300 group-hover:text-orange-200 transition">{movie.Title}</h1>
                                    <div className="flex justify-between mt-3 text-sm">
                                        <h3 className="text-gray-400">{movie.Year}</h3>
                                        <p className="capitalize text-cyan-400 font-semibold">{movie.Type}</p>
                                    </div>
                                </div>
                            </div>
                        </Link>
                        <button 
                            onClick={() => onToggleFavorite(movie)}
                            className="mt-3 py-3 font-bold rounded-lg transition shadow-lg text-base bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                        >
                            ❌ Remove from Favorites
                        </button>
                    </div>
                ))}
            </div>
        <div className="text-center mt-6">
        <Link
            to="/"
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold py-4 px-10 rounded-lg"
        >
            <button className="rounded-full px-4 py-2 bg-gray-500 hover:cursor hover:bg-gray-700">Browse back to Movies</button>
        </Link>
        </div>
        </div>
    )
}

export default Favourite