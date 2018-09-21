import React, { Component } from "react";
import axios from "react";

class Jokes extends Component {
  state = {
    jokes: []
  };
  render() {
    return (
      <div>
        <ul>
          {this.state.jokes.map(joke => (
            <li key={joke.id}>{joke.username}</li>
          ))}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    const token = localStorage.getItem("jwt");
    const reqOptions = {
      headers: {
        Authorization: token
      }
    };

    axios
      .get("http://localhost:3300/api/jokes", reqOptions)
      .then(res => {
        this.setState({ jokes: res.data });
      })
      .catch(err => {
        console.error("Axios error:", err);
        this.props.history.push("/home");
      });
  }
}

export default Jokes;
