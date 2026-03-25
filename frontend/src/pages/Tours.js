import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const MAHARASHTRA_PACKAGES = [
  {
    _id: 'm1',
    title: 'Mahabaleshwar & Panchgani',
    category: 'Hill Station',
    duration: '3 Days / 2 Nights',
    description: "Experience lush green valleys, mesmerizing viewpoints like Arthur's Seat, and relish the famous fresh strawberries of Mahabaleshwar and Panchgani.",
    price: 7499,
    rating: 4.8,
    reviews: 215,
    badge: 'Most Popular',
    image: '/images/destinations/mahabaleshwar.png',
  },
  {
    _id: 'm2',
    title: 'Lonavala & Khandala Escape',
    category: 'Hill Station',
    duration: '2 Days / 1 Night',
    description: "Escape to the misty ghats! Explore Bhushi Dam, Tiger's Leap, Rajmachi Fort, and taste the iconic chikki of Lonavala.",
    price: 4999,
    rating: 4.6,
    reviews: 320,
    badge: 'Budget Friendly',
    image: '/images/destinations/lonavala.png',
  },
  {
    _id: 'm3',
    title: 'Ajanta & Ellora Caves Heritage',
    category: 'Heritage',
    duration: '2 Days / 1 Night',
    description: 'A UNESCO World Heritage journey! Marvel at the intricate 2,000-year-old rock-cut Buddhist paintings at Ajanta and stone sculptures at Ellora.',
    price: 8999,
    rating: 4.9,
    reviews: 180,
    badge: 'UNESCO Site',
    image: '/images/destinations/ajanta_ellora.png',
  },
  {
    _id: 'm4',
    title: 'Tarkarli Beach & Scuba Diving',
    category: 'Beach',
    duration: '3 Days / 2 Nights',
    description: 'Dive into crystal-clear Konkan waters at Tarkarli. Enjoy snorkeling, scuba diving, dolphin spotting, and serene houseboat stays.',
    price: 10999,
    rating: 4.7,
    reviews: 145,
    badge: 'Adventure',
    image: '/images/destinations/tarkarli.png',
  },
  {
    _id: 'm5',
    title: 'Tadoba Tiger Safari',
    category: 'Wildlife',
    duration: '2 Days / 1 Night',
    description: 'Embark on a thrilling jeep safari at Tadoba Andhari Tiger Reserve — one of India\'s best parks for spotting majestic Bengal Tigers in the wild.',
    price: 12999,
    rating: 4.8,
    reviews: 95,
    badge: 'Nature & Wildlife',
    image: '/images/destinations/tadoba.png',
  },
  {
    _id: 'm6',
    title: 'Matheran Heritage Hill Station',
    category: 'Hill Station',
    duration: '2 Days / 1 Night',
    description: 'Asia\'s only automobile-free hill station. Enjoy a vintage toy-train ride, serene sunrise and sunset points, and lush forest trails.',
    price: 5999,
    rating: 4.5,
    reviews: 210,
    badge: 'Eco-Friendly',
    image: '/images/destinations/matheran.png',
  },
  {
    _id: 'm7',
    title: 'Nashik Winery & Temples Tour',
    category: 'Pilgrimage',
    duration: '2 Days / 1 Night',
    description: 'Explore India\'s wine capital! Visit the famous Sula Vineyards, Trimbakeshwar Jyotirlinga and the sacred banks of the Godavari river.',
    price: 6499,
    rating: 4.6,
    reviews: 130,
    badge: 'Spiritual',
    image: '/images/destinations/nashik.svg',
  },
  {
    _id: 'm8',
    title: 'Kolhapur Royal Heritage',
    category: 'Heritage',
    duration: '2 Days / 1 Night',
    description: 'Discover the royal city of Kolhapur — the opulent New Palace, Mahalakshmi Temple, and savour the famous spicy Kolhapuri cuisine.',
    price: 5499,
    rating: 4.5,
    reviews: 98,
    badge: 'Royal Heritage',
    image: '/images/destinations/kolhapur.svg',
  },
  {
    _id: 'm9',
    title: 'Alibaug Coastal Weekend',
    category: 'Beach',
    duration: '2 Days / 1 Night',
    description: 'A perfect Mumbai weekend getaway! Relax on golden beaches, explore the historic Kolaba Fort standing in the sea, enjoy ferry rides and fresh seafood.',
    price: 5999,
    rating: 4.4,
    reviews: 274,
    badge: 'Weekend Special',
    image: '/images/destinations/alibaug.svg',
  },
];

const CATEGORIES = ['All', 'Hill Station', 'Beach', 'Heritage', 'Wildlife', 'Pilgrimage'];

const BADGE_COLORS = {
  'Most Popular': { bg: 'rgba(255, 51, 102, 0.2)', color: '#ff6b8a', border: 'rgba(255, 51, 102, 0.4)' },
  'Budget Friendly': { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: 'rgba(16, 185, 129, 0.4)' },
  'UNESCO Site': { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.4)' },
  'Adventure': { bg: 'rgba(239, 68, 68, 0.2)', color: '#f87171', border: 'rgba(239, 68, 68, 0.4)' },
  'Nature & Wildlife': { bg: 'rgba(52, 211, 153, 0.2)', color: '#6ee7b7', border: 'rgba(52, 211, 153, 0.4)' },
  'Eco-Friendly': { bg: 'rgba(16, 185, 129, 0.2)', color: '#34d399', border: 'rgba(16, 185, 129, 0.4)' },
  'Spiritual': { bg: 'rgba(167, 139, 250, 0.2)', color: '#c4b5fd', border: 'rgba(167, 139, 250, 0.4)' },
  'Royal Heritage': { bg: 'rgba(245, 158, 11, 0.2)', color: '#fbbf24', border: 'rgba(245, 158, 11, 0.4)' },
  'Weekend Special': { bg: 'rgba(99, 102, 241, 0.2)', color: '#a5b4fc', border: 'rgba(99, 102, 241, 0.4)' },
};

function Tours() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const response = await axios.get('/api/tours');
        const toursData = response.data.data ? response.data.data : response.data;
        if (toursData && toursData.length > 0) {
          setTours(toursData);
        } else {
          setTours(MAHARASHTRA_PACKAGES);
        }
      } catch (error) {
        setTours(MAHARASHTRA_PACKAGES);
      } finally {
        setLoading(false);
      }
    };
    fetchTours();
  }, []);

  const filteredTours = tours.filter(tour => {
    const matchesSearch =
      (tour.name || tour.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (tour.description || '').toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      activeCategory === 'All' || tour.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="animate-fade-in">
      {/* Page Header */}
      <section style={{
        padding: '80px 5% 50px',
        textAlign: 'center',
        background: 'radial-gradient(circle at 60% 0%, rgba(124, 58, 237, 0.12) 0%, transparent 55%), radial-gradient(circle at 30% 100%, rgba(255,51,102,0.08) 0%, transparent 50%)',
        borderBottom: '1px solid var(--surface-border)',
      }}>
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '30px', padding: '6px 16px', fontSize: '0.85rem', color: '#a78bfa', marginBottom: '20px', letterSpacing: '1px' }}>
          🏔️ MAHARASHTRA PACKAGES
        </div>
        <h1 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: '800', marginBottom: '15px', lineHeight: 1.2 }}>
          Explore Our <span className="text-gradient">Destinations</span>
        </h1>
        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', maxWidth: '580px', margin: '0 auto 35px' }}>
          Curated travel packages for the most popular destinations across Maharashtra — from misty hills to royal heritage and wild safaris.
        </p>

        {/* Search Bar */}
        <div style={{ maxWidth: '480px', margin: '0 auto', position: 'relative' }}>
          <input
            type="text"
            className="input-field"
            placeholder="Search destinations, activities..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ paddingLeft: '48px', borderRadius: '30px', fontSize: '1rem' }}
          />
          <span style={{ position: 'absolute', left: '17px', top: '50%', transform: 'translateY(-50%)', fontSize: '1.1rem' }}>🔍</span>
        </div>
      </section>

      {/* Category Filter Tabs */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '25px 5%', borderBottom: '1px solid var(--surface-border)', scrollbarWidth: 'none' }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              whiteSpace: 'nowrap',
              padding: '9px 22px',
              borderRadius: '30px',
              fontFamily: 'Outfit, sans-serif',
              fontSize: '0.95rem',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              border: activeCategory === cat ? 'none' : '1px solid var(--surface-border)',
              background: activeCategory === cat ? 'var(--brand-gradient)' : 'transparent',
              color: activeCategory === cat ? '#fff' : 'var(--text-secondary)',
              boxShadow: activeCategory === cat ? '0 4px 15px rgba(124,58,237,0.3)' : 'none',
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Tours Grid */}
      <section className="page-container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '100px 0', color: 'var(--text-secondary)' }}>
            <div style={{
              width: '44px', height: '44px', border: '3px solid var(--surface-border)',
              borderTop: '3px solid #7C3AED', borderRadius: '50%', margin: '0 auto 20px',
              animation: 'spin 0.9s linear infinite'
            }}></div>
            <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
            Loading wonderful destinations...
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
                Showing <strong style={{ color: 'var(--text-primary)' }}>{filteredTours.length}</strong> package{filteredTours.length !== 1 ? 's' : ''}
                {activeCategory !== 'All' ? ` in ${activeCategory}` : ' across all categories'}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(310px, 1fr))', gap: '30px' }}>
              {filteredTours.length === 0 ? (
                <div style={{ gridColumn: '1 / -1', padding: '70px 20px', textAlign: 'center', background: 'var(--surface-color)', borderRadius: 'var(--card-radius)', border: '1px dashed var(--surface-border)' }}>
                  <div style={{ fontSize: '3.5rem', marginBottom: '15px' }}>🏜️</div>
                  <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>No packages found</h3>
                  <p style={{ color: 'var(--text-secondary)' }}>Try a different category or search keyword.</p>
                </div>
              ) : (
                filteredTours.map(tour => {
                  const badgeStyle = BADGE_COLORS[tour.badge] || BADGE_COLORS['Most Popular'];
                  return (
                    <div
                      key={tour._id}
                      className="glass-panel"
                      style={{ borderRadius: 'var(--card-radius)', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', cursor: 'pointer' }}
                      onMouseOver={(e) => { e.currentTarget.style.transform = 'translateY(-10px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; }}
                      onMouseOut={(e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}
                    >
                      {/* Image */}
                      <div style={{ height: '210px', position: 'relative', overflow: 'hidden' }}>
                        <img
                          src={tour.image || (tour.images && tour.images[0]) || 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80'}
                          alt={tour.name || tour.title}
                          onError={(e) => { e.target.onerror = null; e.target.src = 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=800&q=80'; }}
                          style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
                          onMouseOver={(e) => e.target.style.transform = 'scale(1.08)'}
                          onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                        />
                        {/* Gradient overlay */}
                        <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%', background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}></div>
                        {/* Price badge */}
                        <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(0,0,0,0.65)', backdropFilter: 'blur(8px)', padding: '5px 14px', borderRadius: '20px', fontWeight: '700', fontSize: '0.95rem' }}>
                          ₹{tour.price?.toLocaleString()}
                        </div>
                        {/* Category pill */}
                        <div style={{ position: 'absolute', bottom: '14px', left: '14px', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(6px)', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', color: '#e6edf3' }}>
                          {tour.category || 'Tour'}
                        </div>
                      </div>

                      {/* Body */}
                      <div style={{ padding: '22px 24px 26px' }}>
                        {/* Badge + Rating row */}
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '8px' }}>
                          {tour.badge && (
                            <span style={{
                              fontSize: '0.75rem', fontWeight: '600', padding: '3px 10px', borderRadius: '30px',
                              background: badgeStyle.bg, color: badgeStyle.color, border: `1px solid ${badgeStyle.border}`,
                            }}>
                              {tour.badge}
                            </span>
                          )}
                          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#fbbf24', fontSize: '0.88rem' }}>
                            ★ <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{tour.rating}</span>
                            <span style={{ color: 'var(--text-secondary)' }}>({tour.reviews} reviews)</span>
                          </div>
                        </div>

                        <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '8px', lineHeight: '1.3' }}>{tour.name || tour.title}</h3>

                        {/* Duration */}
                        {tour.duration && (
                          <div style={{ color: '#a78bfa', fontSize: '0.85rem', marginBottom: '12px', fontWeight: '500' }}>
                            🕒 {tour.duration}
                          </div>
                        )}

                        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '22px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                          {tour.description}
                        </p>

                        <div style={{ display: 'flex', gap: '12px' }}>
                          <Link to={`/book/${tour._id}`} className="btn-primary" style={{ flex: 1, padding: '11px 0', textAlign: 'center' }}>
                            Book Now
                          </Link>
                          <Link to={`/tours/${tour._id}`} className="btn-outline" style={{ padding: '11px 16px' }} title="View Details">
                            ↗
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </>
        )}
      </section>
    </div>
  );
}

export default Tours;
