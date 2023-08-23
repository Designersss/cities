import {Link} from "react-router-dom";
import {useGetUser} from "../hooks/useGetUser.ts";


const Header = () => {
    const {user} = useGetUser()
    console.log(user)
    return (
        <div>
            <Link to='/login'>Регистрация</Link>
        </div>
    );
};

export default Header;