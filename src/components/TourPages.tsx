import {useParams} from "react-router-dom";
import {useGetOneCitiesQuery} from "../api/api.ts";
import {ITours} from "../type-global/user-types.ts";


const TourPages = () => {
    ////////////// ТУТ ЕСЛИ ЧТО НЕ ПРАВИЛЬНО ВСЕ СДЕЛАНО, НУЖНО ПО ДРУГОМУ, Я ЭТО СДЕЛАЛ ПРОСТО, ЧТО БЫ РАБОТАЛО /////////////////////
    const {id} = useParams() // поиск ID через params
    const idCities = location.pathname[8] // поиск города через location
    const {data} = useGetOneCitiesQuery(idCities) // Выводим город по id
    const toursPages: ITours | undefined = data?.tours.find(el => el.id === parseInt(id)) // Ищем определенный тур
    return (
        <div>
            {
                toursPages // проверка, если тур найден, выводим ниформацию
                    ?
                    <div className='w-96 mt-2 bg-[#424242] py-1 rounded-md'>
                        <span>Название тура: {toursPages.name}</span>
                        <p>Цена тура: {toursPages.price}</p>
                    </div>
                    :
                    <>Not found</>
            }
        </div>
    );
};

export default TourPages;