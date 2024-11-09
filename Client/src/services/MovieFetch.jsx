export const fetchGeners = async() => {
    const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${import.meta.env.VITE_MOVIE_API}`
    const response = await fetch(url);
    const data = await response.json();

    return data.genres;
}
