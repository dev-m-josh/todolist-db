const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
    //SPLIT bearerHeader AND GET THE TOKEN ONLY
    const token = bearerHeader.split(' ')[1];
    let verification = jwt.verify(token, 'secretkey');
        req.user = verification
        next();    
    }else{
        next({
            success: false,
            status: 401,
            message: "No token found!"
        });
    };
    } catch (error) {
        res.sendStatus(401);
    }

};

function routesErrorHandler(req, res) {
    res.json({
        success: false,
        message: "Route not defined!"
    })
}


function errorHandler(err, req, res, next){
    res.sendStatus(err.status);
};

module.exports = { verifyToken, errorHandler, routesErrorHandler }