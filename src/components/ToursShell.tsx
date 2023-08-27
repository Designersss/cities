import {ICities, ITours} from "../type-global/user-types.ts";
import {FC} from "react";
import * as React from "react";
import {useGetUser} from "../hooks/useGetUser.ts";
import {Link} from "react-router-dom";

interface ToursProps {
    tour: ITours
    setClickTour: React.ComponentState,
    idCities: ICities
}

const ToursShell: FC<ToursProps> = ({tour, setClickTour, idCities}) => {
    const {user} = useGetUser()
    const newToursId = user?.bought.find(el => el.id === idCities.id)
    const newToursSubs = newToursId?.tours.find(el => el.id === tour.id)
    console.log(newToursSubs?.subscribe)
    const byTour = () => {
        setClickTour(tour)
    }
    return (
        <div className='bg-[#303030] rounded-md mt-5 w-72 px-3 py-2'>
            <div className='flex justify-between'>
                <p>{tour.name}</p>
                {
                    newToursSubs?.subscribe
                        ?
                        <></>
                        :
                        <span>{tour.price}₽</span>
                }
            </div>

            {
                user?.bought
                    ?
                    newToursSubs?.subscribe
                        ?
                        <Link to={`tour/${tour.id}`} className='flex w-full mt-2 justify-center bg-[#424242] py-1 rounded-md'>Перейти к туру</Link>
                        :
                        <button className=' w-full mt-2 bg-[#424242] py-1 rounded-md' onClick={byTour}>Купить</button>
                    :
                    <>Not Found</>
            }
        </div>
    );
};

export default ToursShell;