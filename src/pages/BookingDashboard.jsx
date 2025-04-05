import React, { useState, useEffect } from 'react';
import { bookingServices } from '../appwrite/booking';
import { motion } from 'framer-motion';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/BookingDashboard.css';

const BookingDashboard = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedBookings, setSelectedBookings] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all bookings
  const fetchBookings = async () => {
    try {
      setLoading(true);
      const response = await bookingServices.getBookingData();
      // Convert single document to array if needed
      const bookingsArray = Array.isArray(response) ? response : [response].filter(Boolean);
      setBookings(bookingsArray);
    } catch (error) {
      toast.error('Failed to fetch bookings');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  // Delete single booking
  const handleDelete = async (bookingId) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await bookingServices.deleteBookingData(bookingId);
        toast.success('Booking deleted successfully');
        fetchBookings();
      } catch (error) {
        toast.error('Failed to delete booking');
        console.error('Delete error:', error);
      }
    }
  };

  // Delete multiple bookings
  const handleDeleteMultiple = async () => {
    if (selectedBookings.length === 0) {
      toast.warning('No bookings selected');
      return;
    }

    if (window.confirm(`Are you sure you want to delete ${selectedBookings.length} booking(s)?`)) {
      try {
        await bookingServices.deleteMultipleBookingData(selectedBookings);
        toast.success(`${selectedBookings.length} booking(s) deleted successfully`);
        setSelectedBookings([]);
        fetchBookings();
      } catch (error) {
        toast.error('Failed to delete bookings');
        console.error('Delete multiple error:', error);
      }
    }
  };

  // Toggle booking selection
  const toggleBookingSelection = (bookingId) => {
    setSelectedBookings(prev =>
      prev.includes(bookingId)
        ? prev.filter(id => id !== bookingId)
        : [...prev, bookingId]
    );
  };

  // Filter bookings based on search term
  const filteredBookings = bookings.filter(booking => {
    if (!booking) return false;
    const searchLower = searchTerm.toLowerCase();
    return (
      booking.userName?.toLowerCase().includes(searchLower) ||
      booking.userEmail?.toLowerCase().includes(searchLower) ||
      booking.phoneNumber?.includes(searchTerm) ||
      booking.bookingTimings?.toLowerCase().includes(searchLower)
    );
  });

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  return (
    <div className="booking-dashboard">
      <ToastContainer position="top-right" autoClose={3000} />
      
      <motion.div 
        className="dashboard-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Temple Booking Management</h1>
        <div className="controls">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="search-icon">🔍</i>
          </div>
          {selectedBookings.length > 0 && (
            <motion.button
              className="delete-selected"
              onClick={handleDeleteMultiple}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Delete Selected ({selectedBookings.length})
            </motion.button>
          )}
        </div>
      </motion.div>

      {loading ? (
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading bookings...</p>
        </div>
      ) : filteredBookings.length === 0 ? (
        <div className="no-bookings">
          <p>No bookings found</p>
        </div>
      ) : (
        <motion.div 
          className="bookings-grid"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <div className="grid-header">
            <div className="header-checkbox"></div>
            <div className="header-name">Name</div>
            <div className="header-email">Email</div>
            <div className="header-phone">Phone</div>
            <div className="header-date">Booking Time</div>
            <div className="header-actions">Actions</div>
          </div>

          {filteredBookings.map((booking) => (
            <motion.div 
              key={booking.$id}
              className="booking-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              whileHover={{ boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}
            >
              <div className="card-checkbox">
                <input
                  type="checkbox"
                  checked={selectedBookings.includes(booking.$id)}
                  onChange={() => toggleBookingSelection(booking.$id)}
                />
              </div>
              <div className="card-name">{booking.userName || 'N/A'}</div>
              <div className="card-email">{booking.userEmail || 'N/A'}</div>
              <div className="card-phone">{booking.phoneNumber || 'N/A'}</div>
              <div className="card-date">{formatDate(booking.bookingTimings)}</div>
              <div className="card-actions">
                <motion.button
                  className="delete-btn"
                  onClick={() => handleDelete(booking.$id)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  Delete
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}
    </div>
  );
};

export default BookingDashboard;