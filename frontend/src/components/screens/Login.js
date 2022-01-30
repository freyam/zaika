import { currentUserDetails } from "../../App";
import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function Login() {
    const [options, setOptions] = useState("-1");

    function onChangeOptions(event) {
        setOptions(event.target.value);
    }

    function LoginOptions() {
        if (options == "0") {
            return <LoginBuyer />;
        } else if (options == "1") {
            return <LoginVendor />;
        } else return <div></div>;
    }

    return (
        <Grid container align={"center"} fullWidth>
            <TextField
                sx={{ m: 1, minWidth: 300 }}
                label="Who are you?"
                onChange={onChangeOptions}
                select
            >
                <MenuItem value={"0"} fullWidth>
                    I am a Buyer
                </MenuItem>
                <MenuItem value={"1"} fullWidth>
                    I am a Vendor
                </MenuItem>
                {/* {flag &&} */}
            </TextField>
            {/* {} */}
            <LoginOptions />
            {}
        </Grid>
    );
}

function LoginBuyer() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }

    function onSubmit(event) {
        const currentBuyer = {
            email: email,
            password: password,
        };

        event.preventDefault(); // prevent default form submission

        const uri = "http://localhost:4000/user/login";
        axios
            .post(uri, currentBuyer)
            .then((response) => {
                currentUserDetails.data = response.data;
                currentUserDetails.email = response.data.email;
                currentUserDetails.name = response.data.name;
                currentUserDetails.type = "User";
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("type", "Buyer");
                alert(
                    "Welcome to Zaika! We are happy to have you here," +
                        response.data.name +
                        "!"
                );
            })
            .catch(() => {
                alert("Try Again");
            });
    }

    return (
        <Grid container align={"center"} spacing={5}>
            <Grid item>
                <TextField
                    required
                    label="Email"
                    value={email}
                    onChange={onChangeEmail}
                />
            </Grid>

            <Grid item>
                <TextField
                    required
                    label="Password"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>

            <Grid item>
                <Button onClick={onSubmit}>Login as a Buyer</Button>
            </Grid>
        </Grid>
    );
}

function LoginVendor() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }

    function onSubmit(event) {
        const currentVendor = {
            email: email,
            password: password,
        };

        event.preventDefault();

        const uri = "http://localhost:4000/vendor/login";
        axios
            .post(uri, currentVendor)
            .then((response) => {
                localStorage.setItem("email", response.data.email);
                localStorage.setItem("type", "Vendor");
                alert(
                    "Welcome to Zaika! We are happy to have you here, " +
                        response.data.s_name +
                        "!"
                );
            })
            .catch(() => {
                alert("Try Again");
            });
    }

    return (
        <Grid container align={"center"} spacing={5}>
            <Grid item>
                <TextField
                    required
                    label="Email"
                    value={email}
                    onChange={onChangeEmail}
                />
            </Grid>

            <Grid item>
                <TextField
                    required
                    label="Password"
                    value={password}
                    onChange={onChangePassword}
                />
            </Grid>

            <Grid item>
                <Button onClick={onSubmit}>Login as a Vendor</Button>
            </Grid>
        </Grid>
    );
}
