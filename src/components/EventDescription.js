import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventsData } from '../components/data/eventsData';
import './EventDescription.css';

const EventDescription = () => {
  const { category, eventId } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('description');

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
    { id: 'description', label: 'DESCRIPTION' },
    { id: 'stages', label: 'STAGES & TIMELINE' },
    { id: 'rules', label: 'RULES & GUIDELINES' }
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

            {/* Tabs */}
            <div className="event-tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab-btn ${
                    activeTab === tab.id ? 'active' : ''
                  }`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="tab-content">
              {activeTab === 'description' && (
                <p>{eventDetails.description}</p>
              )}

              {activeTab === 'stages' && (
                <p style={{ whiteSpace: 'pre-line' }}>
                  {eventDetails.stages}
                </p>
              )}

              {activeTab === 'rules' && (
                <p style={{ whiteSpace: 'pre-line' }}>
                  {eventDetails.rules}
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="event-desc-footer">
              <div className="prize-worth">
                <span className="prize-worth-label">PRIZES WORTH</span>
                <div className="prize-worth-value">
                  <span className="currency">RS.</span> {eventDetails.prizes}
                </div>

                {/* Date & Venue */}
                <p
                  style={{
                    color: '#ff9999',
                    marginTop: '10px',
                    letterSpacing: '1px'
                  }}
                >
                  {eventDetails.dateVenue}
                </p>
              </div>

              {/* Actions */}
              <div className="event-actions">
                <button className="btn-stylized register-btn">
                  REGISTER
                </button>

                <button className="btn-stylized problem-btn">
                  PROBLEM STATEMENT
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