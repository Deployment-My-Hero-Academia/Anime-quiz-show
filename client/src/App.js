import React from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import Auth from "./components/Auth/Auth";

class App extends React.Component {
  render() {
    return (
      <div class="app">
        <BrowserRouter>
        <Switch>
        <Route exact path="/"component={Auth}/>

        <Route path="*">
          <Redirect to="/"/>
        </Route>
        </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
