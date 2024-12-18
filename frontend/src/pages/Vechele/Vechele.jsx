import { useState, useEffect } from "react";
import VechelesCard from "../../components/Vecheles/VechelesCard"; 
import { BASE_URL } from "../../config";
import useFetchData from "../../hooks/useFetchData";
import Loading from "../../components/Loader/Loading";
import Error from "../../components/Error/Error";

const Vechele = () => {
  const [query, setQuery] = useState("");
  const [debounceQuery, setDebounceQuery] = useState("");

  const handleSearch = () => {
    setQuery(query.trim());
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebounceQuery(query);
    }, 700);

    return () => clearTimeout(timeout);
  }, [query]);

  const { data: vecheles, loading, error } = useFetchData(`${BASE_URL}/vecheles?query=${debounceQuery}`);

  return (
    <>
      <section>
        <div className="container text-center">
          <h2 className="heading">Find a Vechele</h2>
          <div className="max-w-[570px] mt-[30px] mx-auto bg-[#0066ff2c] rounded-md flex items-center justify-between">
            <input
              type="search"
              className="py-4 pl-4 pr-2 bg-transparent w-full focus:outline-none cursor-pointer placeholder:text-textColor"
              placeholder="Search Vehicles by name or brand"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
            <button className="btn mt-0 rounded-[0px] rounded-r-md" onClick={handleSearch}>
              Search
            </button>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          {loading && <Loading />}
          {error && <Error errMessage={error} />}
          {!loading && !error && (
            <>
              {/* Displaying Vecheles in Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {vecheles.map((vechele) => (
                  <VechelesCard key={vechele._id} vechele={vechele} />
                ))}
              </div>

              {/* Displaying Vecheles in Table */}
              <div className="overflow-x-auto mt-10">
                <table className="min-w-full table-auto">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="px-4 py-2 text-left">Name</th>
                      <th className="px-4 py-2 text-left">Brand</th>
                      <th className="px-4 py-2 text-left">Model</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-left">Rating</th>
                    </tr>
                  </thead>
                  <tbody>
                    {vecheles.map((vechele) => (
                      <tr key={vechele._id} className="border-t">
                        <td className="px-4 py-2">{vechele.name}</td>
                        <td className="px-4 py-2">{vechele.brand}</td>
                        <td className="px-4 py-2">{vechele.model}</td>
                        <td className="px-4 py-2">{vechele.status}</td>
                        <td className="px-4 py-2">{vechele.averageRating} ({vechele.totalRating})</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
};

export default Vechele;