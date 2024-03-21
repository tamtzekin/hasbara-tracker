// MobileMenu.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';

const MobileMenu = () => {
    const [modalOpen, setModalOpen] = useState(false);

    const openModal = () => {
        setModalOpen(true);
    };

    const closeModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <span className="ml-auto">
                {/* menu-toggle */}
                <div className="menu-toggle mobile:mt-1" onClick={openModal}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
            </span>

            <Modal
                isOpen={modalOpen}
                onRequestClose={closeModal}
                contentLabel="Mobile Menu Modal"
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        border: 'none',
                        background: '#d6d6d6',
                        padding: '20',
                        height: '100%',
                        width: '100%',
                        textAlign: 'center',
                        zIndex: '50',
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)',
                        zIndex: '49',
                    },
                }}
            >
                <div className="menu-links">
                    <div className="arrow-menu">
                        <Link onClick={closeModal}>⤎</Link>
                    </div>

                    <Link to="/" onClick={closeModal}>
                        Claims
                    </Link> 

                    <Link to="/submit-claim" onClick={closeModal}>
                        Submit a claim
                    </Link>

                    <Link to="/volunteer" onClick={closeModal}>
                        Volunteer
                    </Link>

                    <Link to="/about" onClick={closeModal}>
                        About
                    </Link>

                    <span className="break"></span>

                    <Link to="/support" onClick={closeModal}>
                        Support us
                    </Link>

                    <Link to="/contact" onClick={closeModal}>
                        Contact
                    </Link>

                    <Link to="http://instagram.com/hasbaratracker">
                        Instagram
                    </Link>

                    <Link to="https://twitter.com/hasbaratracker">
                        X
                    </Link>
                </div>
            </Modal>
        </>
    );
};

export default MobileMenu;
