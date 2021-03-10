import { useEffect, useContext } from "react";
import "./App.css";
import "semantic-ui-css/semantic.min.css";
import Main from "./components/Main";
import Backdrop from "./components/Backdrop";
import AlertSuccess from "./components/AlertSuccess";
import AlertWarning from "./components/AlertWarning";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Loader } from "semantic-ui-react";
import { GlobalContext } from "./context/GlobalState";
function App() {
  const {
    api_gettodos,
    todos,
    alert,
    alerttype,
    alertmessage,
    loading,
  } = useContext(GlobalContext);
  useEffect(() => {
    api_gettodos();
  }, []);
  return (
    <div>
      <div className="navbar-pos">
        <Navbar todos={todos} />
      </div>
      <div className="loader">
        {loading && (
          <>
            <Backdrop />
            <Loader size="massive" active inline="centered" />
          </>
        )}
      </div>

      <Main todos={todos} />
      {alert && alerttype === "success" ? (
        <AlertSuccess message={alertmessage} />
      ) : null}
      {alert && alerttype === "error" ? (
        <AlertWarning message={alertmessage} />
      ) : null}
      {/* <Footer/> */}
    </div>
  );
}

export default App;
