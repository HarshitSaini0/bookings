import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { bookingServices } from '../appwrite/booking';
import '../styles/TempleBookingForm.css'; // Ensure this path is correct

const TempleBookingForm = () => {
  const [formData, setFormData] = useState({
    userEmail: '',
    phoneNumber: '',
    userName: '',
    bookingTimings: '',
    additionalDetails: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showBlessing, setShowBlessing] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Mobile number validation regex (assuming 10 digits)
    const mobileRegex = /^\d{10}$/;
    
    // Validate email
    if (!formData.userEmail || !emailRegex.test(formData.userEmail)) {
      alert('Please enter a valid email address');
      return;
    }
    
    // Validate mobile number
    if (!formData.phoneNumber || !mobileRegex.test(formData.phoneNumber)) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      await bookingServices.createBooking(formData);
      setShowBlessing(true);
      setTimeout(() => setShowBlessing(false), 5000);
      
      setFormData({
        userEmail: '',
        phoneNumber: '',
        userName: '',
        bookingTimings: '',
        additionalDetails: '',
      });
    } catch (error) {
      console.error("Booking error:", error);
      // You might want to show the error to the user as well
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="temple-booking-container">
      {/* Divine Light Effect */}
      <div className="divine-light"></div>
      
      {/* Main Form */}
      <motion.form 
        onSubmit={handleSubmit}
        className="temple-booking-form"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Temple Header */}
        <div className="temple-header">
          <div className="om-symbol">ॐ</div>
          <h1>Sacred Booking</h1>
          <p>For Arti, Puja & Darshan</p>
        </div>

        {/* Form Fields (unchanged from your original) */}
        <div className="form-group">
          <label>
            <i className="icon diya-icon"></i>
            Email Address
          </label>
          <input
            type="email"
            name="userEmail"
            value={formData.userEmail}
            onChange={handleChange}
            placeholder="Your sacred email"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <i className="icon bell-icon"></i>
            Phone Number
          </label>
          <input
            type="tel"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            placeholder="Contact number"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <i className="icon lotus-icon"></i>
            Your Name
          </label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            placeholder="Full name"
            required
          />
        </div>

        <div className="form-group">
          <label>
            <i className="icon kalash-icon"></i>
            Preferred Date & Time
          </label>
          <input
            type="datetime-local"
            name="bookingTimings"
            value={formData.bookingTimings}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>
            <i className="icon hands-icon"></i>
            Special Requests
          </label>
          <textarea
            name="additionalDetails"
            value={formData.additionalDetails}
            onChange={handleChange}
            placeholder="Any special puja requirements..."
            rows="4"
          />
        </div>

        {/* Submit Button */}
        <motion.button
          type="submit"
          className="submit-button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span className="spinner"></span>
              Seeking Blessings...
            </>
          ) : (
            "Book Sacred Service"
          )}
        </motion.button>
      </motion.form>

      {/* Blessing Message */}
      {showBlessing && (
        <motion.div 
          className="blessing-message"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="blessing-content">
            <div className="flower-petal"></div>
            <div className="flower-petal"></div>
            <div className="flower-petal"></div>
            <h3>Your Booking is Confirmed!</h3>
            <p>May the divine bless you and your family</p>
            <div className="aarti-light"></div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default TempleBookingForm;