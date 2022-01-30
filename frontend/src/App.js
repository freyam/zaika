import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import DashBoard from "./components/screens/Dashboard";
import Home from "./components/screens/Home";
import Login from "./components/screens/Login";
import Orders from "./components/screens/Orders";
import Profile from "./components/screens/Profile";
import Register from "./components/screens/Register";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import { useNavigate } from "react-router-dom";

function Navbar() {
    const navigate = useNavigate();

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h5"
                        component="div"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        Zaika
                    </Typography>
                    <Box sx={{ flexGrow: 1 }} />

                    <Button
                        color="inherit"
                        onClick={() => navigate("/dashboard")}
                    >
                        Dashboard
                    </Button>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/profile")}
                    >
                        My Account
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/orders")}>
                        My Orders
                    </Button>

                    <Button
                        color="inherit"
                        onClick={() => navigate("/register")}
                    >
                        Register
                    </Button>
                    <Button color="inherit" onClick={() => navigate("/login")}>
                        Login
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

const Layout = () => {
    return (
        <div>
            <Navbar />
            <div className="container">
                <Outlet />
            </div>
        </div>
    );
};

export const currentUserDetails = {
    name: "",
    type: "",
    email: "",
    data: {},
};

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="dashboard" element={<DashBoard />} />
                    <Route path="orders" element={<Orders />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="register" element={<Register />} />
                    <Route path="login" element={<Login />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}
