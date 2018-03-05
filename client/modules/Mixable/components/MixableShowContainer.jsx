import MixableShow from "./MixableShow";
import { connect } from "react-redux";

const mapStateToProps = state => ({
  mixables: state.entities.mixables
});

const mapDispatchToProps = dispatch => ({});

export default connect(mapStateToProps, mapDispatchToProps)(MixableShow);
