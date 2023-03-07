import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";
import storage from "./storage/index";
import axios from "axios";
// import Sidebar from "./components/Sidebar/Sidebar";

class App extends React.Component {
  componentDidMount() {
    if (localStorage.getItem('_ID')) {
      axios.get(`/api/users/${localStorage.getItem('_ID')}`).then(res => {
        storage.dispatch({
          user: res.data.user,
          type: 'set_user'
        })
      }).catch(er => {
        console.log(er);
      })
    }
  }

  render() {
    return (
      <div className="app">

           <BrowserRouter>
           <Switch>
           <Route exact path="/" component={Auth}/>
           <Route path="/dashboard" component={Dashboard}/>
           {/* <Route path="/sidebar" component={Sidebar}/> */}
           <Route path="*">
            <Redirect to="/" />

  
          </Route>
         </Switch>
        </BrowserRouter>
        
      </div> 
    )
  }

}

export default App;
