const express = require("express");
const Users = require("../models/Users");
const Quiz = require("../models/Quiz");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { cloudinary } = require('../config/cloudinary');
const {auth, isUser, isAdmin} = require("../middleware/auth");
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
              id: user._id, isAdmin: user.isAdmin,

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
router.get("/signout", (req, res) => {
   req.logout();
  res.json({success: true, msg: 'Sign out successfully.'});
});

router.post("/register", (req, res) => {
  const { errors, isValid } = registerValidator(req.body);
  if (!isValid) {
    res.json({ success: false, errors });
  } else {
    // destruction
    const { firstName, lastName, email, password, isAdmin } = req.body;
    const registerUser = new Users({
      firstName,
      lastName,
      isAdmin,
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

router.get("/", isAdmin, async (req, res, next) => {
  try {
    const users = await Users.find();
    res.send(users);
  } catch (error) {
    next(error);
  }
});

// router.get('/isAdmin', function (req, res) {
//   Users.findById(req.user, function (err, user) {
//     if (user.isAdmin == true) {
//         res.send(user);
//     } else {
//         return res.status(400).send({ message: 'User is not Admin' });
//     }
//   });
// });

// Update user
router.put('/:id', isUser,  async (req, res) => {
if (req.body.userId === req.params.id || req.params.isAdmin === req.body.isAdmin) {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt); 
    }
    try {
      const updateUser = await Users.findByIdAndUpdate( req.params.id, {$set: req.body}, {new: true});
      res.status(200).json(updateUser);
    } catch (error) {
      res.status(500).json(error);

    }
  } else {
    res.status(403).json("Not auth to delete this account")
  }
});



  router.delete("/:id", isAdmin, async (req, res, next) => {
   if (req.body.userId === req.params.id) {
    try {
      const user = await Users.findById(req.params.id);
      try {
        await Quiz.deleteMany({ email: user.email});
        await Users.findByIdAndDelete(req.params.id);
        res.status(200).json("User has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } catch (err) {
      res.status(404).json("User not found!");
    }
  } else {
    res.status(401).json("You can delete only your account!");
  }
});

  // Admin get last five users

// router.get('/', auth, async (req, res) => {
//   const search = req.search.new;
//   if(req.user.isAdmin) {
// try {
//   const users = search 
//   ? await Users.find().sort({_id: -1}).limit(5)
//   : await Users.find();
//   res.status(200).json(users);
// } catch (error) {
//    res.status(500).json(error);
// }
// } else {

//     res.status(403).json("you are not admin, please log on with the correct credentials")

// // }
// });
// router.get('/stats', auth, async (req, res) => {
// try {
//   const data = await Users.aggregate([
//     {$project: {month: { $month: '$createdAt'}}},
//     {$group: {_id: '$month', total: {$sum: 1}}},
//   ])
 
//   res.status(200).json(data);
// } catch (error) {
//    res.status(500).json(error);
// }
// });

// Upload image for avatar
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
