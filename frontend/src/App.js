import { Switch, Route } from "react-router-dom";
import LoginFormPage from "./components/LoginFormPage";
import HomePage from "./components/HomePage";


function App() {
  return (
    <>
      <h1>Bean Bunny</h1>
      
      <Switch>
        <Route path="/login"><LoginFormPage /></Route>
        <Route path="/"><HomePage /></Route>
      </Switch>
    </>
  );
}

export default App;
