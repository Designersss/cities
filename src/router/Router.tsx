import {Route, Routes} from "react-router-dom";
import Home from "../pages/Home.tsx";
import Login from "../pages/Login.tsx";
import CitiesPage from "../components/CitiesPage.tsx";


const Router = () => {
    return (
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login/>} />
            <Route path='/registration' element={<Login/>} />
            <Route path='/cities/:id' element={<CitiesPage/>} />
        </Routes>
    );
};

export default Router;