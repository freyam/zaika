var express = require("express");
var router = express.Router();

const Vendors = require("../models/Vendors");

router.get("/", function (req, res) {
    Vendors.find(function (err, vendors) {
        if (err) {
        } else {
            res.json(vendors);
        }
    });
});

router.post("/register", (req, res) => {
    const newVendors = new Vendors({
        m_name: req.body.m_name,
        s_name: req.body.s_name,
        email: req.body.email,
        c_no: req.body.c_no,
        o_time: req.body.o_time,
        c_time: req.body.c_time,
        password: req.body.password,
    });

    newVendors
        .save()
        .then((Vendors) => {
            res.status(200).json(Vendors);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    Vendors.findOne({ email }).then((Vendors) => {
        if (!Vendors) {
            res.status(400).send("Email not found");
        } else {
            if (password == Vendors.password) {
                res.status(200).json(Vendors);
            } else {
                res.status(400).send(
                    "Password is incorrect. Please check again."
                );
            }
        }
    });
});

router.post("/profile", (req, res) => {
    const email = req.body.email;

    Vendors.findOne({ email }).then((Vendors) => {
        if (!Vendors) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(Vendors);
        }
    });
});

router.post("/update", (req, res) => {
    const email = req.body.email;

    Vendors.updateMany(
        { email: email },
        {
            $set: {
                m_name: req.body.m_name,
                s_name: req.body.s_name,
                c_no: req.body.c_no,
                o_time: req.body.o_time,
                c_time: req.body.c_time,
                password: req.body.password,
            },
        }
    ).then((Vendors) => {
        if (!Vendors) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(Vendors);
        }
    });
});

router.post("/getName", (req, res) => {
    const email = req.body.email;

    Vendors.findOne({ email }).then((Vendors) => {
        if (!Vendors) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(Vendors);
        }
    });
});

module.exports = router;
