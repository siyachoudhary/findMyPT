import './App.css';
import React, {useEffect} from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing';
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Alert from './components/layout/alert'
// Redux
import {Provider} from 'react-redux';
import store from './store';
import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

if(localStorage.token){
  setAuthToken(localStorage.token);
}

const App = () =>{
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  // const isPatient = false;
  // if(== "patient"){
  //   isPatient = true;
  //   console.log("is Patient")
  // }else{
  //   console.log("ERROR : NOT PATIENT")
  // }

  return(
  <Provider store={store}>
    <Router>
      <Navbar/>
      <section className='containerAlert'>
        <Alert/>
      </section>
      <Routes>
          <Route path = "/" element={<Landing/>}></Route>
          <Route path = "/login" element={<Login/>}></Route>
          <Route path = "/register" element={<Register/>}></Route>
      </Routes>
    </Router>
  </Provider>
)};

export default App;
