import { useState } from "react"

/**
 * SearchBar Component
 * Allows users to search for movies
 */
function SearchBar({onSearch})
{
    const [searchTerm, setSearchTerm] = useState("")

    const handleSearch = (e) => {
        e.preventDefault();
        onSearch(searchTerm)
    }

    return(
        <form onSubmit={handleSearch} className="flex gap-3">
            <input 
                type="text" 
                placeholder="🔍 Search movies..." 
                value={searchTerm} 
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border-2 border-cyan-500 outline-none rounded-lg px-5 py-3 text-black bg-gray-100 w-72 focus:bg-white focus:border-blue-500 transition shadow-lg text-base"
            />

            <button 
                type="submit" 
                className="text-white bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-700 font-bold rounded-lg text-base px-8 py-3 hover:from-cyan-600 hover:via-blue-700 hover:to-purple-800 transition shadow-lg whitespace-nowrap"
            >
                Search
            </button>
        </form>
    )
}

export default SearchBar