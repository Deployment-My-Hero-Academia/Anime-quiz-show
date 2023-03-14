const express = require("express");
const Users = require("../models/Users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require('../config/cloudinary');
const auth = require("../middleware/auth");
const {
  loginValidator,
  registerValidator,
} = require("../validators/validators");

const router = express.Router();
//login
router.post("/login", (req, res) => {
  const { errors, isValid } = loginValidator(req.body);

  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        res.json({ message: "Email does not exist", success: false });
      } else {
        bcrypt.compare(req.body.password, user.password).then((success) => {
          if (!success) {
            res.json({ message: "Invalid password", success: false });
          } else {
            const payload = {
              id: user._id,

              name: user.firstName,
            };

            jwt.sign(
              payload,

              process.env.APP_SECRET,
              { expiresIn: 2155926 },

              (err, token) => {
                res.json({
                  user,

                  token: "Bearer token: " + token,

                  success: true,
                });
              }
            );
          }
        });
      }
    });
  }
});

router.post("/register", (req, res) => {
  const { errors, isValid } = registerValidator(req.body);
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    // destruction
    const { firstName, lastName, email, password } = req.body;
    const registerUser = new Users({
      firstName,
      lastName,
      email,
      password,
      createdAt: new Date(),
    });
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(registerUser.password, salt, (hashError, hash) => {
        if (error || hashError) {
          res.json({
            message: "Error unable to hash password",
            success: false,
          });
          return;
        }
        registerUser.password = hash;
        registerUser
          .save()
          .then(() => {
            res.json({ message: "User created successfully", success: true });
          })
          .catch((error) =>
            res.json({ message: error.message, success: false })
          );
      });
    });
  }
});

router.get('/:id', auth,  (req, res) => {
  Users.findOne({ _id: req.params.id })
    .then((user) => {
      res.json({ user, success: true });
    })
    .catch((er) => {
      res.json({ success: false, message: er.message });
    });
});
router.post('/upload-image', auth, async(req, res) => {
  try {
      const fileUpload = req.body.data;
      const uploadedResponse = await cloudinary.uploader.upload(fileUpload);
      Users.findOne({ _id: req.body._id }).then(user => {
          user.avatar = { url: uploadedResponse.url, publicId: uploadedResponse.public_id };
          user.save();
          if (user.images) {
              user.images.push({ url: uploadedResponse.url, publicId: uploadedResponse.public_id });
          } else {
              user.images = [];
              user.images.push({ url: uploadedResponse.url, publicId: uploadedResponse.public_id })
          }
          res.json({ success: true });
      })
  } catch (err) {
      console.log(err);
      res.json({ success: false, message: 'Something went wrong, try again.' })
  }
})

module.exports = router;
