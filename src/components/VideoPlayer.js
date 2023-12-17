import React, { useState } from 'react';
import Modal from 'react-modal';
import './VideoPlayer.css';

const VideoPlayer = ({ videoLink, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  let hoverTimeout;

  const openModal = () => {
    hoverTimeout = setTimeout(() => {
      setIsModalOpen(true);
    }, 100);
  };

  const closeModal = () => {
    clearTimeout(hoverTimeout);
    setIsModalOpen(false);
  };

  const handleMouseLeave = () => {
    clearTimeout(hoverTimeout);
    closeModal(); // Close the modal when mouse leaves the link
  };

  return (
    <>
      <a onMouseEnter={openModal} onMouseLeave={handleMouseLeave}>
        {children}
      </a>

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
            position: 'absolute',
            zIndex: 2,
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0)',
            animationFillMode: 'forwards',
            zIndex: 1,
          },
        }}
      >
        <video
          autoPlay
          width="100%"
          height="100%"
          style={{
            position: 'relative',
            zIndex: 3,
          }}
          onEnded={closeModal}
        >
          <source src={videoLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </>
  );
};

export default VideoPlayer;