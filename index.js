const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require("cors");
var route = require('./routes/routes');
const { requireApiKey } = require("./middlewares/apiValidation");
const app = express();
var router = express.Router();
app.use(express.json()); // Make sure it comes back as json
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());
app.use(cors());
app.options("*", cors());

const uri = process.env.MONGO_URL;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch(err => console.log("Error", err));

app.use('/api', requireApiKey, route);
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Express app is listening on port");
});
