import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";

class Signup extends Component {
  state = {
    username: "",
    password: "",
    password2: ""
  };

  signup = event => {
    event.preventDefault();
    const { username, password, department } = this.state;
    const user = { username, password, department };
    if (this.state.password === this.state.password2) {
      axios
        .post("http://localhost:3300/api/register", user)
        .then(res => {
          localStorage.setItem("jwt", res.data.token);
          //trying to see how I can do the:
          //"this.props.history.push("/jokes");"
          // as a Link or Redirect instead
        })
        .catch(err => {
          console.error("Axios Error:", err);
        });
    } else {
      return console.log("Passwords do not match");
    }
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <form onSubmit={this.signup}>
        <div>
          <label>Username </label>
          <input
            value={this.state.username}
            onChange={this.handleChange}
            name="username"
            type="text"
          />
        </div>
        <div>
          <label>Password </label>
          <input
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
            type="password"
          />
        </div>
        <div>
          <label>Confirm Password </label>
          <input
            value={this.state.password2}
            onChange={this.handleChange}
            name="password2"
            type="password"
          />
        </div>
        <div>
          <button type="submit">Signup</button>
        </div>
      </form>
    );
  }
}
export default Signup;
