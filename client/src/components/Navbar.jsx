import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { styles } from "../styles";
import { navLinks, logoutIcon, adminIcon } from "../constants";
import { logo, menu, close } from "../assets";

const Navbar = () => {
  const [active, setActive] = useState("");
  const [toggle, setToggle] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      if (scrollTop > 100) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    setIsLoggedIn(!!window.localStorage.getItem('userID'));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("userID");
    window.localStorage.removeItem("username");
    // Si estás utilizando cookies para manejar la sesión, aquí deberías eliminarlas también
    setIsLoggedIn(false);
    // Cambia la redirección a la página principal
    window.location.href = '/';
  };

  return (
    <nav
      className={`${styles.paddingX} w-full flex items-center py-5 fixed top-0 z-20 ${
        scrolled ? "bg-primary" : "bg-transparent"
      }`}
    >
      <div className='w-full flex justify-between items-center max-w-7xl mx-auto'>
        <Link
          to='/'
          className='flex items-center gap-2'
          onClick={() => {
            setActive("");
            window.scrollTo(0, 0);
          }}
        >
          <img src={logo} alt='logo' className='w-[50px] h-auto object-contain' />
          <p className='text-white text-[18px] font-bold cursor-pointer flex'>
            JRE &nbsp;
            <span className='sm:block hidden'>| Diseño gráfico y Desarrollo web</span>
          </p>
        </Link>

        <ul className='list-none sm:flex hidden flex-row gap-10'>
          {navLinks.map((nav) => (
            nav.url ?
              <li
                key={nav.id}
                className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer"
              >
                <a href={nav.url} target="_blank" rel="noopener noreferrer">{nav.title}</a>
              </li>
              :
              <li
                key={nav.id}
                className={`${
                  active === nav.title ? "text-white" : "text-secondary"
                } hover:text-white text-[18px] font-medium cursor-pointer`}
                onClick={() => setActive(nav.title)}
              >
                <Link to={`#${nav.id}`}>{nav.title}</Link>
              </li>
          ))}
          {isLoggedIn && (
            <>
              <li className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer">
                <a href="/dashboard" target="_blank" rel="noopener noreferrer">
                  <img src={adminIcon} alt="Admin" className="w-[20px] h-[20px]" />
                </a>
              </li>
              <li className="text-secondary hover:text-white text-[18px] font-medium cursor-pointer">
                <img src={logoutIcon} alt="Logout" onClick={handleLogout} className="w-[20px] h-[20px]" />
              </li>
            </>
          )}
        </ul>

        <div className='sm:hidden flex flex-1 justify-end items-center'>
          <img
            src={toggle ? close : menu}
            alt='menu'
            className='w-[28px] h-[28px] object-contain'
            onClick={() => setToggle(!toggle)}
          />

          <div
            className={`${!toggle ? "hidden" : "flex"} p-6 bg-black-gradient absolute top-20 right-0 mx-4 my-2 min-w-[140px] rounded-xl shadow-lg`}
          >
            <ul className='list-none flex flex-1 flex-col gap-4'>
              {navLinks.map((nav) => (
                <li
                  key={nav.id}
                  className={`font-poppins font-medium cursor-pointer text-[16px] ${
                    active === nav.title ? "text-white" : "text-secondary"
                  }`}
                  onClick={() => {
                    setToggle(!toggle);
                    setActive(nav.title);
                  }}
                >
                  <Link to={`#${nav.id}`}>{nav.title}</Link>
                </li>
              ))}
              {isLoggedIn && (
                <>
                  <li
                    className="text-secondary hover:text-white font-poppins font-medium cursor-pointer text-[16px]"
                    onClick={() => window.open("/dashboard", "_blank")}
                  >
                    Dashboard
                  </li>
                  <li
                    className="text-secondary hover:text-white font-poppins font-medium cursor-pointer text-[16px]"
                    onClick={handleLogout}
                  >
                    Logout
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

