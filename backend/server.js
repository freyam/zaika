const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const PORT = 4000;
const DB_NAME = "tutorial";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/" + DB_NAME, {
    useNewUrlParser: true,
});
mongoose.connection.once("open", function () {
    console.log("MongoDB database connection established successfully !");
});

var UserRouter = require("./routes/Users");
app.use("/user", UserRouter);
var VendorRouter = require("./routes/Vendors");
app.use("/vendor", VendorRouter);
var FoodRouter = require("./routes/Food");
app.use("/fooditem", FoodRouter);

app.listen(PORT, function () {
    console.log("Server is running on Port: " + PORT);
});
