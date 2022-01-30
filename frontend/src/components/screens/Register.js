import { useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";

export default function Register() {
    const [options, setOptions] = useState("-1");

    function onChangeOptions(event) {
        setOptions(event.target.value);
    }

    function RegisterOptions() {
        if (options == "0") {
            return <RegisterBuyer />;
        } else if (options == "1") {
            return <RegisterVendor />;
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
            <RegisterOptions />
            {}
        </Grid>
    );
}

function RegisterBuyer() {
    const [age, setAge] = useState(0);
    const [batch, setYear] = useState("");
    const [cno, setCno] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");

    function onChangeUsername(event) {
        setName(getValue(event));
    }

    function onChangeEmail(event) {
        setEmail(getValue(event));
    }

    function onChangecno(event) {
        setCno(getValue(event));
    }

    function onChangeAge(event) {
        setAge(getValue(event));
    }

    function onChangeYear(event) {
        setYear(getValue(event));
    }

    function onChangePassword(event) {
        setPassword(getValue(event));
    }

    const onSubmit = (event) => {
        const newUser = {
            name: name,
            email: email,
            cno: cno,
            age: age,
            batch: batch,
            password: password,
        };
        alert(JSON.stringify(newUser, null, 2));

        event.preventDefault();

        const uri = "http://localhost:4000/user/register";
        axios
            .post(uri, newUser)
            .then((response) => {
                alert("Registered " + response.data.name + "!");
            })
            .catch(() => {
                alert("Try Again!");
            });
    };

    return (
        <Grid container align={"center"} spacing={5}>
            <Grid item>
                <TextField
                    required
                    label="Name"
                    value={name}
                    onChange={onChangeUsername}
                />
            </Grid>

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
                    label="Age"
                    value={age}
                    onChange={onChangeAge}
                />
            </Grid>

            <Grid item>
                <TextField
                    required
                    label="Contact No"
                    value={cno}
                    onChange={onChangecno}
                />
            </Grid>

            <Grid item>
                <TextField
                    sx={{ m: 1, minWidth: 400 }}
                    required
                    label="Year"
                    onChange={onChangeYear}
                    value={batch}
                    select
                >
                    <MenuItem value={"UG_5"} fullWidth>
                        UG_5
                    </MenuItem>

                    <MenuItem value={"UG_4"} fullWidth>
                        UG_4
                    </MenuItem>

                    <MenuItem value={"UG_3"} fullWidth>
                        UG_3
                    </MenuItem>

                    <MenuItem value={"UG_2"} fullWidth>
                        UG_2
                    </MenuItem>

                    <MenuItem value={"UG_1"} fullWidth>
                        UG_1
                    </MenuItem>
                </TextField>
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
                <Button variant="text" onClick={onSubmit}>
                    Register as a Buyer
                </Button>
            </Grid>
        </Grid>
    );

    function getValue(event) {
        return event.target.value;
    }
}

function RegisterVendor() {
    const [c_time, setC_time] = useState("");
    const [cno, setCno] = useState("");
    const [email, setEmail] = useState("");
    const [m_name, setM_name] = useState("");
    const [o_time, setO_time] = useState("");
    const [password, setPassword] = useState("");
    const [s_name, setS_name] = useState("");

    function onChangeM_name(event) {
        setM_name(event.target.value);
    }

    function onChangeS_name(event) {
        setS_name(event.target.value);
    }

    function onChangeEmail(event) {
        setEmail(event.target.value);
    }

    function onChangeContactNumber(event) {
        setCno(event.target.value);
    }

    function onChangeO_time(event) {
        setO_time(event.target.value);
    }

    function onChangeC_time(event) {
        setC_time(event.target.value);
    }

    function onChangePassword(event) {
        setPassword(event.target.value);
    }

    const onSubmit = (event) => {
        event.preventDefault();

        const newVendors = {
            m_name: m_name,
            s_name: s_name,
            email: email,
            cno: cno,
            o_time: o_time,
            c_time: c_time,
            password: password,
        };

        const uri = "http://localhost:4000/vendor/register";
        axios
            .post(uri, newVendors)
            .then((response) => {
                alert("Registered " + response.data.name + "!");
            })
            .catch((error) => {
                alert(error);
            });
    };

    return (
        <Grid container align={"center"} spacing={5}>
            <Grid item>
                <TextField
                    label="Shop Name"
                    value={s_name}
                    onChange={onChangeS_name}
                    required
                />
            </Grid>

            <Grid item>
                <TextField
                    label="Merchant Name"
                    value={m_name}
                    onChange={onChangeM_name}
                    required
                />
            </Grid>

            <Grid item>
                <TextField
                    label="Email"
                    value={email}
                    onChange={onChangeEmail}
                    required
                />
            </Grid>

            <Grid item>
                <TextField
                    label="Contact No"
                    value={cno}
                    onChange={onChangeContactNumber}
                    required
                />
            </Grid>

            <Grid item>
                <TextField
                    label="Opening Timing"
                    value={o_time}
                    onChange={onChangeO_time}
                    required
                />
            </Grid>

            <Grid item>
                <TextField
                    label="Closing Timing"
                    value={c_time}
                    onChange={onChangeC_time}
                    required
                />
            </Grid>
            <Grid item>
                <TextField
                    label="Password"
                    value={password}
                    onChange={onChangePassword}
                    required
                />
            </Grid>
            <Grid item>
                <Button variant="text" onClick={onSubmit}>
                    Register as a Vendor
                </Button>
            </Grid>
        </Grid>
    );
}
