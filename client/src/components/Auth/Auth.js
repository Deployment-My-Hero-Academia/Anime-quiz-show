import React from "react";
import Signin from "./Signin";
import Signup from "./Signup";

import axios from "axios"

export default class Auth extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      tab: "signin",
    };
  }

  signIn = (email, password) => {

  }
  signUp = (firstName, lastName, email, password) => {
    
  }
  render() {
    let page = this.state.tab === 'signin' ? <Signin signIn={this.signIn} /> : <Signup signUp={this.signUp} />
    return (
      <div className="auth-wrapper">
        <div className="left"></div>
        
        <div className="right">
          <div className="header">Quiz-App</div>
          <div className="sub-header">Welcome to Quiz-App</div>
          {page}
        </div>
      </div>
    );
  }
}
