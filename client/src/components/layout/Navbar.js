import React from 'react'
import logo from '../../img/navbarLogo.png'
import {Link} from 'react-router-dom'

const Navbar = () => {
  return (
    <nav className="navbar bg-dark">
        <Link to='/'className="logo"><img src={logo} alt="logo"/></Link>
      <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
    </nav>
  )
}

export default Navbar