const express = require("express");

const app = express();

let port = process.env.PORT || 3000;

app.get("/demo", (req, res) => {
    return res.json({ data: [{ "name": "sikandar" }, { "name": "Ranjeet" }, { "name": "Amit" }, {}] });
});

app.listen(port, () => {
    console.log("Express app is listening on port");
});
