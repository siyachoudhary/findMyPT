const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const {check, validationResult} = require('express-validator');

const TherapistUser = require('../../models/TherapistUser');

// @route   POST api/therapistUser
// @desc    register therapist
// @access  Public
router.post('/', [
    check('name','Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({min:6}),
],async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
    }
    const {name, email, password} = req.body;
    try{
        // see if user already exists
        let user = await TherapistUser.findOne({email});
        if(user){
            return res.status(400).json({errors: [{msg: 'user already exists'}]});
        }

        // get user gravatar
        const avatar = gravatar.url(email, {
            s:"200",
            r:"pg",
            d:"mm"
        })

        user = new TherapistUser({
            name,
            email,
            avatar,
            password
        })

        // encrypt/Hash password
        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();


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