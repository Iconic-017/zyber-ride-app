const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const cors = require('cors');
app.use(cors());
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes')

const mapRoutes = require('./routes/map.routes')
const rideRoutes = require('./routes/ride.routes')

const connectDB = require('./Db/db');
connectDB();
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.use('/user',userRoutes);

app.use('/rider', captainRoutes)

app.use('/maps', mapRoutes)

app.use('/rides' , rideRoutes)

module.exports = app;