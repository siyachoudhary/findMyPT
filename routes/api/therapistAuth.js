const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const bcrypt = require('bcryptjs');
const {check, validationResult} = require('express-validator'); 

const User = require('../../models/user');

// @route   get api/therapistAuth
// @desc    Test Route
// @access  Public
router.get('/', auth, async (req,res)=>{
    try{
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});

// @route   POST api/therapistAuth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists(),
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {email, password} = req.body;
    try{
        // see if user already exists
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({errors: [{msg: 'Email or password are incorrect'}]});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.status(400).json({errors: [{msg: 'Email or password are incorrect'}]});
        }

        // return jsonwebtoken
        const payload = {
            user:{
                id:user.id
            }
        }

        jwt.sign(
            payload, 
            config.get('jwtSecret'),
            {expiresIn: 3600000},
            (err, token)=>{
                if(err) throw err;
                res.json({token});
                }
            );

    }catch(err){
        console.error(err.message);
        res.status(500).send('server error');
    }
});

module.exports = router;