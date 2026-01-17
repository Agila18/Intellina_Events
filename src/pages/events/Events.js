import React from 'react';
import CategoryCard from '../../components/CategoryCard';
import './events.css';
const Events = () => {
  return (
    <>
      <div className="events-container">



        {/* Overlay Content */}
        <div className="events-landing">
          <h1 className="events-landing-title stranger-font typing">
            EVENTS
          </h1>

          <p className="events-landing-subtitle">
            Choose Your Gateway
          </p>

          <div className="category-grid">
            <CategoryCard
              title="TECHNICAL EVENTS"
              subtitle="Innovate. Build. Compete."
              route="/events/technical" />

            <CategoryCard
              title="NON-TECH EVENTS"
              subtitle="Think. Play. Survive."
              route="/events/non-tech" />

            <CategoryCard
              title="FLAGSHIP EVENT"
              subtitle="The Main Gate."
              route="/events/flagship" />
          </div>
        </div>

      </div></>
  );
};

export default Events;
