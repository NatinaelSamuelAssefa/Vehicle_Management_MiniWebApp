import React from "react";
import { Link } from 'react-router-dom';
import logo from '../../assets/images/logo.png';
import { RiLinkedinFill } from 'react-icons/ri';
import { AiFillIdcard, AiFillGithub } from 'react-icons/ai';
import { FaTelegram } from "react-icons/fa";

const socialLinks = [
  {
    path: "http://natisami21.github.io/portfolio",
    icon: <AiFillIdcard className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://github.com/NatiSami21",
    icon: <AiFillGithub className="group-hover:text-white w-4 h-5" />,
  },
  {
    path: "https://www.instagram.com",
    icon: <FaTelegram className="group-hover:text-white w-4 h-5" />,
  }, 
];

const quickLinks01 = [
  {
    path: "https://www.fleetowner.com/",
    display: "Fleet Management News",
  },
  {
    path: "https://www.telematicswire.net/",
    display: "Vechele Telematics",
  },

];

const quickLinks02 = [
  {
    path: "https://www.nafa.org/",
    display: "Courses & Certifications",
  },
  {
    path: "https://www.udemy.com/",
    display: "Fleet Management Training",
  },
  {
    path: "https://www.coursera.org/",
    display: "Logistics & Supply Chain Courses",
  },
];


const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer pb-16 pt-10">
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-20 xl:gap-24">
          <div className="mb-6 lg:mb-0">
            <img src={logo} alt="Logo" />
            <p className="text-[16px] leading-7 font-[400] text-textColor mt-4">
              Copyright {year} developed by Natinael Samuel all right reserved.
            </p>
            <div className="flex items-center gap-3 mt-4">
              {socialLinks.map((link, index) => (
                <Link 
                  to={link.path} 
                  key={index} 
                  className="w-9 h-9 border border-solid border-[#181A1E] rounded-full flex items-center justify-center group hover:bg-primaryColor hover:border-none"
                >
                  {link.icon}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex flex-wrap gap-16 lg:gap-20 xl:gap-24">
            <div className="mb-6 lg:mb-0">
              <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                Explore Fleet Management
              </h2>
              <ul>
                {quickLinks01.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      to={item.path}
                      className="text-[16px] leading-7 font-[400] text-textColor"
                    >
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="mb-6 lg:mb-0">
              <h2 className="text-[20px] leading-[30px] font-[700] mb-6 text-headingColor">
                I Want To:
              </h2>
              <ul>
                {quickLinks02.map((item, index) => (
                  <li key={index} className="mb-4">
                    <Link
                      to={item.path}
                      className="text-[16px] leading-7 font-[400] text-textColor"
                    >
                      {item.display}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
