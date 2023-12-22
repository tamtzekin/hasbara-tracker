import React, { useState } from 'react';
import Modal from 'react-modal';

const VideoPlayer = ({ videoLink, children }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    let hoverTimeout;
  
    const openModal = () => {
      hoverTimeout = setTimeout(() => {
        setIsModalOpen(true);
      }, 100);
    };
  
    const closeModal = () => {
      setIsModalOpen(false);
    };
  
    const handleMouseLeave = () => {
      clearTimeout(hoverTimeout);
      closeModal(); // Close the modal when the mouse leaves the link
    };
  
    const handleTouchStart = () => {
      // Open the modal on touch start (for mobile devices)
      openModal();
    };
  
    return (
      <>
        <a
          onMouseEnter={openModal}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
        >
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
              bottom: '-1.6%',
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
          className="modal-mobile"
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
            Your browser does not support video previews.
          </video>
        </Modal>
      </>
    );
  };
  
  export default VideoPlayer;
  