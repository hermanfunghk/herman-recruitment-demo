import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import GitSearchRepo from "./components/module/gitSearchRepo/gitSearchRepo";
import Map from "./components/module/map/map";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar />
        <main className="container">
          <Switch>
            <Route path="/gitSearchRepo" component={GitSearchRepo} />
            <Route path="/map" component={Map} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/gitSearchRepo" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
