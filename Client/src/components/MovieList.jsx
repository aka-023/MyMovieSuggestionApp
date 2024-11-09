import { useEffect, useState } from "react";
import { fetchGeners } from "../services/MovieFetch";
import MovieCard from "./MovieCard/MovieCard";
import Footer from '../components/Footer/Footer'
import { useParams } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import axios from "axios";

const MovieList = () => {
    const [moviesData, setMoviesData] = useState([]);
    const [isEmpty, setIsEmpty] = useState(null);
    const [loading, setLoading] = useState(true);
    const {category} = useParams();

    useEffect(() => {
        const fetchData = async() => {
            try{
                const url = `https://api.themoviedb.org/3/movie/${category?category:'popular'}?api_key=${import.meta.env.VITE_MOVIE_API}&language=en-US&page=1`
                const response = await axios.get(url);
                const data = await response.data;

                // console.log(data.results[0].genres);
                if(data.length===0){
                    setIsEmpty(true);
                }                
                else{
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
                    // console.log(movieData);
                    setMoviesData(movieData);
                    setIsEmpty(false);
                }
            }
            catch(err){
                console.log("Error fetching the MovieList: ", err);
                setIsEmpty(true);
            }
            finally{
                setLoading(false);
            }
        }

        fetchData();
    },[category])
    
    return(
        <div className="movielist">
        {isEmpty && <div>No Movies Available</div>}
        <h2>{category?category.toUpperCase():'POPULAR'}</h2>
        
        {loading ? 
        <div className="cards">
            <SkeletonTheme baseColor="#202020" highlightColor="#444">
            {[...Array(8)].map((_, i) => (
                <Skeleton key={i} height={300} width={200} duration={2} />
            ))}
            </SkeletonTheme>
        </div>
        :(
        <div className="cards">
        {moviesData && moviesData.map((movie, index) => {
            return <MovieCard key={index} movie={movie} isFav={false}/>
        })}
        </div>
        )}              
        <Footer/>
        </div>
    )
}

export default MovieList;