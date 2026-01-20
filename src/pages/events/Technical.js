import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import EventCard from '../../components/EventCard';
import DiceRoller from '../../components/DiceRoller';
import './events.css';
import ParticlesBackground from '../../components/ParticlesBackground';

const Technical = () => {
  const navigate = useNavigate();
  const events = [
    {
      name: 'Paper Presentation',
      tagline: 'Present Your Research & Ideas To The World Of Innovation',
      prize: '₹ 50,000 *',
      image: '/assets/images/paperpresentation.jpg'
    },
    {
      name: 'Hackathon',
      tagline: 'Code Through The Night, Build The Future In 24 Hours',
      prize: '₹ 1,00,000 *',
      image: '/assets/images/Hackathon.jpeg'
    },
    {
      name: 'RRR',
      tagline: 'React, Respond & Resolve: The Ultimate Tech Quiz',
      prize: '₹ 35,000 *',
      image: '/assets/images/RRR.jpeg'
    },
    {
      name: 'Project Expo',
      tagline: 'Showcase Your Innovation & Engineering Excellence',
      prize: '₹ 75,000 *',
      image: '/assets/images/ProjectExpo.jpeg'
    },
    {
      name: 'Worst UI',
      tagline: 'Create The Most Hilariously Terrible User Interface',
      prize: '₹ 30,000 *',
      image: '/assets/images/WorstUI.jpeg'
    },
    {
      name: 'Web Design',
      tagline: 'Craft Digital Experiences That Captivate & Connect',
      prize: '₹ 40,000 *',
      image: '/assets/images/WebDesign.jpeg'
    }
  ];

  const handleEventClick = (eventName) => {
    const eventId = eventName.toLowerCase().replace(/\s+/g, '-');
    navigate(`/events/technical/${eventId}`);
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
    <div className="events-container events-black-bg">
      <ParticlesBackground />

      <motion.div
        initial="hidden"
        animate="visible"
        variants={headerVariants}
      >
        <DiceRoller category="technical" />
      </motion.div>

      <div className="event-list-container">
        <motion.div
          className="event-list-header"
          initial="hidden"
          animate="visible"
          variants={headerVariants}
        >
          <h1 className="event-list-title stranger-font">TECHNICAL EVENTS</h1>
          <p className="event-list-description">Innovate. Build. Compete.</p>
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
                name={event.name}
                tagline={event.tagline}
                prize={event.prize}
                image={event.image}
                onClick={() => handleEventClick(event.name)}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Technical;