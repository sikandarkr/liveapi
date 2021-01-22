const express = require("express");
var mongoose = require('mongoose');
const bodyParser = require('body-parser');
var route = require('./routes/routes');
const app = express();
var router = express.Router();
app.use(express.json()); // Make sure it comes back as json
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Parses the text as json
app.use(bodyParser.json());

const uri = "mongodb+srv://sikandar:CZx7Ekl5q7nZb1Kx@liveapicluster.ekwrc.mongodb.net/<dbname>?retryWrites=true&w=majority";
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        console.log('MongoDB Connected…')
    })
    .catch(err => console.log("Error", err));

app.use('/api', route);
let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Express app is listening on port");
});
