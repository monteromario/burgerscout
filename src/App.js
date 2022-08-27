import React, { useState, useEffect } from 'react';
import Login from './components/Login'
import Router from './components/Router'

let App = () => {

const [user, setUser] = useState(null);

const getLocalUser = (userName) => {
    return localStorage.getItem('BurgerUser');
}

  useEffect(() => {
    setUser(getLocalUser())
  });

if (user) {
  return (
          <Router /> 
  );
} else {
    return (
          <Login /> 
  );
}
};

export default App;