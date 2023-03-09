import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Prompts from "../Prompts/Prompts";
import axios from "axios";
import './CreateNewQuiz.css'
import Alerts from '../Alerts/Alerts'

export default class CreateNewQuiz extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            categories: ['Anime', 'Manga', 'Gaming', 'Korean Drama', 'Japanese Drama', 'Superhero', 'Misc'],
            categoriesVal: 'Anime',
            signedIn: false,
            questions: [],
            name: '',
            addQuestion: false,
            questionInput: '',
            answers: [],
            correctAnswer: '',
            showAlert: false,
            imgUrl: '',



        }
    }
  
    componentDidMount() {
        if (!localStorage.getItem('JWT_PAYLOAD')) {
            this.props.history.push('/');
        }
    }
    privateView  = event => {
        if(event.target.checked === true) {
            this.setState({
                signedIn: event.target.checked,
            });
        } else {
            this.setState({signedIn: false});
        }
    }

    addAnswer = () => {
        this.setState({
            answers: this.state.answers.concat('')
        })
    }
    updateAnswer = (event, i) => {
       let answerOptions = Object.assign([], this.state.answers);
       answerOptions[i] = event.target.value;
       this.setState({
       answers: answerOptions
        })
    }
    postQuestion = () => {
        let question = {
            answers: this.state.answers,
            correctAnswer: this.state.correctAnswer,
            questionInput: this.state.questionInput
        }
        this.setState({
            questions: this.state.questions.concat(question),
            addQuestion: false,
            questionInput: '',
            answers: [],
            correctAnswer: ''

        });
    }

   removeQuestion = (question) => {
    this.setState({
        questions: this.state.questions.filter(ques => ques.questionInput !== question.questionInput)
    })
}

saveQuiz = () => {
    let quiz = {
        signedIn: this.state.signedIn,
        name: this.state.name,
        questions: this.state.questions,
        category: this.state.categoriesVal,
        imgUrl: this.state.imgUrl,
      
    }
    axios.post('/api/quizzes/create', {quiz, createdBy: localStorage.getItem('_ID')}).then(res => {
        if (res.data.succuss) {
            this.setState({
                questions: [],
                answers: [],
                categoriesVal: 'Anime',
                showAlert: true
            });
            setTimeout(() => {
                this.setState({showAlert: false});

            }, 3000);
        }
         
    }).catch(er => {
        console.error(er);
    })
}



    render () {
        return (
            <div className="create-quiz-wrapper">
            <Alerts model={this.state.showAlert} message='new quiz created' />
            <div>
                <Sidebar />
            </div>

            <div className="main">
                <div className="header">Create Quiz</div>
                <div className="form card">
                    <input className="input" onChange={event => this.setState({name: event.target.value})} value={this.state.name} placeholder="Quiz Name" />
                    <br></br>
                    <input className="input" onChange={event => this.setState({imgUrl: event.target.value})} value={this.state.imgUrl} placeholder="Img url" />
                    <br></br>
                    <select value={this.state.categoriesVal} onChange={event => this.setState({categoriesVal: event.target.value})} className="input select" placeholder="Category">
                        {this.state.categories.map((cat, idx) => (
                            <option key={idx} value={cat}>{cat}</option>
                        ))}
                    </select>
                    <div className="checkbox">
                        <span>Please be login to take a quiz</span>
                        <input checked={this.state.signedIn} onChange={this.privateView} type="checkbox" placeholder="Please login in to take a quiz" />
                    </div>
                
                    {this.state.questions.map((ques, idx) => (
                        <div className="question" key={idx}>
                            <div>{ques.questionInput}</div>
                            <div>Correct Answer: {ques.correctAnswer}</div>
                            <div>Number of answers: {ques.answers.length}</div>
                            <span className="btn delete" onClick={() => this.removeQuestion(ques)}>Delete</span>
                        </div>
                    ))}
                    
                    <div className="questions">
                        <div className="add-question" onClick={() => this.setState({addQuestion: true})}>Add Question</div>
                    </div>
                     
                    <span onClick={() => this.saveQuiz()} className="btn save-quiz">Save Quiz</span>

                    <Prompts model={this.state.addQuestion}>
                        <div className="new-question-form">
                                <input className="input" placeholder="Question" value={this.state.questionInput} onChange={event => this.setState({questionInput: event.target.value})} />
                                <div>Answers</div>
                                {this.state.answers.map((ans, idx) => (
                                    <div className="answer-form" key={idx}>
                                        <input type="radio" value={this.state.ans} onChange={event => this.setState({correctAnswer: ans})} name="answer"/> <input className="input" type="text" placeholder="Answer" value={this.state.answers[idx]} onChange={event => this.updateAnswer(event, idx)}/>
                                    </div>    
                                ))}
                                <div className="add-answer" onClick={this.addAnswer}>Add Answer</div>
                                <div className="btn-wrapper">
                                    <div className="btn" onClick={() => this.setState({addQuestion: false})}>Close</div>
                                    <div className="btn" onClick={this.postQuestion}>Save</div>
                                </div>
                        </div>
                    </Prompts>
                </div>
            </div>
        </div>
    )
}
}
