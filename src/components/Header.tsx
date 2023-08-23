import {Link} from "react-router-dom";
import {useGetUser} from "../hooks/useGetUser.ts";
import {useActions} from "../hooks/useActions.ts";


const Header = () => {
    const {user} = useGetUser()
    const {addUser} = useActions()
    const logout = () => {
        addUser(null)
        localStorage.setItem('token-user', '')
    }
    console.log('render Header')
    return (
        <div className='flex justify-between'>
            <div>
                <Link to='/'>Начальная</Link>
            </div>
            <div>
                {
                    user
                        ? <div>
                            <span>{user.email}</span>
                            <button onClick={logout}>Выйти</button>
                        </div>
                        : <div>
                            <Link to='/login'>Вход</Link>
                            <Link to='/registration'>Регистрация</Link>
                        </div>
                }
            </div>
        </div>
    );
};

export default Header;