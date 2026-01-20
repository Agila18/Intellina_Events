import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalkieTalkie from './WalkieTalkie';

const CategoryCard = ({ title, subtitle, route, character, audioSrc, subtitleText, clickAudioSrc }) => {
  const navigate = useNavigate();
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleClick = () => {
    if (isTransmitting) return; // Prevent double clicks

    // Play click audio immediately if provided
    if (clickAudioSrc) {
      const audio = new Audio(clickAudioSrc);
      audio.play().catch(error => {
        console.error('Error playing click audio:', error);
      });
    }

    setIsTransmitting(true);
    // Navigation happens after WalkieTalkie reports completion
  };

  const handleTransmissionComplete = () => {
    // Navigate at 6.8 seconds after card click for click audio, or use default timing
    const delay = clickAudioSrc ? 5500 : 500;
    setTimeout(() => {
      navigate(route);
    }, delay);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <div
      className={`category-card ${isTransmitting ? 'transmitting' : ''}`}
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${title}`}
    >
      <div className="card-content-wrapper">
        <h2 className="category-card-title">{title}</h2>
        <p className="category-card-subtitle">{subtitle}</p>
      </div>

      <WalkieTalkie
        isActive={isTransmitting}
        onComplete={handleTransmissionComplete}
        character={character}
        audioSrc={audioSrc}
        subtitle={subtitleText}
        persistActive={true}
      />
    </div>
  );
};

export default CategoryCard;