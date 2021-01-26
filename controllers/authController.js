const userModel = require("../models/users");
const bcrypt = require("bcryptjs");
const { isEmail } = require("../utils/validation");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");
module.exports = {
    userRegister: async (req, res, next) => {
        var self = this;
        const { userName, email, password
        } = req.body;
        if (!isEmail(email)) {
            return res.status(400).json({
                errors: [
                    {
                        message: 'Bad Request',
                        status: false,
                    },
                ],
            });
        }
        const user = new userModel({
            userName,
            email,
            password
        });

        await userModel.find({ name: self.email }, function (err, docs) {
            if (!docs.length) {
                user.save(function (err, data) {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.status(201).json({
                        message: 'User Registration Successful',
                        status: "success",
                        data: data
                    });
                });

            } else {
                res.status(400).json({
                    errors: [
                        {
                            message: 'E-mail already exists',
                            status: "success"
                        },
                    ],

                });
            }
        });

    },

    userLogin: async (req, res, next) => {
        var self = this;
        const { userName, email, password
        } = req.body;
        await userModel.find({ userName: userName }, function (err, docs) {
            console.log("password", docs);
            if (docs.length) {
                console.log("password", docs[0].password);
                var result = bcrypt.compareSync(password, docs[0].password);
                if (result) {
                    const token = jwt.sign(
                        { id: docs._id },
                        req.app.get("secretKey"),
                        { expiresIn: "22h" }
                    );
                    return res.status(200).json(
                        {
                            "messaage": "success",
                            "token": token,
                            "status": 201,
                            userName: docs[0].userName,
                            email: docs[0].email
                        }
                    );
                }
                else {

                }


            }
            // if (docs.length) {
            //     var result = bcrypt.compareSync(req.body.password, docs.password);
            //     if (result) {
            //         const token = jwt.sign(
            //             { id: docs._id },
            //             req.app.get("secretKey"),
            //             { expiresIn: "22h" }
            //         );
            //     }
            // }
            // else {
            //     return res.status(200).json(
            //         {
            //             "messaage": "login failed",
            //             "token": null,
            //             "status": 401,
            //             "response": null,
            //         });
            // }
        })
    }

}

