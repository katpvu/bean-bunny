import { Switch, Route } from "react-router-dom";
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import SignUpForm from "./components/SignUpForm";
import ErrorPage from "./components/ErrorPage";
import ListIndexPage from "./components/List/ListIndexPage";
import ListItemIndex from "./components/ListItem/ListItemIndex";
import BusinessPage from "./components/BusinessPage";
import SearchPage from "./components/SearchPage";
import Hopped from "./components/List/Hopped";
import Header from "./components/Header";
import SplashPage from "./components/SplashPage";


function App() {

  return (
    <>
      <Header />
      <Switch>
        <Route path="/error"><ErrorPage /></Route>
        <Route path="/lists/:listId"><ListItemIndex /></Route>
        <Route path="/lists"><ListIndexPage /></Route>
        <Route path="/businesses/:businessId"><BusinessPage /></Route>
        <Route path="/search/:location"><SearchPage /></Route>
        <Route path="/hopped"><Hopped /></Route>
        <Route exact path="/login"><LoginFormPage /></Route>
        <Route exact path="/signup"><SignUpForm /></Route>
        <Route exact path="/search"><SearchPage /></Route>
        <Route exact path="/"><SplashPage /></Route>
        <Redirect to={'/error'} />
      </Switch>
    </>
  );
}

export default App;
