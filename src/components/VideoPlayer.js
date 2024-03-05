import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';

const VideoPlayer = ({ videoPreviewLink, children }) => {

    // Manages state for whether modal is open or closed
    const [isModalOpen, setIsModalOpen] = useState(false);
    let hoverTimeout;

    const openModal = (event) => {
        hoverTimeout = setTimeout(() => {
            setIsModalOpen(true);
        }, 100);

        event.preventDefault(); // stops page from jumping to the top after hovering over link
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeout);
        closeModal(); // Close the modal when the mouse leaves the link
    };

    // const handleTouchStart = () => {
    //     // Open the modal on touch start (for mobile devices)
    //     openModal();
    // };

        // State to track the screen width
        const [screenWidth, setScreenWidth] = useState(window.innerWidth);

        useEffect(() => {
            // Update screen width when the window is resized
            const handleResize = () => {
                setScreenWidth(window.innerWidth);
            };
    
            window.addEventListener('resize', handleResize);
    
            return () => {
                window.removeEventListener('resize', handleResize);
            };
        }, []);

        

    return (
        <>
            <a
                href="javascript:void(0);" // prevent page/scroll jump after hover
                onMouseEnter={openModal}
                onMouseLeave={handleMouseLeave}
                // onTouchStart={handleTouchStart}
            >
                {children}
            </a>

            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Video Modal"
                style={{
                    content: {
                        top: '25%',
                        left: '30%',
                        right: '30%',
                        transform: 'none',
                        border: 'none',
                        background: 'none',
                        padding: 0,
                        width: '100%',
                        maxWidth: '600px',
                        maxHeight: '90%',
                        overflow: 'hidden',
                        animationFillMode: 'forwards',
                        position: 'absolute',
                        zIndex: 2,

                        // On phone: Show modal at bottom of screen
                        ...(screenWidth <= 576 && {
                            top: 'auto',
                            bottom: '0',
                            left: '0',
                            right: '0',
                            maxWidth: '100%',
                        }),
                    },
                    overlay: {
                        backgroundColor: videoPreviewLink ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
                        animationFillMode: 'forwards',
                        zIndex: 1,
                    },
                }}
                // className="modal-mobile"
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
                    <source src={videoPreviewLink} type="video/mp4" />
                    Your browser does not support video previews. Try Safari, Chrome or Firefox instead.
                </video>
            </Modal>
        </>
    );
};

export default VideoPlayer;
