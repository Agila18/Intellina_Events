import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from '../../components/EventCard';
import DiceRoller from '../../components/DiceRoller';
import './events.css';
import ParticleNetworkAnimation from '../../components/ParticleNetworkAnimation';

const NonTech = () => {
  const navigate = useNavigate();
  const events = [
    {
      name: 'Bigboss',
      slug: 'bigboss',
      tagline: 'Strategy, Survival & Social Dynamics In The Ultimate Reality Challenge',
      prize: 'Rs. 2500 *',
      image: '/assets/images/Biggboss.jpeg'
    },
    {
      name: 'Neuro Quest',
      slug: 'neuroquest',
      tagline: 'Test Your Mind, Challenge Your Logic & Decode The Mysteries',
      prize: 'Rs. 4500 *',
      image: '/assets/images/NeuroQuest.jpeg'
    },
    {
      name: 'Connections',
      slug: 'connections',
      tagline: 'Link The Clues, Find Patterns & Master The Art Of Association',
      prize: 'Rs. 3000 *',
      image: '/assets/images/Connections.jpeg'
    },
    {
      name: 'Murder Mystery',
      slug: 'murder-mystery',
      tagline: 'Unravel Secrets, Follow Clues & Solve The Enigma',
      prize: 'Rs. 5000 *',
      image: '/assets/images/Murder Mystery.jpeg'
    },
    {
      name: 'IPL Auction',
      slug: 'ipl-auction',
      tagline: 'Bid Smart, Build Teams & Dominate The Cricket Empire',
      prize: 'Rs. 5500 *',
      image: '/assets/images/IPLAuction.jpeg'
    },
    {
      name: 'Treasure Hunt',
      slug: 'treasure-hunt',
      tagline: 'Navigate The Unknown, Crack Codes & Discover Hidden Treasures',
      prize: 'Rs. 4500 *',
      image: '/assets/images/TreasureHunt.jpeg'
    },
    {
      name: 'Snap Sense',
      slug: 'snap-sense',
      tagline: 'Sense the moment, capture the magic, win the game',
      prize: 'Rs. 2500 *',
      image: '/assets/images/SnapSense.jpeg'
    },
    {
      name: 'Object Odyssey',
      slug: 'object-odyssey',
      tagline: 'A thrilling hunt for hidden objects that sharpens your mind.',
      prize: 'Rs. 3500 *',
      image: '/assets/images/ObjectOdyssey.jpeg'
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
    <div className="events-container events-transparent-bg">
      <ParticleNetworkAnimation />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <DiceRoller category="non-tech" />
      </motion.div>

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