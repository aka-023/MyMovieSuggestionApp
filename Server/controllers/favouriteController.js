const favourites = require('../models/favouriteModel');

exports.getAllFavourites = async(req, res) => {
    const { userId } = req.user;
    try{
        const favourite = await favourites.findOne({user:userId});

        if (!favourite) {
            return res.status(200).json({ success: true, message: "No favorites found", favMovies: [] });
        }

        const favMovies = favourite.movies;
        return res.status(200).json({success:true, message:"Favourite list fetched successfully", favMovies});
    }
    catch(err){
        console.log("Error while fetching the favourite movies ", err);
    }
}

exports.addToFavourites = async(req, res) => {
    const { userId } = req.user;
    const { movieId } = req.body;
    try{
        let favourite = await favourites.findOne({user:userId});

        if (!favourite) {
            favourite = new favourites({ user: userId, movies: [] });
        }

        if(!favourite.movies.includes(movieId)){
            favourite.movies.push(String(movieId));
            await favourite.save();
            return res.status(200).json({ success: true, message: "Movie added to favourites" });
        }
        else{
            return res.status(400).json({ success: false, message: "Movie is already in favourites" });
        }
    }
    catch(err){
        console.log("Error while adding to favourites!! ", err);
    }
} 

exports.removeFromFavourites = async(req, res) => {
    const { userId } = req.user;
    const { movieId } = req.body;
    try{
        let favorite = await favourites.findOne({user:userId});

        if(favorite.movies.includes(movieId)){
            favorite.movies = favorite.movies.filter((id) => id != movieId);
            await favorite.save();

            return res.status(200).json({success: true, message: "Movie Removed from favourites"});
        }
        else{
            return res.status(400).json({success: false, message: "Movie not in favourites"});
        }
    }
    catch(err){
        console.log("Error removing from favorites ", err);
    }
}