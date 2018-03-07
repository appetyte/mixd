import MixableShow from "./MixableShow";
import { connect } from "react-redux";
import { fetchMixable, closeModal } from "../mixableActions";

const mapStateToProps = state => ({
  mixables: state.entities.mixables,
  modalOpen: state.ui.mixables.modalOpen,
  mixableId: state.ui.mixables.mixableId
});

const mapDispatchToProps = dispatch => ({
  fetchMixable: mixableId => dispatch(fetchMixable(mixableId)),
  closeModal: () => dispatch(closeModal())
});

export default connect(mapStateToProps, mapDispatchToProps)(MixableShow);
