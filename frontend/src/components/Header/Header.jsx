import { useEffect, useRef, useContext, useState } from 'react';
import { BiMenu } from "react-icons/bi";
import logo from "../../assets/images/logo.png";
import header_bkg from "../../assets/images/header_bkg.mp4";
import header_bkg_mob from "../../assets/images/header_bkg_mob.mp4";
import { NavLink, Link } from 'react-router-dom';
import { authContext } from '../../context/AuthContext';

const navLinks = [
  { path: '/home', display: 'Home' },
  { path: '/vecheles', display: 'Manage Vehicles' },
  { path: '/addVechele', display: 'Add Vehicles' },
  { path: '/GoogleTranslate', display: 'Language' },
];

const Header = () => {
  const headerRef = useRef(null);
  const videoRef = useRef(null);
  const menuRef = useRef(null);
  const { user, role, token } = useContext(authContext);
  const [language, setLanguage] = useState('en'); // Default language is English

  // Trigger the Google Translate widget or another i18n system if necessary
  const handleLanguageChange = (lang) => setLanguage(lang); 
  

  const toggleMenu = () => menuRef.current.classList.toggle('show_menu');
  

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    // Update the background video source when screen size changes
    if (videoRef.current) {
      videoRef.current.src = isMobile ? header_bkg_mob : header_bkg;
      videoRef.current.load(); // Reload the video source
    }
  }, [isMobile]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);


  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
      headerRef.current.classList.add('sticky_header');
    } else {
      headerRef.current.classList.remove('sticky_header');
    }

    // Handle video playback
    const scrollY = window.scrollY;
    const video = videoRef.current;

    if (video) {
      if (scrollY > lastScrollY) {
        // Scrolling down: Play backward
        video.currentTime = Math.max(video.currentTime - 0.1, 0);
      } else if (scrollY < lastScrollY) {
        // Scrolling up: Play forward
        video.currentTime = Math.min(video.currentTime + 0.1, video.duration);
      }
    }
    setLastScrollY(scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <header className="header flex items-center" ref={headerRef}>
      {/* Video Background */}
      <video
        ref={videoRef}
        className="absolute top-0 left-0 w-full h-full object-cover z-0" 
        autoPlay
        muted
        loop
        playsInline
      />

      <div className="container relative z-10">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div>
            <img src={logo} alt="Logo" />
          </div>

          {/* menu */}
          <div className="navigation" ref={menuRef} onClick={toggleMenu}>
            <ul className="menu flex items-left gap-[6rem]">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <NavLink to={link.path}
                    className={navClass => navClass.isActive
                      ? "text-primaryColor text-[16px] leading-7 font-[600]"
                      : "text-textColor text-[16px] leading-7 font-[500] hover:text-color-primaryColor"
                    }
                  >
                    {link.display}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          {
          /* Language Dropdown 
          <div className="flex items-center">
            <select
              className="bg-primaryColor text-white font-[600] py-2 px-4 rounded-[50px] cursor-pointer"
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
            >
              <option value="en">English</option>
              <option value="am">Amharic</option>
            </select>
          </div>
          */}

          {/* Nav right */}
          <div className="flex items-center gap-4">
            {
              token && user ? (
                <div className="flex items-center">
                  {/*Used at time of full project 
                  <Link to={`${role === 'AdminUser' ? '/admin/profile/me' : '/staff/profile/me'}`}>
                  */}
                  <Link to={''}> 
                    <figure className="w-[35px] h-[35px] rounded-full cursor-pointer">
                      <img 
                        src={user?.photo} 
                        className="w-full rounded-full" 
                        alt="img" 
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/35'; // Fallback image URL
                          e.target.alt = 'Default Image';
                        }} 
                      />
                    </figure>
                  </Link>
                  <h2 className="text-textColor text-sm ml-2">{user?.name}</h2> {/* Added ml-2 for margin */}
                </div>
              ) : (
                <Link to='/login'>
                  <button className="bg-primaryColor py-2 px-6 text-white font-[600] h-[44px] flex items-center justify-center rounded-[50px]">
                    Login
                  </button>
                </Link>
              )
            }

            <span className="md:hidden" onClick={toggleMenu}>
              <BiMenu className="w-6 h-6 cursor-pointer" />
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
