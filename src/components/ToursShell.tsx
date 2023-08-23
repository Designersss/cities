import {ITours} from "../type-global/user-types.ts";
import {FC} from "react";
import * as React from "react";

interface ToursProps {
    tour: ITours
    setClickTour: React.ComponentState
}
const ToursShell:FC<ToursProps> = ({tour, setClickTour}) => {
    const byTour = () => {
        setClickTour(tour)
    }
    return (
        <div>
            {tour.name}
            <button onClick={byTour}>Купить</button>
        </div>
    );
};

export default ToursShell;