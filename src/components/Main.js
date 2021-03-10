import React, { useContext } from "react";
import { Button, Card, Icon, Popup } from "semantic-ui-react";
import axios from "axios";
import { GlobalContext } from "../context/GlobalState";
export default function Main({ todos }) {
  const { addAlert, updatetodo } = useContext(GlobalContext);
  async function markDone(id) {
    axios
      .put(`https://todo-assgn.herokuapp.com/updatetodo/${id}`)
      .then((res) => {
        updatetodo(id, "done");
        addAlert("success", "A todo marked done.");
      });
  }
  async function deleteTodo(id) {
    axios
      .delete(`https://todo-assgn.herokuapp.com/deletetodo/${id}`)
      .then((res) => {
        updatetodo(id, "delete");
        addAlert("success", "A todo delete done.");
      });
  }
  return (
    <div className="Main">
      {todos.length !== 0 ? (
        <>
          {todos.map((item) => (
            <Card key={item._id}>
              <Card.Content>
                <Card.Header>{item.todo} </Card.Header>
                <Card.Meta>
                  {item.createdAt.substring(11, 16) +
                    "," +
                    item.createdAt.substring(0, 10)}
                </Card.Meta>

                <Card.Description>{item.body}</Card.Description>
              </Card.Content>
              <Card.Content extra>
                {!item.completed ? (
                  <div className="ui two buttons">
                    <Popup
                      content="Todo should be marked done for deletion."
                      pinned
                      trigger={
                        <Button
                          animated="vertical"
                          color="red"
                          onClick={() =>
                            addAlert(
                              "error",
                              "Please mark the todo as done , to delete it."
                            )
                          }
                        >
                          <Button.Content visible>Delete</Button.Content>
                          <Button.Content hidden>
                            <Icon name="zip" />
                          </Button.Content>
                        </Button>
                      }
                    />

                    <Button
                      color="green"
                      animated="vertical"
                      onClick={() => markDone(item._id)}
                    >
                      <Button.Content visible>Done</Button.Content>
                      <Button.Content hidden>
                        <Icon name="arrow right" />
                      </Button.Content>
                    </Button>
                  </div>
                ) : (
                  <div className="ui two buttons">
                    <Button
                      animated="vertical"
                      color="red"
                      onClick={() => deleteTodo(item._id)}
                    >
                      <Button.Content visible>Delete</Button.Content>
                      <Button.Content hidden>
                        <Icon name="zip" />
                      </Button.Content>
                    </Button>
                  </div>
                )}
              </Card.Content>
            </Card>
          ))}
        </>
      ) : (
        <p className="welcome">
          Welcome to todos , Please checkout our exciting features where you can
          keep a track of your todos and also with a smooth exprience
        </p>
      )}
    </div>
  );
}
