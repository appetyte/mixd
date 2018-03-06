import React from "react";
import { withRouter } from "react-router-dom";
import { fetchMixable } from "../mixableActions";

class MixableShow extends React.Component {
  componentDidMount() {
    return fetchMixable(this.props.match.params.id);
  }

  render() {
    return <div>Placeholder</div>;
  }
}

export default withRouter(MixableShow);
