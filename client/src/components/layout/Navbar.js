import React from 'react'
import logo from '../../img/navbarLogo.png'
import {Link} from 'react-router-dom'
import {connect} from "react-redux";
import PropTypes from 'prop-types'
import {logout} from "../../actions/auth"

const Navbar = ({auth: {isAuthenticated, loading, isPatient}, logout}) => {
  const patientAuthLinks = (
    <ul>
      <li><Link to="/appointments">Appointments</Link></li>

      <li><Link to="/find">Find PT</Link></li>

      <li><Link to="/patient_profile">Profile</Link></li>

        <li><Link onClick={logout} to="/">
          <i className='fas fa-sign-out-alt'></i> {' '}
          <span classname="hide-sm">Logout </span>
          </Link>
        </li>
      </ul>
  )

  const therapistAuthLinks = (
    <ul>
      {/* add potentially */}
      {/* <li><Link to="/explore">Explore</Link></li> */}

      <li><Link to="/therapist_profile">Profile</Link></li>

        <li><Link onClick={logout} to="/">
          <i className='fas fa-sign-out-alt'></i> {' '}
          <span classname="hide-sm">Logout </span>
          </Link>
        </li>
      </ul>
  )

  const guestLinks =(
    <ul>
        <li><Link to="/register">Register</Link></li>
        <li><Link to="/login">Login</Link></li>
      </ul>
  )

  return (
    <nav className="navbar bg-dark">
        <Link to='/'className="logo"><img src={logo} alt="logo"/></Link>
        {
          (!loading && isAuthenticated) ? (isPatient ? patientAuthLinks: therapistAuthLinks) : guestLinks
        }
    </nav>
  )
}

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
}

const mapStateToProps = state =>({
  auth: state.auth
})

export default connect(mapStateToProps, {logout})(Navbar);