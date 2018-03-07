import MixableShow from "./MixableShow";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { fetchMixable } from "../mixableActions";

const mapStateToProps = state => ({
  mixables: state.entities.mixables
});

const mapDispatchToProps = dispatch => ({
  fetchMixable: mixableId => dispatch(fetchMixable(mixableId))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MixableShow)
);
