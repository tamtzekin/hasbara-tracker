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
      <div className="mobile-menu">
        <div className="hamburger-icon" onClick={openModal}>
          <div className="bar"></div>
          <div className="bar"></div>
        </div>
      </div>

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
            background: '#cbcbcb',
            padding: 20,
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
            <div class="arrow-menu"><Link onClick={closeModal}>←</Link></div>
          <Link to="/" onClick={closeModal}>
            Home
          </Link>
          <Link to="/tracker" onClick={closeModal}>
            Tracker
          </Link>
          <Link to="/volunteer" onClick={closeModal}>
            Volunteer
          </Link>
        </div>
      </Modal>
    </>
  );
};

export default MobileMenu;
