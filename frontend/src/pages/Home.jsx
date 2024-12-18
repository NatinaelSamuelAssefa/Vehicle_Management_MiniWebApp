import React from 'react';
import { useEffect, useRef, useState } from 'react';
import tab2 from '../assets/images/tab2.mp4';
import tab3 from '../assets/images/tab3.mp4'; 
import { Link } from 'react-router-dom';
import { BsArrowRight } from 'react-icons/bs';
import useFetchData from '../hooks/useFetchData'; 
import { BASE_URL } from '../config'; 
import Loader from "../components/Loader/Loading";
import Error from "../components/Error/Error";
import hero_bkg from "../assets/images/hero_bkg.mp4";
import hero_bkg_mob from "../assets/images/hero_bkg_mob.mp4";
import ChartDisplay1 from '../pages/Chart_desplay1';
import ChartDisplay2 from '../pages/Chart_desplay2';

const Home = () => {

  const handleVideoLoad = () => {
    setLoading(false); // Hide loader when video is loaded
  };

  const { data: vecheles, loading, error } = useFetchData(`${BASE_URL}/vecheles`);


  const videoRef = useRef(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Update the background video source when screen size changes
    if (videoRef.current) {
      videoRef.current.src = isMobile ? hero_bkg_mob : hero_bkg;
      videoRef.current.load(); // Reload the video source
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      {/* hero section */}

      <section className="hero_section pt-[50px] 2xl:h-[800px]">
        
        {loading && <Loader />}
        {/* Video Background */} {/*Loader while loading */}
          <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0" 
          autoPlay
          muted
          loop
          playsInline
          onLoadedData={handleVideoLoad} // Trigger video load event
        /> 

        <div className="container relative z-10">
          <div className="flex flex-col lg:flex-row gap-[90px] items-center justify-between">
            
            {/* hero content */}
            <div>
              <div className="lg:w-[700px]">
                <h1 className="text-[36px] leading-[46px] text-headingColor font-[800] md:text-[35px] md:leading-[70px]">
                  Manage Your Cars . Master Your Road
                </h1>

                {/* Chart Component */}
                <ChartDisplay1 />

              </div>
              
              {/* The opposite of lg:hidden in Tailwind CSS, which hides an element on larger 
              screens (lg and above), is hidden lg:block. This hides the element on small 
              screens and only displays it on larger screens.*/}

              {/* Mobile view: video before counter */}
              <div className="block lg:hidden mt-[30px]">
                
                <div className="py-[30px] px-5">
                  <div className="flex items-center justify-center">
                    {/* Chart Component */}
                    <ChartDisplay1 />
                  </div>
                </div>

                {/* Hero counter for mobile */}
                <div className="mt-[30px] flex flex-col gap-5">
                  <div>
                    <h2 className="text-[36px] leading-[56px] font-[700] text-headingColor">
                      20+
                    </h2>
                    <span className="w-[100px] h-2 rounded-full block mt-[-14px]" style={{ backgroundColor: '#fde68a' }}></span>
                    <p className="text_para">Available Vecheles</p>
                  </div>
                  <div>
                    <h2 className="text-[36px] leading-[56px] font-[700] text-headingColor">
                      8+
                    </h2>
                    <span className="w-[100px] h-2 rounded-full block mt-[-14px]" style={{ backgroundColor: '#fde68a' }}></span>
                    <p className="text_para">In Use Vecheles</p>
                  </div>
                  <div>
                    <h2 className="text-[36px] leading-[56px] font-[700] text-headingColor">
                      10+
                    </h2>
                    <span className="w-[100px] h-2 rounded-full block mt-[-14px]" style={{ backgroundColor: '#fde68a' }}></span>
                    <p className="text_para">Under Maintenance Vecheles</p>
                  </div>
                </div>
              </div>

              {/* Desktop view: original layout */}
              {/*hero counter*/}
              <div className="hidden lg:block">
                <div className="mt-[30px] lg:mt-[70px] flex flex-col lg:flex-row lg:items-center gap-5 lg:gap-[30px]">
                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                      20+
                    </h2>
                    <span className="w-[100px] h-2 rounded-full block mt-[-14px]" style={{ backgroundColor: '#fde68a' }}></span>
                    <p className="text_para">Available Vecheles</p>
                  </div>
                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                      8+
                    </h2>
                    <span className="w-[100px] h-2 rounded-full block mt-[-14px]" style={{ backgroundColor: '#fde68a' }}></span>
                    <p className="text_para">In Use Vecheles</p>
                  </div>
                  <div>
                    <h2 className="text-[36px] leading-[56px] lg:text-[44px] lg:leading-[54px] font-[700] text-headingColor">
                      10+
                    </h2>
                    <span className="w-[100px] h-2 rounded-full block mt-[-14px]" style={{ backgroundColor: '#fde68a' }}></span>
                    <p className="text_para">Under Maintenance Vecheles</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Content */}
            <div className="hidden lg:flex justify-center items-center">
              <div className="w-[400px] h-[400px] flex justify-center items-center">
                {/* Chart Component */}
                <ChartDisplay2 />
              </div>
            </div>

          </div>
        </div>
      </section>
  

      {/* hero section end*/}
      < section >
        <div className="container">
          
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px] mt-[30px] lg:mt-[55px]">
          <div className="py-[30px] px-5">
            {loading && <Loader />}
            {error && <Error message={error} />}
            <div className="w-full h-[200px] overflow-hidden relative">
              <div className="absolute inset-0 whitespace-nowrap animate-scroll">
                {vecheles && vecheles.length > 0 ? (
                  vecheles.map((vechele) => (
                    vechele.photo ? (
                      <div key={vechele._id} className="inline-block mx-2">
                        <img
                          src={vechele.photo}
                          alt={vechele.name}
                          className="w-[300px] h-[200px] rounded-lg object-cover"
                        />
                      </div>
                    ) : (
                      <div key={vechele._id} className="inline-block mx-2">
                        <p>No image available</p>
                      </div>
                    )
                  ))
                ) : (
                  <p className="text-center">No vecheles available at the moment.</p>
                )}
              </div>
            </div>

              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Manage Vehicles</h2>
                <Link
                  to='/vecheles'
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover: text-black w-6 h-5" />
                </Link>
              </div>
            </div>


            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                {loading && <Loader />} {/* Display loader while loading */}
                <video
                src={tab2}
                className={`w-full h-[200px] ${loading ? 'hidden' : ''}`} // Hide video while loading
                autoPlay
                loop
                muted
                onLoadedData={handleVideoLoad} // Trigger video load event
                />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Track Vehicles</h2>
                <Link
                  to='/Track'
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover: text-black w-6 h-5" />
                </Link>
              </div>
            </div>

            <div className="py-[30px] px-5">
              <div className="flex items-center justify-center">
                {loading && <Loader />} {/* Display loader while loading */}
                <video
                src={tab3}
                className={`w-full h-[200px] ${loading ? 'hidden' : ''}`} // Hide video while loading
                autoPlay
                loop
                muted
                onLoadedData={handleVideoLoad} // Trigger video load event
                />
              </div>
              <div className="mt-[30px]">
                <h2 className="text-[26px] leading-9 text-headingColor font-[700] text-center">Add Vehicles</h2>
                <Link
                  to='/vecheles'
                  className="w-[44px] h-[44px] rounded-full border border-solid border-[#181A1E] mt-[30px] mx-auto flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  <BsArrowRight className="group-hover: text-black w-6 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section >

    </>

  );
};

export default Home;
