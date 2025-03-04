import { BrowserRouter, Routes, Route } from "react-router";
import App from "../App";
import ErrorPage from "../pages/ErrorPage/ErrorPage";
import Home from "../pages/Home/Home";
import Main from "../layouts/Main";
import RoomDetails from "../pages/RoomDetails/RoomDetails";

const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Main />}>
                <Route path="/" element={<Home />}></Route>
                <Route path="/room/:id" element={<RoomDetails />}></Route>
            </Route>

            <Route path="*" element={<ErrorPage></ErrorPage>}></Route>
        </Routes>
    );
};

export default Routers;