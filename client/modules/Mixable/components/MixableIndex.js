import React from "react";
import Modal from "react-responsive-modal";
import MixableShow from "./MixableShowContainer";
import Graph from "../../Graph/components/GraphContainer";
import "./index.scss";

class MixableIndex extends React.Component {
  componentDidMount() {
    // this.props.fetchMixables(["Vodka","Rum","Orange juice"]);
  }

  handleClick(mixableId) {
    return e => {
      this.props.openModal();
      this.props.showMixable(mixableId);
    };
  }

  render() {
    const mixables = {
      "Tequila Sunrise": {
        _id: "Tequila Sunrise"
      },
      "A Furlong Too Late": {
        _id: "A Furlong Too Late"
      },
      "A Night In Old Mandalay": {
        _id: "A Night In Old Mandalay"
      },
      "Black Russian": {
        _id: "Black Russian"
      }
    };
    // const { mixables } = this.props;
    if (Object.keys(mixables).length === 0) {
      return null;
    }

    return (
      <section className="mixableIndex">
        <MixableShow />
        <Graph />
      </section>
    );
  }
}

export default MixableIndex;
