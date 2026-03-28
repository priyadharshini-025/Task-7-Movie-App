
function FilterDropdown({onFilterChange, currentFilter})
{
    return(
        <div className="flex items-center gap-3">
            <label htmlFor="type-filter" className="text-white font-bold text-base whitespace-nowrap">Type Filter:</label>
            <select 
                id="type-filter"
                value={currentFilter}
                onChange={(e) => onFilterChange(e.target.value)} 
                className="bg-gray-900 border-2 border-cyan-500 text-cyan-300 font-semibold rounded-lg p-3 cursor-pointer hover:border-blue-500 transition focus:outline-none focus:border-blue-500 shadow-lg appearance-none px-4"
            >
                <option value="">🎬 All Types</option>
                <option value="movie">🎥 Movies Only</option>
                <option value="series">📺 Series Only</option>
            </select>
        </div>
    )
}

export default FilterDropdown