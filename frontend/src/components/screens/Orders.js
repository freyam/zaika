import { useState, useEffect } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";

function Orders() {
    function OrdersOpt() {
        if (localStorage.getItem("type") === "Buyer") {
            return <OrderUser />;
        } else if (localStorage.getItem("type") === "Vendor") {
            return null;
        } else return <div></div>;
    }

    return <OrdersOpt />;
}

export default function OrderUser() {
    const [orders, setorders] = useState([]);

    useEffect(() => {
        getOrders(setorders);
    }, []);

    return (
        <div>
            <Grid item xs={10} md={10} lg={10}>
                <Paper>
                    <Grid></Grid>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Number</TableCell>
                                {/* <TableCell>Time</TableCell> */}
                                <TableCell>Time of Order</TableCell>
                                <TableCell>Name of Vendor</TableCell>
                                <TableCell></TableCell>
                                <TableCell>Food</TableCell>
                                <TableCell>Quantity</TableCell>
                                {/* <TableCell></TableCell> */}
                                <TableCell>Cost</TableCell>
                                <TableCell>Rating</TableCell>
                                {/* <TableCell></TableCell> */}
                            </TableRow>
                        </TableHead>
                        <TableBody>{showOrder(orders)}</TableBody>
                    </Table>
                </Paper>
            </Grid>
        </div>
    );
}

function showOrder(orders) {
    return orders ? orders.map((order, idx) => allOrders(idx, order)) : null;
}

function allOrders(idx, order) {
    return (
        <TableRow key={idx}>
            <TableCell>{idx + 1}</TableCell>
            <TableCell>{order.time}</TableCell>
            {/* <TableCell></TableCell> */}
            <TableCell>{order.vendor}</TableCell>
            <TableCell></TableCell>
            <TableCell>{order.food_name}</TableCell>
            <TableCell>{order.quantity}</TableCell>
            {/* <TableCell></TableCell> */}
            <TableCell>{order.total_price}</TableCell>
            <TableCell>{order.rating}</TableCell>
            {/* <TableCell></TableCell> */}
        </TableRow>
    );
}

function getOrders(setorders) {
    const uri = "http://localhost:4000/fooditem/orders";
    axios
        .post(uri, {
            email: localStorage.getItem("email"),
        })
        .then((response) => {
            setorders(response.data);
        });
}
