import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from '../../components/EventCard';
import DiceRoller from '../../components/DiceRoller';
import ParticlesBackground from '../../components/ParticlesBackground';
import BackButton from '../../components/BackButton';
import './events.css';

const Flagship = () => {
  const navigate = useNavigate();

  const flagshipEvents = [
    {
      name: 'GPTATHON',
      tagline: 'The Ultimate Challenge: Where Legends Are Made',
      prize: '₹ 8,000 *',
      image: '/assets/images/GPTathon.jpeg',
      slug: 'gptathon'
    },

    {
      name: 'E-sports',
      tagline: 'Battle In Virtual Arenas, Prove Your Gaming Supremacy',
      prize: '₹ 7,000 *',
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
    <div
      className="events-container events-transparent-bg"
      style={{
        backgroundImage: "linear-gradient(to bottom, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.4) 50%, rgba(0, 0, 0, 0.9) 100%), url('/assets/images/events-bg.jpeg')"
      }}
    >
      <BackButton />
      <ParticlesBackground />

      <DiceRoller category="flagship" />


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