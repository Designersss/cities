import {useParams} from "react-router-dom";
import {useGetOneCitiesQuery} from "../api/api.ts";
import {ITours} from "../type-global/user-types.ts";


const TourPages = () => {
    const {id} = useParams()
    const idCities = location.pathname[8]
    const {data} = useGetOneCitiesQuery(idCities)
    const toursPages: ITours = data?.tours.find(el => el.id === parseInt(id))
    return (
        <div>
            {
                toursPages
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