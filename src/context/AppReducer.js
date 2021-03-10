/* eslint-disable no-duplicate-case */
// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch (action.type) {
    case "REUPATE_TODO":
      return {
        ...state,
        todo_list: action.payload,
      };
    case "UPDATE_FILTERED_TODO":
      console.log(action.payload);
      return {
        ...state,
        todo_list: action.payload,
      };
    case "UPDATE_TODO":
      return {
        ...state,
        todo_list: action.payload,
        temp_list: action.payload,
      };
    case "UPDATE_LOADING":
      return {
        ...state,
        loading: !state.loading,
      };
    case "UPDATE_NOTI":
      return {
        ...state,
        notification: action.payload,
      };
    case "UPDATE_CURRENT_TODO":
      return {
        ...state,
        current_todo: action.payload,
      };
    case "UPDATE_CURRENT_DESC":
      return {
        ...state,
        current_desc: action.payload,
      };
    case "UPDATE_TODO_LIST":
      return {
        ...state,
        todo_list: state.todo_list.concat(action.payload),
        temp_list: state.temp_list.concat(action.payload),
      };
    case "UPDATE_ALERT":
      console.log(action.payload);
      return {
        ...state,
        alert: action.payload.alert,
        alertmessage: action.payload.alertmessage,
        alerttype: action.payload.alerttype,
      };
    default:
      return;
  }
};
