import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { getToken } from '../utils/auth';
import './AdminDashboard.css';

function AdminDashboard() {
  const [stats, setStats] = useState({ tours: 0, bookings: 0, users: 0 });
  const [activeTab, setActiveTab] = useState('overview');
  const [tours, setTours] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Tour CRUD state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTour, setEditingTour] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    price: '',
    duration: '',
    description: '',
    maxGroupSize: 10,
    images: []
  });

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (activeTab === 'overview') {
        const [toursRes, bookingsRes] = await Promise.all([
          axios.get(`${API_URL}/tours`),
          axios.get(`${API_URL}/bookings`, config)
        ]);
        setStats({
          tours: toursRes.data.count || (toursRes.data.data ? toursRes.data.data.length : toursRes.data.length),
          bookings: bookingsRes.data.count || (bookingsRes.data.data ? bookingsRes.data.data.length : bookingsRes.data.length),
          users: 0 // Fetch users count if needed
        });
      } else if (activeTab === 'tours') {
        const res = await axios.get(`${API_URL}/tours`);
        setTours(res.data.data || res.data);
      } else if (activeTab === 'bookings') {
        const res = await axios.get(`${API_URL}/bookings`, config);
        setBookings(res.data.data || res.data);
      }
    } catch (err) {
      setError('Failed to fetch data. Are you sure you are an admin?');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditTour = (tour) => {
    setEditingTour(tour);
    setFormData({
      name: tour.name,
      destination: tour.destination,
      price: tour.price,
      duration: tour.duration,
      description: tour.description,
      maxGroupSize: tour.maxGroupSize || 10,
      images: tour.images || []
    });
    setIsModalOpen(true);
  };

  const handleDeleteTour = async (id) => {
    if (!window.confirm('Are you sure you want to delete this tour?')) return;
    
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      await axios.delete(`${API_URL}/tours/${id}`, config);
      fetchData();
    } catch (err) {
      alert('Failed to delete tour');
    }
  };

  const handleSaveTour = async (e) => {
    e.preventDefault();
    const token = getToken();
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      if (editingTour) {
        await axios.put(`${API_URL}/tours/${editingTour._id}`, formData, config);
      } else {
        await axios.post(`${API_URL}/tours`, formData, config);
      }
      setIsModalOpen(false);
      setEditingTour(null);
      setFormData({ name: '', destination: '', price: '', duration: '', description: '', maxGroupSize: 10, images: [] });
      fetchData();
    } catch (err) {
      alert('Failed to save tour: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-sidebar glass-panel">
        <h2 className="text-gradient">Admin Panel</h2>
        <button className={activeTab === 'overview' ? 'active' : ''} onClick={() => setActiveTab('overview')}>📊 Overview</button>
        <button className={activeTab === 'tours' ? 'active' : ''} onClick={() => setActiveTab('tours')}>🗺️ Manage Tours</button>
        <button className={activeTab === 'bookings' ? 'active' : ''} onClick={() => setActiveTab('bookings')}>🎟️ All Bookings</button>
      </div>

      <div className="admin-content">
        {loading ? (
          <div className="loader">Loading...</div>
        ) : error ? (
          <div className="error-message">{error}</div>
        ) : (
          <>
            {activeTab === 'overview' && (
              <div className="overview-grid">
                <div className="stat-card glass-panel">
                  <span className="stat-icon">🗺️</span>
                  <div className="stat-info">
                    <h3>Total Tours</h3>
                    <p className="stat-value">{stats.tours}</p>
                  </div>
                </div>
                <div className="stat-card glass-panel">
                  <span className="stat-icon">🎟️</span>
                  <div className="stat-info">
                    <h3>Total Bookings</h3>
                    <p className="stat-value">{stats.bookings}</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'tours' && (
              <div className="tours-management">
                <div className="section-header">
                  <h2>Tour Management</h2>
                  <button className="btn-primary" onClick={() => { setEditingTour(null); setIsModalOpen(true); }}>Add New Tour</button>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Title</th>
                      <th>Destination</th>
                      <th>Price</th>
                      <th>Max Group</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tours.map(tour => (
                      <tr key={tour._id}>
                        <td>{tour.name}</td>
                        <td>{tour.destination}</td>
                        <td>₹{tour.price}</td>
                        <td>{tour.maxGroupSize || 10}</td>
                        <td>
                          <button className="btn-icon" onClick={() => handleEditTour(tour)}>✏️</button>
                          <button className="btn-icon delete" onClick={() => handleDeleteTour(tour._id)}>🗑️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div className="bookings-management">
                <div className="section-header">
                  <h2>All Bookings</h2>
                </div>
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Tour</th>
                      <th>User</th>
                      <th>Guests</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking._id}>
                        <td>{booking.tourId?.name || 'N/A'}</td>
                        <td>{booking.userId?.name || 'N/A'}</td>
                        <td>{booking.numberOfPeople}</td>
                        <td><span className={`status-badge ${booking.status}`}>{booking.status}</span></td>
                        <td>
                          <button className="btn-icon">👁️</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="admin-modal glass-panel">
            <h3>{editingTour ? 'Edit Tour' : 'Add New Tour'}</h3>
            <form onSubmit={handleSaveTour}>
              <div className="form-grid">
                <div className="form-group">
                  <label>Tour Name</label>
                  <input name="name" value={formData.name} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Destination</label>
                  <input name="destination" value={formData.destination} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Price (₹)</label>
                  <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
                </div>
                <div className="form-group">
                  <label>Duration</label>
                  <input name="duration" value={formData.duration} onChange={handleInputChange} required placeholder="e.g. 5 Days / 4 Nights" />
                </div>
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows="4"></textarea>
              </div>
              <div className="modal-actions">
                <button type="button" className="btn-outline" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary">Save Tour</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminDashboard;
