import {useCreateUserMutation, useGetUserQuery} from "../api/api.ts";
import {useState} from "react";
import {IUser} from "../type-global/user-types.ts";


const Login = () => {
    const {data} = useGetUserQuery([])
    const [createUser] = useCreateUserMutation()
    console.log(data)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const registration = async () => {
        const candidate = await data?.filter((user: IUser) => user.email === email)
        if (candidate[0]){
            console.log('Такой пользователь уже существует')
            console.log(candidate)
        } else {
            const newUser: IUser = {
                name: `new-user-${Math.floor(Math.random() * 123)}`,
                email,
                password,
                tours: []
            }
            await createUser(newUser).then(() => localStorage.setItem('token-user', email))
        }
    }

    return (
        <div>
            <input className='border border-amber-200 rounded-md ml-8 px-3 py-1 outline-0' value={email} onChange={e => setEmail(e.target.value)} type="text"/>
            <input className='border border-amber-200 rounded-md ml-8 px-3 py-1 outline-0' value={password} onChange={e => setPassword(e.target.value)} type="text"/>
            <button onClick={registration} >Регистрация</button>
        </div>
    );
};

export default Login;