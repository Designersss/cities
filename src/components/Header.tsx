import {Link} from "react-router-dom";
import {useGetUser} from "../hooks/useGetUser.ts";
import {useActions} from "../hooks/useActions.ts";


const Header = () => {
    const {user} = useGetUser()
    const {addUser} = useActions()
    const logout = () => {
        addUser(null) // При клике на выйти, выходит из аккаунта
        localStorage.setItem('token-user', '')
    }
    console.log('render Header')
    return (
        <div className='flex justify-between mt-2'>
            <div className=''>
                <Link to='/'>ПокупкаТуров.Ру</Link>
            </div>
            <div>
                {
                    user
                        ? <div>
                            <Link to={`/user/${user.id}`} className='px-2 py-1 bg-[#383838] rounded-md mr-4'>Пользователь: {user.name}</Link>
                            <button className='px-2 py-1 bg-[#383838] rounded-md' onClick={logout}>Выйти</button>
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