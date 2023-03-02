import React from "react";
import Signin from "./Sigin";
import Signup from "./Signup";
export default class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: "signn",
    };
  }
  render() {
    let page = this.state.tab === 'signin' ? <Signin/> : <Signup/>
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
