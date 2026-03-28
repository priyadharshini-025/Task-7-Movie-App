import axios from "axios"

// OMDB API Configuration
const API_KEY = "cb189ad"
const API_URL = "https://www.omdbapi.com/"

export const searchMovie = async(searchTerm, type="", page=1) => {
    try {
        if (!searchTerm || searchTerm.trim() === "") {
            throw new Error("Search term cannot be empty")
        }
        
        const response = await axios.get(`${API_URL}?s=${searchTerm}&type=${type}&apikey=${API_KEY}&page=${page}`)
        
        if (response.data.Response === "False") {
            return response.data
        }
        
        return response.data
    }
    catch(error) {
        console.error("Error searching movies:", error.message)
        return { Response: "False", Error: error.message }
    }
}


export const movieDetails = async(id) => {
    try {
        if (!id) {
            throw new Error("Movie ID cannot be empty")
        }
        
        const response = await axios.get(`${API_URL}?i=${id}&apikey=${API_KEY}`)
        
        if (response.data.Response === "False") {
            return response.data
        }
        
        return response.data
    }   
    catch(error) {
        console.error("Error fetching movie details:", error.message)
        return { Response: "False", Error: error.message }
    }
}