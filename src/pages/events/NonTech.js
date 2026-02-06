import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from '../../components/EventCard';
import DiceRoller from '../../components/DiceRoller';
import './events.css';
import ParticlesBackground from '../../components/ParticlesBackground';

const NonTech = () => {
  const navigate = useNavigate();
  const events = [
    {
      name: 'Bigboss',
      slug: 'bigboss',
      tagline: 'Strategy, Survival & Social Dynamics In The Ultimate Reality Challenge',
      prize: '₹ 3,500 *',
      image: '/assets/images/Biggboss.jpeg'
    },
    {
      name: 'IPL Auction',
      slug: 'ipl-auction',
      tagline: 'Bid Smart, Build Teams & Dominate The Cricket Empire',
      prize: '₹ 3,000 *',
      image: '/assets/images/IPLAuction.jpeg'
    },
    {
      name: 'Treasure Hunt',
      slug: 'treasure-hunt',
      tagline: 'Navigate The Unknown, Crack Codes & Discover Hidden Treasures',
      prize: '₹ 4,000 *',
      image: '/assets/images/TreasureHunt.jpeg'
    },
    {
      name: 'Connections',
      slug: 'connections',
      tagline: 'Link The Clues, Find Patterns & Master The Art Of Association',
      prize: '₹ 3,500 *',
      image: '/assets/images/Connections.jpeg'
    },
    {
      name: 'Murder Mystery',
      slug: 'murder-mystery',
      tagline: 'Unravel Secrets, Follow Clues & Solve The Enigma',
      prize: '₹ 2,500 *',
      image: '/assets/images/Murder Mystery.jpeg'
    },
    {
      name: 'Neuro Quest',
      slug: 'neuroquest',
      tagline: 'Test Your Mind, Challenge Your Logic & Decode The Mysteries',
      prize: '₹ 2,000 *',
      image: '/assets/images/NeuroQuest.jpeg'
    },
    {
      name: 'Object Odyssey',
      slug: 'object-odyssey',
      tagline: 'A thrilling hunt for hidden objects that sharpens your mind.',
      prize: '₹ 1,500 *',
      image: '/assets/images/ObjectOdyssey.jpeg'
    },
    {
      name: 'Snap Sense',
      slug: 'snap-sense',
      tagline: 'Sense the moment, capture the magic, win the game',
      prize: '₹ 2,500 *',
      image: '/assets/images/SnapSense.jpeg'
    },
    {
      name: 'Rapid Chess',
      slug: 'rapid-chess',
      tagline: 'Test Your Strategic Thinking & Speed In The Ultimate Chess Battle',
      prize: '1,500 *',
      image: '/assets/images/RapidChess.jpeg'
    }
  ];

  const handleEventClick = (slug) => {
    navigate(`/events/non-tech/${slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.8, ease: "backOut" }
    }
  };

  return (
    <div
      className="events-container events-transparent-bg"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.9) 100%), url('/assets/images/events-bg.jpeg')"
      }}
    >
      <div className="breadcrumb">
        <Link to="/events">&lt;--Back</Link>
      </div>
      <ParticlesBackground />

      <DiceRoller category="non-tech" />


      <div className="event-list-container">
        <motion.div
          className="event-list-header"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="event-list-title stranger-font">NON-TECH EVENTS</h1>
          <p className="event-list-description">Think. Play. Survive.</p>
        </motion.div>

        <motion.div
          className="event-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {events.map((event, index) => (
            <motion.div key={index} variants={itemVariants}>
              <EventCard
                key={index}
                name={event.name}
                tagline={event.tagline}
                prize={event.prize}
                image={event.image}
                onClick={() => handleEventClick(event.slug)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default NonTech;