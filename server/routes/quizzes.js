const express = require('express');
const Quizzes = require('../models/Quiz');
const auth = require('../middleware/auth');


const router = express.Router();

router.post('/create', auth, (req, res) => {
    let quiz = new Quizzes({
        ...req.body.quiz,
        createdBy: req.body.createdBy,
        // categories: req.body.categories name: req.body.name,
      
        });
        quiz.save().then(result => {
            res.status(200).json({success: true});
        })
    });

router.get('/my-quizzes/:id', auth, (req, res)=> {
    Quizzes.find({createdBy: req.params.id}).then(result => {
            res.status(200).json(result);
         })
    
    });
router.get('/all-quizzes', auth, (req, res) => {
    Quizzes.find().then(result => {
            res.status(200).json(result);
        })
    })

module.exports = router;