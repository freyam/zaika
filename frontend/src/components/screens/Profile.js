import axios from "axios";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

export default function Profile() {
    const [age, setAge] = useState(0);
    const [batch, setBatch] = useState("");
    const [c_time, setC_time] = useState("");
    const [cno, setCno] = useState("");
    const [details, setDetails] = useState([]);
    const [email, setEmail] = useState("");
    const [m_name, setM_name] = useState("");
    const [name, setName] = useState("");
    const [o_time, setO_time] = useState("");
    const [password, setPassword] = useState("");
    const [s_name, setS_name] = useState("");

    const readOnly = {
        readOnly: true,
    };

    useEffect(() => {
        const email_logg = localStorage.getItem("email");
        const type_logg = localStorage.getItem("type");

        const logged_in_details = {
            email: email_logg,
            type: type_logg,
        };

        if (type_logg === "Buyer") {
            POST_userprofile(
                logged_in_details,
                setDetails,
                setName,
                setEmail,
                setCno,
                setAge,
                setBatch,
                setPassword
            );
        } else if (type_logg === "Vendor") {
            POST_vendorprofile(
                logged_in_details,
                setDetails,
                setM_name,
                setS_name,
                setEmail,
                setCno,
                setO_time,
                setC_time,
                setPassword
            );
        }
    }, []);

    const onChangeUsername = (event) => {
        setName(getValue(event));
    };

    const onChangeEmail = (event) => {
        setEmail(getValue(event));
    };

    const onChangeCno = (event) => {
        setCno(getValue(event));
    };

    const onChangeAge = (event) => {
        setAge(getValue(event));
    };

    const onChangeBatch = (event) => {
        setBatch(getValue(event));
    };

    const onChangePassword = (event) => {
        setPassword(getValue(event));
    };

    const onChangeM_name = (event) => {
        setM_name(getValue(event));
    };

    const onChangeS_name = (event) => {
        setS_name(getValue(event));
    };

    const onChangeO_time = (event) => {
        setO_time(getValue(event));
    };

    const onChangeC_time = (event) => {
        setC_time(getValue(event));
    };

    const onSubmitBuyer = (event) => {
        const newUser = {
            name: name,
            email: email,
            cno: cno,
            age: age,
            batch: batch,
            password: password,
        };

        event.preventDefault();

        POST_newUser(newUser);
    };

    const onSubmitVendor = (event) => {
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

        POST_newvendord(newVendors);
    };

    const typeBuyer = localStorage.getItem("type") === "Buyer";
    return (
        <div>
            {typeBuyer ? (
                <Grid container align={"center"} spacing={5}>
                    <Grid item>
                        <TextField
                            required
                            value={email}
                            label="Email"
                            onChange={onChangeEmail}
                            InputProps={readOnly}
                            helperText="To change email, register as a new user"
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            required
                            value={name}
                            label="Name"
                            onChange={onChangeUsername}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            required
                            value={cno}
                            label="Contact Number"
                            onChange={onChangeCno}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            required
                            value={age}
                            label="Age"
                            onChange={onChangeAge}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            sx={{ m: 1, minWidth: 300 }}
                            label="Batch"
                            onChange={onChangeBatch}
                            autowidth="true"
                            value={batch}
                            select
                        >
                            <MenuItem value={"UG_5"}>UG_5</MenuItem>

                            <MenuItem value={"UG_4"}>UG_4</MenuItem>

                            <MenuItem value={"UG_3"}>UG_3</MenuItem>

                            <MenuItem value={"UG_2"}>UG_2</MenuItem>

                            <MenuItem value={"UG_1"}>UG_1</MenuItem>
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

                    <Button variant="text" onClick={onSubmitBuyer}>
                        Update Details
                    </Button>
                </Grid>
            ) : (
                <Grid container align={"center"} spacing={5}>
                    <Grid item>
                        <TextField
                            disabled
                            value={email}
                            label="Email"
                            onChange={onChangeEmail}
                            InputProps={readOnly}
                            helperText="Email cannot be changed. Register as a new user."
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            required
                            value={m_name}
                            label="Merchant Name"
                            onChange={onChangeM_name}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            required
                            value={s_name}
                            label="Shop Name"
                            onChange={onChangeS_name}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            required
                            value={cno}
                            label="Contact Number"
                            onChange={onChangeCno}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            required
                            value={o_time}
                            label="Opening Timings"
                            onChange={onChangeO_time}
                        />
                    </Grid>

                    <Grid item>
                        <TextField
                            required
                            value={c_time}
                            label="Closing Timings"
                            onChange={onChangeC_time}
                        />
                    </Grid>
                    <Grid item>
                        <TextField
                            required
                            value={password}
                            label="Password"
                            onChange={onChangePassword}
                        />
                    </Grid>
                    <Grid item>
                        <Button variant="text" onClick={onSubmitVendor}>
                            Update Details
                        </Button>
                    </Grid>
                    <Grid item></Grid>
                </Grid>
            )}
        </div>
    );
}

function POST_newUser(newUser) {
    axios
        .post("http://localhost:4000/user/update", newUser)
        .then(() => {
            alert("Updated!");
        })
        .catch(() => {
            alert("Try Again\n");
        });
}

function POST_newvendord(newVendors) {
    axios
        .post("http://localhost:4000/vendor/update", newVendors)
        .then(() => {
            alert("Updated!");
        })
        .catch(() => {
            alert("Try Again\n");
        });
}

function getValue(event) {
    return event.target.value;
}

function POST_vendorprofile(
    logged_in_details,
    setDetails,
    setM_name,
    setS_name,
    setEmail,
    setCno,
    setO_time,
    setC_time,
    setPassword
) {
    axios
        .post("http://localhost:4000/vendor/profile", logged_in_details) // unimplemented
        .then((response) => {
            let data_obj = response.data;
            setC_time(data_obj.c_time);
            setCno(data_obj.cno);
            setDetails(data_obj);
            setEmail(data_obj.email);
            setM_name(data_obj.m_name);
            setO_time(data_obj.o_time);
            setPassword(data_obj.password);
            setS_name(data_obj.s_name);
        });
}

function POST_userprofile(
    logged_in_details,
    setDetails,
    setName,
    setEmail,
    setCno,
    setAge,
    setBatch,
    setPassword
) {
    axios
        .post("http://localhost:4000/user/profile", logged_in_details) // unimplemented
        .then((response) => {
            let data_obj = response.data;
            setAge(data_obj.age);
            setBatch(data_obj.batch);
            setCno(data_obj.cno);
            setDetails(data_obj);
            setEmail(data_obj.email);
            setName(data_obj.name);
            setPassword(data_obj.password);
        });
}
