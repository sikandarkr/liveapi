const express = require("express");

const app = express();

let port = process.env.PORT || 3000;

app.get("/demo", (req, res) => {
    return res.json({ "data": "records...." });
});

app.listen(port, () => {
    console.log("Express app is listening on port");
});
