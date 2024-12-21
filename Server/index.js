require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routers/authRouter');
const favRouter = require('./routers/favouriteRouter');
const {identifier} = require('./middlewares/verify');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use(cors({
    origin:'http://localhost:5173',
    credentials:true,
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE']
}));

app.use(cookieParser());

mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log('DB connected successfully');
})
.catch(()=>{
    console.log('Error connecting the Database');
})

app.get('/', (req, res)=>{
    return res.json({message:"hello from the server"});
})

app.use('/auth', authRouter);
app.use('/favourites', favRouter);

app.get('/checkauth', identifier, (req, res) => {
    return res.status(200).json({success:true, isAuthenticated:true});
}); 

const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log("Server listening on port ", port);
})
