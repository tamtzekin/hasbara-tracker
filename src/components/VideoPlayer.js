import React, { useState } from 'react';
import Modal from 'react-modal';

const VideoPlayer = ({ videoLink, externalURL, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let hoverTimeout;

  const openModal = () => {
    hoverTimeout = setTimeout(() => {
      setIsModalOpen(true);
    }, 180);
  };

  const closeModal = () => {
    clearTimeout(hoverTimeout);
    setIsModalOpen(false);

    // Navigate to the external URL when the modal is closed
    if (externalURL) {
      window.location.href = externalURL;
    }
  };

  const handleModalClick = () => {
    // Navigate to the external URL when the modal is clicked
    if (externalURL) {
      window.location.href = externalURL;
    }
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
  };

  return (
    <>
      <div onMouseEnter={openModal} onMouseLeave={handleMouseLeave}>
        {children}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Video Modal"
        style={{
          content: {
            top: 'auto',
            left: 'auto',
            right: 0,
            transform: 'none',
            border: 'none',
            background: 'none',
            padding: 0,
            width: '80%',
            maxWidth: '400px',
            maxHeight: '80%',
            overflow: 'hidden',
            animationFillMode: 'forwards',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            animationFillMode: 'forwards',
          },
        }}
      >
        <div onClick={handleModalClick}>
          <video autoPlay width="100%" height="100%" onEnded={closeModal}>
            <source src={videoLink} type="video/mp4" />
            Your browser does not support this video. Try another browser.
          </video>
        </div>
      </Modal>
    </>
  );
};

export default VideoPlayer;
