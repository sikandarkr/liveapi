const userModel = require("../models/users");
const bcrypt = require("bcryptjs");

module.exports = {
    userLogin: async (req, res, next) => {

        const { userName, email, password
        } = req.body;
        console.log("Username is.... ", req.body);
        const user = new userModel({
            userName,
            email,
            password
        });
        await user.save(function (err, data) {
            if (err) {
                return res.status(500).send(err.message);
            }
            res.json(user);
        });

    }
}

