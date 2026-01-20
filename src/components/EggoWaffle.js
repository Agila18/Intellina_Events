import React, { useState, useRef, useEffect } from 'react';
import './EggoWaffle.css';

const EggoWaffle = ({ onCollisionWithEleven, isLevitating, isFocused, focusStyle }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [position, setPosition] = useState({ x: 100, y: 400 });
    const [isFlying, setIsFlying] = useState(false);
    const [velocity, setVelocity] = useState({ x: 0, y: 0 });
    const [rotation, setRotation] = useState(0);

    const lastPositionRef = useRef({ x: 100, y: 400 });
    const lastTimeRef = useRef(Date.now());
    const dragStartRef = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef(null);

    // Physics constants
    const GRAVITY = 0.5; // pixels per frame squared
    const FRICTION = 0.98;
    const ROTATION_SPEED = 5;

    // Mouse/Touch down - Start dragging
    const handleMouseDown = (e) => {
        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        setIsDragging(true);
        setIsFlying(false);
        dragStartRef.current = { x: clientX, y: clientY };
        lastPositionRef.current = position;
        lastTimeRef.current = Date.now();

        // Cancel any ongoing physics animation
        if (animationFrameRef.current) {
            cancelAnimationFrame(animationFrameRef.current);
        }
    };

    // Mouse/Touch move - Update position while dragging
    const handleMouseMove = (e) => {
        if (!isDragging) return;

        e.preventDefault();
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const clientY = e.touches ? e.touches[0].clientY : e.clientY;

        const newX = clientX - 40; // Center the waffle (half of 80px)
        const newY = clientY - 40;

        setPosition({ x: newX, y: newY });

        // Calculate rotation based on movement direction
        const dx = newX - lastPositionRef.current.x;
        setRotation(prev => prev + dx * 0.5);
    };

    // Mouse/Touch up - Release and calculate throw
    const handleMouseUp = (e) => {
        if (!isDragging) return;

        setIsDragging(false);

        // Calculate velocity based on movement
        const currentTime = Date.now();
        const timeDelta = Math.max(currentTime - lastTimeRef.current, 1);

        const velocityX = (position.x - lastPositionRef.current.x) / timeDelta * 16; // Normalize to 60fps
        const velocityY = (position.y - lastPositionRef.current.y) / timeDelta * 16;

        // Only apply physics if there's significant velocity
        if (Math.abs(velocityX) > 1 || Math.abs(velocityY) > 1) {
            setVelocity({ x: velocityX, y: velocityY });
            setIsFlying(true);
        }

        lastPositionRef.current = position;
        lastTimeRef.current = currentTime;
    };

    // Physics simulation loop
    useEffect(() => {
        if (!isFlying) return;

        const animate = () => {
            setPosition(prev => {
                const newX = prev.x + velocity.x;
                const newY = prev.y + velocity.y;

                // Check collision with Eleven (center of screen, roughly)
                const elevenX = window.innerWidth / 2;
                const elevenY = window.innerHeight / 2;
                const distance = Math.sqrt(
                    Math.pow(newX + 40 - elevenX, 2) +
                    Math.pow(newY + 40 - elevenY, 2)
                );

                // Collision threshold (within ~100px of Eleven's center)
                if (distance < 120) {
                    setIsFlying(false);
                    if (onCollisionWithEleven) {
                        onCollisionWithEleven();
                    }
                    // Reset waffle to original position after a delay
                    setTimeout(() => {
                        setPosition({ x: 100, y: 400 });
                        setVelocity({ x: 0, y: 0 });
                        setRotation(0);
                    }, 500);
                    return prev;
                }

                // Boundary checks
                if (newY > window.innerHeight) {
                    setIsFlying(false);
                    // Reset to original position
                    setTimeout(() => {
                        setPosition({ x: 100, y: 400 });
                        setVelocity({ x: 0, y: 0 });
                        setRotation(0);
                    }, 300);
                    return prev;
                }

                return { x: newX, y: newY };
            });

            // Update velocity with gravity and friction
            setVelocity(prev => ({
                x: prev.x * FRICTION,
                y: prev.y + GRAVITY
            }));

            // Add rotation during flight
            setRotation(prev => prev + ROTATION_SPEED);

            // Continue animation
            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, [isFlying, velocity, onCollisionWithEleven]);

    // Global mouse/touch event listeners
    useEffect(() => {
        const handleGlobalMove = (e) => handleMouseMove(e);
        const handleGlobalUp = (e) => handleMouseUp(e);

        if (isDragging) {
            window.addEventListener('mousemove', handleGlobalMove);
            window.addEventListener('mouseup', handleGlobalUp);
            window.addEventListener('touchmove', handleGlobalMove);
            window.addEventListener('touchend', handleGlobalUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleGlobalMove);
            window.removeEventListener('mouseup', handleGlobalUp);
            window.removeEventListener('touchmove', handleGlobalMove);
            window.removeEventListener('touchend', handleGlobalUp);
        };
    }, [isDragging, position]);

    return (
        <div
            className={`eggo-waffle ${isDragging ? 'dragging' : ''} ${isFlying ? 'flying' : ''} ${isLevitating ? 'levitating' : ''}`}
            style={{
                left: `${position.x}px`,
                top: `${position.y}px`,
                transform: `rotate(${rotation}deg) scale(${isDragging ? 1.1 : 1})`,
                cursor: isDragging ? 'grabbing' : 'grab',
                ...(isFocused ? focusStyle : {})
            }}
            onMouseDown={handleMouseDown}
            onTouchStart={handleMouseDown}
        >
            <svg
                width="80"
                height="80"
                viewBox="0 0 80 80"
                xmlns="http://www.w3.org/2000/svg"
            >
                {/* Waffle body - rounded rectangle */}
                <rect
                    x="5"
                    y="5"
                    width="70"
                    height="70"
                    rx="8"
                    fill="url(#waffle-gradient)"
                    stroke="#8B6914"
                    strokeWidth="2"
                />

                {/* Waffle grid pattern (vertical lines) */}
                <line x1="20" y1="5" x2="20" y2="75" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />
                <line x1="30" y1="5" x2="30" y2="75" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />
                <line x1="40" y1="5" x2="40" y2="75" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />
                <line x1="50" y1="5" x2="50" y2="75" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />
                <line x1="60" y1="5" x2="60" y2="75" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />

                {/* Waffle grid pattern (horizontal lines) */}
                <line x1="5" y1="20" x2="75" y2="20" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />
                <line x1="5" y1="30" x2="75" y2="30" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />
                <line x1="5" y1="40" x2="75" y2="40" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />
                <line x1="5" y1="50" x2="75" y2="50" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />
                <line x1="5" y1="60" x2="75" y2="60" stroke="#8B6914" strokeWidth="1.5" opacity="0.5" />

                {/* Highlight/shine effect */}
                <ellipse
                    cx="25"
                    cy="25"
                    rx="15"
                    ry="12"
                    fill="white"
                    opacity="0.3"
                />

                {/* Gradient definition */}
                <defs>
                    <linearGradient id="waffle-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#D4A574" />
                        <stop offset="50%" stopColor="#C89858" />
                        <stop offset="100%" stopColor="#B8860B" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Drag instruction tooltip */}
            {!isDragging && !isFlying && (
                <div className="waffle-tooltip">
                    Drag & Throw! 🧇
                </div>
            )}
        </div>
    );
};

export default EggoWaffle;
