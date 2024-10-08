const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
try {
    const bearerHeader = req.headers['authorization'];
    if (bearerHeader) {
    //SPLIT bearerHeader AND GET THE TOKEN ONLY
    const token = bearerHeader.split(' ')[1];
        jwt.verify(token, 'secretkey', (err, authData)=>{
            if (err) {
                return res.sendStatus(403)
            };
            req.token = authData
            next();
        });
    
    }else{
        res.sendStatus(401);
    };
    } catch (error) {
        res.json(error)
    }

};


module.exports = { verifyToken }