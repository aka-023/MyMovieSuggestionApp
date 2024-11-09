import React, { useEffect, useState } from 'react';
import './MovieDetails.css';
import ImageSlider from '../../components/ImageSlider/ImageSlider'
import CastCard from '../../components/CastCard'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../components/Loading'

const MovieDetails = () => {

  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [castList, setCastList] = useState(null);
  const [imageList, setImageList] = useState(null);


  useEffect(()=>{
    const fetchMovie = async() => {
      try{
        const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_MOVIE_API}&language=en-US`
        const response = await axios.get(url);
        setMovie(response.data);

        const url2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${import.meta.env.VITE_MOVIE_API}`
        const movieCast = await axios.get(url2);
        setCastList(movieCast.data.cast);

        const url3 = `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_MOVIE_API}`
        const images = await axios.get(url3);
        // console.log(images.data);
        setImageList(images.data.backdrops);

        setLoading(false);
      }
      catch(err){
        console.log("Error Fetching the Movie Data", err);
        setLoading(false);
      }
    }

    fetchMovie();
  },[id]);

  if (loading) {
    return <Loading/>;
  }

  if (!movie) {
    return <div>Movie not found!</div>;
  }

  return (
    <div className="movie-details">
      <div className="header">
        <div><img className='cover-photo' src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="movie-cover" /></div>
        <div className="movie-info">
          <div className="title-info">
            <h2>{movie.original_title}</h2>
            <p>Year Of Release: {movie.release_date}</p>
            <p>IMDB Rating: {movie.vote_average}</p>
            <div className="genres">
                {movie.genres.map((genre, index) => (
                    <div className='genre-ele' key={index}>{genre.name}</div>
                ))}
            </div>
            <h3>Overview</h3>
            <p>
              {movie.overview}
            </p>
          </div>
        </div>
      </div>

      <div className="movie-pictures">
        <h3>Pictures from the Movie</h3>
          <ImageSlider imageList={imageList}/>
      </div>

      <div className="top-cast">
        <h3>Top Cast</h3>
        <div className="cast-list">
          {castList && castList.splice(0,6).map((cast, index) => (
                <div className='cast-ele' key={index}><CastCard cast={cast}/></div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default MovieDetails;
