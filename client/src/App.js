import React from "react";
import { BrowserRouter as Router, Route, Routes, Outlet } from "react-router-dom";
import Auth from "./components/Auth/Auth";

class App extends React.Component {
  render() {
    return (
      <div class="app">

           <Router>
           <Routes>
           
           <Route exact path="/" component={Auth}/>
           <Route path="*">
            <Navigate replace to="/" />

  
          </Route>
         </Routes>
        </Router>
        
      </div> 
    )
  }

}

export default App;
