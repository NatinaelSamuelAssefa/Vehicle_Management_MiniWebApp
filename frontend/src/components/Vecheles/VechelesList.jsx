import React from 'react';
import VechelesCard from "./VechelesCard";
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData"; 
import Loader from "../Loader/Loading";
import Error from "../Error/Error";

const VechelesList = () => {
    const { data: vecheles, loading, error } = useFetchData(`${BASE_URL}/vecheles`);
 

    return (
        <>
            {loading && <Loader />}
            {error && <Error message={error} />} {/*&& validVecheles.length > 0*/}
            {!loading && !error  && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
                    {vecheles.map(vechele => (
                        <VechelesCard key={vechele._id} vechele={vechele} />
                    ))}
                </div>
            )}
        </>
    );
};

export default VechelesList;
