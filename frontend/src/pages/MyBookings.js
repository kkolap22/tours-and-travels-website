import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const STATUS_STYLES = {
  'Confirmed': { bg: 'rgba(52,211,153,0.15)', color: '#34d399', border: 'rgba(52,211,153,0.3)' },
  'Pending': { bg: 'rgba(251,191,36,0.15)', color: '#fbbf24', border: 'rgba(251,191,36,0.3)' },
  'Cancelled': { bg: 'rgba(248,113,113,0.15)', color: '#f87171', border: 'rgba(248,113,113,0.3)' },
  'Completed': { bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
};

const DEMO_BOOKINGS = [
  { id: 'BK001', tourId: 'm1', tourTitle: 'Mahabaleshwar & Panchgani', tourImage: '/images/destinations/mahabaleshwar.png', duration: '3 Days / 2 Nights', category: 'Hill Station', travelDate: '2026-04-15', travelers: 4, roomType: 'double', pricePerPerson: 7499, total: 31496, status: 'Confirmed', bookedOn: '2026-03-10T10:00:00Z', email: 'demo@example.com', name: 'Demo User' },
  { id: 'BK002', tourId: 'm4', tourTitle: 'Tarkarli Beach & Scuba Diving', tourImage: '/images/destinations/tarkarli.png', duration: '3 Days / 2 Nights', category: 'Beach', travelDate: '2026-03-28', travelers: 2, roomType: 'double', pricePerPerson: 10999, total: 23098, status: 'Completed', bookedOn: '2026-02-20T10:00:00Z', email: 'demo@example.com', name: 'Demo User' },
  { id: 'BK003', tourId: 'm5', tourTitle: 'Tadoba Tiger Safari', tourImage: '/images/destinations/tadoba.png', duration: '2 Days / 1 Night', category: 'Wildlife', travelDate: '2026-05-01', travelers: 2, roomType: 'double', pricePerPerson: 12999, total: 27298, status: 'Pending', bookedOn: '2026-03-22T10:00:00Z', email: 'demo@example.com', name: 'Demo User' },
];

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [filter, setFilter] = useState('All');
  const [cancelId, setCancelId] = useState(null);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('shreeja_bookings') || '[]');
    setBookings([...DEMO_BOOKINGS, ...stored]);
  }, []);

  const filters = ['All', 'Confirmed', 'Pending', 'Completed', 'Cancelled'];
  const filtered = filter === 'All' ? bookings : bookings.filter(b => b.status === filter);

  const handleCancel = (id) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status: 'Cancelled' } : b);
    const storedIds = DEMO_BOOKINGS.map(d => d.id);
    const toSave = updated.filter(b => !storedIds.includes(b.id));
    localStorage.setItem('shreeja_bookings', JSON.stringify(toSave));
    setBookings(updated);
    setCancelId(null);
  };

  const stats = [
    { label: 'Total Bookings', value: bookings.length, icon: '📋' },
    { label: 'Upcoming Trips', value: bookings.filter(b => b.status === 'Confirmed' || b.status === 'Pending').length, icon: '✈️' },
    { label: 'Completed Trips', value: bookings.filter(b => b.status === 'Completed').length, icon: '🏆' },
    { label: 'Total Spent', value: '₹' + bookings.filter(b => b.status !== 'Cancelled').reduce((sum, b) => sum + (b.total || 0), 0).toLocaleString(), icon: '💰' },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <section style={{ padding: '70px 5% 50px', background: 'radial-gradient(circle at 70% 0%, rgba(124,58,237,0.12), transparent 50%)', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '30px', padding: '6px 16px', fontSize: '0.85rem', color: '#a78bfa', marginBottom: '20px', letterSpacing: '1px' }}>
          🎒 MY TRAVEL HISTORY
        </div>
        <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', fontWeight: '800', marginBottom: '12px' }}>My <span className="text-gradient">Bookings</span></h1>
        <p style={{ color: '#8b949e', fontSize: '1.05rem' }}>Track and manage all your Shreeja Tours adventures</p>
      </section>

      {/* Stats */}
      <section style={{ padding: '40px 5%', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'grid', gridTemplateColumns: 'repeat(auto-fit,minmax(200px,1fr))', gap: '20px' }}>
          {stats.map((s, i) => (
            <div key={i} className="glass-panel" style={{ borderRadius: '16px', padding: '28px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div style={{ fontSize: '2rem' }}>{s.icon}</div>
              <div>
                <div style={{ fontSize: '1.6rem', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{s.value}</div>
                <div style={{ color: '#8b949e', fontSize: '0.88rem' }}>{s.label}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Filter Tabs */}
      <div style={{ padding: '24px 5%', borderBottom: '1px solid var(--surface-border)', display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
        {filters.map(f => (
          <button key={f} onClick={() => setFilter(f)} style={{ padding: '8px 22px', borderRadius: '30px', border: filter === f ? 'none' : '1px solid #30363d', background: filter === f ? 'var(--brand-gradient)' : 'transparent', color: filter === f ? '#fff' : '#8b949e', fontFamily: 'Outfit,sans-serif', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', boxShadow: filter === f ? '0 4px 15px rgba(124,58,237,0.3)' : 'none' }}>{f}</button>
        ))}
      </div>

      {/* Bookings List */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 5% 60px' }}>
        {filtered.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🗺️</div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>No bookings found</h3>
            <p style={{ color: '#8b949e', marginBottom: '30px' }}>You haven't made any {filter !== 'All' ? filter.toLowerCase() : ''} bookings yet.</p>
            <Link to="/tours" className="btn-primary" style={{ padding: '14px 30px' }}>Explore Tours</Link>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {filtered.map(booking => {
              const statusStyle = STATUS_STYLES[booking.status] || STATUS_STYLES['Pending'];
              const travelDate = new Date(booking.travelDate);
              const isUpcoming = travelDate > new Date() && booking.status !== 'Cancelled';
              return (
                <div key={booking.id} className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', display: 'grid', gridTemplateColumns: '200px 1fr auto', transition: 'transform 0.3s ease' }}
                  onMouseOver={e => e.currentTarget.style.transform = 'translateY(-4px)'}
                  onMouseOut={e => e.currentTarget.style.transform = 'translateY(0)'}>
                  <div style={{ height: '100%', minHeight: '160px', background: 'linear-gradient(135deg,#1c2331,#283046)', overflow: 'hidden', position: 'relative' }}>
                    <img src={booking.tourImage} alt={booking.tourTitle} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} onError={e => { e.target.style.display = 'none'; }} />
                    {isUpcoming && <div style={{ position: 'absolute', top: '10px', left: '10px', background: 'rgba(52,211,153,0.9)', borderRadius: '6px', padding: '3px 8px', fontSize: '0.72rem', fontWeight: '700', color: '#000' }}>UPCOMING</div>}
                  </div>
                  <div style={{ padding: '24px 28px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px', flexWrap: 'wrap' }}>
                      <span style={{ background: statusStyle.bg, color: statusStyle.color, border: `1px solid ${statusStyle.border}`, borderRadius: '20px', padding: '3px 12px', fontSize: '0.78rem', fontWeight: '700' }}>{booking.status}</span>
                      <span style={{ color: '#8b949e', fontSize: '0.82rem' }}>#{booking.id}</span>
                    </div>
                    <h3 style={{ fontSize: '1.15rem', fontWeight: '700', marginBottom: '8px' }}>{booking.tourTitle}</h3>
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', marginBottom: '12px' }}>
                      <span style={{ color: '#8b949e', fontSize: '0.88rem' }}>📅 {booking.travelDate}</span>
                      <span style={{ color: '#8b949e', fontSize: '0.88rem' }}>🕒 {booking.duration}</span>
                      <span style={{ color: '#8b949e', fontSize: '0.88rem' }}>👥 {booking.travelers} traveller{booking.travelers > 1 ? 's' : ''}</span>
                      <span style={{ color: '#8b949e', fontSize: '0.88rem' }}>🛏️ {booking.roomType} room</span>
                    </div>
                    <div style={{ fontSize: '0.8rem', color: '#8b949e' }}>Booked on {new Date(booking.bookedOn).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                  </div>
                  <div style={{ padding: '24px 28px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', borderLeft: '1px solid var(--surface-border)', minWidth: '180px' }}>
                    <div style={{ textAlign: 'right' }}>
                      <div style={{ fontSize: '0.8rem', color: '#8b949e', marginBottom: '4px' }}>Total Amount</div>
                      <div style={{ fontSize: '1.5rem', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{booking.total?.toLocaleString()}</div>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
                      <Link to={`/tours/${booking.tourId}`} className="btn-outline" style={{ padding: '9px 16px', fontSize: '0.85rem', textAlign: 'center' }}>View Tour</Link>
                      {(booking.status === 'Confirmed' || booking.status === 'Pending') && (
                        <button onClick={() => setCancelId(booking.id)} style={{ padding: '9px 16px', fontSize: '0.85rem', background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.3)', borderRadius: '8px', color: '#f87171', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontWeight: '600' }}>Cancel</button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Cancel Confirm Modal */}
      {cancelId && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div className="glass-panel" style={{ borderRadius: '20px', padding: '40px', maxWidth: '420px', width: '100%', textAlign: 'center' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>⚠️</div>
            <h3 style={{ fontSize: '1.4rem', fontWeight: '700', marginBottom: '12px' }}>Cancel Booking?</h3>
            <p style={{ color: '#8b949e', marginBottom: '28px', lineHeight: '1.7' }}>Are you sure you want to cancel this booking? Refunds are processed within 7 business days as per our cancellation policy.</p>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => setCancelId(null)} className="btn-outline" style={{ padding: '12px 28px' }}>Keep Booking</button>
              <button onClick={() => handleCancel(cancelId)} style={{ padding: '12px 28px', background: 'rgba(248,113,113,0.2)', border: '1px solid rgba(248,113,113,0.4)', borderRadius: '8px', color: '#f87171', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontWeight: '700', fontSize: '0.95rem' }}>Yes, Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyBookings;
