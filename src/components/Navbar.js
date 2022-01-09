import React, { useContext, useState } from "react";
import {
  Button,
  Icon,
  Label,
  Modal,
  Header,
  Card,
  Feed,
} from "semantic-ui-react";
import { Input } from "semantic-ui-react";
import FormComponent from "./FormComponent";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
export default function Navbar({ todos }) {
  const [modalState, setModalState] = useState(false);
  const [modalNoti, setModalNoti] = useState(false);
  const {
    current_desc,
    temp_list,
    current_todo,
    update_todo_list,
    addAlert,
    filterList,
    reupdate_todo,
    notification,
    loader,
    update_current_todo,
    update_current_desc,
  } = useContext(GlobalContext);
  console.log(notification);

  async function addTodo() {
    loader();
    if (
      current_desc
        .toString()
        .trim()
        .match(/^[0-9a-zA-Z ]+$/)
    ) {
      if (
        current_desc.trim().length !== 0 &&
        current_todo.trim().length !== 0
      ) {
        await axios
          .post(
            "http://localhost:3005/addtodo",
            {
              todo: current_todo,
              body: current_desc,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem(
                  "todo-app-token"
                )}`,
              },
            }
          )
          .then((res) => {
            setModalState(!modalState);
            update_todo_list(res.data.todo_created);
            addAlert("success", "Todo added successfully.");
            update_current_todo("");
            update_current_desc("");
            loader();
          })
          .catch(() => {
            addAlert("error", "Please try again later.");
            loader();
          });
      } else {
        addAlert("error", "Please fill all the details of the todo.");
        loader();
      }
    } else {
      addAlert("error", "Description should be in letter and numbers only.");
      loader();
    }
  }

  async function logout() {
    localStorage.removeItem("todo-app-token");
    localStorage.removeItem("todo-app-email");
    window.location.href = "http://localhost:3000";
  }
  return (
    <div className="navbar">
      <Input
        placeholder="Search..."
        style={{ width: "500px" }}
        onChange={(e) => {
          if (e.target.value.length > 3) {
            filterList(e.target.value);
          } else if (e.target.value.length === 0) {
            reupdate_todo();
          }
        }}
      />
      <div>
        <Label as="a">{localStorage.getItem("todo-app-email")}</Label>
        <Button as="div" labelPosition="right">
          <Button color="green" onClick={() => setModalState(!modalState)}>
            <Icon name="plus" />
            Add Todo
          </Button>
          <Label as="a" basic color="green" pointing="left">
            {todos.length}
          </Label>
        </Button>
        <Button as="div" labelPosition="right">
          <Button color="red" onClick={logout}>
            Logout
          </Button>
        </Button>
      </div>
      <Modal open={modalState}>
        <Modal.Header>Add Todo !</Modal.Header>

        <Modal.Content>
          <FormComponent />
        </Modal.Content>
        <Modal.Actions>
          <Button.Group>
            <Button onClick={() => setModalState(!modalState)}>Cancel</Button>
            <Button.Or />
            <Button positive onClick={addTodo}>
              Add Todo
            </Button>
          </Button.Group>
        </Modal.Actions>
      </Modal>

      <Modal basic open={modalNoti}>
        <Header icon="bell" content="Notifications" />
        <Modal.Actions>
          <Icon
            name="remove"
            size="large"
            style={{ cursor: "pointer" }}
            onClick={() => setModalNoti(!modalNoti)}
          />
        </Modal.Actions>
        <Modal.Content>
          <Feed>
            {notification.map((item) => {
              return (
                <div key={item._id}>
                  <Feed.Event>
                    <Feed.Content>
                      <Feed.Date
                        content={`${
                          item.createdAt.substring(11, 16) +
                          "," +
                          item.createdAt.substring(0, 10)
                        }`}
                      />
                      <Feed.Summary>{item.update}</Feed.Summary>
                    </Feed.Content>
                  </Feed.Event>
                  <hr></hr>
                </div>
              );
            })}
          </Feed>
        </Modal.Content>
      </Modal>
    </div>
  );
}
