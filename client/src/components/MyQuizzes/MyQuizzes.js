import React from 'react';
import './MyQuizzes.css';
import Sidebar from '../Sidebar/Sidebar';
import axios from 'axios';


export default class MyQuizzes extends React.Component{
    constructor(props) {
       super(props);
       this.state = {
            quizzes: []
       } 
    }
    
    componentDidMount() {
        axios.get('/api/quizzes/my-quizzes/' +  localStorage.getItem('_ID')).then(res => {
            this.setState({
                quizzes: res.data
            })
        })
    }
    startQuiz = (quizId) => {
        this.props.history.push('/quiz-history?id=' + quizId);
    }


    render() {
        return (
            <div className='my-quizzes-wrapper'>
                <div>
                    <Sidebar />
                </div>
                <div className='body'>
                <div className='header-top'>My Quizzes</div>
                <div className='quizzes-wrapper'>
                    {this.state.quizzes.map((quiz, idx) => (
                <div key={idx} className="quiz-card card">
                <img src={quiz.imgUrl  || 'https://lh3.googleusercontent.com/Z3xn71oFh5OJ0BsYvTrN5pywsi6iDZDYj24ZihU8DHgD5vQHAbG2ZLwkl9yGpbphGqWUiKIEgqNjNiev3KKTRheEhammpPEUV80qevNHrSvKaBlE0SqCSYvWLq4P9AC_zpsWBq6I'} alt="default"/>
                <div className="quiz-name">{quiz.name}</div>
                <div className="category">{quiz.category}</div>
                <div className="questions">{quiz.questions.length} Questions</div>
                <div className="start-quiz btn" onClick={() => this.startQuiz(quiz._id)}>Start Quiz</div>

                <div className="top-section">
                    <div className="views"> <img src="https://www.pngkit.com/png/full/525-5251817_security-governance-privacy-eye-icon-font-awesome.png" alt="view"/> </div>
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