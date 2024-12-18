import React from 'react';
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useFetchData from "../../hooks/useFetchData";
import { BASE_URL } from "../../config";
import Loader from "../Loader/Loading";
import Error from "../Error/Error";

const FindVechelesSection = () => {
  const { data: vecheles, loading, error } = useFetchData(`${BASE_URL}/vecheles`);

  return (
    <div className="py-[30px] px-5">
      {loading && <Loader />}
      {error && <Error message={error} />}
      {!loading && !error && (
        <div className="overflow-x-auto flex gap-4">
          {vecheles.map(vechele => (
            <div key={vechele._id} className="flex-shrink-0 w-[150px] h-[200px]">
              <img
                src={vechele.photo}
                alt={vechele.name}
                className="w-full h-full rounded-lg object-cover"
              />
            </div>
          ))}
        </div>
      )}
      
      <div className="mt-[30px]">
        <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Find a vechele</h2>
        <p className="text-[16px] leading-7 text-textColor font-[400] mt-4 text-center">
          Unmatched nationwide services.
        </p>
        <Link
          to='/vecheles'
          className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
        >
          <BsArrowRight className="group-hover:text-black w-6 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default FindVechelesSection;
