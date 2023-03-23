const express = require('express');
const Quizzes = require('../models/Quiz');
const {auth, isAdmin} = require('../middleware/auth');
const Users = require('../models/Users');
const Scores = require('../models/Scores');



const router = express.Router();

router.post('/create', auth, (req, res) => {
    let quiz = new Quizzes({
        ...req.body.quiz,
        createdBy: req.body.createdBy,
        questions: req.body.quiz.questions.map(ques => {
            return {
                ...ques,
                answers: ques.answers.map(ans => {
                    return {
                        name: ans,
                        selected: false,
                    }
                })
            }
        })
      
        });
        quiz.save().then(result => {
            res.status(200).json({success: true});
        })
    });

    router.put("/:id",  async (req, res) => {
            // if (req.body.isAdmin === true || req.body.userId)  {
            //     try {

            const updateQuiz = await Quizzes.findByIdAndUpdate (
                req.params.id, { $set: req.body}, {new: true}
                );
                res.status(200).json(updateQuiz);
    //         } catch (error) {
    //             res.status(500).json(error);
    //         }
    //     } else {
    //         res.status(403).json("You are not allowed to update quiz");
    //     }
    // });
            })
          

    router.delete("/:id",  isAdmin, async (req, res) => {
        // if (req.user)  {
        //     try {

        await Quizzes.findByIdAndDelete (
            req.params.id)

            res.status(200).json("The quiz has been deleted");
        // } 
        //     res.status(500).json(error);
        // }
    // } else {
    //     res.status(403).json("You are not allowed to delete this quiz");
    // }
});
      
    
router.get('/', async (req, res)=> {
    const quizzes = await Quizzes.find({ users: req.users.id })

    res.status(200).json(quizzes)
  
});

router.get('/my-quizzes/:id', (req, res)=> {
    Quizzes.find({createdBy: req.params.id}).then(result => {
            res.status(200).json(result);
         })
    
    });

  
router.get('/all-quizzes', auth, (req, res) => {
    Quizzes.find().then(result => {
            res.status(200).json(result);
        })
    })
    router.get('/get-quiz/:id', auth, (req, res) => {
        Quizzes.findOne({ _id: req.params.id }).then(quiz => {
            res.status(200).json({quiz});
        }).catch(error => {
            res.status(500).send(error);
        })
    })
    
    router.post('/add-comment', auth, (req, res) => {
        Quizzes.updateOne({ _id: req.body.quizId }, {
            $push: {
                comments: {
                    sentFromId: req.body.sentFromId,
                    message: req.body.message
                }
            }
        }).then(quiz => {
            res.status(200).json({success: true});
        }).catch(error => {
            res.status(500).send(error);
        })
    });

    router.post('/like-quiz', auth, (req, res) => {
        Users.findOne({_id: req.body.userId, likedQuizzes: {$in: [req.body.quizId]}}).then(async user => {
            if (!user) {
                await Users.updateOne({ _id: req.body.userId }, {
                    $push: {
                        likedQuizzes: req.body.quizId
                    }
                });
                await Quizzes.updateOne({ _id: req.body.quizId }, {
                    $inc: {
                        likes: 1
                    }
                });
                res.status(200).json({message: 'You liked this quiz'});
            } else {
                await Users.updateOne({ _id: req.body.userId }, {
                    $pull: {
                        likedQuizzes: req.body.quizId
                    }
                });
                await Quizzes.updateOne({_id: req.body.quizId}, {
                    $inc: {
                        likes: -1
                    }
                })
                res.status(200).json({message: 'Removed from liked'})
            }
        })
    });
    
router.post('/save-score', auth, (req, res) => {
    let score = new Scores({
        userId: req.body.currentUser,
        answers: req.body.answers,
        quizId: req.body.quizId
    });
    score.save().then(async submittedAnswer => {
        await Quizzes.updateOne({ _id: req.body.quizId }, {
            $push: {
                scores: submittedAnswer._id
            }
        });
        res.status(200).json({scoreId: submittedAnswer._id});
    })
});
router.get('/results/:id', auth, (req, res) => {
    if (!req.params.id) {
        res.status(500).send("No id provided in params");
    } else {
        Scores.findOne({_id: req.params.id}).then(data => {
            if (!data) {
                res.status(500).send("Error finding score");
            } else {
                Quizzes.findOne({_id: data.quizId}).then(quiz => {
                    if (!quiz) {
                        res.status(500).send("Error getting quiz");
                    } else {
                        res.status(200).json({score: data, quiz: quiz});
                    }
                })
            }
        }).catch((err) => {
            console.log(err);
            res.status(500).send("Error finding score");
        })
    }
})

    

module.exports = router;