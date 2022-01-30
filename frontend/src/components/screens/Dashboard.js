import { Checkbox } from "@mui/material";
import { FormControl } from "@mui/material";
import { MenuItem } from "@mui/material";
import { OutlinedInput } from "@mui/material";
import { Select } from "@mui/material";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import InputLabel from "@mui/material/InputLabel";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Paper from "@mui/material/Paper";
import SearchIcon from "@mui/icons-material/Search";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TextField from "@mui/material/TextField";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";

export default function Dasboard() {
    return DisplayRelevantDashboard();

    function DisplayRelevantDashboard() {
        function DisplayDashboard() {
            if (localStorage.getItem("type") === "Buyer") {
                return <DashBoardUser />;
            } else if (localStorage.getItem("type") === "Vendor") {
                return null;
            } else return <div></div>;
        }

        return <DisplayDashboard />;
    }
}

function DashBoardUser() {
    const [addOnsIDX, addOnesIDX] = useState(0);
    const [addOnesQ, setaddOnesQ] = useState([]);
    const [FI, setFI] = useState([]);
    const [mainFI, setMainFI] = useState([]);
    const [mxPrice, setmxPrice] = useState(0);
    const [mnPrice, setmnPrice] = useState(0);
    const [orderQ, setOrderQ] = useState(1);
    const [searchText, setSearchText] = useState("");
    const [sortAD, setSortAD] = useState("0");
    const [sortedFI, setSortedFI] = useState([]);
    const [sortName, setSortName] = useState(true);
    const [TagsSelection, setTagsSelection] = useState([]);
    const [Type, setType] = useState("");
    const [vendorsSelection, setVendorsSelection] = useState([]);
    const [wallet, setWallet] = useState(0);
    const [walletAdd, setWalletAdd] = useState(0);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        POST_getWallet(setWallet);
        POST_FI(setMainFI, addOnesIDX, setFI, setSortedFI, setSearchText);
    }, []);

    function onChangeSearchText(event) {
        setSearchText(getValue(event));
    }

    function onChangeWalletAdd(event) {
        setWalletAdd(getValue(event));
    }
    function onChangeaddOnesQ(event) {
        setaddOnesQ(getValue(event));
    }

    function onChangeOrderQ(event) {
        setOrderQ(getValue(event));
    }

    function onChangeTagsSelection(event) {
        setTagsSelection(getValue(event));
    }

    function onChangemnPrice(event) {
        setmnPrice(getValue(event));
    }

    function onChangemxPrice(event) {
        setmxPrice(getValue(event));
    }

    function onChangeType(event) {
        setType(getValue(event));
    }

    const onChangeVendorsSelection = (event) => {
        var value = getValue(event);
        if (typeof value === "string") {
            setVendorsSelection(value.split(","));
        } else {
            setVendorsSelection(value);
        }
    };

    const onChangeSortAD = (event) => {
        setSortAD(getValue(event));
    };

    function sortChange() {
        const flag = sortName;
        let FITemp = FI;
        FITemp.sort((a, b) => {
            if (a.date == undefined || b.date == undefined) return 1;
            else return (1 - flag * 2) * (new Date(a.date) - new Date(b.date));
        });
        setFI(FITemp);
        setSortName(1 - sortName);
    }

    function searchItem() {
        searchPOST(searchText, setFI, setSortedFI, setSearchText);
    }

    function applyPriceFilter() {
        priceFilter(mnPrice, mxPrice, setFI, setSortedFI);
    }

    function applyTypeFilter() {
        typeFilter(Type, setFI, setSortedFI);
    }

    function applyVendorsFilter() {
        vendorFilter(vendorsSelection, setFI, setSortedFI);
    }

    function applyTagsFilter() {
        tagsFilter(TagsSelection, setFI, setSortedFI);
    }

    function applySortADFilter() {
        sortADFilter(sortAD, setFI, setSortedFI);
    }

    function handleClickOpen() {
        setOpen(true);
    }

    function handleClose() {
        setOpen(false);
    }

    function handleBuy() {
        var today = new Date();
        var h = today.getHours().toFixed(0);
        var m = today.getMinutes().toFixed(0);
        var time_hm = h + ":" + m;
        var addonsp = 0;

        for (var i in addOnesQ) {
            const noidea =
                mainFI[addOnsIDX].addOnsPrice[
                    mainFI[addOnsIDX].add_ons.indexOf(addOnesQ[i])
                ];
            addonsp += parseInt(noidea);
        }
        const again_noidea =
            parseInt(parseInt(mainFI[addOnsIDX].price) + parseInt(addonsp)) *
            parseInt(orderQ);
        if (parseInt(wallet) >= parseInt(again_noidea)) {
            const uri = "http://localhost:4000/fooditem/handleBuy";
            const total_priceee = parseInt(
                parseInt(
                    parseInt(mainFI[addOnsIDX].price) + parseInt(addonsp)
                ) * parseInt(orderQ)
            );
            axios
                .post(uri, {
                    user_name: localStorage.getItem("email"),
                    food_name: mainFI[addOnsIDX].name,
                    status: "placed",
                    quantity: orderQ,
                    add_ons: addOnesQ,
                    total_price: total_priceee,
                    vendor: mainFI[addOnsIDX].vendor,
                    time: time_hm,
                    rating: mainFI[addOnsIDX].rating,
                })
                .then(() => {
                    const uri =
                        "http://localhost:4000/fooditem/handleBuyWallet";
                    axios
                        .post(uri, {
                            user_name: localStorage.getItem("email"),
                            total_price: parseInt(
                                parseInt(
                                    parseInt(mainFI[addOnsIDX].price) +
                                        parseInt(addonsp)
                                ) * parseInt(orderQ)
                            ),
                        })
                        .then((response) => {
                            alert("Order Placed and Wallet Updated");
                            setWallet(response.data.amount);
                        });
                });
        } else {
            alert("Add More Money to Buy");
        }
        handleClose();
    }

    function handleCheckboxClick(event, id) {
        addOnesIDX(id);
        handleClickOpen();
    }

    function addMoney() {
        axios
            .post("http://localhost:4000/fooditem/handleWallet", {
                user_name: localStorage.getItem("email"),
                amount: walletAdd,
            })
            .then((response) => {
                setWallet(response.data.amount);
                alert("Money Added!");
            });
    }

    const adorment = (
        <InputAdornment>
            <IconButton onClick={searchItem}>
                <SearchIcon />
            </IconButton>
        </InputAdornment>
    );
    const nonveg = "non-veg";
    const veg = "veg";
    return (
        <div>
            <Grid container spacing={5}>
                <Grid></Grid>
                <Grid item xs={5} md={5} lg={5}>
                    <List component="nav">
                        <Grid></Grid>
                        <ListItem text></ListItem>
                        <ListItem text>
                            <h2>Balance: {wallet} </h2>
                        </ListItem>
                    </List>
                </Grid>
            </Grid>
            <Grid> </Grid>
            <Grid item xs={5} md={5} lg={5}>
                <TextField
                    label="Add Money"
                    value={walletAdd}
                    onChange={onChangeWalletAdd}
                />
            </Grid>
            <Grid item>
                <Button onClick={addMoney}>Add Money</Button>
            </Grid>
            <Grid container>
                <Grid></Grid>
                <Grid>
                    <List component="nav">
                        <ListItem text></ListItem>
                        <TextField
                            label="Search"
                            InputProps={{
                                endAdornment: adorment,
                            }}
                            onChange={onChangeSearchText}
                        />
                        <ListItem text></ListItem>
                    </List>
                </Grid>
                <Grid> </Grid>
            </Grid>
            <Grid container>
                <Grid item md={3} lg={3}>
                    <List component="nav">
                        <Grid></Grid>
                        <ListItem>
                            <Grid container spacing={5}>
                                <Grid item>Cost</Grid>
                                <Grid item xs={6}>
                                    <Grid></Grid>
                                    <TextField
                                        label="Minimum"
                                        fullWidth={true}
                                        value={mnPrice}
                                        onChange={onChangemnPrice}
                                    />
                                </Grid>
                                <Grid item xs={6}>
                                    <Grid></Grid>
                                    <TextField
                                        label="Maximum"
                                        fullWidth={true}
                                        value={mxPrice}
                                        onChange={onChangemxPrice}
                                    />
                                </Grid>
                                <Grid item>
                                    <Button onClick={applyPriceFilter}>
                                        Apply
                                    </Button>
                                    <Grid></Grid>
                                </Grid>
                                <Grid></Grid>
                            </Grid>
                        </ListItem>
                        <ListItem> </ListItem>
                        <Divider />
                        <ListItem divider>
                            <Grid item>
                                <TextField
                                    label="Select Type"
                                    value={Type}
                                    onChange={onChangeType}
                                    sx={{ margin: 1, width: 250 }}
                                    select
                                >
                                    <MenuItem value={nonveg}>NON-VEG</MenuItem>
                                    <MenuItem value={veg}>VEG</MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item>
                                <Button onClick={applyTypeFilter}>APPLY</Button>
                            </Grid>
                        </ListItem>

                        <ListItem divider>
                            <Grid item>
                                <FormControl sx={{ margin: 1, width: 200 }}>
                                    <InputLabel>Vendors</InputLabel>
                                    <Select
                                        multiple
                                        value={vendorsSelection}
                                        onChange={onChangeVendorsSelection}
                                        input={<OutlinedInput label="Name" />}
                                    >
                                        {mapFI(mainFI)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button onClick={applyVendorsFilter}>
                                    APPLY
                                </Button>
                            </Grid>
                        </ListItem>

                        <ListItem divider>
                            <Grid item>
                                <FormControl sx={{ margin: 1, width: 200 }}>
                                    <InputLabel>Tags</InputLabel>
                                    <Select
                                        multiple
                                        value={TagsSelection}
                                        onChange={onChangeTagsSelection}
                                        input={<OutlinedInput label="Name" />}
                                    >
                                        {mapFIAgain(mainFI)}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item>
                                <Button onClick={applyTagsFilter}>APPLY</Button>
                            </Grid>
                        </ListItem>
                        <ListItem divider>
                            <Grid item>
                                <TextField
                                    label="Sorting"
                                    value={sortAD}
                                    onChange={onChangeSortAD}
                                    sx={{ margin: 1, width: 250 }}
                                    select
                                >
                                    <MenuItem value={"0"} fullWidth>
                                        Price: LOW TO HIGH
                                    </MenuItem>
                                    <MenuItem value={"1"} fullWidth>
                                        Price: HIGH TO LOW
                                    </MenuItem>
                                    <MenuItem value={"2"} fullWidth>
                                        Rating: LOW TO HIGH
                                    </MenuItem>
                                    <MenuItem value={"3"} fullWidth>
                                        Rating: HIGH TO LOW
                                    </MenuItem>
                                </TextField>
                            </Grid>
                            <Grid item>
                                <Button onClick={applySortADFilter}>
                                    APPLY
                                </Button>
                            </Grid>
                        </ListItem>
                        <Divider />
                    </List>
                </Grid>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Placing your Order</DialogTitle>
                    <DialogContent>
                        <TextField
                            required
                            label="Quantity"
                            value={orderQ}
                            onChange={onChangeOrderQ}
                        />
                        <InputLabel>AddOns</InputLabel>
                        <Select
                            multiple
                            value={addOnesQ}
                            onChange={onChangeaddOnesQ}
                            input={<OutlinedInput />}
                        >
                            {showImportant(mainFI, addOnsIDX)}
                        </Select>
                    </DialogContent>
                    <Grid> </Grid>
                    <DialogActions>
                        <Button onClick={handleBuy}>Buy Item</Button>
                        <Grid></Grid>
                        <Button onClick={handleClose}>Cancel</Button>
                    </DialogActions>
                </Dialog>
                <Grid></Grid>
                <Grid item md={9} lg={9}>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>BUY?</TableCell>
                                    <TableCell>Number</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell>Type</TableCell>
                                    <TableCell>Rating</TableCell>
                                    <TableCell>Add ons</TableCell>
                                    <TableCell>Tags</TableCell>
                                    <TableCell>Vendor</TableCell>
                                    <TableCell>Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {showItems(FI, handleCheckboxClick)}
                            </TableBody>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>
        </div>
    );
}

function showItems(FI, handleCheckboxClick) {
    return FI.map((FoodItem, idx) =>
        allItems(idx, handleCheckboxClick, FoodItem)
    );
}

function allItems(idx, handleCheckboxClick, FoodItem) {
    return (
        <TableRow key={idx}>
            <TableCell>
                <Checkbox onClick={lol1(handleCheckboxClick, idx)} />
            </TableCell>
            <TableCell>{idx}</TableCell>
            <TableCell>{FoodItem.name}</TableCell>
            <TableCell>{FoodItem.type}</TableCell>
            <TableCell>{FoodItem.rating}</TableCell>
            <TableCell>{FoodItem.add_ons.toString()}</TableCell>
            <TableCell>{FoodItem.tags.toString()}</TableCell>
            <TableCell>{FoodItem.vendor}</TableCell>
            <TableCell>{FoodItem.price}</TableCell>
        </TableRow>
    );
}

function lol1(handleCheckboxClick, idx) {
    return (event) => handleCheckboxClick(event, idx);
}

function mapFIAgain(mainFI) {
    return mainFI.map((item) =>
        item.tags.map((tag) => (
            <MenuItem key={tag} value={tag}>
                {tag}{" "}
            </MenuItem>
        ))
    );
}

function mapFI(mainFI) {
    return mainFI.map((item) => (
        <MenuItem key={item.vendor} value={item.vendor}>
            {item.vendor}
        </MenuItem>
    ));
}

function showImportant(mainFI, addOnsIDX) {
    if (mainFI[addOnsIDX])
        return mainFI[addOnsIDX].add_ons.map((item, idx) => (
            <MenuItem key={idx} value={item}>
                {item}{" "}
            </MenuItem>
        ));
    else return null;
}

function sortADFilter(sortAD, setFI, setSortedFI) {
    if (sortAD == "0") {
        axios
            .get("http://localhost:4000/fooditem/SortADFilter0")
            .then((response) => {
                setFI(response.data);
                setSortedFI(response.data);
            });
    } else if (sortAD == "1") {
        axios
            .get("http://localhost:4000/fooditem/SortADFilter1")
            .then((response) => {
                setFI(response.data);
                setSortedFI(response.data);
            });
    } else if (sortAD == "2") {
        axios
            .get("http://localhost:4000/fooditem/SortADFilter2")
            .then((response) => {
                setFI(response.data);
                setSortedFI(response.data);
            });
    } else if (sortAD == "3") {
        axios
            .get("http://localhost:4000/fooditem/SortADFilter3")
            .then((response) => {
                setFI(response.data);
                setSortedFI(response.data);
            });
    }
}

function tagsFilter(TagsSelection, setFI, setSortedFI) {
    axios
        .post("http://localhost:4000/fooditem/TagsFilter", {
            tags: TagsSelection,
        })
        .then((response) => {
            setFI(response.data);
            setSortedFI(response.data);
        });
}

function vendorFilter(vendorsSelection, setFI, setSortedFI) {
    axios
        .post("http://localhost:4000/fooditem/VendorsFilter", {
            vendors: vendorsSelection,
        })
        .then((response) => {
            setFI(response.data);
            setSortedFI(response.data);
        });
}

function typeFilter(Type, setFI, setSortedFI) {
    axios
        .post("http://localhost:4000/fooditem/TypeFilter", { type: Type })
        .then((response) => {
            setFI(response.data);
            setSortedFI(response.data);
        });
}

function priceFilter(mnPrice, mxPrice, setFI, setSortedFI) {
    axios
        .post("http://localhost:4000/fooditem/PriceFilter", {
            mnPrice: mnPrice,
            mxPrice: mxPrice,
        })
        .then((response) => {
            setFI(response.data);
            setSortedFI(response.data);
        });
}

function searchPOST(searchText, setFI, setSortedFI, setSearchText) {
    axios
        .post("http://localhost:4000/fooditem/search", {
            searchText: searchText,
        })
        .then((response) => {
            setFI(response.data);
            setSortedFI(response.data);
            setSearchText("");
        });
}

function getValue(event) {
    return event.target.value;
}

function POST_getWallet(setWallet) {
    axios
        .post("http://localhost:4000/fooditem/getWallet", {
            user_name: localStorage.getItem("email"),
        })
        .then((response) => {
            setWallet(response.data.amount);
        });
}

function POST_FI(setMainFI, addOnesIDX, setFI, setSortedFI, setSearchText) {
    axios.get("http://localhost:4000/fooditem").then((response) => {
        setMainFI(response.data);
        addOnesIDX(0);
        setFI(response.data);
        setSortedFI(response.data);

        setSearchText("");
    });
}
