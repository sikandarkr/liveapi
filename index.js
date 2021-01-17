const express = require("express");
var route = require('./routes/routes');
const app = express();

let port = process.env.PORT || 3000;


app.use('/api', route);

app.listen(port, () => {
    console.log("Express app is listening on port");
});
