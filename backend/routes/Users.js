var express = require("express");
var router = express.Router();

// Load User model
const User = require("../models/Users");

// GET request
// Getting all the users
router.get("/", function (req, res) {
    User.find(function (err, users) {
        if (err) {
        } else {
            res.json(users);
        }
    });
});

// NOTE: Below functions are just sample to show you API endpoints working, for the assignment you may need to edit them

// POST request
// Add a user to db
router.post("/register", (req, res) => {
    const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        c_no: req.body.c_no,
        age: req.body.age,
        batch: req.body.batch,
        password: req.body.password,
    });

    newUser
        .save()
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

// POST request
// Login
router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    // Find user by email
    User.findOne({ email }).then((user) => {
        // Check if user email exists
        if (!user) {
            res.status(400).send("Email not found");
        } else {
            if (password == user.password) {
                res.status(200).json(user);
            } else {
                res.status(400).send(
                    "Password is incorrect. Please check again."
                );
            }
        }
    });
});

// POST request
// profile
router.post("/profile", (req, res) => {
    const email = req.body.email;

    // Find users by email
    User.findOne({ email }).then((users) => {
        // Check if users email exists
        if (!users) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(users);
        }
    });
});

// POST request
// profile
router.post("/update", (req, res) => {
    const email = req.body.email;

    // Find users by email
    User.updateMany(
        { email: email },
        {
            $set: {
                name: req.body.name,
                c_no: req.body.c_no,
                age: req.body.age,
                batch: req.body.batch,
            },
        }
    ).then((users) => {
        // Check if users email exists
        if (!users) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(users);
        }
    });
});

module.exports = router;
