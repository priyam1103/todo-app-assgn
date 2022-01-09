import React, { useState } from "react";
import { Button, Form, Header } from "semantic-ui-react";
import axios from "axios";
import "../App.css";

const AuthForm = () => {
  const [formDetails, setFormDetails] = useState({ emailId: "", password: "" });

  async function submitForm() {
    try {
      console.log(formDetails);
      await axios
        .post("http://localhost:3005/signin", formDetails)
        .then((res) => {
          console.log(res);
          localStorage.setItem("todo-app-token", res.data.token);
          localStorage.setItem("todo-app-email", res.data.user_.emailId);
          window.location.href = "http://localhost:3000/";
        })
        .catch((err) => {
          localStorage.removeItem("todo-app-token");
          localStorage.removeItem("todo-app-email");
        });
    } catch (err) {}
  }

  return (
    <div className="body">
      <Header as="h1">Todo App</Header>
      <Form>
        <Form.Field>
          <label>Email Id</label>
          <input
            placeholder="Email Id"
            onChange={(e) =>
              setFormDetails({ ...formDetails, emailId: e.target.value })
            }
          />
        </Form.Field>
        <Form.Field>
          <label>Password</label>
          <input
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setFormDetails({ ...formDetails, password: e.target.value })
            }
          />
        </Form.Field>
        <Button onClick={submitForm} type="submit">
          Submit
        </Button>
      </Form>
    </div>
  );
};

export default AuthForm;
