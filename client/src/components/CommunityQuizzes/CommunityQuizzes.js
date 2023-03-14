import React from 'react';
import './CommunityQuizzes.css'
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';
import Alerts from '../Alerts/Alerts'



export default class CommunitiesQuizzes extends React.Component{
    constructor(props) {
       super(props);
       this.state = {
            quizzes: [],
            showAlert: false,
            message: ''
       } 
    }
    componentDidMount() {
        axios.get('/api/quizzes/all-quizzes/').then(res => {
            this.setState({
                quizzes: res.data
            })
        })
    }
    likeQuiz = (quizId) => {
        axios.post('/api/quizzes/like-quiz', {quizId: quizId, userId: localStorage.getItem('_ID')}).then(res => {
            if (res.data) {
                this.setState({showAlert: true, message: res.data.message});
                axios.get('/api/quizzes/all-quizzes').then(res => {
                    this.setState({
                        quizzes: res.data
                    })
                })
                setTimeout(() => {
                    this.setState({showAlert: false, message: res.data.message});
                }, 3000);
            }
        })
    }

    startQuiz = (quizId) => {
        this.props.history.push('/quiz-history?id=' + quizId);
    }



    render() {
        return (
            <div className='community-quizzes-wrapper'>
                <Alerts model={this.state.showAlert} message={this.state.message} />
                <div>
                    <Sidebar />
                </div>
                <div className='body'>
                <div className='header-top'>Community Quizzes</div>
                <div className='quizzes-wrapper'>
                    {this.state.quizzes.map((quiz, idx) => (
                <div key={idx} className="quiz-card card">
                <img src={quiz.imgUrl || 'https://staticg.sportskeeda.com/editor/2021/12/f4002-16395902057936-1920.jpg'} alt="default" />
                <div className="quiz-name">{quiz.name}</div>
                <div className="category">{quiz.category}</div>
                <div className="questions">{quiz.questions.length} Questions</div>
                <div className="start-quiz btn" onClick={() => this.startQuiz(quiz._id)}>Start Quiz</div>

                <div className="top-section">

                    <div className="likes">{quiz.likes}<img style={{cursor: 'pointer', padding: '5px'}} onClick={() => this.likeQuiz(quiz._id)} src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png" alt="like" /></div>
                </div>
            </div>
        ))}
    </div>
</div>
</div>
)
}
}