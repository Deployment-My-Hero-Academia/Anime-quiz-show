import React from "react";
import './Admin.css';
import axios from 'axios'
import Sidebar from "../Sidebar/Sidebar";
import Alerts from '../Alerts/Alerts';
// import Prompts from "../Prompts/Prompts";



export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            quiz: {},
            user: null,
            quizzes: []


        }
    }
    componentDidMount() {
    
        axios.get('/api/quizzes/all-quizzes/').then(res => {
            this.setState({
                quizzes: res.data
            })
          
        })
    
     
            axios.get('/api/users/').then((res) => {
                this.setState({user: res.data.user})
         
     } ) }
    

     handleDelete = (id) => {
   
   axios.delete(`/api/quizzes/${id}`).then(res => {
    this.setState({
        quizzes: res.data,
        data: { id }
    })
window.location.reload();
})
     }
         
     updateQuiz = (quizId) => {
        this.props.history.push('/quiz-history?id=' + quizId);
    }
  
    

     handleUpdate = (id) => {
   
        axios.put(`/api/quizzes/${id}`).then(res => {
            if (res.data.succuss) {
                // const data = new FormData()
                this.setState({
                    quizzes: res.data,
                    id: id.current.value
                });
                setTimeout(() => {
                    this.setState({showAlert: false});
    
                }, 3000);
            }
             
        }).catch(er => {
            console.error(er);
        })
        window.location.reload();
    }
        getUser = () => {
        let id = localStorage.getItem('_ID');
        if (!id) {
            this.props.history.push('/');
            localStorage.clear();
        }
        axios.get('/api/users/' + id).then((res) => {
            this.setState({user: res.data.user})
        })
    }
    
    render() {
        return (
            <div className='community-quizzes-wrapper'>
        
                <div>
                    <Sidebar />
                </div>
          
          
                <div className='body'>
                    
                <center><div className='header-top'>Admin Dashboard</div></center>
                <div className='quizzes-wrapper'>
                {this.state.quizzes.map((quiz, idx) => (
                <div key={idx} className="quiz-card card">
                    <h1>Quizzes</h1>
                    <div className="quiz-name">{quiz._id}</div>
                <div className="quiz-name">{quiz.name}</div>
                <div className="category">{quiz.category}</div>
                <img src={quiz.imgUrl || 'https://www.denofgeek.com/wp-content/uploads/2022/04/Sailor-Moon-Cosmos.jpg?resize=768%2C432'} alt="default" />
                <div className="delete-quiz btn" onClick={(event) => this.handleDelete(quiz._id, event)} style={{backgroundColor: "red"}}>Delete Quiz</div>
                <div className="update-quiz btn" onClick={() => this.updateQuiz(quiz._id)}style={{backgroundColor: "blue"}}>Update Quiz</div>
               
                <div className="top-section">

                </div>
            </div>
        ))}
    </div>

     <div className='community-quizzes-wrapper'>
     <Alerts model={this.state.showAlert} message={this.state.message} />
     <div>
   
     </div>
     <div className='body'>
         
    <center><p>Users</p>
     
                    
     {this.state.user &&
 
         <h1> {this.state.user.email}
    </h1> 
        
              


     }</center>
 
</div>
</div>
</div>
</div>


        )}}
         
