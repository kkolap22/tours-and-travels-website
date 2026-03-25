import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const OFFERS = [
  { id: 1, title: 'Early Bird Monsoon Special', badge: '🌧️ Monsoon Deal', discount: '30% OFF', originalPrice: 7499, salePrice: 5249, destination: 'Mahabaleshwar & Panchgani', validUntil: 'Valid till 30 June 2026', code: 'MONSOON30', image: '/images/destinations/mahabaleshwar.png', type: 'Limited', desc: 'Book your monsoon trip early and save big! Lush green valleys, waterfalls at their best.', tourId: 'm1' },
  { id: 2, title: 'Weekend Flash Sale', badge: '⚡ Flash Sale', discount: '20% OFF', originalPrice: 4999, salePrice: 3999, destination: 'Lonavala & Khandala', validUntil: 'Valid till 28 March 2026', code: 'FLASH20', image: '/images/destinations/lonavala.png', type: 'Flash', desc: '48-hour flash sale! Grab the best deal on Lonavala escape package right now.', tourId: 'm2' },
  { id: 3, title: 'Heritage Explorer Pass', badge: '🏛️ Heritage', discount: '15% OFF', originalPrice: 8999, salePrice: 7649, destination: 'Ajanta & Ellora Caves', validUntil: 'Valid till 15 April 2026', code: 'HERITAGE15', image: '/images/destinations/ajanta_ellora.png', type: 'Seasonal', desc: 'Explore India\'s UNESCO World Heritage Sites at a discounted price this cultural season.', tourId: 'm3' },
  { id: 4, title: 'Couple Anniversary Special', badge: '❤️ Couple Deal', discount: '₹2000 OFF', originalPrice: 10999, salePrice: 8999, destination: 'Tarkarli Beach & Scuba', validUntil: 'Valid till 30 April 2026', code: 'COUPLE2K', image: '/images/destinations/tarkarli.png', type: 'Couple', desc: 'Celebrate your anniversary with a romantic beach escape. Includes special candlelight dinner!', tourId: 'm4' },
  { id: 5, title: 'Group Discount (6+ People)', badge: '👥 Group', discount: '25% OFF', originalPrice: 12999, salePrice: 9749, destination: 'Tadoba Tiger Safari', validUntil: 'Valid for groups of 6+', code: 'GROUP25', image: '/images/destinations/tadoba.png', type: 'Group', desc: 'Travel with friends or family and unlock massive savings on the thrilling Tadoba Safari!', tourId: 'm5' },
  { id: 6, title: 'Budget Traveller Offer', badge: '💰 Budget', discount: '10% OFF', originalPrice: 5999, salePrice: 5399, destination: 'Matheran Hill Station', validUntil: 'Valid till 31 May 2026', code: 'BUDGET10', image: '/images/destinations/matheran.png', type: 'Budget', desc: "Asia's only automobile-free hill station at the most affordable price. Perfect for solo travellers!", tourId: 'm6' },
];

const TYPE_FILTERS = ['All', 'Flash', 'Seasonal', 'Couple', 'Group', 'Budget', 'Limited'];
const TYPE_COLORS = {
  'Flash': { bg: 'rgba(239,68,68,0.15)', color: '#f87171', border: 'rgba(239,68,68,0.3)' },
  'Seasonal': { bg: 'rgba(245,158,11,0.15)', color: '#fbbf24', border: 'rgba(245,158,11,0.3)' },
  'Couple': { bg: 'rgba(255,51,102,0.15)', color: '#ff6b8a', border: 'rgba(255,51,102,0.3)' },
  'Group': { bg: 'rgba(99,102,241,0.15)', color: '#a5b4fc', border: 'rgba(99,102,241,0.3)' },
  'Budget': { bg: 'rgba(16,185,129,0.15)', color: '#34d399', border: 'rgba(16,185,129,0.3)' },
  'Limited': { bg: 'rgba(167,139,250,0.15)', color: '#c4b5fd', border: 'rgba(167,139,250,0.3)' },
};

function Offers() {
  const [filter, setFilter] = useState('All');
  const [copiedCode, setCopiedCode] = useState(null);

  const filtered = filter === 'All' ? OFFERS : OFFERS.filter(o => o.type === filter);

  const copyCode = (code) => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section style={{ padding: '80px 5% 60px', textAlign: 'center', background: 'radial-gradient(circle at 70% 0%, rgba(255,51,102,0.15), transparent 50%), radial-gradient(circle at 20% 100%, rgba(124,58,237,0.1), transparent 50%)', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(255,51,102,0.15)', border: '1px solid rgba(255,51,102,0.3)', borderRadius: '30px', padding: '6px 16px', fontSize: '0.85rem', color: '#ff6b8a', marginBottom: '20px', letterSpacing: '1px' }}>🔥 EXCLUSIVE DEALS</div>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: '800', marginBottom: '16px' }}>Hot Offers & <span className="text-gradient">Travel Deals</span></h1>
        <p style={{ color: '#8b949e', fontSize: '1.05rem', maxWidth: '580px', margin: '0 auto 30px' }}>Limited time discounts on our most popular Maharashtra tour packages. Don't miss out!</p>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'rgba(255,51,102,0.1)', border: '1px solid rgba(255,51,102,0.25)', borderRadius: '12px', padding: '12px 24px' }}>
          <span style={{ fontSize: '1.1rem' }}>⏰</span>
          <span style={{ color: '#ff6b8a', fontWeight: '600', fontSize: '0.9rem' }}>Prices valid for limited time · Book before they expire!</span>
        </div>
      </section>

      {/* Type Filter */}
      <div style={{ display: 'flex', gap: '10px', padding: '24px 5%', borderBottom: '1px solid var(--surface-border)', overflowX: 'auto', scrollbarWidth: 'none', flexWrap: 'wrap' }}>
        {TYPE_FILTERS.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ whiteSpace: 'nowrap', padding: '9px 22px', borderRadius: '30px', border: filter === t ? 'none' : '1px solid #30363d', background: filter === t ? 'var(--brand-gradient)' : 'transparent', color: filter === t ? '#fff' : '#8b949e', fontFamily: 'Outfit,sans-serif', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', boxShadow: filter === t ? '0 4px 15px rgba(124,58,237,0.3)' : 'none' }}>{t}</button>
        ))}
      </div>

      {/* Offers Grid */}
      <section style={{ padding: '40px 5% 60px', maxWidth: '1300px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(360px,1fr))', gap: '28px' }}>
          {filtered.map(offer => {
            const typeStyle = TYPE_COLORS[offer.type] || TYPE_COLORS['Limited'];
            const savingsAmt = offer.originalPrice - offer.salePrice;
            const savingsPct = Math.round((savingsAmt / offer.originalPrice) * 100);
            return (
              <div key={offer.id} className="glass-panel" style={{ borderRadius: '20px', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', display: 'flex', flexDirection: 'column' }}
                onMouseOver={e => { e.currentTarget.style.transform = 'translateY(-8px)'; e.currentTarget.style.boxShadow = '0 20px 50px rgba(0,0,0,0.4)'; }}
                onMouseOut={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = ''; }}>
                {/* Image */}
                <div style={{ height: '200px', background: 'linear-gradient(135deg,#1c2331,#283046)', position: 'relative', overflow: 'hidden' }}>
                  <img src={offer.image} alt={offer.destination} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7, transition: 'transform 0.5s ease' }} onError={e => { e.target.style.display = 'none'; }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
                  {/* Discount Badge */}
                  <div style={{ position: 'absolute', top: '14px', right: '14px', background: 'var(--brand-gradient)', borderRadius: '10px', padding: '8px 14px', textAlign: 'center' }}>
                    <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#fff' }}>{offer.discount}</div>
                  </div>
                  {/* Type Badge */}
                  <div style={{ position: 'absolute', top: '14px', left: '14px', background: typeStyle.bg, border: `1px solid ${typeStyle.border}`, borderRadius: '20px', padding: '4px 12px', fontSize: '0.78rem', color: typeStyle.color, fontWeight: '700', backdropFilter: 'blur(4px)' }}>{offer.badge}</div>
                  <div style={{ position: 'absolute', bottom: '12px', left: '14px', fontWeight: '700', fontSize: '1rem', color: '#fff' }}>{offer.destination}</div>
                </div>

                {/* Body */}
                <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', lineHeight: '1.3' }}>{offer.title}</h3>
                  <p style={{ color: '#8b949e', fontSize: '0.9rem', lineHeight: '1.6' }}>{offer.desc}</p>

                  {/* Price Display */}
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px' }}>
                    <span style={{ fontSize: '1.8rem', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{offer.salePrice.toLocaleString()}</span>
                    <span style={{ fontSize: '1rem', color: '#8b949e', textDecoration: 'line-through' }}>₹{offer.originalPrice.toLocaleString()}</span>
                    <span style={{ fontSize: '0.8rem', color: '#34d399', fontWeight: '700', background: 'rgba(52,211,153,0.1)', border: '1px solid rgba(52,211,153,0.2)', borderRadius: '6px', padding: '2px 8px' }}>Save ₹{savingsAmt.toLocaleString()}</span>
                  </div>

                  {/* Coupon Code */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(124,58,237,0.08)', border: '1px dashed rgba(124,58,237,0.3)', borderRadius: '10px', padding: '12px 14px' }}>
                    <span style={{ color: '#8b949e', fontSize: '0.82rem' }}>Coupon Code:</span>
                    <code style={{ color: '#a78bfa', fontWeight: '700', fontSize: '0.9rem', flex: 1 }}>{offer.code}</code>
                    <button onClick={() => copyCode(offer.code)} style={{ background: copiedCode === offer.code ? 'rgba(52,211,153,0.2)' : 'rgba(124,58,237,0.2)', border: 'none', borderRadius: '6px', color: copiedCode === offer.code ? '#34d399' : '#a78bfa', padding: '5px 10px', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontSize: '0.78rem', fontWeight: '600' }}>
                      {copiedCode === offer.code ? '✓ Copied!' : '📋 Copy'}
                    </button>
                  </div>

                  <div style={{ color: '#8b949e', fontSize: '0.8rem' }}>⏳ {offer.validUntil}</div>

                  <Link to={`/book/${offer.tourId}`} className="btn-primary" style={{ textAlign: 'center', padding: '13px', fontSize: '0.97rem', borderRadius: '10px', marginTop: 'auto' }}>
                    Grab This Deal →
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Newsletter */}
      <section style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.12), transparent 65%)', borderTop: '1px solid var(--surface-border)', padding: '70px 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '10px' }}>Never Miss a <span className="text-gradient">Deal!</span></h2>
        <p style={{ color: '#8b949e', marginBottom: '28px', fontSize: '1.05rem' }}>Subscribe and get exclusive offers delivered to your inbox.</p>
        <div style={{ display: 'flex', gap: '12px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap', justifyContent: 'center' }}>
          <input type="email" placeholder="Enter your email address" style={{ flex: 1, minWidth: '220px', padding: '14px 18px', background: '#0d1117', border: '1px solid #30363d', borderRadius: '8px', color: '#e6edf3', fontFamily: 'Outfit,sans-serif', fontSize: '0.97rem', outline: 'none' }} onFocus={e => e.target.style.borderColor = '#7C3AED'} onBlur={e => e.target.style.borderColor = '#30363d'} />
          <button className="btn-primary" style={{ padding: '14px 24px', whiteSpace: 'nowrap' }}>🔔 Subscribe</button>
        </div>
      </section>
    </div>
  );
}

export default Offers;
