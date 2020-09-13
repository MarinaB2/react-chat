import React, { useEffect, useState } from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom';
import NotFound from './components/forms/NotFound';
import ChatForm from './components/forms/ChatForm';
import RegisterForm from './components/forms/RegisterForm';
import { toast } from "react-toastify";
import LoginForm from './components/forms/LoginForm';
import ChatRoom from './components/forms/ChatRoom';

toast.configure();

function App() {
  const checkAuthenticated = async () => {
    try {
      const res = await fetch("http://localhost:5000/authentication/verify", {
        method: "POST",
        headers: { jwt_token: localStorage.token }
      });

      const parseRes = await res.json();

      parseRes === true ? setIsAuthenticated(true) : setIsAuthenticated(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  useEffect(() => {
    checkAuthenticated();
  }, []);

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = boolean => {
    setIsAuthenticated(boolean);
  };

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route exact
            path="/login"
            render={props =>
              !isAuthenticated ? (
                <LoginForm {...props} setAuth={setAuth} />
              ) : (
                  <Redirect to="/chatR" />
                )
            } />

          <Route exact path="/register" render={props =>
            !isAuthenticated ? (
              <RegisterForm {...props} setAuth={setAuth} />
            ) : (
                <Redirect to="/chatR" />
              )
          } />

          <Route exact
            path="/chatR" render={props =>
              isAuthenticated ? (
                <ChatRoom {...props} setAuth={setAuth} />
              ) : (
                  <Redirect to="/login" />
                )
            } />
          <Route path="/chat" component={ChatForm} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
