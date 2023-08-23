import Router from "./router/Router.tsx";
import {BrowserRouter} from "react-router-dom";
import Header from "./components/Header.tsx";
import {useEffect} from "react";
import {useGetUserQuery} from "./api/api.ts";
import {IUser} from "./type-global/user-types.ts";
import {useActions} from "./hooks/useActions.ts";

function App() {
    const {addUser} = useActions()
    const {data} = useGetUserQuery([])
    useEffect(() => {
        const user = data?.filter((user: IUser) => user.email === localStorage.getItem('token-user'))
        addUser(user)
    }, [data])
    return (
        <BrowserRouter>
            <Header/>
            <Router/>
        </BrowserRouter>
    )
}

export default App
