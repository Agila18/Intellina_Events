import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import './events.css';

import ParticlesBackground from '../../components/ParticlesBackground';

const Flagship = () => {
  const navigate = useNavigate();

  const flagshipEvents = [
    {
      name: 'GPTATHON',
      tagline: 'The Ultimate Challenge: Where Legends Are Made',
      prize: 'Rs. 2,00,000 *',
      image: '/assets/images/GPTathon.jpeg'
    },
    {
      name: 'Open Talent',
      tagline: 'Showcase Your Skills, Dazzle The Crowd & Shine On Stage',
      prize: 'Rs. 45,000 *',
      image: '/assets/images/OpenTalent.jpeg'
    },
    {
      name: 'Rapid Chess',
      tagline: 'Think Fast, Move Faster & Checkmate Your Opponents',
      prize: 'Rs. 30,000 *',
      image: '/assets/images/RapidChess.jpeg'
    },
    {
      name: 'E-sports',
      tagline: 'Battle In Virtual Arenas, Prove Your Gaming Supremacy',
      prize: 'Rs. 70,000 *',
      image: '/assets/images/E-sports.jpeg'
    }
  ];

  const handleEventClick = (eventName) => {
    const eventId = eventName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/flagship/${eventId}`);
  };

  return (
    <div className="events-container events-black-bg">
      <ParticlesBackground />

      <div className="event-list-container">
        <div className="event-list-header">
          <h1 className="event-list-title stranger-font">FLAGSHIP EVENTS</h1>
          <p className="event-list-description">The Main Gate.</p>
        </div>

        {/* ðŸ”¥ 3-column grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '40px',
            maxWidth: '1400px',
            margin: '60px auto',
            justifyItems: 'center'
          }}
        >
          {flagshipEvents.map((event, index) => (
            <div
              key={index}
            >
              <EventCard
                name={event.name}
                tagline={event.tagline}
                prize={event.prize}
                image={event.image}
                onClick={() => handleEventClick(event.name)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Flagship;