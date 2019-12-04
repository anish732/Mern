import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { subscribeToTimer, readChat, sendChat } from "./sockethelper.js";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Chat from "./components/layout/Chat";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <Provider store={store}>
          <Router>
            <Navbar />
            <Route exact path="/" component={Landing} />
            <section className="container">
              <Alert />
              <Switch>
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                <Route exact path="/chat" component={Chat} />
              </Switch>
            </section>
          </Router>
        </Provider>
      </>
    );
  }
}

export default App;
