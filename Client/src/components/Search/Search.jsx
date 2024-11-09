import { useEffect, useRef, useState } from 'react';
import './Search.css';
import { FaSearch } from 'react-icons/fa';  
import MovieCard from '../MovieCard/MovieCard';
import { fetchGeners } from '../../services/MovieFetch';

const Search = () => {
    const [movieList, setMovieList] = useState([]);
    const [err, setErr] = useState(null);

    const nameElement = useRef();

    const handleSearch = async() => {
        const movieName = nameElement.current.value.trim();

        if(movieName === ''){
            setErr("Please Enter a Valid Movie Name");
            setMovieList([]);
            return;
        }

        try{
            const url = `https://api.themoviedb.org/3/search/movie?api_key=${import.meta.env.VITE_MOVIE_API}&query=${movieName}&include_adult=false&language=en-US&page=1`
            const response = await fetch(url);
            const data = await response.json();
                    
            if (data.results.length > 0) {
                const genreList = await fetchGeners();
                    const movieData = data.results.map((movie) => {
                        return{
                            ...movie, 
                            genres: movie.genre_ids.map(id => {
                                const genre = genreList.find(genre => genre.id === id);
                                return genre ? genre.name : null; 
                            }).filter(Boolean) 
                        };
                    });

                setMovieList(movieData);
                setErr(null);
            } 
            else {
                setErr("No movies found. Please try again.");
                setMovieList([]);
            }
        }
        catch(errr){
            console.log("Error Fetching the movie!", errr);
            setErr("Something went wrong. Please try again.");
            setMovieList([]);
        }

        nameElement.current.value = '';
    }

    return (
        <div className="search_container">
            <h2 className="search-title">Search for Your Favorite Movies</h2>        
            <div className="search-ele">
                <input type="text" ref={nameElement} placeholder="Search your movie here..." className="search-input" />
                <button className="search-btn" onClick={handleSearch}>
                    <FaSearch />
                </button>
            </div>

            {err && <div>{err}</div>}

            <div className='search_movie_list'>
            {movieList && movieList.map((movie, i) => (
                <MovieCard key={i} movie={movie}/>
            ))
            }</div>

        </div>
    );
}

export default Search;
