import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from '../../components/EventCard';
import DiceRoller from '../../components/DiceRoller';
import './events.css';
import ParticlesBackground from '../../components/ParticlesBackground';

const Flagship = () => {
  const navigate = useNavigate();

  const flagshipEvents = [
    {
      name: 'GPTATHON',
      tagline: 'The Ultimate Challenge: Where Legends Are Made',
      prize: 'Rs. 2,00,000 *',
      image: '/assets/images/GPTathon.jpeg',
      slug: 'gptathon'
    },

    {
      name: 'E-sports',
      tagline: 'Battle In Virtual Arenas, Prove Your Gaming Supremacy',
      prize: 'Rs. 70,000 *',
      image: '/assets/images/E-sports.jpeg',
      slug: 'esports'
    }
  ];

  const handleEventClick = (slug) => {
    navigate(`/events/flagship/${slug}`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.4
      }
    }
  };

  const itemVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
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
      <div className="breadcrumb">
        <Link to="/events">&lt;--Back</Link>
      </div>
      <ParticlesBackground />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <DiceRoller category="flagship" />
      </motion.div>

      <div className="event-list-container">
        <motion.div
          className="event-list-header"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="event-list-title stranger-font">FLAGSHIP EVENTS</h1>
          <p className="event-list-description">The Main Gate.</p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            gap: '80px',
            maxWidth: '1400px',
            margin: '60px auto',
          }}
        >
          {flagshipEvents.map((event, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
            >
              <EventCard
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

export default Flagship;