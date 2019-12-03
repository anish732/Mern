import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { subscribeToTimer, readChat, sendChat } from "./sockethelper.js";
import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import "./App.css";

class App extends React.Component {
  constructor(props) {
    super(props);
    readChat(msg => {
      console.log("message from soket.io", msg);
    });
  }
  state = {
    msg: ""
  };
  handleTyping = e => {
    this.setState({ msg: e.target.value });
  };
  handleSubmit = () => {
    console.log("clicked");
    sendChat(this.state.msg);
  };
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
              </Switch>
            </section>
          </Router>
        </Provider>
        <p className="App-intro">
          This is the timer value: {this.state.timestamp}
        </p>
        <input onChange={this.handleTyping}></input>
        <button onClick={this.handleSubmit}>Submit</button>
      </>
    );
  }
}

export default App;
