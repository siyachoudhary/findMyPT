import axios from 'axios';
import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    LOGOUT
} from '../actions/types';

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    Loading: true,
    user: null,
    isPatient: null
}

export default function(state=initialState, action){
    const {type, payload, patient} = action
    console.log(patient)

    switch(type){
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', payload.token);
            return{
                ...state,
                ...payload,
                isAuthenticated: true,
                Loading: false
            }
        case USER_LOADED:
            console.log(patient)
            if(patient){
                return{
                    ...state,
                    isAuthenticated: true,
                    Loading: false,
                    user: payload,
                    isPatient: true
                }
            }else{
                return{
                    ...state,
                    isAuthenticated: true,
                    Loading: false,
                    user: payload,
                    isPatient: false
                }
            }
        case LOGIN_FAIL:
        case REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGOUT:
            localStorage.removeItem('token');
            return{
                ...state,
                token: null,
                isAuthenticated: false,
                Loading: false,
                user: null
            }
        default: 
            return state;
    }
}