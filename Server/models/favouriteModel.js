const mongoose = require('mongoose');

const favouriteSchema = mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required:true,
        ref: 'users'
    },
    movies:[{
        type: String,
        default: []
    }]
});

module.exports = mongoose.model('favourites', favouriteSchema);