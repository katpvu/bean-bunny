import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import SignUpForm from "./components/SignUpForm";
import ErrorPage from "./components/ErrorPage";
import ListIndex from "./components/List/ListIndex";
import ListItemIndex from "./components/ListItem/ListItemIndex";


function App() {

  return (
    <>
      <Switch>
        <Route path="/error"><ErrorPage /></Route>
        <Route path="/lists/:listId"><ListItemIndex /></Route>
        <Route path="/lists"><ListIndex /></Route>
        <Route exact path="/login"><LoginFormPage /></Route>
        <Route exact path="/signup"><SignUpForm /></Route>
        <Route exact path="/"><HomePage /></Route>
        <Redirect to={'/error'} />
      </Switch>
    </>
  );
}

export default App;
