import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WalkieTalkie from './WalkieTalkie';

const CategoryCard = ({ title, subtitle, route, character, audioSrc, subtitleText }) => {
  const navigate = useNavigate();
  const [isTransmitting, setIsTransmitting] = useState(false);

  const handleClick = () => {
    if (isTransmitting) return; // Prevent double clicks

    setIsTransmitting(true);
    // Navigation happens after WalkieTalkie reports completion
  };

  const handleTransmissionComplete = () => {
    // Delay slightly for 'Over' effect then navigate
    setTimeout(() => {
      navigate(route);
    }, 500);
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
      />
    </div>
  );
};

export default CategoryCard;