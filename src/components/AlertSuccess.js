import React, { useContext } from "react";
import { Message } from "semantic-ui-react";
import {GlobalContext} from "../context/GlobalState"
export default function AlertSuccess({ message }) {
    const { removeAlert } = useContext(GlobalContext);
  return (
    <div className="alert">
      <Message positive color="green"  onDismiss={removeAlert}>
        <Message.Header>Success !</Message.Header>
        <p>{message}</p>
      </Message>
    </div>
  );
}
