import {useCreateUserMutation, useGetUserQuery} from "../api/api.ts";
import {useState} from "react";
import {IUser} from "../type-global/user-types.ts";
import {useActions} from "../hooks/useActions.ts";
import {Link, useLocation, useNavigate} from "react-router-dom";


const Login = () => {
    const {data} = useGetUserQuery([])
    const [createUser] = useCreateUserMutation()
    const {addUser} = useActions()
    const navigate = useNavigate()
    const location = useLocation()
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const initialUser: IUser = {
        name: `new-user-${Math.floor(Math.random() * 123)}`,
        email,
        password,
        bought: []
    }

    const registration = async () => {
        const candidate: IUser | undefined = data?.find((user: IUser) => user.email === email)
        if (candidate) {
            alert('Такой пользователь уже существует')
        } else {
            if (email === '' || password === '') {
                alert('Заполните поля')
            } else {
                await createUser(initialUser).then(() => localStorage.setItem('token-user', email)).then(() => navigate('/'))
            }
        }
    }

    const login = async () => {
        const candidate: IUser | undefined = data?.find((user: IUser) => user.email === email)
        if (candidate) {
            if (email === '' || password === ''){
                alert('Заполните поля')
            } else {
                if (candidate.password === password) {
                    addUser(candidate)
                    localStorage.setItem('token-user', email)
                    navigate('/')
                } else {
                    alert('Не правильный пароль')
                }
            }
        } else {
            alert('Пользователь не найден')
        }
    }

    return (
        <div>
            <input placeholder='Введите email' className='border border-amber-200 rounded-md ml-8 px-3 py-1 outline-0' value={email}
                   onChange={e => setEmail(e.target.value)} type="text"/>
            <input placeholder='Введите пароль' className='border border-amber-200 rounded-md ml-8 px-3 py-1 outline-0' value={password}
                   onChange={e => setPassword(e.target.value)} type="text"/>
            {
                location.pathname === '/login'
                    ?
                    <div>
                        <button onClick={login}>Вход</button>
                        <p>Нет аккаунта? <Link to='/registration'>Регистрация!</Link></p>
                    </div>
                    :
                    <div>
                        <button onClick={registration}>Регистрация</button>
                        <p>Есть аккаунт? <Link to='/login'>Вход!</Link></p>
                    </div>
            }
        </div>
    );
};

export default Login;