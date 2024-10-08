const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
    
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
    //SPLIT bearerHeader AND GET THE TOKEN ONLY
    const token = bearerHeader.split(' ')[1];
        jwt.verify(token, 'secretkey', (err, token)=>{
            if (err) {
                return res.sendStatus(403)
            };
            req.token = token
            next();
        });

    }else{
        res.sendStatus(401);
    };
};


module.exports = { verifyToken }