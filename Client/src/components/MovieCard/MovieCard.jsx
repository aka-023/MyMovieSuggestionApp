import { useNavigate } from 'react-router-dom';
import './MovieCard.css';
import { FaStar } from "react-icons/fa";
import { IoTrashBin } from "react-icons/io5";
import { useState } from 'react';
import {toast} from 'react-toastify';

const MovieCard = ( {movie, isFav}) => {
    const navigate = useNavigate();
    const movieId = movie.id;
    const [isFavorite, setIsFavorite] = useState(isFav);

    const redirectToDetails = () => {   
        navigate(`/details/${movieId}`);
    }


    const handleFavouriteClick = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/favourites/add`,{
                method:"POST",
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:"include",
                body: JSON.stringify({movieId})
            });
            
            const result = await response.json();
            if(response.ok){
                toast.success('movie added to favourites!!');
                setIsFavorite(true);
            }
            else if(result.message === 'UnAuthorized'){
                toast.error('Please login to Add movie to favourites!!');
            }
            else{
                toast.error('Movie already in favourites!!');
            }
        }
        catch(err){
            console.log("Error adding to favorites:", err);
        }
    }

    const handleRemoveFromFavorites = async() => {
        try{
            const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/favourites/delete`,{
                method: 'DELETE',
                headers:{
                    'Content-Type': 'application/json'
                },
                credentials:"include",
                body: JSON.stringify({movieId})
            });

            const result = await response.json();
            // console.log(result);

            if(response.ok){      
                setIsFavorite(false);
                toast.success('movie removed from favourites');        
            }
        }
        catch(err){
            console.log("Error deleting from favorites:", err);
        }
    }

    return (
        <div className="movie-card">
           
            <div onClick={redirectToDetails} className="image">
                <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="" />
            </div>

                {isFavorite && <span className="bin-icon">
                    <IoTrashBin size={20} onClick={handleRemoveFromFavorites} />
                </span>}

            <div className="details">
                <div className="name">{movie.title}</div>
                <div className="rating">Rating: {movie.vote_average}</div>
                <div className="genre">
                {movie.genres && movie.genres.slice(0, 3).map((genre, index) => (
                    <div className='genre-ele' key={index}>{genre}</div>
                ))}
                </div>
                <div className="cont">
                <div className="release-date">Release Date: {movie.release_date}</div>
                <button onClick={handleFavouriteClick}><FaStar className={isFav ? "favorite star-icon" : "star-icon"} size={20}/></button>
                </div>
            </div>
        </div>
    );
};

export default MovieCard;


