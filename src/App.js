import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './utils/PrivateRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Appointments from './pages/Appointments';

import { BrowserRouter, Route, Routes } from 'react-router-dom';


const App = () => (
  <AuthProvider>
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute exact path="/appointments" component={Appointments} />
        </Routes>
      </div>
    </BrowserRouter>
  </AuthProvider>
);

export default App;
