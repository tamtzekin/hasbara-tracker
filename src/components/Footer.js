import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const Footer = () => {
    return (
        <>
      <footer className="flex flex-col items-center bg-neutral-900 text-center text-white mt-20">
        <div className="container mx-auto pt-6">
          {/* Newsletter sign-up form */}
          <div className="flex flex-wrap items-center justify-between gap-4 md:flex-row">

            {/* Newsletter sign-up container */}
            <div className="md:flex items-center">
              {/* Newsletter sign-up text and input field */}
              <div className="md:flex md:items-center">
                <p className="md:mr-4">
                  Get updates on new & updated claims by email
                </p>
                <div className="relative flex items-center">
                  <input
                    type="text"
                    className="signup-input peer block min-h-[auto] w-full rounded border-0 bg-transparent px-3 py-[0.32rem] leading-[1.6] text-neutral-200 outline-none transition-all duration-200 ease-linear focus:placeholder:opacity-100 data-[te-input-state-active]:placeholder:opacity-100 motion-reduce:transition-none dark:text-neutral-200 dark:placeholder:text-neutral-200 [&:not([data-te-input-placeholder-active])]:placeholder:opacity-0"
                    id="exampleFormControlInput1"
                    placeholder="Email address"
                  />
                  {/* <label
                    htmlFor="exampleFormControlInput1"
                    className="pointer-events-none absolute left-3 top-0 mb-0 max-w-[90%] origin-[0_0] truncate pt-[0.37rem] leading-[1.6] text-neutral-200 transition-all duration-200 ease-out peer-focus:-translate-y-[0.9rem] peer-focus:scale-[0.8] peer-focus:text-neutral-200 peer-data-[te-input-state-active]:-translate-y-[0.9rem] peer-data-[te-input-state-active]:scale-[0.8] motion-reduce:transition-none dark:text-neutral-200 dark:peer-focus:text-neutral-200"
                  >
                    Your email address
                  </label> */}
                </div>
              </div>

              {/* Newsletter sign-up submit button */}
              <div className="md:mr-auto">
                <button
                  type="submit"
                  className="btn-green sign-up-form"
                  // data-te-ripple-init
                  // data-te-ripple-color="light"
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
                <a href="#" className="hover:underline me-4 md:me-6">
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


        </>
    )
}

export default Footer;
