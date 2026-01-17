import React from 'react';
import { useNavigate } from 'react-router-dom';

const CategoryCard = ({ title, subtitle, route }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(route);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(route);
    }
  };

  return (
    <div
      className="category-card"
      onClick={handleClick}
      onKeyDown={handleKeyPress}
      role="button"
      tabIndex={0}
      aria-label={`Navigate to ${title}`}
    >
      <h2 className="category-card-title">{title}</h2>
      <p className="category-card-subtitle">{subtitle}</p>
    </div>
  );
};

export default CategoryCard;