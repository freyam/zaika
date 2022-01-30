var express = require("express");
var router = express.Router();

// Load User model
const FoodItems = require("../models/FoodItems");
const Wallet = require("../models/Wallet");
const Orders = require("../models/Orders");

// GET request
// Getting all the users
router.get("/", function (req, res) {
    FoodItems.find(function (err, users) {
        if (err) {
        } else {
            res.json(users);
        }
    });
});

router.post("/register", (req, res) => {
    const newItem = new FoodItems({
        name: req.body.name,
        price: req.body.price,
        rating: req.body.rating,
        type: req.body.type,
        add_ons: req.body.add_ons,
        tags: req.body.tags,
        vendor: req.body.vendor,
        addOnsPrice: req.body.addOnsPrice,
    });

    newItem
        .save()
        .then((fooditem) => {
            res.status(200).json(fooditem);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.post("/search", (req, res) => {
    const name = req.body.searchText;

    FoodItems.find(
        { name: { $regex: name, $options: "i" } },
        function (err, fooditems) {
            if (err) {
            } else {
                res.json(fooditems);
            }
        }
    );
});

router.post("/PriceFilter", (req, res) => {
    const minPrice = req.body.minPrice;
    const maxPrice = req.body.maxPrice;
    FoodItems.find(
        { price: { $gt: minPrice, $lt: maxPrice } },
        function (err, fooditems) {
            if (err) {
            } else {
                res.json(fooditems);
            }
        }
    );
});

router.post("/ShopFilter", (req, res) => {
    const name = req.body.shopName;
    FoodItems.find(
        { s_name: { $regex: name, $options: "i" } },
        function (err, fooditems) {
            if (err) {
            } else {
                res.json(fooditems);
            }
        }
    );
});

router.post("/TypeFilter", (req, res) => {
    const type = req.body.type;
    FoodItems.find({ type }, function (err, fooditems) {
        if (err) {
        } else {
            res.json(fooditems);
        }
    });
});

router.post("/VendorsFilter", (req, res) => {
    const vendors = req.body.vendors;
    FoodItems.find({ vendor: { $in: vendors } }, function (err, fooditems) {
        if (err) {
        } else {
            res.json(fooditems);
        }
    });
});

router.post("/TagsFilter", (req, res) => {
    var tagsl = req.body.tags;
    // tagsl = ["maggi","4","jc"]
    FoodItems.find({ tags: { $in: tagsl } }, function (err, fooditems) {
        if (err) {
        } else {
            res.json(fooditems);
        }
    });
});

router.get("/SortADFilter0", (req, res) => {
    FoodItems.aggregate([{ $sort: { price: 1 } }], function (err, fooditems) {
        if (err) {
        } else {
            res.json(fooditems);
        }
    });
});

router.get("/SortADFilter1", (req, res) => {
    FoodItems.aggregate([{ $sort: { price: -1 } }], function (err, fooditems) {
        if (err) {
        } else {
            res.json(fooditems);
        }
    });
});

router.get("/SortADFilter2", (req, res) => {
    FoodItems.aggregate([{ $sort: { rating: 1 } }], function (err, fooditems) {
        if (err) {
        } else {
            res.json(fooditems);
        }
    });
});

router.get("/SortADFilter3", (req, res) => {
    FoodItems.aggregate([{ $sort: { rating: -1 } }], function (err, fooditems) {
        if (err) {
        } else {
            res.json(fooditems);
        }
    });
});

router.post("/handleBuy", (req, res) => {
    const newItem = new Orders({
        user_name: req.body.user_name,
        food_name: req.body.food_name,
        status: req.body.status,
        quantity: req.body.quantity,
        add_ons: req.body.add_ons,
        total_price: req.body.total_price,
        vendor: req.body.vendor,
        time: req.body.time,
        rating: 0,
    });

    newItem
        .save()
        .then((order) => {
            res.status(200).json(order);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
});

router.post("/handleWallet", (req, res) => {
    const newItem = new Wallet({
        name: req.body.user_name,
        amount: req.body.amount,
    });

    var org_amt = 0;

    Wallet.findOne({ name: req.body.user_name }).then((users) => {
        // Check if users email exists
        if (!users) {
            newItem
                .save()
                .then((fooditem) => {
                    res.status(200).json(fooditem);
                })
                .catch((err) => {
                    res.status(400).send(err);
                });
        } else {
            org_amt = users.amount;

            Wallet.updateMany(
                { name: req.body.user_name },
                {
                    $set: {
                        name: req.body.user_name,
                        amount: parseInt(
                            parseInt(org_amt) + parseInt(req.body.amount)
                        ),
                    },
                }
            ).then((usersa) => {
                // Check if users email exists
                if (!usersa) {
                    res.status(400).send("Email not found");
                } else {
                    res.status(200).json({
                        name: req.body.user_name,
                        amount: parseInt(
                            parseInt(org_amt) + parseInt(req.body.amount)
                        ),
                    });
                }
            });
        }
    });
});

router.post("/getWallet", (req, res) => {
    Wallet.findOne({ name: req.body.user_name }).then((users) => {
        // Check if users email exists
        if (!users) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(users);
        }
    });
});

router.post("/handleBuyWallet", (req, res) => {
    Wallet.findOne({ name: req.body.user_name }, function (err, wallet) {
        if (!wallet) {
            res.status(400).send(err);
            return;
        } else {
            var org_amt = parseInt(
                parseInt(wallet.amount) - parseInt(req.body.total_price)
            );
            if (org_amt < 0) {
                res.status(400).send("Insufficient Balance");
                return;
            }

            Wallet.updateMany(
                { name: req.body.user_name },
                {
                    $set: {
                        name: req.body.user_name,
                        amount: parseInt(parseInt(org_amt)),
                    },
                }
            ).then((usersa) => {
                // Check if users email exists
                if (!usersa) {
                    res.status(400).send("Email not found");
                    return;
                } else {
                    res.status(200).json({
                        name: req.body.user_name,
                        amount: parseInt(org_amt),
                    });
                    return;
                }
            });
        }
    });
});

router.post("/orders", function (req, res) {
    Orders.find({ user_name: req.body.email }).then((orders) => {
        if (!orders) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(orders);
        }
    });
});

router.post("/vendorDisplay", function (req, res) {
    FoodItems.find({ vendor: req.body.s_name }).then((orders) => {
        if (!orders) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(orders);
        }
    });
});

router.post("/update", function (req, res) {
    FoodItems.updateOne(
        { name: req.body.name },
        {
            $set: {
                price: req.body.price,
                rating: req.body.rating,
                type: req.body.type,
                add_ons: req.body.add_ons,
                tags: req.body.tags,
                vendor: req.body.vendor,
                addOnsPrice: req.body.addOnsPrice,
            },
        },
        function (err, fooditem) {
            if (err) {
            } else {
                res.status(200).json(fooditem);
            }
        }
    );
});

router.post("/delete", function (req, res) {
    FoodItems.deleteOne({ name: req.body.name }, function (err, fooditem) {
        if (err) {
        } else {
            res.status(200).json(fooditem);
        }
    });
});

router.post("/ordersvendor", function (req, res) {
    Orders.find({ vendor: req.body.s_name }).then((orders) => {
        if (!orders) {
            res.status(400).send("Email not found");
        } else {
            res.status(200).json(orders);
        }
    });
});

module.exports = router;
