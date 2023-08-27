import {useGetCitiesQuery} from "../api/api.ts";
import CitiesShell from "../components/CitiesShell.tsx";


const Home = () => {
    const {data, isLoading} = useGetCitiesQuery([])
    return (
        <div>
            <div className='w-96 text-2xl bg-[#292929] rounded-md px-5 py-2'>Туры по городам</div>
            {
                isLoading
                    ? <>Loading....</>
                    : data
                        ? <div className='grid grid-cols-4 gap-5 mt-8'>
                            {data.map(cities => <CitiesShell key={cities.id} cities={cities}/>)}
                        </div>
                        : <>Not found</>
            }
        </div>
    );
};

export default Home;