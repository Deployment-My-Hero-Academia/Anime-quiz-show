import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "./Auth.css";
import axios from "axios";
import storage from '../../storage/index.js';
import Alerts from '../Alerts/Alerts'


export default class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: "signin",
      showAlert: false
    };
  }

  signIn = (email, password) => {
    axios.post('/api/users/login', {email, password}).then(res => {
      if (res.data.success) {
        storage.dispatch({
          type: 'login',
          _id: res.data.user._id,
          user: res.data.user,
          token: res.data.token,
        });
        // checking if user information is logged out once successful login
        // console.log(storage.getState());
        this.props.history.push('/user-profile');
      } else {
        this.setState({
          showAlert: true
         });
         setTimeout(() => {
          this.setState({showAlert: false})
         
         }, 3000);
      }
    }).catch(er => {
     this.setState({
      showAlert: true
     });
     setTimeout(() => {
      this.setState({showAlert: false})
     
     }, 3000);
    });

  }
  signUp = (firstName, lastName, email, password) => {
    axios.post('/api/users/register', {firstName, lastName, email, password}).then(res => {
      if (res.data.success) {
        this.setState({tab: 'signin'});

      }
    }).catch(er => {
      console.log(er);
    });
    
    
  }
  logout() {
    localStorage.removeItem("token");
  }
  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }


  // Function and ternary operator 
  changeForm = () => {
    this.setState({
      tab: this.state.tab === 'signup' ? 'signin' : 'signup'
    });
  }
  render() {
    let page = this.state.tab === 'signin' ? <Signin signIn={this.signIn} /> : <Signup signUp={this.signUp} />
    return (
      <div className="auth-wrapper">
     <Alerts model={this.state.showAlert} message="Invalid login details" backgroundColor="#FF4539" />
        <div className="left">
    
        </div>
        
        <div className="right">
          <div className="header">My Hero Academia Quiz-App</div>
          <div className="sub-header">Welcome to My Hero Academia Quiz-App</div>
          
          {page}
          <div className="new" onClick={this.changeForm}>{this.state.tab === 'signin' ? 'New to the Jungle? Sign up' : 'Already booked a room in the Hotel California? Sign in'}</div>
      </div>
      </div>
    );
  }
}
