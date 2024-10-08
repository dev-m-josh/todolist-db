const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
    //SPLIT bearerHeader AND GET THE TOKEN ONLY
    const token = bearerHeader.split(' ')[1];
    let verification = jwt.verify(token, 'secretkey');
        req.token = verification
        next();    
    }else{
        res.sendStatus(401);
    };
    } catch (error) {
        res.json(error)
    }

};


module.exports = { verifyToken }