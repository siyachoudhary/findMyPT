const express = require('express');
const router = express.Router();

// @route   get api/findTherapist
// @desc    Test Route
// @access  Public
router.get('/', (req,res)=>res.send('find therapist route'))

module.exports = router;