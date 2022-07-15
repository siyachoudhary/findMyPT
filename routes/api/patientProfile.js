const express = require('express');
const router = express.Router();

// @route   get api/patientProfile
// @desc    Test Route
// @access  Public
router.get('/', (req,res)=>res.send('patient profile route'))

module.exports = router;