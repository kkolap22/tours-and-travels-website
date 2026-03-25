import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PACKAGES = [
  { _id: 'm1', title: 'Mahabaleshwar & Panchgani', duration: '3 Days / 2 Nights', price: 7499, image: '/images/destinations/mahabaleshwar.png', category: 'Hill Station', rating: 4.8, badge: 'Most Popular' },
  { _id: 'm2', title: 'Lonavala & Khandala Escape', duration: '2 Days / 1 Night', price: 4999, image: '/images/destinations/lonavala.png', category: 'Hill Station', rating: 4.6, badge: 'Budget Friendly' },
  { _id: 'm3', title: 'Ajanta & Ellora Caves Heritage', duration: '2 Days / 1 Night', price: 8999, image: '/images/destinations/ajanta_ellora.png', category: 'Heritage', rating: 4.9, badge: 'UNESCO Site' },
  { _id: 'm4', title: 'Tarkarli Beach & Scuba Diving', duration: '3 Days / 2 Nights', price: 10999, image: '/images/destinations/tarkarli.png', category: 'Beach', rating: 4.7, badge: 'Adventure' },
  { _id: 'm5', title: 'Tadoba Tiger Safari', duration: '2 Days / 1 Night', price: 12999, image: '/images/destinations/tadoba.png', category: 'Wildlife', rating: 4.8, badge: 'Nature & Wildlife' },
  { _id: 'm6', title: 'Matheran Heritage Hill Station', duration: '2 Days / 1 Night', price: 5999, image: '/images/destinations/matheran.png', category: 'Hill Station', rating: 4.5, badge: 'Eco-Friendly' },
  { _id: 'm7', title: 'Nashik Winery & Temples Tour', duration: '2 Days / 1 Night', price: 6499, image: '/images/destinations/nashik.svg', category: 'Pilgrimage', rating: 4.6, badge: 'Spiritual' },
  { _id: 'm8', title: 'Kolhapur Royal Heritage', duration: '2 Days / 1 Night', price: 5499, image: '/images/destinations/kolhapur.svg', category: 'Heritage', rating: 4.5, badge: 'Royal Heritage' },
  { _id: 'm9', title: 'Alibaug Coastal Weekend', duration: '2 Days / 1 Night', price: 5999, image: '/images/destinations/alibaug.svg', category: 'Beach', rating: 4.4, badge: 'Weekend Special' },
];

const inputStyle = { width: '100%', padding: '13px 16px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontFamily: 'Outfit,sans-serif', fontSize: '0.97rem', outline: 'none', transition: 'border-color 0.25s ease' };
const labelStyle = { display: 'block', marginBottom: '7px', fontSize: '0.88rem', color: '#8b949e', fontWeight: '600', textTransform: 'uppercase', letterSpacing: '0.5px' };

function Booking() {
  const { tourId } = useParams();
  const navigate = useNavigate();
  const tour = PACKAGES.find(p => p._id === tourId) || PACKAGES[0];

  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ name: '', email: '', phone: '', travelers: 2, travelDate: '', roomType: 'double', specialReq: '', city: '' });
  const [submitted, setSubmitted] = useState(false);

  const gst = Math.round(form.travelers * tour.price * 0.05);
  const total = form.travelers * tour.price + gst;

  const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    const bookings = JSON.parse(localStorage.getItem('shreeja_bookings') || '[]');
    const newBooking = {
      id: 'BK' + Date.now(),
      tourId: tour._id,
      tourTitle: tour.title,
      tourImage: tour.image,
      duration: tour.duration,
      category: tour.category,
      pricePerPerson: tour.price,
      ...form,
      total,
      status: 'Confirmed',
      bookedOn: new Date().toISOString(),
    };
    bookings.push(newBooking);
    localStorage.setItem('shreeja_bookings', JSON.stringify(bookings));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="animate-fade-in" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 5%' }}>
        <div className="glass-panel" style={{ borderRadius: '24px', padding: '60px 50px', textAlign: 'center', maxWidth: '520px', width: '100%' }}>
          <div style={{ fontSize: '4rem', marginBottom: '20px' }}>🎉</div>
          <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '12px' }}>Booking <span className="text-gradient">Confirmed!</span></h2>
          <p style={{ color: '#8b949e', marginBottom: '30px', lineHeight: '1.7' }}>Your trip to <strong style={{ color: '#e6edf3' }}>{tour.title}</strong> has been booked successfully. A confirmation will be sent to <strong style={{ color: '#a78bfa' }}>{form.email}</strong>.</p>
          <div style={{ background: 'rgba(124,58,237,0.08)', borderRadius: '12px', padding: '20px', marginBottom: '30px', border: '1px solid rgba(124,58,237,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#8b949e', fontSize: '0.9rem' }}>Booking ID</span>
              <span style={{ fontWeight: '700', color: '#a78bfa', fontSize: '0.9rem' }}>BK{Date.now().toString().slice(-6)}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
              <span style={{ color: '#8b949e', fontSize: '0.9rem' }}>Travel Date</span>
              <span style={{ fontWeight: '700', fontSize: '0.9rem' }}>{form.travelDate || '—'}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#8b949e', fontSize: '0.9rem' }}>Total Paid</span>
              <span style={{ fontWeight: '800', fontSize: '1.1rem', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{total.toLocaleString()}</span>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/my-bookings" className="btn-primary" style={{ padding: '12px 28px' }}>View My Bookings</Link>
            <Link to="/tours" className="btn-outline" style={{ padding: '12px 28px' }}>Explore More</Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="animate-fade-in">
      <section style={{ padding: '60px 5% 40px', borderBottom: '1px solid var(--surface-border)', background: 'radial-gradient(circle at 70% 0%, rgba(124,58,237,0.1), transparent 50%)' }}>
        <button onClick={() => navigate(`/tours/${tour._id}`)} style={{ background: 'transparent', border: 'none', color: '#8b949e', cursor: 'pointer', fontSize: '0.9rem', fontFamily: 'Outfit,sans-serif', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '6px', padding: 0 }}>← Back to Tour</button>
        <h1 style={{ fontSize: 'clamp(1.8rem,4vw,2.8rem)', fontWeight: '800', marginBottom: '12px' }}>Complete Your <span className="text-gradient">Booking</span></h1>
        <p style={{ color: '#8b949e' }}>Fill in the details below to secure your spot</p>
        {/* Progress Steps */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0', marginTop: '30px', maxWidth: '400px' }}>
          {['Details', 'Preferences', 'Confirm'].map((s, i) => (
            <React.Fragment key={i}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', background: step > i ? 'var(--brand-gradient)' : step === i + 1 ? 'var(--brand-gradient)' : 'var(--surface-color)', border: step > i || step === i + 1 ? 'none' : '2px solid #30363d', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem', fontWeight: '700', color: step >= i + 1 ? '#fff' : '#8b949e' }}>{step > i + 1 ? '✓' : i + 1}</div>
                <span style={{ fontSize: '0.75rem', color: step === i + 1 ? '#a78bfa' : '#8b949e', fontWeight: step === i + 1 ? '600' : '400' }}>{s}</span>
              </div>
              {i < 2 && <div style={{ flex: 1, height: '2px', background: step > i + 1 ? 'var(--brand-gradient)' : '#30363d', marginBottom: '18px' }} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <div style={{ maxWidth: '1100px', margin: '40px auto', padding: '0 5% 60px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }}>
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: '36px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '28px' }}>👤 Personal Details</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Full Name *</label>
                  <input style={inputStyle} name="name" value={form.name} onChange={handleChange} placeholder="e.g. Priya Sharma" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Email Address *</label>
                  <input style={inputStyle} name="email" type="email" value={form.email} onChange={handleChange} placeholder="priya@example.com" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Phone Number *</label>
                  <input style={inputStyle} name="phone" type="tel" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>City / State *</label>
                  <input style={inputStyle} name="city" value={form.city} onChange={handleChange} placeholder="e.g. Pune, Maharashtra" required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
              </div>
              <button type="button" onClick={() => { if (form.name && form.email && form.phone && form.city) setStep(2); }} className="btn-primary" style={{ marginTop: '28px', padding: '14px 36px', fontSize: '1rem' }}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: '36px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '28px' }}>🏕️ Trip Preferences</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Travel Date *</label>
                  <input style={inputStyle} name="travelDate" type="date" value={form.travelDate} onChange={handleChange} required min={new Date().toISOString().split('T')[0]} onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Number of Travellers *</label>
                  <input style={inputStyle} name="travelers" type="number" min="1" max="30" value={form.travelers} onChange={handleChange} required onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
                <div>
                  <label style={labelStyle}>Room Type</label>
                  <select style={{ ...inputStyle, cursor: 'pointer' }} name="roomType" value={form.roomType} onChange={handleChange}>
                    <option value="single">Single Occupancy</option>
                    <option value="double">Double Occupancy</option>
                    <option value="triple">Triple Occupancy</option>
                    <option value="family">Family Suite</option>
                  </select>
                </div>
                <div style={{ gridColumn: '1 / -1' }}>
                  <label style={labelStyle}>Special Requests (Optional)</label>
                  <textarea style={{ ...inputStyle, height: '100px', resize: 'vertical' }} name="specialReq" value={form.specialReq} onChange={handleChange} placeholder="Any dietary requirements, wheelchair access, anniversary setup, etc." onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
                </div>
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '28px' }}>
                <button type="button" onClick={() => setStep(1)} className="btn-outline" style={{ padding: '14px 28px', fontSize: '1rem' }}>← Back</button>
                <button type="button" onClick={() => { if (form.travelDate && form.travelers) setStep(3); }} className="btn-primary" style={{ padding: '14px 36px', fontSize: '1rem' }}>Review Booking →</button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="glass-panel" style={{ borderRadius: '20px', padding: '36px' }}>
              <h2 style={{ fontSize: '1.3rem', fontWeight: '700', marginBottom: '28px' }}>✅ Confirm Your Booking</h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '28px' }}>
                {[['👤 Name', form.name], ['📧 Email', form.email], ['📞 Phone', form.phone], ['🏙️ City', form.city], ['📅 Travel Date', form.travelDate], ['👥 Travellers', form.travelers], ['🛏️ Room Type', form.roomType]].map(([label, val], i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: '10px', border: '1px solid #30363d' }}>
                    <span style={{ color: '#8b949e', fontSize: '0.9rem' }}>{label}</span>
                    <span style={{ fontWeight: '600', fontSize: '0.9rem', textTransform: 'capitalize' }}>{val}</span>
                  </div>
                ))}
              </div>
              <div style={{ background: 'rgba(52,211,153,0.08)', borderRadius: '12px', padding: '16px 20px', marginBottom: '28px', border: '1px solid rgba(52,211,153,0.2)', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.2rem' }}>🔒</span>
                <span style={{ fontSize: '0.88rem', color: '#8b949e' }}>Your data is safe and secure. We follow strict privacy practices.</span>
              </div>
              <div style={{ display: 'flex', gap: '12px' }}>
                <button type="button" onClick={() => setStep(2)} className="btn-outline" style={{ padding: '14px 28px', fontSize: '1rem' }}>← Edit</button>
                <button type="submit" className="btn-primary" style={{ padding: '14px 36px', fontSize: '1rem', flex: 1 }}>🎒 Confirm & Book Now</button>
              </div>
            </div>
          )}
        </form>

        {/* Order Summary */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div className="glass-panel" style={{ borderRadius: '20px', padding: '28px', border: '1px solid rgba(124,58,237,0.2)' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px' }}>📋 Order Summary</h3>
            <div style={{ height: '160px', borderRadius: '12px', overflow: 'hidden', marginBottom: '20px', background: 'linear-gradient(135deg,#1c2331,#283046)' }}>
              <img src={tour.image || (tour.images && tour.images[0]) || '/images/destinations/default.png'} alt={tour.title || tour.name} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} onError={(e) => { e.target.style.display = 'none'; }} />
            </div>
            <h4 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '6px' }}>{tour.title}</h4>
            <p style={{ color: '#8b949e', fontSize: '0.85rem', marginBottom: '20px' }}>🕒 {tour.duration} &nbsp;|&nbsp; ⭐ {tour.rating}</p>
            <div style={{ borderTop: '1px solid #30363d', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#8b949e' }}>₹{tour.price.toLocaleString()} × {form.travelers} person{form.travelers > 1 ? 's' : ''}</span>
                <span>₹{(form.travelers * tour.price).toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                <span style={{ color: '#8b949e' }}>GST (5%)</span>
                <span>₹{gst.toLocaleString()}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.15rem', fontWeight: '800', borderTop: '1px solid #30363d', paddingTop: '12px', marginTop: '4px' }}>
                <span>Total</span>
                <span style={{ background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{total.toLocaleString()}</span>
              </div>
            </div>
            <div style={{ marginTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {['✅ Free Cancellation (7 days)', '🔒 Secure Payment', '📞 24/7 Support'].map((item, i) => (
                <div key={i} style={{ fontSize: '0.82rem', color: '#8b949e', display: 'flex', alignItems: 'center', gap: '6px' }}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;
