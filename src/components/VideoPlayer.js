import React, { useState, useEffect, useRef } from 'react';
import Modal from 'react-modal';

const VideoPlayer = ({ videoPreviewLink, children }) => {

    // Manages state for whether modal is open or closed
    const [isModalOpen, setIsModalOpen] = useState(false);
    const hoverTimeoutRef = useRef(null);

    const openModal = (event) => {
        clearTimeout(hoverTimeoutRef.current);
        if (!videoPreviewLink) return; // Only show modal if there's actually a video
        
        hoverTimeoutRef.current = setTimeout(() => {
            setIsModalOpen(true);
        }, 150);

        event.preventDefault(); // stops page from jumping to the top after hovering over link
    };
    

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleMouseLeave = () => {
        clearTimeout(hoverTimeoutRef.current);
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
            <div
                role="button"
                tabIndex={0}
                style={{ cursor: 'pointer', display: 'inline' }}
                onMouseEnter={openModal}
                onMouseLeave={handleMouseLeave}
                onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal(e);
                    }
                }}
                // onTouchStart={handleTouchStart}
            >
                {children}
            </div>
 
            <Modal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            contentLabel="Video Modal"
            style={{
                content: {
                    transform: 'none',
                    border: 'none',
                    background: 'none',
                    padding: 0,
                    width: '100%',
                    animationFillMode: 'forwards',
                    position: 'absolute',
                    // zIndex: 20,
                    
                    // On phone: Show modal at bottom of screen
                    ...(screenWidth <= 576 && {
                        // display: 'none',
                        // top: 'auto',
                        // bottom: '0',
                        // left: '0',
                        // right: '0',
                        // maxWidth: '100%',
                        // background: 'none',
                    }),
                },
                overlay: {
                    backgroundColor: videoPreviewLink ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0)',
                    animationFillMode: 'forwards',
                    zIndex: 10,
                },
            }}
            >
                <video
                    autoPlay
                    width="100%"
                    height="100%"
                    style={{
                        position: 'relative',
                        top: '50%',
                        left: '47%',
                        transform: 'translate(-50%, -50%)',
                        zIndex: 50,
                        maxHeight: '800px',
                        maxWidth: '700px',
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
