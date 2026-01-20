import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import flattenedEvents from './data/eventsData';

// Face colors - shuffled 10 red and 10 blue
const FACE_COLORS = {
    1: 'red', 2: 'blue', 3: 'red', 4: 'blue', 5: 'red',
    6: 'blue', 7: 'red', 8: 'blue', 9: 'red', 10: 'blue',
    11: 'red', 12: 'blue', 13: 'red', 14: 'blue', 15: 'red',
    16: 'blue', 17: 'red', 18: 'blue', 19: 'red', 20: 'blue'
};

const DiceRoller = ({ category = 'technical' }) => {
    const navigate = useNavigate();
    const [currentFace, setCurrentFace] = useState(1);
    const [isRolling, setIsRolling] = useState(false);
    const [showResult, setShowResult] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [showPrompt, setShowPrompt] = useState(false);
    const timeoutRef = useRef(null);

    useEffect(() => {
        // Tooltip prompt every 15 seconds
        const interval = setInterval(() => {
            setShowPrompt(true);
            setTimeout(() => setShowPrompt(false), 5000);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const randomFace = () => {
        return Math.floor(Math.random() * 20) + 1;
    };

    const handleRoll = () => {
        if (isRolling) return;

        setIsRolling(true);
        setShowResult(false);

        if (timeoutRef.current) clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => {
            const face = randomFace();
            setCurrentFace(face);
            setIsRolling(false);

            // Randomly select an event from the category using the centralized data
            const categoryEvents = flattenedEvents.filter(e => e.category === category);
            if (categoryEvents.length > 0) {
                const randomEvent = categoryEvents[Math.floor(Math.random() * categoryEvents.length)];
                setSelectedEvent(randomEvent);
                setShowResult(true);
            }
        }, 3000);
    };

    const handleViewDetails = () => {
        if (selectedEvent) {
            navigate(`/events/${selectedEvent.category}/${selectedEvent.slug}`);
            setShowResult(false);
        }
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
        };
    }, []);

    return (
        <>
            <style>{`
        @keyframes roll {
          10% { transform: rotateX(0deg) rotateY(0deg) rotateZ(0deg) }
          30% { transform: rotateX(120deg) rotateY(240deg) rotateZ(0deg) translateX(40px) translateY(40px) }
          50% { transform: rotateX(240deg) rotateY(480deg) rotateZ(0deg) translateX(-40px) translateY(-40px) }
          70% { transform: rotateX(360deg) rotateY(720deg) rotateZ(0deg) }
          90% { transform: rotateX(480deg) rotateY(960deg) rotateZ(0deg) }
        }

        @keyframes slowRotate {
          from { transform: rotateX(-30deg) rotateY(0deg); }
          to { transform: rotateX(-30deg) rotateY(360deg); }
        }

        .dice-container {
          position: fixed;
          bottom: 24px;
          right: 24px;
          z-index: 50;
          width: 200px;
          height: 200px;
          perspective: 1500px;
        }

        .die {
          position: absolute;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform 0.5s ease-out;
          cursor: pointer;
        }

        .die.idle {
          animation: slowRotate 20s linear infinite;
        }

        .die:hover {
          transform: scale(1.1);
        }

        .die.rolling {
          animation: roll 3s linear;
        }

        .die[data-face="1"] { transform: rotateX(-53deg) rotateY(0deg); }
        .die[data-face="2"] { transform: rotateX(-53deg) rotateY(72deg); }
        .die[data-face="3"] { transform: rotateX(-53deg) rotateY(144deg); }
        .die[data-face="4"] { transform: rotateX(-53deg) rotateY(216deg); }
        .die[data-face="5"] { transform: rotateX(-53deg) rotateY(288deg); }
        
        .die[data-face="6"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(0deg); }
        .die[data-face="7"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(72deg); }
        .die[data-face="8"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(144deg); }
        .die[data-face="9"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(216deg); }
        .die[data-face="10"] { transform: rotateX(-11deg) rotateZ(180deg) rotateY(288deg); }
        
        .die[data-face="11"] { transform: rotateX(-11deg) rotateY(-36deg); }
        .die[data-face="12"] { transform: rotateX(-11deg) rotateY(36deg); }
        .die[data-face="13"] { transform: rotateX(-11deg) rotateY(108deg); }
        .die[data-face="14"] { transform: rotateX(-11deg) rotateY(180deg); }
        .die[data-face="15"] { transform: rotateX(-11deg) rotateY(252deg); }
        
        .die[data-face="16"] { transform: rotateX(127deg) rotateY(-36deg); }
        .die[data-face="17"] { transform: rotateX(127deg) rotateY(36deg); }
        .die[data-face="18"] { transform: rotateX(127deg) rotateY(108deg); }
        .die[data-face="19"] { transform: rotateX(127deg) rotateY(180deg); }
        .die[data-face="20"] { transform: rotateX(127deg) rotateY(252deg); }

        .face {
          position: absolute;
          left: 50%;
          top: 0;
          margin: 0 -50px;
          border-left: 50px solid transparent;
          border-right: 50px solid transparent;
          width: 0;
          height: 0;
          transform-style: preserve-3d;
          backface-visibility: hidden;
        }

        .face.red {
          border-bottom: 86px solid rgba(220, 38, 38, 0.9);
        }

        .face.blue {
          border-bottom: 86px solid rgba(29, 78, 216, 0.9);
        }

        .face::before {
          position: absolute;
          top: 21.5px;
          left: -100px;
          color: #fff;
          text-shadow: 2px 2px 4px #000;
          font-size: 43px;
          font-weight: bold;
          text-align: center;
          line-height: 77.4px;
          width: 200px;
          height: 86px;
        }

        .face-1::before { content: '1'; }
        .face-2::before { content: '2'; }
        .face-3::before { content: '3'; }
        .face-4::before { content: '4'; }
        .face-5::before { content: '5'; }
        .face-6::before { content: '6'; }
        .face-7::before { content: '7'; }
        .face-8::before { content: '8'; }
        .face-9::before { content: '9'; }
        .face-10::before { content: '10'; }
        .face-11::before { content: '11'; }
        .face-12::before { content: '12'; }
        .face-13::before { content: '13'; }
        .face-14::before { content: '14'; }
        .face-15::before { content: '15'; }
        .face-16::before { content: '16'; }
        .face-17::before { content: '17'; }
        .face-18::before { content: '18'; }
        .face-19::before { content: '19'; }
        .face-20::before { content: '20'; }

        /* Face positions - Top ring (1-5) */
        .face-1 { transform: rotateY(0deg) translateZ(33.5px) translateY(-12.9px) rotateX(53deg); }
        .face-2 { transform: rotateY(-72deg) translateZ(33.5px) translateY(-12.9px) rotateX(53deg); }
        .face-3 { transform: rotateY(-144deg) translateZ(33.5px) translateY(-12.9px) rotateX(53deg); }
        .face-4 { transform: rotateY(-216deg) translateZ(33.5px) translateY(-12.9px) rotateX(53deg); }
        .face-5 { transform: rotateY(-288deg) translateZ(33.5px) translateY(-12.9px) rotateX(53deg); }

        /* Middle upper ring (6-10) */
        .face-6 { transform: rotateY(0deg) translateZ(75px) translateY(54.18px) rotateZ(180deg) rotateX(-11deg); }
        .face-7 { transform: rotateY(-72deg) translateZ(75px) translateY(54.18px) rotateZ(180deg) rotateX(-11deg); }
        .face-8 { transform: rotateY(-144deg) translateZ(75px) translateY(54.18px) rotateZ(180deg) rotateX(-11deg); }
        .face-9 { transform: rotateY(-216deg) translateZ(75px) translateY(54.18px) rotateZ(180deg) rotateX(-11deg); }
        .face-10 { transform: rotateY(-288deg) translateZ(75px) translateY(54.18px) rotateZ(180deg) rotateX(-11deg); }

        /* Middle lower ring (11-15) */
        .face-11 { transform: rotateY(-36deg) translateZ(75px) translateY(54.18px) rotateX(-11deg); }
        .face-12 { transform: rotateY(36deg) translateZ(75px) translateY(54.18px) rotateX(-11deg); }
        .face-13 { transform: rotateY(108deg) translateZ(75px) translateY(54.18px) rotateX(-11deg); }
        .face-14 { transform: rotateY(180deg) translateZ(75px) translateY(54.18px) rotateX(-11deg); }
        .face-15 { transform: rotateY(252deg) translateZ(75px) translateY(54.18px) rotateX(-11deg); }

        /* Bottom ring (16-20) */
        .face-16 { transform: rotateY(36deg) translateZ(33.5px) translateY(121.08px) rotateZ(180deg) rotateX(53deg); }
        .face-17 { transform: rotateY(108deg) translateZ(33.5px) translateY(121.08px) rotateZ(180deg) rotateX(53deg); }
        .face-18 { transform: rotateY(180deg) translateZ(33.5px) translateY(121.08px) rotateZ(180deg) rotateX(53deg); }
        .face-19 { transform: rotateY(252deg) translateZ(33.5px) translateY(121.08px) rotateZ(180deg) rotateX(53deg); }
        .face-20 { transform: rotateY(324deg) translateZ(33.5px) translateY(121.08px) rotateZ(180deg) rotateX(53deg); }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-scaleIn {
          animation: scaleIn 0.4s ease-out;
        }
      `}</style>

            {/* Dice Tooltip Prompt */}
            {showPrompt && !isRolling && !showResult && (
                <div className="fixed bottom-[200px] right-[40px] z-50 animate-fadeIn">
                    <div className="bg-white text-gray-900 px-4 py-2 rounded-2xl shadow-xl relative">
                        <p className="text-sm font-bold whitespace-nowrap">Click me to know your lucky event!</p>
                        <div className="absolute bottom-[-8px] right-[40px] w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white"></div>
                    </div>
                </div>
            )}

            {/* Dice in bottom right corner */}
            <div className="dice-container">
                <div
                    className={`die ${isRolling ? 'rolling' : 'idle'}`}
                    data-face={currentFace}
                    onClick={handleRoll}
                >
                    {Array.from({ length: 20 }, (_, i) => i + 1).map(num => (
                        <div
                            key={num}
                            className={`face face-${num} ${FACE_COLORS[num]}`}
                        />
                    ))}
                </div>
            </div>

            {/* Result Modal */}
            {showResult && selectedEvent && (
                <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 animate-fadeIn">
                    <div className="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 rounded-2xl p-8 max-w-md w-full mx-4 border-2 border-purple-500 shadow-2xl animate-scaleIn">
                        <div className="text-center">
                            <div className="text-yellow-400 text-5xl mb-4">🎲</div>
                            <h2 className="text-white text-2xl font-bold mb-2">Your Lucky Event is:</h2>
                            <h3 className="text-yellow-300 text-3xl font-extrabold mb-4">{selectedEvent.title}</h3>
                            <p className="text-gray-300 text-sm mb-4 leading-relaxed">{selectedEvent.description}</p>
                            <div className="bg-red-600 bg-opacity-20 border border-red-500 rounded-lg p-3 mb-6">
                                <p className="text-white text-xs uppercase tracking-wide mb-1">Prizes Worth</p>
                                <p className="text-red-400 text-2xl font-bold">₹ {selectedEvent.prizes} *</p>
                            </div>
                            <div className="flex gap-3">
                                <button
                                    onClick={handleViewDetails}
                                    className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105"
                                >
                                    View Details
                                </button>
                                <button
                                    onClick={() => setShowResult(false)}
                                    className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
                                >
                                    Close
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default DiceRoller;