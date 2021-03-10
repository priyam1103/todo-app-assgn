import React, { createContext, useReducer } from "react";
import AppReducer from "./AppReducer";
import axios from "axios";
const Initial_data = {
  todo_list: [],
  temp_list: [],
  current_todo: "",
  current_desc: "",
  alert: false,
  alerttype: "",
  alertmessage: "",
  notification: [],
  loading: false,
};

export const GlobalContext = createContext(Initial_data);

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, Initial_data);

  function reupdate_todo() {
    dispatch({
      type: "REUPATE_TODO",
      payload: state.temp_list,
    });
  }
  async function api_gettodos() {
    loader();
    await axios.get("http://localhost:3000/todos").then((res) => {
      dispatch({
        type: "UPDATE_TODO",
        payload: res.data,
      });
    });
    await axios.get("http://localhost:3000/getupdates").then((res) => {
      console.log(res);
      dispatch({
        type: "UPDATE_NOTI",
        payload: res.data,
      });
      loader();
    });
  }
  function update_current_todo(current_todo) {
    dispatch({
      type: "UPDATE_CURRENT_TODO",
      payload: current_todo,
    });
  }
  function update_current_desc(current_desc) {
    dispatch({
      type: "UPDATE_CURRENT_DESC",
      payload: current_desc,
    });
  }
  function update_todo_list(added_todo) {
    dispatch({
      type: "UPDATE_TODO_LIST",
      payload: added_todo,
    });
  }
  function addAlert(alerttype, alertmessage) {
    if (!state.alert) {
      dispatch({
        type: "UPDATE_ALERT",
        payload: { alerttype, alertmessage, alert: true },
      });
      setTimeout(function () {
        dispatch({
          type: "UPDATE_ALERT",
          payload: { alerttype: "", alertmessage: "", alert: false },
        });
      }, 3000);
    }
  }
  function removeAlert() {
    dispatch({
      type: "UPDATE_ALERT",
      payload: { alerttype: "", alertmessage: "", alert: false },
    });
  }
  function filterList(value) {
    const filter_data = state.temp_list.filter((index) =>
      index.todo.toString().toLowerCase().includes(value)
    );
    dispatch({
      type: "UPDATE_FILTERED_TODO",
      payload: filter_data,
    });
  }
  function updatetodo(id, type) {
    if (type === "done") {
      state.todo_list.map((item) => {
        if (item._id === id) {
          item.completed = true;
        }
      });
    }
    if (type === "delete") {
      let id_;
      for (var i = 0; i < state.todo_list.length; i++) {
        if (state.todo_list[i]._id === id) {
          id_ = i;
          break;
        }
      }
      state.todo_list.splice(id_, 1);
    }
  }
  function loader() {
    dispatch({
      type: "UPDATE_LOADING",
    });
  }
  return (
    <GlobalContext.Provider
      value={{
        todos: state.todo_list,
        current_todo: state.current_todo,
        current_desc: state.current_desc,
        alert: state.alert,
        alerttype: state.alerttype,
        alertmessage: state.alertmessage,
        notification: state.notification,
        loading: state.loading,
        reupdate_todo,
        api_gettodos,
        update_current_desc,
        update_todo_list,
        update_current_todo,
        addAlert,
        updatetodo,
        filterList,
        removeAlert,
        loader,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
