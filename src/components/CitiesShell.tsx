import {ICities} from "../type-global/user-types.ts";
import {FC} from "react";
import {Link} from "react-router-dom";

interface CitiesProps {
    cities: ICities
}

const CitiesShell: FC<CitiesProps> = ({cities}: CitiesProps) => {
    return (
        <div>
            <Link className='bg-[#383838] h-16 rounded-md flex justify-center items-center'
                  to={`/cities/${cities.id}`}>{cities.city}</Link>
        </div>
    );
};

export default CitiesShell;