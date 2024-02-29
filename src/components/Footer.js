import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
    return (
        <>
        <div className="footer-container ml-10">
      <footer className="flex-col bg-neutral-900 text-white sm:mt-0 mt-5">
        {/* To centre within column, add: flex items-center */}
        
        <div className="mx-auto pt-20">
          {/* Newsletter sign-up form */}
          <div className="flex-wrap items-center justify-center gap-4 md:flex-row">
            {/* Newsletter sign-up container */}
            <div className="mobile:mb-4 laptop:-ml-10 laptop:-mb-10 flex items-end">
              {/* Newsletter sign-up text and input field */}
              <div className="mobile:mb-2 laptop:flex laptop:mb-0.5 desktop:flex md:items-center">
                <p className="text-grey-faded text-xs laptop:mt-2.5 laptop:mr-3">
                  Get new & updated claims by email
                </p>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="signup-input peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] text-xs leading-[1.6] text-neutral-200 text-grey-darkest outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
                    id="exampleFormControlInput1"
                    placeholder="------------@--------.com"
                  />
                </div>
              </div>

              {/* 'Sign up' button md:mr-auto  */}
              <div className="md:ml-2 flex items-center ml-2">
                <button
                  type="submit"
                  className="btn-green sign-up-form"
                >
              Sign up                
              </button>
              </div>
            </div>

            {/* Links */}
            <ul className="mobile:items-center mobile:-ml-16 mobile:pt-5 mobile:justify-between laptop:justify-end laptop:-mr-7 flex flex-row mt-3 text-sm">
              <li className="laptop:me-10">
                <a href="https://www.paypal.com/donate/?hosted_button_id=44XADNYVGGMPS" target="_blank" rel="noreferrer" className="hover:underline">
                  Donate
                </a>
              </li>

              <li className="laptop:me-10">
                <a href="/contact" className="hover:underline">
                  Contact
                </a>
              </li>

              <li className="laptop:me-10">
                <a href="https://www.instagram.com/hasbaratracker/" target="_blank" rel="noreferrer" className="hover:underline">
                  IG
                </a>
              </li>

              <li>
                <a href="https://www.twitter.com/hasbaratracker/" target="_blank" rel="noreferrer" className="hover:underline">
                  X
                </a>
              </li>
            </ul>

          </div>
        </div>
      </footer>    
      </div>    


        </>
    )
}

export default Footer;
