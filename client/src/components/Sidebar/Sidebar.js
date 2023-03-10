import React from "react";
import './Sidebar.css';
import storage from "../../storage/index.js";
import { NavLink } from "react-router-dom";


export default class Sidebar extends React.Component {
    componentDidMount() { 
        this.unsubscribe = storage.subscribe(() => this.forceUpdate());
    }
    componentWillUnmount() {
        this.unsubscribe();

    }
    render(){
        if (storage.getState().user) {
        return (

            <div className='sidebar-wrapper'>
                    <div className="header">My Hero Academia Quiz</div>
    
                    <div className="user">
                        <div className="avatar" style={{backgroundImage: storage.getState().user.avatar ||  `url(https://avatarfiles.alphacoders.com/331/331450.png)`}}></div>
                        <div className="name">{storage.getState().user.firstName + ' ' + storage.getState().user.lastName}</div>
                 

                 </div>
                 <div className="links">
                        <NavLink to="/dashboard"><div className="link">Dashboard</div></NavLink>
                        <NavLink to="/account"><div className="link">Account</div></NavLink>
                        <NavLink to="/my-quizzes"><div className="link">My Quizzes</div></NavLink>
                        <NavLink to="/create-new-quiz"><div className="link">Create Quiz</div></NavLink>
                        {/* <NavLink to="/my-quizzes"><div className="link">My quizzes</div></NavLink> */}
                        <NavLink to="/community-quizzes"><div className="link">Community Quizzes</div></NavLink>
                    </div>
            </div>
        )
    } else {
        return (
            <div>Loading</div>
            )
         }
    }
}
