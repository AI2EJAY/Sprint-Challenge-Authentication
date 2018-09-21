import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  state = {};
  render() {
    return (
      <div>
        <div>
          <h1>Welcome to our awesome joke site</h1>
          <p>
            These jokes are some of the best jokes in town! Therefore we don't
            just show anybody! Become a member to chuckle til your buckle
            cluckles
          </p>
        </div>
        <div>
          <div>
            <Link to="/signup">
              <button>Sign Up!</button>
            </Link>
          </div>

          <div>
            <p>Already a member?</p>
            <Link to="/signin">
              <button>Sign In</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
