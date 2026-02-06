import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from './data/eventsData';
import './EventDescription.css';

const EventDescription = () => {
  const { category, eventId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('stages');

  // Fetch event details dynamically
  const eventDetails = eventsData[category]?.[eventId];

  // Safety fallback
  if (!eventDetails) {
    return (
      <div className="event-desc-overlay">
        <div className="event-desc-card">
          <h2 style={{ color: '#fff' }}>Event not found</h2>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'stages', label: 'STAGES & TIMELINE' },
    { id: 'rules', label: 'RULES' },
    { id: 'info', label: 'INFO' }
  ];

  const handleClose = () => {
    navigate(-1);
  };

  return (
    <div className="event-desc-overlay">
      <div className="event-desc-card">

        {/* Close Button */}
        <button className="close-btn" onClick={handleClose}>
          X
        </button>

        <div className="event-desc-layout">

          {/* LEFT COLUMN */}
          <div className="event-desc-left">
            <h1 className="event-desc-title">{eventDetails.title}</h1>

            {/* Description Moved Here */}
            <p className="event-desc-hero-text">
              {eventDetails.description}
            </p>

            {/* Tabs */}
            <div className="event-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${activeTab === tab.id ? 'active' : ''
                    }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">

              {activeTab === 'stages' && (
                <div className="content-block">
                  <p style={{ whiteSpace: 'pre-line' }}>{eventDetails.stages}</p>
                </div>
              )}

              {activeTab === 'rules' && (
                <div className="content-block">
                  <p style={{ whiteSpace: 'pre-line' }}>{eventDetails.rules}</p>
                </div>
              )}

              {activeTab === 'info' && (
                <div className="content-block info-grid">
                  <div className="info-item">
                    <span className="info-label">DATE & VENUE</span>
                    <span className="info-value">{eventDetails.dateVenue}</span>
                  </div>
                  {/* Add more info here if available in object, or placeholder */}
                </div>
              )}
            </div>

            {/* Glowing Prize Section */}
            <div className="event-desc-footer">
              <div className="glowing-prize-card">
                <div className="glowing-border"></div>
                <div className="prize-content">
                  <span className="prize-label">PRIZE POOL</span>
                  <div className="prize-amount-wrapper">
                    <span className="currency">Rs.</span>
                    <span className="amount-3d">{eventDetails.prizes}</span>
                  </div>
                  <div className="particles">
                    <span></span><span></span><span></span><span></span>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="event-actions">
                <button className="btn-stylized register-btn">
                  REGISTER NOW
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="event-desc-right">
            <div className="event-media-container">
              <img
                src={eventDetails.image}
                alt={eventDetails.title}
                className="event-media"
              />
              <div className="media-overlay"></div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default EventDescription;