# MovieFlix - Movie Search Application

A full-featured movie search application built with React that integrates with the OMDB API. Users can search for movies, view detailed information, manage favorites, and browse through paginated results.

## Features

- **Movie Search**: Search for movies by title using the OMDB API
- **Advanced Filtering**: Filter movies by type (Movies, Series, All) using API endpoints
- **Detailed Movie Information**: View comprehensive details including poster, title, release year, genre, plot, ratings, and cast
- **Favorites Management**: Save your favorite movies locally with persistent storage
- **Pagination**: Navigate through search results with intuitive pagination controls
- **Responsive Design**: Beautiful UI with Tailwind CSS
- **Error Handling**: User-friendly error messages for API failures
- **Navigation**: React Router for seamless page navigation

## Tech Stack

- **ReactJS 19** - UI Framework
- **React Router DOM v7** - Navigation
- **Axios** - API Client
- **Tailwind CSS** - Styling
- **JavaScript ES6+** - Functionality

## Features & Usage

### Search for Movies
- Enter a movie title in the search bar
- Click "Search" or press Enter
- Results appear instantly in grid format

### Filter by Type
- Use the dropdown filter to show:
  - All content
  - Movies only
  - Series only
- Filtering uses OMDB API (no client-side filtering)

### Manage Favorites
- Click "Add to Favorites" on any movie
- View all favorites on the Favorites page
- Favorites persist across browser sessions using localStorage
- Remove favorites anytime

### View Movie Details
- Click any movie card to see:
  - Full movie poster
  - Title, year, and genre
  - Complete plot summary
  - IMDB rating
  - Cast information

### Pagination
- Browse through search results
- 4 movies per page
- Previous/Next navigation or click page numbers


## API Integration

Uses **OMDB API** for all movie data:
- Search endpoint: `?s={title}&type={type}&page={page}`
- Details endpoint: `?i={movieId}`

Get free API key at: https://www.omdbapi.com/

## Local Storage

Favorites are stored in browser's localStorage:
- **Key**: `favoriteMovies`
- **Format**: JSON array of movie objects
- **Persistence**: Survives browser sessions
