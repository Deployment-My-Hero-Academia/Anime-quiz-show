const jwt = require('jsonwebtoken');


module.exports = (req, res, next) => {
    try {
        let token = req.headers['authorization'].split(' ')[2];
        const decode = jwt.verify(token, process.env.App_SECRET);
        req.userData = decode;
        next();
    } catch(error) {
        return res.status(401).json({"message": "Not authorized"});
    }
    }
