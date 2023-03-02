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
                    <input type="text" placeholder="Email Address"  value={this.state.email} onChange={e => this.setState({email: e.target.value})}></input>
                    <input type="password" placeholder="Password"  value={this.state.password} onChange={e => this.setState({password: e.target.value})}></input>
                 
                </div>
            </div>
        )
    }
}