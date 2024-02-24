import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
    return (
        <>
        <div className="footer-container">
      <footer className="flex flex-col bg-neutral-900 text-center text-white mt-20">
        <div className="container pt-6">
          {/* Newsletter sign-up form */}
          <div className="flex flex-wrap items-center justify-end gap-4 md:flex-row">
            {/* Newsletter sign-up container */}
            <div className="md:flex items-center">
              {/* Newsletter sign-up text and input field */}
              <div className="md:flex md:items-center">
                <p className="md:mr-4 mt-2 text-grey">
                  <em>Get new & updated claims by email</em>
                </p>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="signup-input peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] text-neutral-200 outline-none transition-all duration-200 ease-linear motion-reduce:transition-none"
                    id="exampleFormControlInput1"
                    placeholder="--------@-----.com"
                  />
                </div>
              </div>

              {/* Newsletter sign-up submit button */}
              <div className="md:mr-auto flex justify-end">
                <button
                  type="submit"
                  className="btn-green sign-up-form"
                >
              Sign up                
              </button>
              </div>
            </div>

            {/* Links */}
            <ul className="flex flex-row items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0 justify-end ml-auto">
              <li>
                <a href="https://www.paypal.com/donate/?hosted_button_id=44XADNYVGGMPS" target="_blank" rel="noreferrer" className="hover:underline me-4 md:me-6">
                  Donate
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:underline me-4 md:me-6">
                  Contact
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/hasbaratracker/" target="_blank" rel="noreferrer" className="hover:underline">
                  Instagram
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
