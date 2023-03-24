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

const isUser = (req, res, next) => {
    auth(req, res, () => {
      if (req.user.id === req.params.id || req.user.isAdmin) {
        next();
      } else {
        res.status(403).json({ "message": "Not authorized"});
      }
    });
  };
//isAdmin
const isAdmin = async (req, res, next) => {
   auth(req, res, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      res.status(403).json({ "message": "Not authorized" });
    }
  });
};

module.exports = { auth, isUser, isAdmin}