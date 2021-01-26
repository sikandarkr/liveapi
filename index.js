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
var jwt = require("jsonwebtoken");
app.use(express.json()); // Make sure it comes back as json
// Parses the text as url encoded data
app.use(bodyParser.urlencoded({ extended: true }));
app.set("secretKey", "nodeRestApi");
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

function validateUser(req, res, next) {
    jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function (
        err,
        decoded
    ) {
        if (err) {
            res.json({ status: "error", message: err.message, data: null });
        } else {
            req.body.userId = decoded.id;
            next();
        }
    });
}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
    let err = new Error("Not Found");
    err.status = 404;
    next(err);
});
// handle errors
app.use(function (err, req, res, next) {
    if (err.status === 404) res.status(404).json({ message: "Not found" });
    else res.status(500).json({ message: "Something looks wrong :( !!!" });
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Express app is listening on port");
});
