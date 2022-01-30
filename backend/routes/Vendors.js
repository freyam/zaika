var express = require("express");
var rtr = express.Router();

const Vendors = require("../models/Vendors");

router.get("/", function (req, res) {
    getRoot(res);
});

router.post("/register", (req, res) => {
    registerUser(req, res);
});

router.post("/login", (req, res) => {
    loginVendor(req, res);
});

router.post("/profile", (req, res) => {
    showProfile(req, res);
});

router.post("/update", (req, res) => {
    updateVendor(req, res);
});

// router.post("/getName", (req, res) => {
//     getVendorName(req, res);
// });

module.exports = rtr;

function getVendorName(req, res) {
    const body = req.body;
    const email = body.email;

    Vendors.findOne({ email }).then((Vendors) => {
        if (!Vendors) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            res.status(200).json(Vendors);
        }
    });
}

function updateVendor(req, res) {
    const body = req.body;
    const email = body.email;

    Vendors.updateMany(
        { email: email },
        {
            $set: {
                m_name: body.m_name,
                s_name: body.s_name,
                c_no: body.c_no,
                o_time: body.o_time,
                c_time: body.c_time,
                password: body.password,
            },
        }
    ).then((Vendors) => {
        if (!Vendors) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            res.status(200).json(Vendors);
        }
    });
}

function showProfile(req, res) {
    const body = req.body;
    const email = body.email;

    Vendors.findOne({ email }).then((Vendors) => {
        if (!Vendors) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            res.status(200).json(Vendors);
        }
    });
}

function loginVendor(req, res) {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    Vendors.findOne({ email }).then((Vendors) => {
        if (!Vendors) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            if (password == Vendors.password) {
                res.status(200).json(Vendors);
            } else {
                res.status(400).send("Incorrect Password");
            }
        }
    });
}

function registerUser(req, res) {
    const body = req.body;
    const newVendors = new Vendors({
        m_name: body.m_name,
        s_name: body.s_name,
        email: body.email,
        c_no: body.c_no,
        o_time: body.o_time,
        c_time: body.c_time,
        password: body.password,
    });

    newVendors
        .save()
        .then((Vendors) => {
            res.status(200).json(Vendors);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}

function getRoot(res) {
    const body = req.body;
    Vendors.find(function (err, vendors) {
        if (err) {
        } else {
            res.json(vendors);
        }
    });
}
