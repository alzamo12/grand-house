import { Routes, Route } from "react-router";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Main from "../layouts/Main";
import RoomDetails from "../pages/RoomDetails/RoomDetails";
import Login from "../pages/Login/Login";
import SignUp from "../pages/SignUp/SignUp";
import Dashboard from "../layouts/Dashboard";
import PrivateRoute from "./PrivateRoute";
import AddRoom from "../pages/Dashboard/Host/AddRoom";
import Statistics from "../pages/Dashboard/Common/Statistics";
import MyListings from "../pages/Dashboard/Host/MyListings";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/room/:id" element={<PrivateRoute><RoomDetails /></PrivateRoute>}></Route>
            </Route>
            <Route path="/dashboard" element={<PrivateRoute><Dashboard /></PrivateRoute>}>
                <Route index={true} element={<Statistics />}></Route>
                <Route path="add-room" element={<AddRoom />} />
                <Route path="my-listings" element={<MyListings />} />
            </Route>

            <Route path="/login" element={<Login />}></Route>
            <Route path="/signUp" element={<SignUp />}></Route>

            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
    );
};

export default Routers;