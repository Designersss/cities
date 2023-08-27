import {useParams} from "react-router-dom";
import {useByCitiesMutation, useGetOneCitiesQuery} from "../api/api.ts";
import ToursShell from "./ToursShell.tsx";
import {ICities, ITours} from "../type-global/user-types.ts";
import {useEffect, useState} from "react";
import {useGetUser} from "../hooks/useGetUser.ts";


const CitiesPage = () => {
    const {id} = useParams()
    const {data, isLoading} = useGetOneCitiesQuery(id)
    const {user} = useGetUser()
    const [byCities] = useByCitiesMutation()
    const [clickTour, setClickTour] = useState<ITours>()
    useEffect(() => {
        if (data && clickTour) {
            const newData: ITours[] = [...data.tours]
            const itemID: ICities | undefined = user.bought?.find((userBought) => userBought.id === data.id)
            const itemYes: ITours | undefined = data.tours.find((item) => item.id === clickTour.id)
            const newArray: ICities | undefined = user.bought.find((cities) => cities.id === data.id)
            const addTours: ITours | undefined = newArray?.tours.find((tours) => tours.id === clickTour.id)
            const newIte = newArray?.tours.map(item => item)

            for (let i = 0; i < data.tours.length; i++) {
                newData.forEach(function (el, i) {
                    if (el.id === clickTour.id) {
                        newData.splice(i, 1)
                    }
                })
                newIte?.forEach(function (el, i) {
                    if (el.id === clickTour.id) {
                        newIte.splice(i, 1)
                    }
                })
            }

            if (itemID === undefined) {
                if (itemYes) {
                    const initialStateOne = {
                        city: data.city,
                        id: data.id,
                        tours: [...newData, {
                            id: itemYes.id,
                            name: itemYes.name,
                            price: itemYes?.price,
                            subscribe: true
                        }]
                    }
                    byCities({...user, bought: [...user.bought, initialStateOne]})
                }
            } else {
                if (newIte) {
                    const initialStateTwo = {
                        city: data.city,
                        id: data.id,
                        tours: [...newIte, {
                            id: addTours?.id,
                            name: addTours?.name,
                            price: addTours?.price,
                            subscribe: true
                        }]
                    }
                    const newToursBy = [...user.bought, initialStateTwo]
                    const indexTours: number = newToursBy.map(el => el.id).indexOf(initialStateTwo.id)
                    newToursBy.splice(indexTours, 1)
                    byCities({...user, bought: newToursBy})
                }
            }
        }
    }, [clickTour])
    return (
        <div>
            {
                isLoading
                    ? <>Loading...</>
                    : data
                        ? <div className='px-2 w-96 py-1 text-xl bg-[#383838] rounded-md'>Город: {data.city}</div>
                        : <>Not found</>
            }
            {
                isLoading
                    ? <>Loading...</>
                    : data
                        ? data.tours.map(tour => <ToursShell idCities={data} setClickTour={setClickTour} key={tour.id} tour={tour}/>)
                        : <>Not found</>
            }
        </div>
    );
};

export default CitiesPage;