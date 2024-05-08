import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import PredictionForm from "./components/Prediction";
import Success from "./components/Success";
import Cancel from "./components/Cancel";
import Protected from "./components/Protected";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div>
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
          <Route path="/predict" component={PredictionForm} />
          <Route path="/success" component={Success} />
          <Route path="/cancel" component={Cancel} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
