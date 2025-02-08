import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import logo from "../assets/logo.png";

// toDO
// Dashboard item will be shown only if user is authenticated
// My Events item will be shown only if user is authenticated

// Sign In item will be shown only if user is not authenticated
// Sign Up item will be shown only if user is not authenticated

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const token = document.cookie;
  const isAuthenticated = Boolean(token);
  //   const isAuthenticated = true;

  const authNavigation = [
    { name: "Dashboard", href: "dashboard" },
    { name: "My Events", href: "my_events" },
    { name: "Events", href: "event" },
    { name: "About", href: "about" },
  ];

  const guestNavigation = [
    { name: "Events", href: "event" },
    { name: "About", href: "about" },
    { name: "Sign Up", href: "signup" },
    { name: "Sign In", href: "signin" },
  ];

  const navigation = isAuthenticated ? authNavigation : guestNavigation;

  return (
    <header className="bg-white w-full max-w-[1400px] mx-auto sticky inset-x-0 top-0 z-50">
      <nav className="flex items-center justify-between p-6 lg:px-4">
        <div className="flex md:flex-1">
          <Link to={"/"}>
            {/* <h1 className="font-bold">GatherPro</h1> */}
            <img src={logo} className="w-[100px]" alt="GatherPro" />
          </Link>
        </div>
        <div className="flex md:hidden">
          <button
            className="-m-2.5 cursor-pointer inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="">Menu</span>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden absolute bg-white inset-x-0 top-0 z-50">
            <button
              className="absolute right-10 top-6 cursor-pointer"
              onClick={() => setMobileMenuOpen(false)}
            >
              X
            </button>
            <div className="flex items-center justify-center min-h-screen flex-col p-6 gap-y-4">
              {navigation.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.href}
                  className="text-gray-700"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </div>
          </div>
        )}

        <div className="text-[0.9rem] hidden md:flex md:gap-x-12">
          {navigation.map((item) => (
            <NavLink key={item.name} to={item.href} className="text-gray-700">
              {item.name}
            </NavLink>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Header;
