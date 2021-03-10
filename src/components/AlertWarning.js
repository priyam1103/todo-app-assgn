import React, { useContext } from "react";
import { Message } from "semantic-ui-react";
import {GlobalContext} from "../context/GlobalState"
export default function AlertWarning({ message }) {
    const { removeAlert } = useContext(GlobalContext);
  return (
    <div className="alert">
      <Message negative color="red" onDismiss={removeAlert}>
        <Message.Header>Error !</Message.Header>
        <p>{message}</p>
      </Message>
    </div>
  );
}
