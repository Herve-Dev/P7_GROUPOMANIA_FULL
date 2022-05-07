require('dotenv').config()
const jwt = require('jsonwebtoken');



module.exports = (req, res, next) => {

    try {
        const token = req.headers.authorization.split(' ')[1];
        req.token = jwt.verify(token, process.env.JWT_SIGN_SECRET); // variable réutilisable mettre le résultat dans la req
        next()
    } catch (error) {
        res.status(401).json({ message: "Token d'authentification invalide"});
    }
    
}
