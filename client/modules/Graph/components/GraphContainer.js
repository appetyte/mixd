import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMixables, showMixable, openModal } from "../../Mixable/mixableActions";
import Graph from "./Graph.jsx";

const mapStateToProps = state => ({
  nodes: state.entities.graphElements.nodes,
  links: state.entities.graphElements.links
});

const mapDispatchToProps = dispatch => ({
  fetchMixables: shelf => dispatch(fetchMixables(shelf)),
  openModal: () => dispatch(openModal()),
  showMixable: mixableId => dispatch(showMixable(mixableId))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Graph)
);
