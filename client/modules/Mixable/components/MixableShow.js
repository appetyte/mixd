import React from "react";
import { withRouter } from "react-router-dom";
import { fetchMixable } from "../mixableActions";

class MixableShow extends React.Component {
  componentDidMount() {
    return fetchMixable(this.props.match.params.id).then(
      arg => console.log(arg),
      error => console.log(error)
    );
  }

  handleClick(e) {
    e.preventDefault();
    console.log("success!");
    return fetchMixable(this.props.match.params.id).then(
      arg => console.log(arg),
      error => console.log(error)
    );
  }

  render() {
    return (
      <div>
        <button onClick={this.handleClick.bind(this)}>Press me!</button>
      </div>
    );
  }
}

export default withRouter(MixableShow);
