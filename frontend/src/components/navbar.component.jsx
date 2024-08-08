import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

const Navbar = () => {
  const [searchBoxVisiblity, setSearchBoxVisiblity] = useState(false);
  return (
    <>
      <header className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src="imgs/logo.png" alt="logo" />
        </Link>
        <div
          className={
            "absolute bg-while w-full left-0 top-full mt-0.5 border-b border-grey py-4 px-[5vw] md:border-none md:block md:relative md:inset-0 md:p-0 md:w-auto " +
            (searchBoxVisiblity ? "show" : "hide md:show")
          }
        >
          <input
            type="text"
            placeholder="Search"
            className="w-full md:w-auto bg-grey p-4 pl-6 pr-[12%] md:pr-6 rounded-full placeholder:text-dark-grey md:pl-11"
          />
          <i className="fi fi-rr-search absolute right-[10%] md:pointer-events-none md:left-5 top-1/2 -translate-y-1/2 text-dark-grey"></i>
        </div>

        <div className="flex items-center gap-3 md:gap-6 ml-auto ">
          <button
            className="md:hidden bg-grey w-12 h-12 text-dark-grey rounded-full flex items-center justify-center opacity-90 hover:opacity-100 active:opacity-80"
            onClick={() => setSearchBoxVisiblity((prev) => !prev)}
          >
            <i className="fi fi-rr-search text-xl"></i>
          </button>
          <Link to="/editor" className="hidden md:flex gap-2 link rounded-lg">
            <i className="fi fi-rr-file-edit"></i>
            <p>Write</p>
          </Link>
          <Link className="btn-dark py-2" to="/signin">
            Sign In
          </Link>
          <Link className="btn-light py-2 hidden md:block" to="/signup">
            Sign Up
          </Link>
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
};

export default Navbar;
