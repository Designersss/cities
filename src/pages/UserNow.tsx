import {useGetUser} from "../hooks/useGetUser.ts";
import {Link} from "react-router-dom";


const UserNow = () => {
    const {user} = useGetUser()
    console.log(user)
    return (
        <div>
            {
                user
                    ?
                    <span className='px-2 text-xl py-1 bg-[#383838] rounded-md'>Имя: {user.name}</span>
                    :
                    <span>Not found</span>
            }
            <div className='px-2 py-1 bg-[#383838] rounded-md mt-4 w-96'>
                <p className='text-xl'>Купленные туры</p>
                <div className='grid grid-rows-1 py-2'>
                    {
                        user?.bought?.length
                        ?
                            user?.bought.map(item => <Link className='bg-[#444444] mt-5 rounded-md px-3 py-1 w-72' to={`/cities/${item.id}`} key={item.id}>{item.city}</Link>)
                            :
                            <div>Ничего не найдено</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default UserNow;