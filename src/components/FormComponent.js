import React, { useContext, useState } from "react";
import { Form } from "semantic-ui-react";
import { GlobalContext } from "../context/GlobalState";
export default function FormComponent() {
  const [count_desc, setCountDesc] = useState(0);
  const {
    current_desc,
    current_todo,
    update_current_todo,
    update_current_desc,
    addAlert,
  } = useContext(GlobalContext);
  return (
    <div style={{ margin: "20px" }}>
      <Form>
        <Form.Group widths="equal">
          <Form.Input
            fluid
            label="Todo title"
            placeholder="Todo title"
            onChange={(e) => update_current_todo(e.target.value)}
            value={current_todo}
          />
        </Form.Group>
        <Form.TextArea
          label="Description"
          placeholder="Add more description about the todo..."
          onChange={(e) => {
            if (e.target.value.length === 141) {
              addAlert(
                "error",
                "Only 140 characters are allowed for the description."
              );
            } else {
              update_current_desc(e.target.value);
              setCountDesc(e.target.value.length);
            }
          }}
          value={current_desc}
        />
        <p>{count_desc}/140</p>
      </Form>
    </div>
  );
}
