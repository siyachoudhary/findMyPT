const express = require('express');
const connectDB = require('./config/db')

const app = express();

// connect database
connectDB();

// init middleware
app.use(express.json({extended:false}));

app.get('/',(req,res)=>res.send('API Running'));

// define routes
app.use('/api/therapistProfile', require('./routes/api/therapistProfile'));
app.use('/api/user', require('./routes/api/user'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/patientProfile', require('./routes/api/patientProfile'));
app.use('/api/findTherapist', require('./routes/api/findTherapist'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));