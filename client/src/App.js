import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import storage from "./storage/index";
import axios from "axios";
import UserProfile from "./components/UserProfile/UserProfile";
import CreateNewQuiz from "./components/CreateNewQuiz/CreateNewQuiz";
import MyQuizzes from "./components/MyQuizzes/MyQuizzes";
import CommunitiesQuizzes from "./components/CommunityQuizzes/CommunityQuizzes";
import QuizHistory from "./components/QuizHistory/QuizHistory";
import StartQuiz from "./components/StartQuiz/StartQuiz";
import Results from "./components/Results/Results";
import Admin from "./components/Admin/Admin";
import UpdateQuiz from "./components/UpdateQuiz/UpdateQuiz"


class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('_ID')) {
      axios.get(`/api/users/${localStorage.getItem('_ID')}`).then(res => {
        storage.dispatch({
          user: res.data.user,
          type: 'set_user'
        
      })})
      } else if (localStorage.getItem('Q_ID')) {
          axios.get(`/api/quizzes/${localStorage.getItem('Q_ID')}`).then(res => {
            storage.dispatch({
              quiz: res.data.quiz,
              type: 'set_quiz'

            })
      }).catch(er => {
        console.log(er);
      })
    }
  }
  

  render() {
    return (
      <div className="app">

           <BrowserRouter>
           <Switch>
           <Route exact path="/" component={Auth}/>
           <Route path="/admin" component={Admin}/>
           <Route path="/user-profile" component={UserProfile}/>
           <Route path="/create-new-quiz" component={CreateNewQuiz}/>
           <Route path="/my-quizzes" component={MyQuizzes}/>
           <Route path="/community-quizzes" component={CommunitiesQuizzes}/>
           <Route path="/quiz-history" component={QuizHistory}/>
           <Route path="/start-quiz" component={StartQuiz}/>
           <Route path="/results" component={Results}/>
           <Route path="/update" component={UpdateQuiz}/>
  
          
          
           <Route path="*">
            <Redirect to="/" />

  
          </Route>
         </Switch>
        </BrowserRouter>
        
      </div> 
    )
  }

}

export default App;
