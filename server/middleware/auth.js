const jwt = require('jsonwebtoken');
const Users = require('../models/Users');

const auth = (req, res, next) => {
    try {
        let token = req.headers['authorization'].split(' ')[2];
        const decoded = jwt.verify(token, process.env.APP_SECRET);
        req.userData = decoded;
        next();
    } catch (er) {
        return res.status(401).json({ "message": "Not authorized" });
    }
}
//isAdmin
const isAdmin = async (req, res, next) => {
    const token = req.headers['authorization'].split(' ')[2];
    if (!token) return res.status(401).send("No User");
    try {
        const decoded = verify(token, process.env.APP_SECRET);
        req.userData = decoded;
        let user = await Users.findOne({ isAdmin });
        if (req.user && user.isAdmin === true) {
            return next();
        }
    } catch (err) {
        return res.status(401).send({ msg: "Admin token is not valid" });
    }
};

module.exports = { auth, isAdmin}