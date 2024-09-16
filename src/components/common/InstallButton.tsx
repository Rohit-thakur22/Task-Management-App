import React, { useEffect, useState } from 'react';

const InstallButton: React.FC = () => {
    const [deferredPrompt, setDeferredPrompt] = useState<Event | null>(null);
  
    useEffect(() => {
      window.addEventListener('beforeinstallprompt', (e: Event) => {
        e.preventDefault();
        setDeferredPrompt(e); // Store the event
      });
    }, []);
  
    const handleInstallClick = () => {
      if (deferredPrompt) {
        const promptEvent = deferredPrompt as any;
        promptEvent.prompt(); // Show the prompt
        promptEvent.userChoice.then((choiceResult: any) => {
          if (choiceResult.outcome === 'accepted') {
            console.log('User accepted the A2HS prompt');
          } else {
            console.log('User dismissed the A2HS prompt');
          }
          setDeferredPrompt(null); // Clear the prompt
        });
      }
    };
  
    return (
      <button id="installButton" onClick={handleInstallClick}>
        Add to Home Screen
      </button>
    );
  };
  
  export default InstallButton;
  
