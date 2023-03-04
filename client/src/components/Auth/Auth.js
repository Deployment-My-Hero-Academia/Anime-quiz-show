import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";
import "./Auth.css";
import axios from "axios"

export default class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: "signin",
    };
  }

  signIn = (email, password) => {
    axios.post('/api/users/login', {email, password}).then(res => {
      console.log(res);
    }).catch(er => {
      console.log(er);
    });

  }
  signUp = (firstName, lastName, email, password) => {
    axios.post('/api/users/register', {firstName, lastName, email, password}).then(res => {
      console.log(res.data);
    }).catch(er => {
      console.log(er);
    });
    
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
        <div className="left"></div>
        
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
