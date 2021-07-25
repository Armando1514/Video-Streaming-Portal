import React from "react";
import ReactDOM from "react-dom";

const Modal = (props) => {
  return ReactDOM.createPortal(
    <div
      onClick={() => props.onDismiss()}
      className="ui dimmer modals visible active"
    >
      <div
        onClick={(e) =>
          e.stopPropagation()
        } /*Bubble propagation of event stopped, otherwise go up till the onClick of the parent's div and redirect to / even if we do not want in the click inside this div*/
        className="ui standard modal visible active"
      >
        <div className="header">{props.title}</div>
        <div className="content">{props.content}</div>
        <div className="actions">{props.actions()}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
};

export default Modal;
