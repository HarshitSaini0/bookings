import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import '../styles/HomePage.css'; // Ensure this path is correct

const HomePage = () => {
  const services = [
    {
      title: "Morning Arti",
      time: "5:00 AM - 6:30 AM",
      description: "Begin your day with divine blessings"
    },
    {
      title: "Evening Aarti",
      time: "6:30 PM - 7:30 PM",
      description: "Conclude your day in spiritual harmony"
    },
    {
      title: "Special Puja",
      time: "Custom Timing",
      description: "Personalized spiritual ceremonies"
    }
  ];

  return (
    <div className="home-container">
      {/* Divine Background Elements */}
      <div className="divine-background">
        <div className="floating-diya"></div>
        <div className="sanskrit-pattern"></div>
      </div>

      {/* Hero Section */}
      <motion.section 
        className="hero-section"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="hero-content">
          <motion.h1 
            className="main-heading"
            initial={{ y: -20 }}
            animate={{ y: 0 }}
          >
            Welcome to <span>Divine Darshan</span>
          </motion.h1>
          <p className="subheading">Experience Spiritual Harmony</p>
          
          <motion.div 
            className="cta-buttons"
            whileHover={{ scale: 1.05 }}
          >
            <Link to="/booking-form" className="cta-primary">
              Book Sacred Service
            </Link>
          
          </motion.div>
        </div>
      </motion.section>

      {/* Services Section */}
      <section className="services-section">
        <h2 className="section-title">Sacred Services</h2>
        <div className="services-grid">
          {services.map((service, index) => (
            <motion.div 
              key={index}
              className="service-card"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="card-header">
                <div className="om-icon">ॐ</div>
                <h3>{service.title}</h3>
              </div>
              <div className="card-body">
                <p className="service-time">{service.time}</p>
                <p className="service-desc">{service.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Temple Info Section */}
      <motion.section 
        className="temple-info"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
      >
        <div className="info-content">
          <h2>About Our Temple</h2>
          <p>
            Established in 1850, our sacred space has been a beacon of spiritual 
            enlightenment. Join us in preserving ancient traditions through 
            divine ceremonies and community service.
          </p>
          <div className="temple-stats">
            <div className="stat-item">
              <span>170+</span>
              <p>Years of Service</p>
            </div>
            <div className="stat-item">
              <span>5,000+</span>
              <p>Daily Devotees</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="sacred-footer">
        <div className="footer-content">
          <div className="contact-info">
            <h4>Contact Us</h4>
            <p>📞 +91 98765 43210</p>
            <p>📧 contact@divinedarshan.com</p>
          </div>
          <div className="quick-links">
            <h4>Quick Links</h4>
            <Link to="/booking-form">Book Service</Link>
            <Link to="/booking">Manage Bookings</Link>
            <Link to="/login">Admin Portal</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <p>© 2024 Divine Darshan. All rights reserved</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;