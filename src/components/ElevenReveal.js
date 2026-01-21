import React, { useState, useEffect } from 'react';
import './ElevenReveal.css';
import ElevenCharacter from './ElevenCharacter';
import EggoWaffle from './EggoWaffle';
import WalkieTalkieSimple from './WalkieTalkieSimple';

const flagshipEvents = [
    {
        id: 'event-1',
        title: 'Intellina Tech Summit 2026',
        description: 'Exploring the frontiers of agentic AI and decentralised infrastructure.',
        date: 'March 15-17, 2026'
    },
    {
        id: 'event-2',
        title: 'Neural Web Hackathon',
        description: 'Build the next generation of autonomous web applications.',
        date: 'April 22, 2026'
    },
    {
        id: 'event-3',
        title: 'Stranger AI Conference',
        description: 'Where pop culture meets cutting edge technology.',
        date: 'May 11, 2026'
    }
];

const EventCard = ({ event, delay }) => {
    return (
        <div
            className="event-card"
            style={{
                background: 'rgba(74, 144, 226, 0.1)',
                border: '1px solid rgba(74, 144, 226, 0.3)',
                borderRadius: '8px',
                padding: '15px',
                animation: `slideIn 0.5s ease-out ${delay}ms both`,
                transition: 'all 0.3s ease',
                cursor: 'pointer',
            }}
        >
            <h3 style={{
                color: '#ffffff',
                fontSize: '18px',
                fontWeight: '600',
                marginBottom: '8px'
            }}>
                {event.title}
            </h3>

            <p style={{
                color: 'rgba(255, 255, 255, 0.7)',
                fontSize: '14px',
                marginBottom: '8px'
            }}>
                {event.description}
            </p>

            <div style={{
                color: 'rgba(74, 144, 226, 0.9)',
                fontSize: '12px',
                fontWeight: '500'
            }}>
                {event.date}
            </div>
        </div>
    );
};

const EventScroll = ({ unfurled, showEvents }) => {
    return (
        <div className={`event-scroll ${unfurled ? 'unfurled' : ''}`} style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '600px',
            maxHeight: '80vh',
            background: 'linear-gradient(135deg, rgba(26, 31, 58, 0.95), rgba(10, 14, 39, 0.95))',
            border: '3px solid rgba(74, 144, 226, 0.6)',
            borderRadius: '12px',
            padding: '30px',
            boxShadow: `
                0 0 30px rgba(74, 144, 226, 0.5),
                inset 0 0 20px rgba(74, 144, 226, 0.1)
            `,
            zIndex: 1000,
            overflow: 'hidden',
            display: unfurled ? 'block' : 'none',
            animation: 'unfurl 1s ease-out'
        }}>

            <h2 style={{
                color: '#ffffff',
                fontSize: '28px',
                fontWeight: '700',
                textAlign: 'center',
                marginBottom: '20px',
                textShadow: '0 0 10px rgba(109, 213, 237, 0.8)'
            }}>
                Flagship Events
            </h2>

            <div style={{
                display: 'grid',
                gap: '15px',
                overflowY: 'auto',
                maxHeight: 'calc(80vh - 100px)',
                opacity: showEvents ? 1 : 0,
                transition: 'opacity 0.5s ease'
            }}>
                {showEvents && flagshipEvents.map((event, index) => (
                    <EventCard
                        key={event.id}
                        event={event}
                        delay={index * 150}
                    />
                ))}
            </div>
        </div>
    );
};

const ElevenReveal = ({ onComplete }) => {
    // ==================== STATE MANAGEMENT ====================

    // Main progression states
    const [elevenState, setElevenState] = useState('meditating');
    // States: 'meditating' | 'disturbed' | 'awakening' | 'conscious' | 'revealing'

    // Interaction tracking
    const [attempts, setAttempts] = useState(0);
    const [showHint, setShowHint] = useState(false);
    const [eventsUnlocked, setEventsUnlocked] = useState(false);
    const [isInteracting, setIsInteracting] = useState(false);

    // Interactive object states
    const [wafflePosition, setWafflePosition] = useState({ x: 0, y: 0 });
    const [walkieTalkieActive, setWalkieTalkieActive] = useState(false);
    const [elevenAnimState, setElevenAnimState] = useState(null);
    const [waffleAnimState, setWaffleAnimState] = useState(null);
    const [isScreenFlashing, setIsScreenFlashing] = useState(false);
    const [isBursting, setIsBursting] = useState(false);
    const [palmParticles, setPalmParticles] = useState([]);

    // Success Sequence States
    const [portalStabilized, setPortalStabilized] = useState(false);
    const [scrollEmerging, setScrollEmerging] = useState(false);
    const [scrollUnfurled, setScrollUnfurled] = useState(false);
    const [showEvents, setShowEvents] = useState(false);
    const [isFadingOut, setIsFadingOut] = useState(false);

    const [focusedItem, setFocusedItem] = useState('waffle');
    const [speechMessage, setSpeechMessage] = useState(null);
    const [speechTimer, setSpeechTimer] = useState(null);

    const focusStyle = {
        outline: '3px solid rgba(255, 215, 0, 0.8)',
        outlineOffset: '4px',
        boxShadow: '0 0 20px rgba(255, 215, 0, 0.6)'
    };

    // Accessibility & Responsiveness Helpers
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const useBreakpoint = () => {
        const [breakpoint, setBreakpoint] = useState('desktop');
        useEffect(() => {
            const updateBreakpoint = () => {
                if (window.matchMedia('(max-width: 767px)').matches) setBreakpoint('mobile');
                else if (window.matchMedia('(min-width: 768px) and (max-width: 1023px)').matches) setBreakpoint('tablet');
                else setBreakpoint('desktop');
            };
            updateBreakpoint();
            window.addEventListener('resize', updateBreakpoint);
            return () => window.removeEventListener('resize', updateBreakpoint);
        }, []);
        return breakpoint;
    };

    const breakpoint = useBreakpoint();

    const KeyboardControls = () => {
        useEffect(() => {
            const handleKeyPress = (e) => {
                switch (e.key) {
                    case 'Tab':
                        e.preventDefault();
                        setFocusedItem(prev => {
                            if (prev === 'waffle') return 'walkie';
                            if (prev === 'walkie') return 'skip';
                            return 'waffle';
                        });
                        break;
                    case 'Enter':
                    case ' ':
                        e.preventDefault();
                        if (focusedItem === 'waffle') handleWaffleCollision();
                        else if (focusedItem === 'walkie') handleWalkieTalkieClick();
                        else if (focusedItem === 'skip') handleSkip();
                        break;
                    case 'Escape':
                        e.preventDefault();
                        handleSkip();
                        break;
                    default:
                        break;
                }
            };
            window.addEventListener('keydown', handleKeyPress);
            return () => window.removeEventListener('keydown', handleKeyPress);
        }, [focusedItem]);
        return null;
    };

    // ==================== PARTICLE GENERATION ====================

    // Generate random particles for the void
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const generateParticles = () => {
            const particleArray = [];
            const particleCount = Math.floor(Math.random() * 31) + 50; // 50-80 particles

            for (let i = 0; i < particleCount; i++) {
                particleArray.push({
                    id: i,
                    x: Math.random() * 100, // Percentage
                    y: Math.random() * 100,
                    size: Math.random() * 2 + 1, // 1-3px
                    opacity: Math.random() * 0.4 + 0.3, // 0.3-0.7
                    duration: Math.random() * 10 + 15, // 15-25s drift
                    delay: Math.random() * 5 // 0-5s delay
                });
            }

            setParticles(particleArray);
        };

        generateParticles();
    }, []);

    // Generate floating light particles (orbs)
    const [floatingOrbs, setFloatingOrbs] = useState([]);

    useEffect(() => {
        const generateFloatingOrbs = () => {
            const orbArray = [];
            const orbCount = Math.floor(Math.random() * 11) + 20; // 20-30 orbs
            const colors = ['#ffffff', '#6dd5ed', '#8b7ec8']; // white, light blue, light purple

            for (let i = 0; i < orbCount; i++) {
                orbArray.push({
                    id: i,
                    x: Math.random() * 100, // Percentage
                    y: Math.random() * 120 + 20, // Start below viewport (20-140%)
                    size: Math.random() * 2 + 2, // 2-4px
                    color: colors[Math.floor(Math.random() * colors.length)],
                    speed: Math.random() * 0.5 + 0.5, // 0.5-1px per second (converted to duration)
                    wobbleAmount: Math.random() * 20 + 10, // 10-30px horizontal wobble
                    wobbleDuration: Math.random() * 3 + 2, // 2-5s wobble cycle
                    fadeDelay: Math.random() * 5, // 0-5s fade delay
                    fadeDuration: Math.random() * 2 + 2, // 2-4s fade cycle
                    opacity: Math.random() * 0.4 + 0.4 // 0.4-0.8 base opacity
                });
            }

            setFloatingOrbs(orbArray);
        };

        generateFloatingOrbs();
    }, []);

    // ==================== PALM PARTICLES LOGIC ====================
    useEffect(() => {
        if (elevenAnimState !== 'awakened-idle') {
            if (palmParticles.length > 0) setPalmParticles([]);
            return;
        }

        const interval = setInterval(() => {
            const side = Math.random() > 0.5 ? 'left' : 'right';
            const id = `palm-${Date.now()}-${Math.random()}`;

            // Positions relative to the character-container center
            const xBase = side === 'left' ? 44 : 56;
            const yBase = 53;

            const newParticle = {
                id,
                side,
                x: xBase + (Math.random() * 4 - 2),
                y: yBase + (Math.random() * 2 - 1),
                vx: (Math.random() - 0.5) * 1.5, // Horizontal velocity
                vy: -(Math.random() * 2 + 2),    // Upward velocity
                size: Math.random() * 3 + 2,
                duration: 1.5 + Math.random(),
                color: Math.random() > 0.6 ? '#6dd5ed' : (Math.random() > 0.5 ? '#8b7ec8' : '#ffffff'),
                delay: 0
            };

            setPalmParticles(prev => [...prev, newParticle].slice(-30)); // Keep last 30
        }, 100);

        return () => clearInterval(interval);
    }, [elevenAnimState, palmParticles.length]);

    // ==================== EVENT HANDLERS ====================

    const showSpeech = (message, duration = 3000) => {
        if (speechTimer) clearTimeout(speechTimer);
        setSpeechMessage(message);
        const timer = setTimeout(() => {
            setSpeechMessage(null);
        }, duration);
        setSpeechTimer(timer);
    };

    const handleWaffleCollision = () => {
        if (isInteracting) return;

        setIsInteracting(true);
        setElevenState('disturbed');
        setAttempts(prev => prev + 1);

        // Character reaction
        showSpeech("Nah, 5 more minutes...", 2500);

        // Create telekinetic ripple at impact point (center of screen)
        createTelekineticRipple();

        // Show hint/skip after first attempt
        if (attempts >= 0) {
            setShowHint(true);
        }

        // Reset to meditating after a moment
        setTimeout(() => {
            setElevenState('meditating');
            setIsInteracting(false);
        }, 3000);
    };

    const handleWalkieTalkieClick = () => {
        activateWalkieTalkie();
    };

    const handleSkip = () => {
        if (isInteracting) return;
        setIsInteracting(true);
        setShowHint(false);

        // Start Success Sequence for event reveal immediately
        startSuccessSequence();
    };

    const activateWalkieTalkie = () => {
        if (isInteracting) return;

        setIsInteracting(true);
        setWalkieTalkieActive(true);
        setShowHint(false); // Hide hint once they've found the solution

        // Visual: Walkie-talkie lights up
        // Sound sequence:

        // 1. Static crackle (0s)
        playSound('walkie-static');

        // 2. Mike's voice (0.5s)
        setTimeout(() => {
            playSound('mike-voice-el-we-need-you');
            // Duration: ~2 seconds
        }, 500);

        // 3. Eleven reacts (1s)
        setTimeout(() => {
            setElevenState('awakening');

            // Immediate reaction:
            // - Eyes snap open behind blindfold (glow visible)
            // - Sharp intake of breath (scale up quickly)
            // - Psychic energy pulse outward

            createPsychicShockwave();
            playSound('psychic-gasp');
        }, 1000);

        // 4. Full awakening sequence (2.5s)
        setTimeout(() => {
            setElevenState('conscious');
            showSpeech("yeah i am here, explore events", 4000);
            startAwakeningSequence();
        }, 2500);
    };

    const createDimensionalRift = () => {
        console.log("Creating Dimensional Rift...");

        // Phase 1: Crack formation (0-1s)
        setRiftState('crack');

        // Phase 2: Portal opening (1-2s)
        setTimeout(() => {
            setRiftState('opening');
        }, 1000);

        // Phase 3: Stabilization (2-3s)
        setTimeout(() => {
            setRiftState('stable');
        }, 2000);
    };

    const playSound = (soundName) => {
        console.log(`🔊 Playing sound: ${soundName}`);

        // Use Web Audio API for placeholder sounds
        try {
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            if (soundName === 'walkie-static') {
                oscillator.type = 'square';
                oscillator.frequency.value = 200;
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 0.3);
            } else if (soundName === 'mike-voice-el-we-need-you') {
                oscillator.type = 'sine';
                oscillator.frequency.value = 300;
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 2);
            } else if (soundName === 'psychic-gasp') {
                oscillator.type = 'sawtooth';
                oscillator.frequency.value = 400;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);
                oscillator.start();
            } else if (soundName === 'power-rising-hum') {
                oscillator.type = 'sine';
                oscillator.frequency.value = 100;
                gainNode.gain.setValueAtTime(0, audioContext.currentTime);
                gainNode.gain.linearRampToValueAtTime(0.1, audioContext.currentTime + 2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 3);
            } else if (soundName === 'rift-opening') {
                oscillator.type = 'sawtooth';
                oscillator.frequency.value = 50;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 1);
            } else if (soundName === 'mystical-chime') {
                oscillator.type = 'triangle';
                oscillator.frequency.value = 880;
                gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 2);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 2);
            } else if (soundName === 'success-synth') {
                oscillator.type = 'square';
                oscillator.frequency.value = 440;
                gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);
                oscillator.start();
                oscillator.stop(audioContext.currentTime + 1);
            }
        } catch (e) {
            console.error('AudioContext failed', e);
        }
    };

    const createExpandingRing = (color) => {
        const container = document.querySelector('.eleven-container');
        if (!container) return;

        const ring = document.createElement('div');
        ring.className = 'shockwave-ring';

        const colorMap = {
            'psychic-blue': '#6dd5ed',
            'psychic-purple': '#8b7ec8',
            'psychic-pink': '#c77dbd'
        };

        ring.style.setProperty('--ring-color', colorMap[color] || color);
        container.appendChild(ring);

        setTimeout(() => ring.remove(), 1300);
    };

    const createPsychicShockwave = () => {
        // Multiple expanding rings
        const rings = [
            { delay: 0, color: 'psychic-blue' },
            { delay: 150, color: 'psychic-purple' },
            { delay: 300, color: 'psychic-pink' }
        ];

        rings.forEach(ring => {
            setTimeout(() => {
                createExpandingRing(ring.color);
            }, ring.delay);
        });

        // Screen Effects
        const container = document.querySelector('.eleven-container');
        if (container) {
            container.classList.add('screen-shake');
            setTimeout(() => container.classList.remove('screen-shake'), 300);

            container.style.transition = 'filter 0.1s ease';
            container.style.filter = 'blur(4px)';
            setTimeout(() => {
                container.style.filter = 'none';
            }, 200);
        }

        setIsScreenFlashing(true);
        setTimeout(() => setIsScreenFlashing(false), 400);

        setIsBursting(true);
        setTimeout(() => setIsBursting(false), 1200);
    };

    const startAwakeningSequence = () => {
        // Detailed 4-second awakening sequence

        // 1. Eyes glow (0s)
        setElevenAnimState('eyes-glow');

        // 2. Sharp breath (0.2s)
        setTimeout(() => {
            setElevenAnimState('sharp-breath');
        }, 200);

        // 3. Psychic burst & Screen flash (0.5s)
        setTimeout(() => {
            setElevenAnimState('psychic-burst');
            setIsScreenFlashing(true);
            setIsBursting(true);
            createPsychicShockwave();

            setTimeout(() => setIsScreenFlashing(false), 300);
            setTimeout(() => setIsBursting(false), 1000);
        }, 500);

        // 4. Hair movement (1.0s)
        setTimeout(() => {
            setElevenAnimState('hair-lift');
        }, 1000);

        // 5. Arms raise (2.0s)
        setTimeout(() => {
            setElevenAnimState('arms-raise-power');
        }, 2000);

        // 6. Stand/Float up (3.0s)
        setTimeout(() => {
            setElevenAnimState('stand-up');
        }, 3000);

        // Transition to Awakened Idle (4.0s)
        setTimeout(() => {
            setElevenAnimState('awakened-idle');
        }, 4000);

        // Trigger telekinesis sequence after awakening climax (5.5s)
        setTimeout(() => {
            triggerTelekinesisSequence();
        }, 5500);
    };

    const triggerTelekinesisSequence = () => {
        console.log("Starting telekinesis sequence...");

        // 1. Head tilt (0-0.3s) - REMOVED
        // setElevenAnimState('head-tilt');

        // 2. Hand raise (0.3-0.8s)
        setTimeout(() => {
            setElevenAnimState('hand-raise');
        }, 300);

        // 3. Waffle levitation (0.8-1.5s)
        // setTimeout(() => {
        //     setWaffleAnimState('levitating');
        // }, 800);

        // 4. Waffle settles (1.5-2.0s)
        setTimeout(() => {
            setWaffleAnimState('settling');
        }, 1500);

        // 5. Return to rest (2.0-3.0s)
        setTimeout(() => {
            setElevenAnimState('rest');
            setWaffleAnimState(null);

            // Completion logic
            setTimeout(() => {
                setElevenState('revealing');
                setEventsUnlocked(true);
                setIsInteracting(false);

                // Start Success Sequence for event reveal
                startSuccessSequence();
            }, 1000);
        }, 2000);
    };

    const [riftState, setRiftState] = useState(null); // 'crack' | 'opening' | 'stable'

    const startSuccessSequence = () => {
        console.log("Starting Success Sequence...");
        // Total duration: ~8 seconds

        // Step 1: Eleven stands and powers up (0-2s)
        setElevenState('conscious');
        setElevenAnimState('stand-up');
        playSound('power-rising-hum');

        // Step 2: Arms extend forward (2-3s)
        setTimeout(() => {
            setElevenAnimState('arms-extend');
            // Intensify aura (visualized through faster rings/particles if needed)
        }, 2000);

        // Step 3: Dimensional rift begins (3-4s)
        setTimeout(() => {
            createDimensionalRift();
            playSound('rift-opening');
        }, 3000);

        // Step 4: Portal fully opens (4-5s)
        setTimeout(() => {
            setPortalStabilized(true);
        }, 4000);

        // Step 5: Event scroll emerges (5-6s)
        setTimeout(() => {
            setScrollEmerging(true);
            playSound('mystical-chime');
        }, 5000);

        // Step 6: Scroll unfurls (6-7s)
        setTimeout(() => {
            setScrollUnfurled(true);
            setElevenState('revealing');
        }, 6000);

        // Step 7: Events appear (7-8s)
        setTimeout(() => {
            setShowEvents(true);
            playSound('success-synth'); // 80s style
        }, 7000);

        // Step 8: Transition complete (8s)
        setTimeout(() => {
            setEventsUnlocked(true);
            setIsFadingOut(true);

            // Call onComplete after fade out animation finished (approx 2s)
            setTimeout(() => {
                if (onComplete) onComplete();
            }, 2000);
        }, 8000);
    };

    const initiateSuccessSequence = () => {
        // No longer used, replaced by activateWalkieTalkie
    };

    const createTelekineticRipple = () => {
        // Impact point: Eleven's general center area
        const container = document.querySelector('.eleven-container');
        if (!container) return;

        const ripple = document.createElement('div');
        ripple.className = 'telekinetic-ripple';

        // Settings from user request
        const initialSize = 20;
        const finalSize = 200;
        const duration = 1000; // 1s

        // Position at Eleven's center
        ripple.style.left = '50%';
        ripple.style.top = '50%';

        ripple.style.setProperty('--initial-size', `${initialSize}px`);
        ripple.style.setProperty('--final-size', `${finalSize}px`);
        ripple.style.setProperty('--ripple-duration', `${duration}ms`);

        container.appendChild(ripple);

        // Play subtle psychic sound if appropriate
        playSound('psychic-gasp'); // Reusing gasp for subtle impact effect

        // Remove after completion
        setTimeout(() => {
            ripple.remove();
        }, duration + 100);
    };

    // ==================== RENDER ====================

    return (
        <div
            className={`eleven-container ${isBursting ? 'bursting' : ''}`}
            role="application"
            aria-label="Wake Up Eleven - Interactive Event Unlock"
        >
            {isScreenFlashing && <div className="screen-flash" />}

            {/* SVG Filter for refined static noise */}
            <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                <defs>
                    <filter id="tv-static">
                        <feTurbulence
                            type="fractalNoise"
                            baseFrequency="0.9"
                            numOctaves="4"
                            seed="0"
                        >
                            <animate
                                attributeName="seed"
                                from="0"
                                to="100"
                                dur="0.3s"
                                repeatCount="indefinite"
                            />
                        </feTurbulence>
                        <feColorMatrix type="saturate" values="0" />
                        <feComponentTransfer>
                            <feFuncA type="discrete" tableValues="0 1" />
                        </feComponentTransfer>
                    </filter>
                </defs>
            </svg>

            {/* Void Background Layer */}
            <div className="void-background">
                <div className="noise-overlay"></div>
                <div className="tv-static"></div>
            </div>

            {/* Particle Field */}
            <div className="particle-field">
                {particles.map(particle => (
                    <div
                        key={particle.id}
                        className="particle"
                        style={{
                            left: `${particle.x}%`,
                            top: `${particle.y}%`,
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            opacity: particle.opacity,
                            animationDuration: `${particle.duration}s`,
                            animationDelay: `${particle.delay}s`
                        }}
                    />
                ))}
            </div>

            {/* Floating Light Particles (Orbs) */}
            <div className="floating-orbs">
                {floatingOrbs.map(orb => (
                    <div
                        key={`orb-${orb.id}`}
                        className="light-orb"
                        style={{
                            left: `${orb.x}%`,
                            bottom: `${orb.y}%`,
                            width: `${orb.size}px`,
                            height: `${orb.size}px`,
                            background: orb.color,
                            '--rise-duration': `${120 / orb.speed}s`, // Convert speed to duration
                            '--wobble-amount': `${orb.wobbleAmount}px`,
                            '--wobble-duration': `${orb.wobbleDuration}s`,
                            '--fade-delay': `${orb.fadeDelay}s`,
                            '--fade-duration': `${orb.fadeDuration}s`,
                            '--base-opacity': orb.opacity
                        }}
                    />
                ))}
            </div>

            {/* Psychic Energy Rings */}
            <div className="psychic-rings">
                <div className="energy-ring ring-1"></div>
                <div className="energy-ring ring-2"></div>
                <div className="energy-ring ring-3"></div>
            </div>

            {/* Dimensional Rift Portal */}
            {riftState && (
                <div className={`dimensional-rift ${portalStabilized ? 'stable' : ''} ${isFadingOut ? 'fade-out-sequence' : ''}`}>
                    <div className={`rift-crack ${riftState === 'crack' ? 'active' : ''}`} />
                    <div className={`rift-portal ${riftState === 'opening' || riftState === 'stable' ? 'active' : ''}`}>
                        <div className="vortex" />
                        <div className="portal-glow" />
                    </div>
                </div>
            )}

            {/* Event Scroll Reveal */}
            {scrollEmerging && (
                <EventScroll unfurled={scrollUnfurled} showEvents={showEvents} />
            )}

            {/* Floor Glow */}
            <div className="floor-glow"></div>

            {/* Eleven Character */}
            <div
                className={`character-container ${isFadingOut ? 'fade-out-sequence' : ''}`}
                aria-label="Eleven meditating in psychic trance"
                aria-live="polite"
                aria-atomic="true"
            >
                {elevenState === 'meditating' && <span className="sr-only">Eleven is in deep meditation</span>}
                {elevenState === 'disturbed' && <span className="sr-only">Eleven stirs slightly</span>}
                {elevenState === 'conscious' && <span className="sr-only">Eleven is awake and channeling psychic energy</span>}

                <ElevenCharacter
                    elevenState={elevenState}
                    animationState={elevenAnimState}
                />

                {/* Palm Emanation Particles */}
                {palmParticles.map(p => (
                    <div
                        key={p.id}
                        className={`palm-particle ${p.side}`}
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: `${p.size}px`,
                            height: `${p.size}px`,
                            '--vx': p.vx,
                            '--vy': p.vy,
                            '--particle-duration': `${p.duration}s`,
                            '--particle-color': p.color
                        }}
                    />
                ))}
            </div>

            {/* Main Content */}
            <div className={`eleven-scene ${isFadingOut ? 'fade-out-sequence' : ''}`}>
                <KeyboardControls />
                {/* Skip Button */}
                {showHint && !eventsUnlocked && !isInteracting && (
                    <button
                        className={`skip-button ${focusedItem === 'skip' ? 'focused' : ''}`}
                        onClick={handleSkip}
                        style={focusedItem === 'skip' ? focusStyle : {}}
                        aria-label="Skip to flagship events"
                    >
                        Skip to Events →
                    </button>
                )}

                {/* Hint Overlay */}
                {showHint && !eventsUnlocked && !isInteracting && (
                    <div className="hint-overlay">
                        <div className="hint-text">Perhaps something that calls to her...</div>
                        <div className="walkie-pulsar"></div>
                    </div>
                )}

                <div className="state-indicator">
                    State: {elevenState} | Attempts: {attempts}
                </div>

                {/* Speech Bubble */}
                {speechMessage && (
                    <div className="speech-bubble">
                        {speechMessage}
                    </div>
                )}

                {/* Interactive Objects */}
                <EggoWaffle
                    onCollisionWithEleven={handleWaffleCollision}
                    isLevitating={waffleAnimState === 'levitating' || waffleAnimState === 'settling'}
                    animationState={waffleAnimState}
                    isFocused={focusedItem === 'waffle'}
                    focusStyle={focusStyle}
                />
                <WalkieTalkieSimple
                    onActivate={handleWalkieTalkieClick}
                    isUsed={eventsUnlocked}
                    showHint={showHint}
                    isFocused={focusedItem === 'walkie'}
                    focusStyle={focusStyle}
                />
            </div>
        </div>
    );
};

export default ElevenReveal;
