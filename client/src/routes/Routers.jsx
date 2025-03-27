import { Routes, Route } from "react-router";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Main from "../layouts/Main";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/room/:id" element={<RoomDetails />}></Route>
            </Route>
            <Route path="/dashboard" element={<Dashboard/>}>
               
            </Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>

            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
    );
};

export default Routers;