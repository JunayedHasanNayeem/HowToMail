import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./AuthProvider/AuthProvider";
import SignIn from "./Components/SignIn/SignIn";
import SignUp from "./Components/SignUp/SignUp";
import Dashboard from "./Pages/Dashboard/Dashboard";
import PrivateRoute from './Components/SignIn/PrivateRoute';
import { Redirect } from "react-router-dom";

function App() {
  return (
    <div>
      <AuthProvider>
        <Router>
          <Switch>
          <Route exact path="/" render={() => (<Redirect to="/dashboard" />)} />
            <PrivateRoute path="/dashboard">
                <Dashboard></Dashboard>
            </PrivateRoute>
            <Route path="/sign-in">
              <SignIn></SignIn>
            </Route>
            <Route path="/sign-up">
              <SignUp></SignUp>
              </Route>
          </Switch>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
