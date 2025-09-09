import React from 'react';
import { NavLink, useLocation } from "react-router-dom";
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import { useAuth } from '../contexts/AuthContext';
import '../App.css';

const Header = () =>{
    const { user, logout, isAdmin, isLoggedIn } = useAuth();
    const location = useLocation();
    const isClaimEditorPage = location.pathname === '/claim-editor';

    return (
        <>
        {/* <span className="header-container">
        </span> */}

            {/* <div className="flex flex-wrap items-center justify-between gap-5 relative mt-[-1.5%] ml-[-0.2%] mobile:-mt-16">
                <MobileMenu />
                <Logo />
        
        <div className="flex lg:order-1 max-sm:ml-auto">
                <div className="nav-links">
                        <li className="undotted">
                            <NavLink to="/">Claims</NavLink>
                        </li>

                    <li className="undotted">
                        <NavLink to="/submit-claim">Submit a claim</NavLink>
                    </li>

                    <li className="undotted">
                        <NavLink to="/volunteer">Volunteer</NavLink>
                    </li>

                    <li className="undotted">
                        <NavLink to="/about">About</NavLink>
                    </li>
                </div>
            </div>
        </div> */}

<header className="flex flex-wrap items-center">
    <div className="flex-1 flex justify-between items-center">
        <Logo />
    </div>

    {/* Menu toggle */}
    <label htmlFor="menu-toggle" className="block">
      {/* <svg class="fill-current text-gray-900"
        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
      </svg> */}
      <MobileMenu />
    </label>

    {/* Nav links */}
    {/* <input class="hidden" type="checkbox" id="menu-toggle" /> */}

    <div className="hidden tablet:flex tablet:items-center tablet:w-auto w-full" id="menu">
        <nav className="w-full">
            {/* Main site navigation */}
            <ul className="tablet:flex items-center justify-end gap-4 whitespace-nowrap text-base text-gray-700 pt-4 tablet:pt-0">
                <li className="undotted">
                    <NavLink to="/">Claims</NavLink>
                </li>

                <li className="undotted">
                    <NavLink to="/submit-claim">Submit a claim</NavLink>
                </li>

                <li className="undotted">
                    <NavLink to="/volunteer">Volunteer</NavLink>
                </li>

                <li className="undotted">
                    <NavLink to="/about">About</NavLink>
                </li>
            </ul>

            {/* Admin/User functions - second row */}
            {(isLoggedIn() || isClaimEditorPage) && (
                <div className="border-t border-gray-200 pt-2 mt-2">
                    <ul className="tablet:flex items-center justify-end gap-4 whitespace-nowrap text-base text-gray-700">
                        {/* Authentication-based navigation - show on claim-editor page or when logged in */}
                        {(isLoggedIn() || isClaimEditorPage) && (
                            <li className="undotted">
                                <NavLink to="/claim-editor" className="font-semibold text-blue-600">
                                    Claim Editor
                                </NavLink>
                            </li>
                        )}

                        {/* Show Status Page for admins only when logged in */}
                        {isLoggedIn() && isAdmin() && (
                            <li className="undotted">
                                <NavLink to="/status" className="font-semibold text-purple-600">
                                    Status
                                </NavLink>
                            </li>
                        )}

                        {/* Show Volunteer Manager for admins only when logged in */}
                        {isLoggedIn() && isAdmin() && (
                            <li className="undotted">
                                <NavLink to="/volunteers" className="font-semibold text-green-600">
                                    Volunteer Manager
                                </NavLink>
                            </li>
                        )}

                        {/* Show user info and logout only when logged in */}
                        {isLoggedIn() && (
                            <li className="undotted">
                                <div className="flex items-center space-x-2">
                                    {/* Admin status indicator */}
                                    <div className="flex items-center space-x-1">
                                        {isAdmin() ? (
                                            <span title="Admin User" className="text-yellow-500 text-lg">🔑</span>
                                        ) : (
                                            <span title="Regular User" className="text-gray-500 text-lg">👤</span>
                                        )}
                                    </div>
                                    <span className="text-sm text-gray-500 hidden sm:inline">
                                        {user?.email}
                                    </span>
                                    <button
                                        onClick={logout}
                                        className="text-red-600 hover:text-red-800 font-medium"
                                    >
                                        Logout
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>
                </div>
            )}
        </nav>
    </div>
</header>        


                        {/* <MobileMenu /> */}


                        {/* <li className="undotted">
                            <NavLink to="/">Claims</NavLink>
                        </li>

                    <li className="undotted">
                        <NavLink to="/submit-claim">Submit a claim</NavLink>
                    </li>

                    <li className="undotted">
                        <NavLink to="/volunteer">Volunteer</NavLink>
                    </li>

                    <li className="undotted">
                        <NavLink to="/about">About</NavLink>
                    </li> */}



    </>

    );
}

export default Header;
