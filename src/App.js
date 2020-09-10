import React from 'react';
import './App.css';
//import Register from './components/containers/Register';
import Login from './components/containers/Login';
//import Chat from './components/containers/Chat';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import NotFound from './components/containers/NotFound';
import ChatForm from './components/forms/ChatForm';
import RegisterForm from './components/forms/RegisterForm';

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
        <Route path="/login" component={Login} />
        <Route path="/register" component={RegisterForm} />
          <Route path="/chat" component={ChatForm} />
          <Route path="*" component={NotFound} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
