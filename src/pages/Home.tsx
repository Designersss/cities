import {useGetCitiesQuery} from "../api/api.ts";
import CitiesShell from "../components/CitiesShell.tsx";


const Home = () => {
    const {data, isLoading} = useGetCitiesQuery([])
    return (
        <div>
            {
                isLoading
                    ? <>Loading....</>
                    : data
                        ? <div>
                            {data.map(cities => <CitiesShell key={cities.id} cities={cities} />)}
                        </div>
                        : <>Not found</>
            }
        </div>
    );
};

export default Home;