export const transitionStyles = {
  transitionEnter: "mixableShow__transition-enter",
  transitionEnterActive: "mixableShow__transition-enter-active",
  transitionExit: "mixableShow__transition-exit-active",
  transitionExitActive: "mixableShow__transition-exit-active"
};

const overlay = {
  background: "transparent",
  left: "auto",
  height: "100vh",
  overflow: "scroll",
  width: "auto",
  borderLeft: "2px solid black",
  alignItems: "normal"
};

const modal = {
  boxShadow: "none",
  width: "150px"
};

const closeIcon = {
  top: "-13px",
  right: "175px"
};

export const customStyles = { overlay, modal, closeIcon };
