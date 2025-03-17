import { useState, useEffect } from 'react';
import { IoMdFlashlight } from "react-icons/io";
import { BsMoonStarsFill } from "react-icons/bs";
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") === "dark" ? "dark" : "light"
  );

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  return (
    <>
      <nav className='w-full md:w-[80%] text-black dark:text-neutral-200 mb-3 mx-auto flex rounded-xl justify-end md:justify-between px-4 md:px-14 py-4 items-center'>
        <Link to='/' className="logo cursor-pointer max-md:hidden font-semibold">AI CHATBOT</Link>

        <ul className='flex items-center justify-center max-md:mx-auto gap-8'>
          <Link to='/premium' className='cursor-pointer flex items-center gap-1 hover:opacity-75 dark:hover:!text-gray-300'>Chatbot Premium </Link>
          <li onClick={() => setTheme(theme === "dark" ? "light" : "dark")} className="flex items-center gap-3 cursor-pointer">Theme:
            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className={`w-14 h-7 p-4 flex items-center px-1 rounded-full cursor-pointer transition-all duration-300 ${theme === "dark" ? "bg-gray-800" : "bg-gray-300"
                }`}>
              <div
                className={`w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md transform duration-300 ${theme === "dark" ? "translate-x-7" : "translate-x-0"
                  }`}>
                {theme === "dark" ? (
                  <BsMoonStarsFill className="text-gray-800 text-sm" />
                ) : (
                  <IoMdFlashlight className="text-gray-800 text-lg" />
                )}
              </div>
            </div>
          </li>

        </ul>
      </nav>
    </>
  )
}

export default Navbar
