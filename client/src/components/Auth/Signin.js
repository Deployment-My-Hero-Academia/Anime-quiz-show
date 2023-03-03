import React from "react";

export default class Signin extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password:''
        }
    }

    render(){
        return(
            <div className="sign-in-wrapper">
                <div className="form">
                    <div className="input-wrapper">
                    <input className="input" type="text" placeholder="Email Address"  value={this.state.email} onChange={event => this.setState({email: event.target.value})}></input>
                    </div>
                    <div className="input-wrapper"> 
                    <input className="input" type="password" placeholder="Password"  value={this.state.password} onChange={event => this.setState({password: event.target.value})}></input>
                    </div>
                    <div className="btn">Sign in</div>
                </div>
            </div>
        )
    }
}