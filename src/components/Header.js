import React from 'react';
import { NavLink } from "react-router-dom";
import Logo from './Logo';
import MobileMenu from './MobileMenu';
import '../App.css';

const Header = () =>{
    // const location = useLocation();

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

<header className="bg-white flex flex-wrap items-center">
    <div class="flex-1 flex justify-between items-center">
        <Logo />
    </div>

    {/* Menu toggle */}
    <label for="menu-toggle" class="tablet:hidden block">
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
        <nav>
            {/* <ul class="tablet:flex items-center justify-between text-base text-gray-700 pt-4 tablet:pt-0">
                <li><a class="tablet:p-0 py-3 px-0 block" href="#">Claim</a></li>
                <li><a class="tablet:p-4 py-3 px-0 block" href="#">Submit a claim</a></li>
                <li><a class="tablet:p-4 py-3 px-0 block" href="#">Volunteer</a></li>
                <li><a class="tablet:p-4 py-3 px-0 block tablet:mb-0 mb-2" href="#">About</a></li>
            </ul> */}

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
