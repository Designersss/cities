import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/registration' element={<Login/>} />
        </Routes>
    );
};

export default Router;