import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";
import Dashboard from "./components/Dashboard/Dashboard";

class App extends React.Component {
  render() {
    return (
      <div className="app">

           <BrowserRouter>
           <Switch>
           <Route exact path="/" component={Auth}/>
           <Route path="/dashboard" component={Dashboard}/>
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
