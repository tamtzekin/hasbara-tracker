import React, { useState } from 'react';
import Modal from 'react-modal';

const VideoPlayer = ({ videoLink, children }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div onMouseEnter={openModal}>
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
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
            animationFillMode: 'forwards',
          },
        }}
      >
        {/* <button onClick={closeModal}>Close</button> */}
        <video autoPlay width="100%" height="100%" onEnded={closeModal}>
          <source src={videoLink} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </Modal>
    </>
  );
};

export default VideoPlayer;
