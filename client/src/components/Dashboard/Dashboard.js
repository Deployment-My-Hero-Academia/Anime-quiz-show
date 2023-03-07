import React from "react";
import './Dashboard.css';
import Sidebar from "../Sidebar/Sidebar";


export default class Dashboard extends React.Component {

    render() {
        return (
        <div className="dashboard-wrapper"><h1>User's Dashboard</h1>
            <div className="sidebar">
                    <Sidebar />
                </div>
                <div className="main">
                    <div className="top">
                        <div className="left">
                            <div className="header">Statistics</div>
                        </div>
                        <div className="right">
                            <div className="header">My Quizzes</div>
                        </div>
                    </div>

                    <div className="bottom">
                        
                    </div>
                </div>
            </div>
        )
    }
}