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
    bgImage = () => {
        if(storage.getState().user.avatar && storage.getState().user.avatar.url) {
            return `url(${storage.getState().user.avatar.url})`;
            
        } else {
            return `url(https://avatarfiles.alphacoders.com/331/331450.png)`;
        }
    }
    render(){
        if (storage.getState().user) {
        return (

            <div className='sidebar-wrapper'>
                    <div className="header">My Hero Academia Quiz</div>
    
                    <div className="user">
                    <div className="avatar" style={{backgroundImage: this.bgImage()}}></div>
                    <div className="name">{storage.getState().user.firstName + ' ' + storage.getState().user.lastName}</div>
                 

                 </div>
                 <div className="links">
                        <NavLink to="/admin"><div className="link">Admin</div></NavLink>
                        <NavLink to="/user-profile"><div className="link">Dashboard</div></NavLink>
                        <NavLink to="/my-quizzes"><div className="link">My Quizzes</div></NavLink>
                        <NavLink to="/create-new-quiz"><div className="link">Create Quiz</div></NavLink>
                        <NavLink to="/community-quizzes"><div className="link">Community Quizzes</div></NavLink>
                        {/* <NavLink to="/update"><div className="link">Update</div></NavLink> */}
                     
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
