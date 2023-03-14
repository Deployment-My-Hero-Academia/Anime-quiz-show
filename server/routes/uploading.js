
const multer = require('multer');
const fs = require("fs");
const path = require('path');
const Images = require('../models/Images')



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + path.extname(file.originalname))
    }
  })

const upload = multer({ storage: storage });

app.post("/", upload.single("testImage"), (req, res) => {
  const saveImage =  Images({
    name: req.body.name,
    img: {
      data: fs.readFileSync("uploads/" + req.file.filename),
      contentType: "image/png",
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log("image is saved");
    })
    .catch((err) => {
      console.log(err, "error has occur");
    });
    res.send('image is saved')
});

app.get('/',async (req,res)=>{
  const allData = await Images.find()
  res.json(allData)
})

  