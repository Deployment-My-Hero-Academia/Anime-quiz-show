import React from 'react';
import './CommunityQuizzes.css'
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';



export default class CommunitiesQuizzes extends React.Component{
    constructor(props) {
       super(props);
       this.state = {
            quizzes: []
       } 
    }
    componentDidMount() {
        axios.get('/api/quizzes/all-quizzes/').then(res => {
            this.setState({
                quizzes: res.data
            })
        })
    }
    render() {
        return (
            <div className='community-quizzes-wrapper'>
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
                <div className="take-quiz btn">Take Quiz</div>

                <div className="top-section">

                    <div className="likes"><img src="https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678087-heart-512.png" alt="like" /></div>
                </div>
            </div>
        ))}
    </div>
</div>
</div>
)
}
}