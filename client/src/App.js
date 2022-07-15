import './App.css';
import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
// import {Switch} from 'react';
import Navbar from './components/layout/Navbar'
import Landing from './components/layout/Landing';
import Login from './components/auth/Login'
import Register from './components/auth/register'
import Alert from './components/layout/alert'
// Redux
import {Provider} from 'react-redux';
import store from './store';


const App = () =>(
  <Provider store={store}>
    <Router>
      <Navbar/>
      <section className='container'>
        <Alert/>
        <Routes>
          <Route path = "/" element={<Landing/>}></Route>
          <Route path = "/login" element={<Login/>}></Route>
          <Route path = "/register" element={<Register/>}></Route>
        </Routes>
      </section>
    </Router>
  </Provider>
);

export default App;
