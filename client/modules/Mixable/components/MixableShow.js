import React from "react";
import Modal from "react-responsive-modal";
import { transitionStyles, customStyles } from "./reactModal.config";
import "./show.scss";

class MixableShow extends React.Component {
  componentDidMount() {
    if (this.props.mixableId) {
      this.props.fetchMixable(this.props.mixableId);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.mixableId !== this.props.mixableId) {
      this.props.fetchMixable(nextProps.mixableId);
    }
  }

  render() {
    const { mixables, mixableId } = this.props;
    const drink = mixables[mixableId];

    return (
      <section className="mixableShow">
        <Modal
          open={this.props.modalOpen}
          onClose={this.props.closeModal}
          little
          classNames={transitionStyles}
          styles={customStyles}
          animationDuration={100}
        >
          {this.content(drink)}
        </Modal>
      </section>
    );
  }

  steps(instructions) {
    return (
      <ol className="mixableShow__steps">
        {instructions.map((step, idx) => {
          const period = idx === instructions.length - 1 ? "" : ".";
          return (
            <li className="mixableShow__step" key={idx}>
              {step + period}
            </li>
          );
        })}
      </ol>
    );
  }

  ingredients(drink) {
    return (
      <ul>
        {drink.ingredients.map(ingredient => {
          const { _id, amount } = ingredient;
          let amtSuffix = amount.length > 0 ? `, ${amount}` : "";
          return <li key={_id}>{_id + amtSuffix}</li>;
        })}
      </ul>
    );
  }

  content(drink) {
    if (!drink) {
      return "<Loading />";
    }

    const instructions = drink.instructions.split(". ");

    return (
      <article>
        <img
          className="mixableShow__image"
          src={drink.imgUrl}
          alt={drink._id}
          width="150"
          height="150"
        />
        <h1 className="mixableShow__title">{drink._id}</h1>

        <h4 className="mixableShow__subTitle">Steps:</h4>
        {this.steps(instructions)}

        <h4 className="mixableShow__subTitle">Ingredients:</h4>
        {this.ingredients(drink)}
        <div className="mixableShow__bottomFiller" />
      </article>
    );
  }
}

export default MixableShow;
