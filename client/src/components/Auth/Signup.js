import React from "react";


export default class Signup extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password:''

        }
    }

    render(){
        return(
            <div className="sign-in-wrapper">
                <div className="form">
                <div className="input-wrapper">
                    <div>First Name</div>
                    <input className="input" type="text" placeholder="First Name"  value={this.state.firstName} onChange={event => this.setState({firstName: event.target.value})}></input>
                    </div>
                    <div className="input-wrapper"> 
                    <div>Last Name</div>
                    <input className="input" type="text" placeholder="Last Name"  value={this.state.lastName} onChange={event => this.setState({lastName: event.target.value})}></input>
                    </div>
                    <div className="input-wrapper">
                    <div>Email</div>
                    <input className="input" type="text" placeholder="Email Address"  value={this.state.email} onChange={event => this.setState({email: event.target.value})}></input>
                    </div>
                    <div className="input-wrapper"> 
                    <div>Password</div>
                    <input className="input" type="password" placeholder="Password"  value={this.state.password} onChange={event => this.setState({password: event.target.value})}></input>
                    </div>

                    <div className="btn" onClick={() => this.props.signUp(this.state.firstName, this.state.lastName, this.state.email, this.state.password)}>Sign up</div> 
                 
                </div>

            </div>
        )
    }
}