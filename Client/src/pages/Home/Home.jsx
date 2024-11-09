import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './Home.css'
import { Link } from 'react-router-dom';
import { IoStarOutline } from "react-icons/io5";
import MovieCard from "../../components/MovieCard/MovieCard"
import Search from "../../components/Search/Search";
import Footer from '../../components/Footer/Footer';

const Home = () => {
    const [popularMovies, setPopularMovies] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const url = `https://api.themoviedb.org/3/movie/popular?api_key=${import.meta.env.VITE_MOVIE_API}&language=en-US&page=1`;
                const response = await axios.get(url);
                const data = response.data;
                setPopularMovies(data.results);
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="poster">
            <Carousel
                showThumbs={false}
                autoPlay={true}
                transitionTime={3}
                infiniteLoop={true}
                showStatus={false}
                interval={3000}
            >
                {popularMovies.map((movie, i) => (
                    <Link
                        key={movie.id}
                        style={{ textDecoration: "none", color: "white" }}
                        to={`/details/${movie.id}`}
                    >
                        <div className="posterImage">
                            <img
                                src={
                                    movie && movie.backdrop_path
                                        ? `https://image.tmdb.org/t/p/original/${movie.backdrop_path}`
                                        : "https://via.placeholder.com/500x281?text=No+Image+Available"
                                }
                                alt={movie ? movie.original_title : "Movie"}
                            />
                        </div>
                        <div className="posterImage_overlay">
                            <div className="posterImage_title">
                                {movie ? movie.original_title : ""}
                            </div>
                            <div className="posterImage_runtime">
                                {movie ? movie.release_date : ""}
                                <span className="posterImage_rating">
                                    {movie ? movie.vote_average : ""}
                                    <IoStarOutline />
                                </span>
                            </div>
                            <div className="posterImage_description">
                                {movie ? movie.overview : ""}
                            </div>
                        </div>
                    </Link>
                ))}
            </Carousel>

            {/* {popularMovies.map((movie, i) => (
                <MovieCard movie={movie} key={i}/>
            ))} */}

            <Search/>
            <Footer/>
        </div>
    );
};

export default Home;
