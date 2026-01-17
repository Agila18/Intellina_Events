import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EventCard from '../../components/EventCard';
import './events.css';
import ParticlesBackground from '../../components/ParticlesBackground';


const NonTech = () => {
  const navigate = useNavigate();
  const events = [
    {
      name: 'Bigboss',
      slug: 'bigboss',
      tagline: 'Strategy, Survival & Social Dynamics In The Ultimate Reality Challenge',
      prize: 'Rs. 60,000 *',
      image: '/assets/images/Biggboss.jpeg'
    },
    {
      name: 'Neuro Quest',
      // ... (content is preserved, just showing changed top part)
      slug: 'neuroquest', // âœ… FIX HERE
      tagline: 'Test Your Mind, Challenge Your Logic & Decode The Mysteries',
      prize: 'Rs. 45,000 *',
      image: '/assets/images/NeuroQuest.jpeg'
    },
    {
      name: 'Connections',
      slug: 'connections',
      tagline: 'Link The Clues, Find Patterns & Master The Art Of Association',
      prize: 'Rs. 35,000 *',
      image: '/assets/images/Connections.jpeg'
    },
    {
      name: 'Murder Mystery',
      slug: 'murder-mystery',
      tagline: 'Unravel Secrets, Follow Clues & Solve The Enigma',
      prize: 'Rs. 50,000 *',
      image: '/assets/images/Murder Mystery.jpeg'
    },
    {
      name: 'IPL Auction',
      slug: 'ipl-auction',
      tagline: 'Bid Smart, Build Teams & Dominate The Cricket Empire',
      prize: 'Rs. 55,000 *',
      image: '/assets/images/IPLAuction.jpeg'
    },
    {
      name: 'Treasure Hunt',
      slug: 'treasure-hunt',
      tagline: 'Navigate The Unknown, Crack Codes & Discover Hidden Treasures',
      prize: 'Rs. 40,000 *',
      image: '/assets/images/TreasureHunt.jpeg'
    }
  ];


  const handleEventClick = (slug) => {
    navigate(`/events/non-tech/${slug}`);
  };


  return (
    <div className="events-container events-black-bg">
      <ParticlesBackground />

      <div className="event-list-container">
        <div className="event-list-header">
          <h1 className="event-list-title stranger-font">NON-TECH EVENTS</h1>
          <p className="event-list-description">Think. Play. Survive.</p>
        </div>

        <div className="event-grid">
          {events.map((event, index) => (
            <EventCard
              key={index}
              name={event.name}
              tagline={event.tagline}
              prize={event.prize}
              image={event.image}
              onClick={() => handleEventClick(event.slug)}
            />

          ))}
        </div>
      </div>
    </div>
  );
};

export default NonTech;