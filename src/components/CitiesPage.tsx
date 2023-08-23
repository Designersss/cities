import {useParams} from "react-router-dom";
import {useByToursMutation, useGetOneCitiesQuery} from "../api/api.ts";
import ToursShell from "./ToursShell.tsx";
import {ITours} from "../type-global/user-types.ts";
import {useEffect, useState} from "react";
import {useGetUser} from "../hooks/useGetUser.ts";


const CitiesPage = () => {
    const {id} = useParams()
    const {data, isLoading} = useGetOneCitiesQuery(id)
    const {user} = useGetUser()
    const [byTour] = useByToursMutation()
    const [clickTour, setClickTour] = useState<ITours>()
    console.log(user)
    useEffect(() => {
        if (data && clickTour) {
            const initialState = {
                city: data.city,
                id: data.id,
                tours: [ ...user.bought,
                    {
                        id: clickTour.id,
                        name: clickTour.name,
                        subscribe: true
                    }
                ]
            }
            byTour({...user, bought: [...user.bought, initialState]})
        }
    }, [clickTour])
    return (
        <div>
            {
                isLoading
                    ? <>Loading...</>
                    : data
                        ? <div>{data.city}</div>
                        : <>Not found</>
            }
            {
                isLoading
                    ? <>Loading...</>
                    : data
                        ? data.tours.map(tour => <ToursShell setClickTour={setClickTour} key={tour.id} tour={tour}/>)
                        : <>Not found</>
            }
        </div>
    );
};

export default CitiesPage;