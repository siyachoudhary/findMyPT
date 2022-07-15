import React from 'react'
import {Link} from 'react-router-dom'

const Landing = () => {
  return (
    // <h1>Hello</h1>
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
        {/* <img src={logoImg} alt="logo" className='logoImg'></img> */}
        <h1 className='x-large'>Find my PT</h1>
          <p className="lead">
            A one stop shop to connect physical therapists and patients.
          </p>
          <div className="buttons">
            <Link to="/register" class="btn btn-primary">Register</Link>
            <Link to="/login" class="btn btn-light">Login</Link>
          </div>
          {/* <br/>
          <h2 className='mission'>Our mission:</h2>
           <p>
          ~ Create a space for patients to find physical therapists for their needs. <br></br>
          ~ Provide a platform for physical therapists to attract clients who require their help.</p> */}
        </div>
      </div>
    </section>
  )
}

export default Landing