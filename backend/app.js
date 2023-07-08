const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
dotenv.config();
var cors = require('cors');
var cookieParser = require('cookie-parser');
// require('dotenv').config({ path: '/home/shubh/Desktop/blog project/backend/.env'});

//database
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
    .then(() => console.log("DB connected"))
    .catch((err) => console.log(err));
    

const errorHandler = require('./middleware/error');
// Routes
const authRoutes = require('./routes/authRoutes');
const postRoute = require('./routes/postRoute');

//MIDDLeware
app.use(morgan('dev'));
app.use(bodyParser.json({ limit: "5mb" }));
app.use(bodyParser.urlencoded({
  limit: "5mb",
  extended: true
}));
app.use(cookieParser());
app.use(cors());

//ROUTES MIDDLE`WARE
app.use('/api', authRoutes);
app.use('/api', postRoute);

app.use(errorHandler);

//port
const port = process.env.PORT || 9000

app.listen(port, () => {
    console.log(` Server running on port ${port}`);
})
