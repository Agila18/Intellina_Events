import React from 'react';
import './ElevenCharacter.css';

const ElevenCharacter = ({ elevenState, animationState }) => {
    return (
        <svg
            className={`eleven-character ${elevenState} ${animationState ? `anim-${animationState}` : ''}`}
            viewBox="0 0 200 300"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* BODY - Sitting cross-legged */}

            {/* Left Leg (cross-legged) */}
            <path
                className="leg"
                d="M 85 180 Q 70 190, 60 195 L 90 200 Q 95 195, 100 190 Z"
                fill="#4a5568"
            />

            {/* Right Leg (cross-legged) */}
            <path
                className="leg leg-sitting right-leg-sitting"
                d="M 115 180 Q 130 190, 140 195 L 110 200 Q 105 195, 100 190 Z"
                fill="#3a4558"
            />

            {/* Standing Legs (initially hidden) */}
            <g className="stand-leg" style={{ opacity: 0 }}>
                <rect x="85" y="180" width="12" height="60" rx="4" fill="#5a6c7d" />
                <rect x="103" y="180" width="12" height="60" rx="4" fill="#4a5a6a" />
            </g>

            {/* Jeans (lower body) */}
            <rect
                className="jeans"
                x="80"
                y="160"
                width="40"
                height="30"
                rx="5"
                fill="#5a6c7d"
            />

            {/* Torso - Tank top */}
            <rect
                className="tank-top"
                x="75"
                y="120"
                width="50"
                height="45"
                rx="8"
                fill="#f4c2d4"
            />

            {/* Shoulder straps */}
            <rect className="strap" x="80" y="120" width="8" height="20" rx="2" fill="#e0a0b8" />
            <rect className="strap" x="112" y="120" width="8" height="20" rx="2" fill="#e0a0b8" />

            {/* Left Arm */}
            <path
                className="arm left-arm"
                d="M 75 135 Q 65 145, 60 155 L 68 158 Q 73 148, 78 140 Z"
                fill="#fdd5b8"
            />

            {/* Left Hand (palm up, resting on knee) */}
            <ellipse
                className="hand left-hand"
                cx="64"
                cy="165"
                rx="8"
                ry="6"
                fill="#fdd5b8"
            />

            {/* Right Arm */}
            <path
                className="arm right-arm"
                d="M 125 135 Q 135 145, 140 155 L 132 158 Q 127 148, 122 140 Z"
                fill="#fdd5b8"
            />

            {/* Right Hand (palm up, resting on knee) */}
            <ellipse
                className="hand right-hand"
                cx="136"
                cy="165"
                rx="8"
                ry="6"
                fill="#fdd5b8"
            />

            {/* NECK */}
            <rect
                className="neck"
                x="92"
                y="110"
                width="16"
                height="15"
                fill="#fdd5b8"
            />

            {/* HEAD */}
            <circle
                className="head"
                cx="100"
                cy="80"
                r="35"
                fill="#fdd5b8"
            />

            {/* Buzz Cut Hair */}
            <ellipse
                className="hair"
                cx="100"
                cy="65"
                rx="36"
                ry="30"
                fill="#2d3748"
            />

            {/* Hair shading (short buzz texture) */}
            <ellipse
                className="hair-highlight"
                cx="95"
                cy="60"
                rx="15"
                ry="12"
                fill="#4a5568"
                opacity="0.4"
            />

            {/* BLINDFOLD */}
            <rect
                className="blindfold"
                x="65"
                y="75"
                width="70"
                height="15"
                rx="3"
                fill="#1a202c"
            />

            {/* Blindfold knot (back of head) */}
            <circle
                className="blindfold-knot"
                cx="135"
                cy="82"
                r="5"
                fill="#1a202c"
            />

            {/* Blindfold ribbon ends (trailing fabric) */}
            <path
                className="blindfold-ribbon"
                d="M 135 87 Q 145 90, 148 95 Q 150 98, 149 102"
                stroke="#1a202c"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
            />
            <path
                className="blindfold-ribbon"
                d="M 135 88 Q 142 92, 144 98 Q 145 102, 143 106"
                stroke="#0a0f1a"
                strokeWidth="2.5"
                fill="none"
                strokeLinecap="round"
                opacity="0.8"
            />

            {/* EYE GLOW (revealed on awakening) */}
            <g className="eye-glow" style={{ opacity: 0 }}>
                <circle cx="84" cy="80" r="4" fill="#6dd5ed" filter="url(#eye-glow-filter)" />
                <circle cx="116" cy="80" r="4" fill="#6dd5ed" filter="url(#eye-glow-filter)" />
            </g>

            {/* Eyes closed peacefully (subtle lines beneath blindfold) */}
            <line
                className="eye-line left-eye"
                x1="80"
                y1="78"
                x2="88"
                y2="78"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.3"
            />
            <line
                className="eye-line right-eye"
                x1="112"
                y1="78"
                x2="120"
                y2="78"
                stroke="#000"
                strokeWidth="1.5"
                strokeLinecap="round"
                opacity="0.3"
            />

            {/* Small serene smile */}
            <path
                className="smile"
                d="M 85 95 Q 100 100, 115 95"
                stroke="#000"
                strokeWidth="2"
                strokeLinecap="round"
                fill="none"
                opacity="0.4"
            />

            {/* Nose (subtle) */}
            <line
                className="nose"
                x1="100"
                y1="85"
                x2="100"
                y2="92"
                stroke="#000"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.2"
            />

            {/* ========== PSYCHIC ENERGY EFFECTS ========== */}

            {/* Sacred Geometry Patterns (rotating subtle symbols) */}
            <g className="sacred-geometry">
                {/* Outer circle */}
                <circle
                    className="geometry-circle outer"
                    cx="100"
                    cy="150"
                    r="80"
                    fill="none"
                    stroke="url(#psychic-gradient)"
                    strokeWidth="1"
                    opacity="0.15"
                />

                {/* Inner circle */}
                <circle
                    className="geometry-circle inner"
                    cx="100"
                    cy="150"
                    r="60"
                    fill="none"
                    stroke="url(#psychic-gradient)"
                    strokeWidth="0.8"
                    opacity="0.15"
                />

                {/* Triangles (upward and downward) */}
                <path
                    className="geometry-triangle up"
                    d="M 100 90 L 120 130 L 80 130 Z"
                    fill="none"
                    stroke="#8b7ec8"
                    strokeWidth="1"
                    opacity="0.15"
                />
                <path
                    className="geometry-triangle down"
                    d="M 100 210 L 120 170 L 80 170 Z"
                    fill="none"
                    stroke="#6dd5ed"
                    strokeWidth="1"
                    opacity="0.15"
                />
            </g>

            {/* Psychic body glow (soft gradient around entire body) */}
            <ellipse
                className="psychic-body-glow"
                cx="100"
                cy="150"
                rx="55"
                ry="70"
                fill="url(#body-glow-gradient)"
                opacity="0.4"
                filter="url(#glow-blur)"
            />

            {/* Psychic energy glow around head (original aura - will animate) */}
            <circle
                className="psychic-aura"
                cx="100"
                cy="80"
                r="42"
                fill="none"
                stroke="url(#psychic-gradient)"
                strokeWidth="2"
                opacity="0.4"
            />

            {/* SVG Gradients and Filters */}
            <defs>
                {/* Head aura gradient */}
                <radialGradient id="psychic-gradient">
                    <stop offset="0%" stopColor="#6dd5ed" stopOpacity="0.8" />
                    <stop offset="50%" stopColor="#8b7ec8" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#c77dbd" stopOpacity="0.2" />
                </radialGradient>

                {/* Body glow gradient (blue to purple) */}
                <radialGradient id="body-glow-gradient">
                    <stop offset="0%" stopColor="#6dd5ed" stopOpacity="0.6" />
                    <stop offset="50%" stopColor="#8b7ec8" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#c77dbd" stopOpacity="0.1" />
                </radialGradient>

                {/* Glow blur filter (20px) */}
                <filter id="glow-blur">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                </filter>

                {/* Eye glow filter */}
                <filter id="eye-glow-filter">
                    <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
                    <feComponentTransfer>
                        <feFuncA type="linear" slope="2" />
                    </feComponentTransfer>
                </filter>
            </defs>
        </svg>
    );
};

export default ElevenCharacter;
