import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import {Link, Navigate} from 'react-router-dom'
import {setAlert} from '../../actions/alert'
import {register} from '../../actions/auth'
import PropTypes from 'prop-types'


const Register = ({setAlert, register, isAuthenticated, isPatient}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    type: '',
    password: '',
    password2: ''
  });

  const {name, email, type, password, password2} = formData;

  const onChange = e => setFormData({...formData, [e.target.name]:e.target.value});

  const onSubmit = async e =>{
    e.preventDefault();
    if(password !== password2){
      setAlert("passwords do not match", 'danger');
    }else{
      register({name, email, type, password});
    }

  }

  //redirect if logged in
  if(isAuthenticated){
    if(isPatient){
      return <Navigate to="/patient_profile"/>;
    }
    else{
      return <Navigate to="/therapist_profile"/>;
    }
  }

  return (
    <section className='container'>
      <Fragment>
        <h1 className="large text-primary">Register</h1>
        <p className="lead"><i className="fas fa-user"></i> Create Your Account</p>
        <form className="form" onSubmit={e => onSubmit(e)}>
          <div className="form-group">
            <input type="text" placeholder="Name" name="name" value={name} onChange={e => onChange(e)}  />
          </div>
          <div className="form-group">
            <input type="email" placeholder="Email Address" name="email" value={email} onChange={e => onChange(e)} />
            <small className="form-text"
              >This site uses Gravatar. If you would like a profile image, please use a
              Gravatar email </small>
          </div>
          <div className="form-group" >
            <p className="my">Select your account type:</p>
            <div className='userType'>
              <label>
                <input
                  type="radio"
                  value="therapist"
                  name = "type"
                  onChange={e => onChange(e)}
                 /> 
                Therapist
              </label>
              <label>
                <input
                  type="radio"
                  value="patient"
                  name = "type"
                  onChange={e => onChange(e)}
                 /> 
                Patient
              </label>
            </div>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password} onChange={e => onChange(e)}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2} onChange={e => onChange(e)}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login" >Sign In</Link>
        </p>
      </Fragment>
      </section>
  )
}

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
  isPatient: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  isPatient: state.auth.isPatient
})

export default connect(mapStateToProps, {setAlert, register})(Register);