import React, { useState } from 'react';
import logo from '../logo.svg';

function Login() {
  
  const [modal, setModal] = useState(false);

  const [user, setUser] = useState(null);

  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    checkPassword(e.target.value)
  }

  const checkPassword = (password) => {
    if (password === process.env.REACT_APP_PASSWORD) {
      setIsValid(true)
    } else {
      setIsValid(false)
    }
  }

  const openModal = (e) => {
    setModal(true);
    setUser(e.target.name)
  }

  const closeModal = (e) => {
    setModal(false)
  }
  
  const setLocalUser = (e) => {
    localStorage.setItem('BurgerUser', user);
    window.location.href = "/"
  }

  const setGuestUser = (e) => {
    localStorage.setItem('BurgerUser', 'Guest');
    window.location.href = "/"
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo light" alt="logo" />
        <p className="mt-3">
          burger<strong>Scout</strong><span className="light">.</span>
        </p>
        <p className="mt-5">who are you<span className="light">?</span></p>
        <div className="my-0">
          <button type="button" className="btn btn-info m-2" onClick={openModal} name="Juan">Juan</button>
          <button type="button" className="btn btn-info m-2" onClick={openModal} name="Tomás">Tomás</button>
          <button type="button" className="btn btn-info m-2" onClick={openModal} name="Germán">Germán</button>
          <button type="button" className="btn btn-info m-2" onClick={openModal} name="Mario">Mario</button>
        </div>
        <p className="mt-5"><small>anyone else<span className="light">?</span> try <button className="Btn-link" name="Guest" onClick={setGuestUser}>guest access</button><span>.</span></small></p>
        <div className="modal" id="loginModal" tabIndex="-1" role="dialog" aria-labelledby="loginModalTitle" aria-hidden="true" style={ { display: modal ? 'block' : 'none' } }> 
          <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title dark" id="exampleModalLongTitle">{user}, enter your password</h5>
                <button type="button" className="btn--close" aria-label="Close" onClick={closeModal}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body light">
                <input type="number" inputMode="numeric" name="password" className="modal--input" onChange={handleChange}/>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                <button type="button" className="btn btn-info m-2" disabled={!isValid} onClick={setLocalUser}>Access</button>
              </div>
            </div>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Login;


