import {useGetCitiesQuery} from "../api/api.ts";
import Cities from "../components/Cities.tsx";


const Home = () => {
    const {data, isLoading} = useGetCitiesQuery([])
    return (
        <div>
            {
                isLoading
                    ? <>Loading....</>
                    : data
                        ? <div>
                            {data.map(cities => <Cities key={cities.id} cities={cities} />)}
                        </div>
                        : <>Not found</>
            }
        </div>
    );
};

export default Home;