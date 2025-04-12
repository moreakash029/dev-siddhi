import { useRef, useEffect, useState } from 'react';

const Home = () => {
  const firstVideoRef = useRef(null);
  const secondVideoRef = useRef(null);
  const [activeVideo, setActiveVideo] = useState(1);
  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    // Set up event listeners for when the first video ends
    if (firstVideoRef.current) {
      firstVideoRef.current.onended = () => {
        // Hide first video, show and play second video
        setActiveVideo(2);
        
        if (secondVideoRef.current) {
          secondVideoRef.current.currentTime = 0;
          secondVideoRef.current.muted = !soundEnabled;
          secondVideoRef.current.play().catch(e => console.log("Failed to play second video:", e));
        }
      };
    }

    // Set up event listeners for when the second video ends
    if (secondVideoRef.current) {
      secondVideoRef.current.onended = () => {
        // Hide second video, show and play first video
        setActiveVideo(1);
        
        if (firstVideoRef.current) {
          firstVideoRef.current.currentTime = 0;
          firstVideoRef.current.muted = !soundEnabled;
          firstVideoRef.current.play().catch(e => console.log("Failed to play first video:", e));
        }
      };
    }

    // Try to play the first video when component mounts
    if (firstVideoRef.current) {
      firstVideoRef.current.play().catch(e => console.log("Initial play failed:", e));
    }
  }, [soundEnabled]);

  // Function to handle enabling sound
  const enableSound = () => {
    setSoundEnabled(true);
    
    // Enable sound on the currently active video
    if (activeVideo === 1 && firstVideoRef.current) {
      firstVideoRef.current.muted = false;
    } else if (activeVideo === 2 && secondVideoRef.current) {
      secondVideoRef.current.muted = false;
    }
  };

  // Add event listener for any interaction to enable sound
  useEffect(() => {
    const handleInteraction = () => {
      enableSound();
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };

    document.addEventListener('click', handleInteraction);
    document.addEventListener('touchstart', handleInteraction);

    return () => {
      document.removeEventListener('click', handleInteraction);
      document.removeEventListener('touchstart', handleInteraction);
    };
  }, [activeVideo]);

  return (
    <section className="home image" id="home">
      {/* First Video */}
      <video 
        ref={firstVideoRef}
        width="full" 
        height="full" 
        autoPlay 
        muted 
        playsInline
        preload="auto"
        style={{ display: activeVideo === 1 ? 'block' : 'none' }}
      >
      <source src="videos/fableweb.webm" type="video/webm" /> 
        Your browser does not support the video tag.
      </video>
      
      
      <video 
        ref={secondVideoRef}
        width="full" 
        height="full" 
        muted 
        playsInline
        preload="auto"
        style={{ display: activeVideo === 2 ? 'block' : 'none' }}
      >
        <source src="videos/webFeliciaWalkThrough.webm" type="video/webm" />
        Your browser does not support the video tag.
      </video>
      
      {/* CALL TO ACTION STARTS */}
      <span className="animated-layer animated-btn cta" id="cta">
        <span></span>
      </span>
      {/* CALL TO ACTION ENDS */}
    </section>
  );
};

export default Home;