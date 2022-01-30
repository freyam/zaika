var express = require("express");
var rtr = express.Router();

const User = require("../models/Users");

router.get("/", function (req, res) {
    getRoot(res);
});

router.post("/register", (req, res) => {
    registerUser(req, res);
});

router.post("/login", (req, res) => {
    loginUser(req, res);
});

router.post("/profile", (req, res) => {
    showProfile(req, res);
});

router.post("/update", (req, res) => {
    updateUser(req, res);
});

module.exports = rtr;

function showProfile(req, res) {
    const body = req.body;
    const email = body.email;

    User.findOne({ email }).then((users) => {
        if (!users) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            res.status(200).json(users);
        }
    });
}

function updateUser(req, res) {
    const body = req.body;
    const email = body.email;

    User.updateMany(
        { email: email },
        {
            $set: {
                name: body.name,
                c_no: body.c_no,
                age: body.age,
                batch: body.batch,
            },
        }
    ).then((users) => {
        if (!users) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            res.status(200).json(users);
        }
    });
}

function loginUser(req, res) {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    User.findOne({ email }).then((user) => {
        if (!user) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            if (password == user.password) {
                res.status(200).json(user);
            } else {
                res.status(400).send("Incorrect Password");
            }
        }
    });
}

function registerUser(req, res) {
    const body = req.body;
    const newUser = new User({
        name: body.name,
        email: body.email,
        c_no: body.c_no,
        age: body.age,
        batch: body.batch,
        password: body.password,
    });

    newUser
        .save()
        .then((user) => {
            res.status(200).json(user);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}

function getRoot(res) {
    const body = req.body;
    User.find(function (err, users) {
        if (err) {
        } else {
            res.json(users);
        }
    });
}
