import { useEffect, useState } from "react";
import MovieCard from "../../components/MovieCard/MovieCard";
import axios from 'axios';
import './Favourites.css'

const Favourites = () => {
    const [favourites, setFavourites] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const response = await fetch('http://localhost:3000/favourites/getall', {
                    method: "GET",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include'
                });

                const result = await response.json();
                if (!response.ok) {
                    throw new Error(result.message || "Failed to fetch favourites");
                }

                const favMovieList = await Promise.all(result.favMovies.map(async (movieId) => {
                    if (movieId) {
                        const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${import.meta.env.VITE_MOVIE_API}&language=en-US`;
                        const movie = await axios.get(url);
                        return movie.data;
                    }
                    return null;
                }));
                // console.log(favMovieList);

                const movieData = favMovieList.map((movie) => ({
                    ...movie,
                    genres: movie.genres.map((genre) => genre.name)
                }));
                // console.log(movieData);
                setFavourites(movieData);
            } catch (err) {
                console.error("Error fetching favourite movies:", err);
                setError("Failed to load favourite movies. Please try again later.");
            }
        };

        fetchFavourites();
    }, []);

    return (
        <div className="favourites-cont">
            <h2>Your Favourites</h2>
            {error ? (
                <div className="error-message">{error}</div>
            ) : favourites.length > 0 ? (
                <div className="cards">
                    {favourites.map((movie, i) => (
                        <MovieCard key={i} movie={movie} isFav={true} />
                    ))}
                </div>
            ) : (
                <div className="no-favorites"><h3>No Favourite Movies yet</h3></div>
            )}
        </div>
    );
};

export default Favourites;
