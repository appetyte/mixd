import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { fetchMixables, showMixable, openModal } from "../mixableActions";
import MixableIndex from "./MixableIndex";

const mapStateToProps = state => ({
  mixables: state.entities.mixables
});

const mapDispatchToProps = dispatch => ({
  fetchMixables: shelf => dispatch(fetchMixables(shelf)),
  openModal: () => dispatch(openModal()),
  showMixable: mixableId => dispatch(showMixable(mixableId))
});

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(MixableIndex)
);
