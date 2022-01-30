var express = require("express");
var rtr = express.Router();

const FoodItems = require("../models/FoodItems");
const Wallet = require("../models/Wallet");
const Orders = require("../models/Orders");

router.get("/", function (req, res) {
    const body = req.body;
    getRoot(res);
});

router.post("/register", (req, res) => {
    newItem(req, res);
});

router.post("/search", (req, res) => {
    searchFood(req, res);
});

router.post("/PriceFilter", (req, res) => {
    priceFilter(req, res);
});

router.post("/ShopFilter", (req, res) => {
    shopFilter(req, res);
});

router.post("/TypeFilter", (req, res) => {
    typeFilter(req, res);
});

router.post("/VendorsFilter", (req, res) => {
    vendorFilter(req, res);
});

router.post("/TagsFilter", (req, res) => {
    tegFilter(req, res);
});

router.get("/sortFilters0", (req, res) => {
    FoodItems.aggregate([{ $sort: { price: 1 } }], function (err, fooditems) {
        if (!err) {
            res.json(fooditems);
        }
    });
});

router.get("/sortFilters1", (req, res) => {
    FoodItems.aggregate([{ $sort: { price: -1 } }], function (err, fooditems) {
        if (!err) {
            res.json(fooditems);
        }
    });
});

router.get("/sortFilters2", (req, res) => {
    FoodItems.aggregate([{ $sort: { rating: 1 } }], function (err, fooditems) {
        if (!err) {
            res.json(fooditems);
        }
    });
});

router.get("/sortFilters3", (req, res) => {
    FoodItems.aggregate([{ $sort: { rating: -1 } }], function (err, fooditems) {
        if (!err) {
            res.json(fooditems);
        }
    });
});

router.post("/handleBuy", (req, res) => {
    handleBuy(req, res);
});

router.post("/handleWallet", (req, res) => {
    wallethandle(req, res);
});

router.post("/getWallet", (req, res) => {
    getWallet(req, res);
});

router.post("/handleBuyWallet", (req, res) => {
    handleWalletMinus(req, res);
});

router.post("/orders", function (req, res) {
    const body = req.body;
    orders(req, res);
});

module.exports = rtr;

function orders(req, res) {
    const body = req.body;
    Orders.find({ user_name: body.email }).then((orders) => {
        if (!orders) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            res.status(200).json(orders);
        }
    });
}

function handleWalletMinus(req, res) {
    const body = req.body;
    Wallet.findOne({ name: body.user_name }, function (err, wallet) {
        if (!wallet) {
            res.status(400).send(err);
            return;
        } else {
            var OGAMOUNT = parseInt(
                parseInt(wallet.amount) - parseInt(body.total_price)
            );
            if (OGAMOUNT < 0) {
                res.status(400).send("Insufficient Balance");
                return;
            }

            Wallet.updateMany(
                { name: body.user_name },
                {
                    $set: {
                        name: body.user_name,
                        amount: parseInt(parseInt(OGAMOUNT)),
                    },
                }
            ).then((usersa) => {
                if (!usersa) {
                    res.status(400).send("Email doesn't Exist!");
                    return;
                } else {
                    res.status(200).json({
                        name: body.user_name,
                        amount: parseInt(OGAMOUNT),
                    });
                    return;
                }
            });
        }
    });
}

function getWallet(req, res) {
    const body = req.body;
    Wallet.findOne({ name: body.user_name }).then((users) => {
        if (!users) {
            res.status(400).send("Email doesn't Exist!");
        } else {
            res.status(200).json(users);
        }
    });
}

function wallethandle(req, res) {
    const body = req.body;
    const newItem = new Wallet({
        name: body.user_name,
        amount: body.amount,
    });

    var OGAMOUNT = 0;

    Wallet.findOne({ name: body.user_name }).then((users) => {
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
            OGAMOUNT = users.amount;

            Wallet.updateMany(
                { name: body.user_name },
                {
                    $set: {
                        name: body.user_name,
                        amount: parseInt(
                            parseInt(OGAMOUNT) + parseInt(body.amount)
                        ),
                    },
                }
            ).then((usersa) => {
                if (!usersa) {
                    res.status(400).send("Email doesn't Exist!");
                } else {
                    res.status(200).json({
                        name: body.user_name,
                        amount: parseInt(
                            parseInt(OGAMOUNT) + parseInt(body.amount)
                        ),
                    });
                }
            });
        }
    });
}

function handleBuy(req, res) {
    const body = req.body;
    const newItem = new Orders({
        user_name: body.user_name,
        food_name: body.food_name,
        status: body.status,
        quantity: body.quantity,
        add_ons: body.add_ons,
        total_price: body.total_price,
        vendor: body.vendor,
        time: body.time,
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
}

function tegFilter(req, res) {
    const body = req.body;
    var tagsl = body.tags;

    FoodItems.find({ tags: { $in: tagsl } }, function (err, fooditems) {
        if (!err) {
            res.json(fooditems);
        }
    });
}

function vendorFilter(req, res) {
    const body = req.body;
    const vendors = body.vendors;
    FoodItems.find({ vendor: { $in: vendors } }, function (err, fooditems) {
        if (!err) {
            res.json(fooditems);
        }
    });
}

function typeFilter(req, res) {
    const body = req.body;
    const type = body.type;
    FoodItems.find({ type }, function (err, fooditems) {
        if (!err) {
            res.json(fooditems);
        }
    });
}

function shopFilter(req, res) {
    const body = req.body;
    const name = body.shopName;
    FoodItems.find(
        { s_name: { $regex: name, $options: "i" } },
        function (err, fooditems) {
            if (err) {
            } else {
                res.json(fooditems);
            }
        }
    );
}

function priceFilter(req, res) {
    const body = req.body;
    const minPrice = body.minPrice;
    const maxPrice = body.maxPrice;
    FoodItems.find(
        { price: { $gt: minPrice, $lt: maxPrice } },
        function (err, fooditems) {
            if (err) {
            } else {
                res.json(fooditems);
            }
        }
    );
}

function searchFood(req, res) {
    const body = req.body;
    const name = body.searchText;

    FoodItems.find(
        { name: { $regex: name, $options: "i" } },
        function (err, fooditems) {
            if (err) {
            } else {
                res.json(fooditems);
            }
        }
    );
}

function newItem(req, res) {
    const body = req.body;
    const newItem = new FoodItems({
        name: body.name,
        price: body.price,
        rating: body.rating,
        type: body.type,
        add_ons: body.add_ons,
        tags: body.tags,
        vendor: body.vendor,
        addOnsPrice: body.addOnsPrice,
    });

    newItem
        .save()
        .then((fooditem) => {
            res.status(200).json(fooditem);
        })
        .catch((err) => {
            res.status(400).send(err);
        });
}

function getRoot(res) {
    const body = req.body;
    FoodItems.find(function (err, users) {
        if (err) {
        } else {
            res.json(users);
        }
    });
}
