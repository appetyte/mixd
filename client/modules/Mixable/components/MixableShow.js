import React from "react";
import Modal from "react-responsive-modal";
import "./mixableShow.scss";

class MixableShow extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    this.props.fetchMixable(this.props.match.params.id);
  }

  openModal() {
    this.setState({ modalOpen: true });
  }

  closeModal() {
    this.setState({ modalOpen: false });
  }

  render() {
    const mixableId = this.props.match.params.id;
    const { mixables } = this.props;
    const drink = mixables[mixableId];

    if (!drink) {
      return null;
    }

    const instructions = drink.instructions.split(". ");

    return (
      <section className="mixableShow">
        <button onClick={this.openModal}>{mixableId}</button>
        <Modal
          showCloseIcon={false}
          open={this.state.modalOpen}
          onClose={this.closeModal}
          little
          classNames={{
            transitionEnter: "mixableShow__transition-enter",
            transitionEnterActive: "mixableShow__transition-enter-active",
            transitionExit: "mixableShow__transition-exit-active",
            transitionExitActive: "mixableShow__transition-exit-active"
          }}
          styles={{
            overlay: {
              background: "transparent",
              left: "auto",
              height: "100vh",
              overflow: "scroll",
              width: "auto",
              borderLeft: "2px solid black"
            },
            modal: {
              boxShadow: "none",
              width: "150px"
            }
          }}
          animationDuration={100}
        >
          <img
            className="mixableShow__image"
            src={drink.imgUrl}
            alt={drink._id}
            width="150"
            height="150"
          />
          <h1 className="mixableShow__title">{drink._id}</h1>
          <h4>Steps:</h4>
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
          <h4>Ingredients:</h4>
          <ul>
            {drink.ingredients.map(ingredient => {
              const { _id, amount } = ingredient;
              let amtSuffix = amount.length > 0 ? `, ${amount}` : "";
              return <li key={_id}>{_id + amtSuffix}</li>;
            })}
          </ul>
        </Modal>
      </section>
    );
  }
}

export default MixableShow;
