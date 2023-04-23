import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";
import SignUpForm from "./components/SignUpForm";


function App() {
  return (
    <>
      <h1>Bean Bunny</h1>
      
      <Switch>
        <Route path="/login"><LoginFormPage /></Route>
        <Route path="/signup"><SignUpForm /></Route>
        <Route path="/"><HomePage /></Route>
      </Switch>
    </>
  );
}

export default App;
