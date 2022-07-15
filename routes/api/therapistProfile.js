const express = require('express');
const router = express.Router();

// @route   get api/therapistprofile
// @desc    Test Route
// @access  Public
router.get('/', (req,res)=>res.send('therapist profile route'))

module.exports = router;