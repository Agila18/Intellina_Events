import React, { useState, useEffect, useRef } from 'react';
import './WalkieTalkie.css';

const WalkieTalkie = ({ isActive, onComplete, character, audioSrc, subtitle }) => {
    const [status, setStatus] = useState('idle'); // idle, transmitting
    const [currentSubtitle, setCurrentSubtitle] = useState('');
    const [showSubtitle, setShowSubtitle] = useState(false);
    const audioRef = useRef(null);
    const isMounted = useRef(true);

    useEffect(() => {
        return () => { isMounted.current = false; };
    }, []);

    useEffect(() => {
        if (isActive) {
            startTransmission();
        }
    }, [isActive]);

    const playAudio = (src) => {
        return new Promise((resolve, reject) => {
            const audio = new Audio(src);
            audio.onended = resolve;
            audio.onerror = () => {
                console.warn(`Audio missing: ${src}`);
                // If audio fails, simulate a small delay or resolve immediately
                // We rely on subtitle typing for main duration if audio missing
                resolve();
            };
            audio.play().catch(e => {
                console.warn("Audio play failed (interaction policy?):", e);
                resolve();
            });
        });
    };

    const typeWriter = async (text) => {
        if (!text) return;
        setShowSubtitle(true);
        setCurrentSubtitle('');
        for (let i = 0; i < text.length; i++) {
            if (!isMounted.current) break;
            setCurrentSubtitle(prev => prev + text.charAt(i));
            await new Promise(r => setTimeout(r, 50)); // Slightly slower typing for readability
        }
        // Hold the text for a moment after typing
        await new Promise(r => setTimeout(r, 1000));
    };

    const startTransmission = async () => {
        setStatus('transmitting');

        try {
            // Sequence:
            // 1. Click
            await playAudio('/assets/audio/walkie-click.mp3');

            // 2. Squelch + Static start
            const staticAudio = new Audio('/assets/audio/walkie-static-loop.mp3');
            staticAudio.loop = true;
            staticAudio.volume = 0.2;
            staticAudio.play().catch(() => { });

            await playAudio('/assets/audio/walkie-squelch.mp3');

            // 3. Voice + Subtitle
            // Run subtitle concurrently with voice, but await BOTH
            // This ensures that even if audio is missing, we wait for the text to type out
            await Promise.all([
                typeWriter(subtitle),
                playAudio(audioSrc)
            ]);

            // 4. End transmission
            if (isMounted.current) {
                staticAudio.pause();
                await playAudio('/assets/audio/walkie-squelch.mp3'); // Squelch out
            }

        } catch (err) {
            console.error("Transmission error:", err);
        }

        if (isMounted.current) {
            setStatus('idle');
            if (onComplete) onComplete();
        }
    };

    return (
        <div className={`walkie-talkie-container ${isActive ? 'active' : ''}`}>
            <div className="walkie-body">
                <div className="antenna"></div>
                <div className="signal-bars">
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                <div className="speaker-grill"></div>
                <div className={`led-indicator ${status === 'transmitting' ? 'on' : ''}`}></div>
                <div className="brand-label">StrangerCom</div>
                <div className={`ptt-button ${status === 'transmitting' ? 'pressed' : ''}`}></div>
            </div>

            {showSubtitle && (
                <div className="transmission-subtitle">
                    <span className="character-name">{character}:</span> {currentSubtitle}
                </div>
            )}
        </div>
    );
};

export default WalkieTalkie;
