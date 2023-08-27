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
            const newData: ITours[] = [...data.tours] // создаем новый массив, в котором передаем все города из базы данных
            const itemID: ICities | undefined = user.bought?.find((userBought) => userBought.id === data.id) // поиск определенного города
            const itemYes: ITours | undefined = data.tours.find((item) => item.id === clickTour.id) // поиск определенного тура
            const newArray: ICities | undefined = user.bought.find((cities) => cities.id === data.id) // поиск определенного города у пользователя
            const addTours: ITours | undefined = newArray?.tours.find((tours) => tours.id === clickTour.id) // поиск определенного тура у пользователя
            const newIte = newArray?.tours.map(item => item) // поиск определенного тура в городе, у пользователя

            for (let i = 0; i < data.tours.length; i++) {
                newData.forEach(function (el, i) {
                    if (el.id === clickTour.id) {
                        newData.splice(i, 1) // Удаляем из массива Cities в базе данных существуеющий город по ID
                    }
                })
                newIte?.forEach(function (el, i) {
                    if (el.id === clickTour.id) {
                        newIte.splice(i, 1)// Удаляем из массива пользователя с городами существуеющий город по ID
                    }
                })
            }

            if (itemID === undefined) {
                if (itemYes) {
                    const initialStateOne = { // Создаем новый объект, в который передаем поля выбранного города и выбранного тура
                        city: data.city,
                        id: data.id,
                        tours: [...newData, { // разворачиваем туры выбранного города
                            id: itemYes.id,
                            name: itemYes.name,
                            price: itemYes?.price,
                            subscribe: true
                        }]
                    }
                    byCities({...user, bought: [...user.bought, initialStateOne]}) // функция для обновления базы данных
                }
            } else {
                if (newIte) {
                    const initialStateTwo = { // Создаем новый объект, в который передаем поля выбранного города и выбранного тура
                        city: data.city,
                        id: data.id,
                        tours: [...newIte, { // разворачиваем туры выбранного города у пользователя
                            id: addTours?.id,
                            name: addTours?.name,
                            price: addTours?.price,
                            subscribe: true
                        }]
                    }
                    const newToursBy = [...user.bought, initialStateTwo] // Создаем новый массив, в котором передаем города пользователя, и добавляем InitialStateTwo
                    const indexTours: number = newToursBy.map(el => el.id).indexOf(initialStateTwo.id) // находим индекс уже существующего города в массиве
                    newToursBy.splice(indexTours, 1) // Удаляем город по индексу и оставляем новый (InitialStateTwo)
                    byCities({...user, bought: newToursBy}) // функция для обновления базы данных
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