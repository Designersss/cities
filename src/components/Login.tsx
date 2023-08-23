import {useGetUserQuery} from "../api/api.ts";


const Login = () => {
    const {data} = useGetUserQuery([])
    console.log(data)
    return (
        <div>

        </div>
    );
};

export default Login;