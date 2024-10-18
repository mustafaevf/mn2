const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    if(req.method === "OPTIONS") {
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];
        if(!token) {
            return res.status(403).json({message: "dsada"});
        } 

        const decoded = jwt.verify(token, "123123");
        req.user = decoded;
        
        next();
    } catch (error) {
        console.log(error);
        res.status(403).json({message : "Login"});
    }
}