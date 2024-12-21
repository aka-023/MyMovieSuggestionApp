const jwt = require('jsonwebtoken');

exports.identifier = (req, res, next) => {
    let token;
    if(req.headers.client === 'not-browser'){
        token = req.headers.authorization;
    }
    else{ 
        token = req.cookies['Authorization'];
    }

    if(!token){
        return res.status(401).json({success: false, message:"UnAuthorized"});
    }

    try{
        const userToken = token.split(' ')[1];
        const jwtVerified =  jwt.verify(userToken, process.env.SECRET_KEY);
        
        if (jwtVerified) {
            req.user = jwtVerified;
            console.log("Token verified, user authenticated");
            next();
        };
    }
    catch(err){
        console.log("token not verified");
        return res.status(400).json({success:false, message:"Authorization failed"});
    }
}
