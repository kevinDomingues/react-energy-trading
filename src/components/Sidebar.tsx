import React, { FC,  useEffect,  useState } from "react";
import { useAuth } from "../providers/AuthProvider";
import { ChevronLeftIcon, ChevronRightIcon, ChartBarIcon, CogIcon, BoltIcon } from '@heroicons/react/24/solid'
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline'
import { Link, useLocation } from "react-router-dom";

const Sidebar: FC = () => {
    const [open, setOpen] = useState(true);
    const [current, setCurrent] = useState(0);

    const { logout } = useAuth();
    const location = useLocation();

    const Menus = [
      { title: "Dashboard", icon: 1, to: "/" },
      { title: "Certificates", icon: 2, to: "/certificates" },
      { title: "Settings", icon: 3, gap: true, to: "/settings" },
    ];

    useEffect(() => {
      const activeIndex = Menus.findIndex(menu => menu.to === location.pathname);
      setCurrent(activeIndex !== -1 ? activeIndex : 0);
    }, [location.pathname]);

    return (
      <>
        <div className={`${open ? "w-72" : "w-20" } min-h-screen min-h-full bg-emerald-800 p-5 pt-8 relative duration-300`}>
          {open ? 
            <ChevronLeftIcon className={`absolute cursor-pointer -right-3 top-9 w-7 border-emerald-900 bg-white text-emerald-900
            border-2 rounded-full`} onClick={() => setOpen(!open)}/> 
            :
            <ChevronRightIcon className={`absolute cursor-pointer -right-3 top-9 w-7 border-emerald-900 bg-white text-emerald-900
            border-2 rounded-full`} onClick={() => setOpen(!open)}/>
          }
          <div className={`flex gap-x-4 items-center`}>
            <img src="./energy-trading.svg" className="cursor-pointer duration-500 w-10"/>
            <h1 className={`text-white origin-left font-medium text-xl
              ${!open && "hidden"}`}>
                Energy Trading
            </h1>
          </div>
          <ul className="pt-6">
            {Menus.map((Menu, index) => (
              <Link key={index} onClick={()=>setCurrent(index)} to={`${Menu.to}`}>
                <li className={`flex rounded-md p-2 cursor-pointer hover:bg-emerald-600 text-gray-300 text-sm items-center gap-x-4 duration-300 mb-auto
                  ${Menu.gap ? "mt-9" : "mt-2"} ${index===current && "bg-emerald-600 scale-105"}`}
                >
                  
                  {Menu.icon === 1 ? 
                    <ChartBarIcon className={`cursor-pointer w-6 text-white`} /> 
                      :
                    Menu.icon === 2 ?
                    <BoltIcon className={`cursor-pointer w-6 text-white`} />
                      :
                    <CogIcon className={`cursor-pointer w-6 text-white`} />
                  }
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    {Menu.title}
                  </span>
                </li>
              </Link>
            ))}
          </ul>
          <ul className="pt-6 mt-auto">
            <Link key={100} to="/" onClick={()=>logout()}>
              <li className={`flex rounded-md p-2 cursor-pointer hover:bg-sky-600 mt-2 text-gray-300 text-sm items-center gap-x-4 duration-300`}
                  >
                <ArrowLeftEndOnRectangleIcon className={`cursor-pointer w-6 text-white`} />
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Logout
                </span>
              </li>
            </Link>
          </ul>
        </div>
      </>
    );
  }
  
  export default Sidebar;