import React from "react";
import { Message } from "semantic-ui-react";
export default function AlertSuccess({ message }) {
  return (
    <div className="alert">
      <Message positive color="green">
        <Message.Header>Success !</Message.Header>
        <p>{message}</p>
      </Message>
    </div>
  );
}
