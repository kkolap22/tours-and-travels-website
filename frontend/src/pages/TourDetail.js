import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

const PACKAGES = [
  { _id: 'm1', title: 'Mahabaleshwar & Panchgani', category: 'Hill Station', duration: '3 Days / 2 Nights', price: 7499, rating: 4.8, reviews: 215, badge: 'Most Popular', image: '/images/destinations/mahabaleshwar.png', location: 'Mahabaleshwar, Maharashtra', groupSize: 'Max 20 persons', description: "Experience lush green valleys, mesmerizing viewpoints like Arthur's Seat, and relish the famous fresh strawberries.", longDescription: "Mahabaleshwar and Panchgani are twin hill stations nestled in the Sahyadri mountain range of Maharashtra. At an elevation of 1,372 metres, Mahabaleshwar offers breathtaking panoramic views, lush forests, and the famous Venna Lake. Panchgani is renowned for its Table Land — Asia's second largest volcanic plateau.", highlights: ["Arthur's Seat Viewpoint", "Venna Lake Boating", "Strawberry Farms", "Table Land Walk", "Wilson Point Sunrise", "Elephant's Head Point"], itinerary: [{ day: 'Day 1', title: 'Arrival & Panchgani', desc: 'Arrive, check-in. Evening visit to Table Land and Sydney Point.' }, { day: 'Day 2', title: 'Mahabaleshwar Sightseeing', desc: "Full day: Arthur's Seat, Venna Lake boating, Strawberry farms, Mapro Garden." }, { day: 'Day 3', title: 'Departure', desc: 'Morning visit to Elephant\'s Head Point. Breakfast and check-out.' }], inclusions: ['2 Nights Accommodation', 'Daily Breakfast & Dinner', 'AC Transport', 'Sightseeing', 'Tour Guide', 'All Toll & Parking'], exclusions: ['Personal Expenses', 'Entry Fees', 'Adventure Activities', 'Lunch', 'Travel Insurance'] },
  { _id: 'm2', title: 'Lonavala & Khandala Escape', category: 'Hill Station', duration: '2 Days / 1 Night', price: 4999, rating: 4.6, reviews: 320, badge: 'Budget Friendly', image: '/images/destinations/lonavala.png', location: 'Lonavala, Maharashtra', groupSize: 'Max 25 persons', description: "Escape to the misty ghats! Explore Bhushi Dam, Tiger's Leap, Rajmachi Fort.", longDescription: "Lonavala and Khandala are the most popular weekend getaways from Mumbai and Pune. Surrounded by verdant hills and cascading waterfalls during monsoon, this twin hill station offers a serene escape.", highlights: ["Bhushi Dam", "Tiger's Leap", "Rajmachi Fort Trek", "Karla Caves", "Chikki Shopping", "Lonavala Lake"], itinerary: [{ day: 'Day 1', title: 'Arrival & Khandala', desc: "Visit Tiger's Leap, Duke's Nose. Evening at Lonavala Lake." }, { day: 'Day 2', title: 'Bhushi Dam & Departure', desc: 'Morning visit Bhushi Dam and Karla Caves. Depart after lunch.' }], inclusions: ['1 Night Accommodation', 'Breakfast', 'AC Transport', 'Sightseeing', 'Tour Guide'], exclusions: ['Personal Expenses', 'Entry Fees', 'Meals (except breakfast)', 'Travel Insurance'] },
  { _id: 'm3', title: 'Ajanta & Ellora Caves Heritage', category: 'Heritage', duration: '2 Days / 1 Night', price: 8999, rating: 4.9, reviews: 180, badge: 'UNESCO Site', image: '/images/destinations/ajanta_ellora.png', location: 'Aurangabad, Maharashtra', groupSize: 'Max 30 persons', description: 'A UNESCO World Heritage journey! Marvel at 2,000-year-old rock-cut paintings.', longDescription: "The Ajanta and Ellora Caves are UNESCO World Heritage Sites. The 30 rock-cut Buddhist caves at Ajanta date to 2nd century BCE. Ellora boasts 34 caves representing Buddhist, Hindu, and Jain traditions including the magnificent Kailasa Temple.", highlights: ['Ajanta Cave Paintings', 'Kailasa Temple', 'Daulatabad Fort', 'Bibi Ka Maqbara', 'Aurangabad Caves', 'Panchakki'], itinerary: [{ day: 'Day 1', title: 'Ajanta Caves', desc: 'Explore the 30 rock-cut caves with heritage guide.' }, { day: 'Day 2', title: 'Ellora & Departure', desc: 'Kailasa Temple, Bibi Ka Maqbara, Daulatabad Fort. Evening departure.' }], inclusions: ['1 Night Hotel', 'Breakfast', 'AC Bus', 'Expert Heritage Guide', 'All Transfers'], exclusions: ['ASI Entry Fees', 'Lunch & Dinner', 'Personal Expenses'] },
  { _id: 'm4', title: 'Tarkarli Beach & Scuba Diving', category: 'Beach', duration: '3 Days / 2 Nights', price: 10999, rating: 4.7, reviews: 145, badge: 'Adventure', image: '/images/destinations/tarkarli.png', location: 'Tarkarli, Sindhudurg', groupSize: 'Max 15 persons', description: 'Scuba diving, snorkeling, dolphin spotting, and houseboat stays.', longDescription: "Tarkarli is a hidden paradise on the Konkan coast, famous for crystal-clear blue waters. One of the best spots in India for scuba diving and snorkeling. A houseboat stay under starlit skies on the backwaters is an experience of a lifetime.", highlights: ['Scuba Diving', 'Snorkeling', 'Houseboat Stay', 'Dolphin Spotting', 'Sindhudurg Fort', 'Malvan Market'], itinerary: [{ day: 'Day 1', title: 'Arrival & Beach', desc: 'Check-in beach resort. Evening at beach, seafood dinner.' }, { day: 'Day 2', title: 'Water Sports', desc: 'Scuba diving, snorkeling, dolphin spotting, Sindhudurg Fort.' }, { day: 'Day 3', title: 'Leisure & Departure', desc: 'Morning kayaking. Malvan market. Departure.' }], inclusions: ['2 Nights Accommodation', 'All Meals', 'Scuba Session', 'Boat Transfers', 'Guide'], exclusions: ['Travel to Malvan', 'Personal Expenses', 'Travel Insurance'] },
  { _id: 'm5', title: 'Tadoba Tiger Safari', category: 'Wildlife', duration: '2 Days / 1 Night', price: 12999, rating: 4.8, reviews: 95, badge: 'Nature & Wildlife', image: '/images/destinations/tadoba.png', location: 'Tadoba, Chandrapur', groupSize: 'Max 6 per jeep', description: "Thrilling jeep safari at Tadoba Andhari Tiger Reserve.", longDescription: "Tadoba Andhari Tiger Reserve is Maharashtra's oldest national park covering 625 sq km of dense forest. One of the finest tiger reserves in India with high tiger densities. Also spot leopards, wild dogs, sloth bears, and 195+ bird species.", highlights: ['Tiger Jeep Safari', 'Leopard Spotting', 'Bird Watching', 'Night Safari', 'Nature Walk', 'Photography Tours'], itinerary: [{ day: 'Day 1', title: 'Arrival & Evening Safari', desc: 'Check-in jungle resort. Evening gate zone safari. Bonfire dinner.' }, { day: 'Day 2', title: 'Morning Safari & Departure', desc: 'Core zone jeep safari at dawn. Breakfast. Departure.' }], inclusions: ['1 Night Jungle Resort', 'All Meals', '2 Jeep Safaris', 'Expert Naturalist', 'Entry Fees'], exclusions: ['Travel to Tadoba', 'Personal Expenses', 'Camera Fees'] },
  { _id: 'm6', title: 'Matheran Heritage Hill Station', category: 'Hill Station', duration: '2 Days / 1 Night', price: 5999, rating: 4.5, reviews: 210, badge: 'Eco-Friendly', image: '/images/destinations/matheran.png', location: 'Matheran, Raigad', groupSize: 'Max 20 persons', description: "Asia's only automobile-free hill station with vintage toy-train ride.", longDescription: "Matheran is Asia's only automobile-free hill station, offering a truly peaceful and eco-friendly getaway. The iconic Neral-Matheran toy train winds through dense forests. Over 38 viewpoints offer spectacular views of the Sahyadri ranges.", highlights: ['Toy Train Ride', 'Charlotte Lake', 'Panorama Point', 'Echo Point', 'One Tree Hill', 'Horse Riding'], itinerary: [{ day: 'Day 1', title: 'Arrival by Toy Train', desc: 'Heritage toy train from Neral. Charlotte Lake, Echo Point, Panorama Point sunset.' }, { day: 'Day 2', title: 'Sunrise & Departure', desc: 'One Tree Hill sunrise. Horse riding. Toy train back to Neral.' }], inclusions: ['1 Night Hotel', 'Breakfast', 'Toy Train Tickets', 'Local Guide', 'Transfers'], exclusions: ['Lunch & Dinner', 'Personal Expenses', 'Horse Riding', 'Entry Fees'] },
  { _id: 'm7', title: 'Nashik Winery & Temples Tour', category: 'Pilgrimage', duration: '2 Days / 1 Night', price: 6499, rating: 4.6, reviews: 130, badge: 'Spiritual', image: '/images/destinations/nashik.svg', location: 'Nashik, Maharashtra', groupSize: 'Max 25 persons', description: "Sula Vineyards, Trimbakeshwar Jyotirlinga and the sacred Godavari.", longDescription: "Nashik is a city of remarkable contrasts — a sacred pilgrimage site and India's wine capital. Home to Trimbakeshwar Jyotirlinga, one of the 12 sacred Jyotirlingas. The Nashik wine trail through Sula Vineyards offers a world-class experience.", highlights: ['Sula Vineyards Wine Tasting', 'Trimbakeshwar Jyotirlinga', 'Panchvati Ghats', 'Saptashrungi Temple', 'Ramkund', 'Godavari Aarti'], itinerary: [{ day: 'Day 1', title: 'Sacred Nashik', desc: 'Trimbakeshwar, Panchvati, Ramkund. Evening Godavari Aarti.' }, { day: 'Day 2', title: 'Wine Trail', desc: 'Sula Vineyards tour and wine tasting. Anjaneri Hills. Departure.' }], inclusions: ['1 Night Hotel', 'Breakfast', 'AC Transport', 'Vineyard Tour', 'Guide'], exclusions: ['Wine Tasting Charges', 'Temple Donations', 'Meals (except breakfast)'] },
  { _id: 'm8', title: 'Kolhapur Royal Heritage', category: 'Heritage', duration: '2 Days / 1 Night', price: 5499, rating: 4.5, reviews: 98, badge: 'Royal Heritage', image: '/images/destinations/kolhapur.svg', location: 'Kolhapur, Maharashtra', groupSize: 'Max 25 persons', description: 'New Palace, Mahalakshmi Temple, and famous spicy Kolhapuri cuisine.', longDescription: "Kolhapur is a city steeped in royal history. The magnificent New Palace Museum, the ancient Mahalakshmi Temple, and Rankala Lake make it a destination for history lovers. Known internationally for Kolhapuri chappals and intensely flavoured cuisine.", highlights: ['New Palace Museum', 'Mahalakshmi Temple', 'Rankala Lake', 'Kolhapuri Cuisine', 'Panhala Fort', 'Shahu Market'], itinerary: [{ day: 'Day 1', title: 'Royal Kolhapur', desc: 'New Palace Museum, Mahalakshmi Temple. Rankala Lake. Authentic Kolhapuri dinner.' }, { day: 'Day 2', title: 'Panhala Fort & Departure', desc: 'Panhala Fort. Kolhapuri chappal shopping. Departure.' }], inclusions: ['1 Night Hotel', 'Breakfast', 'AC Transport', 'Heritage Guide', 'Kolhapuri Dinner'], exclusions: ['Entry Fees', 'Personal Shopping', 'Lunch'] },
  { _id: 'm9', title: 'Alibaug Coastal Weekend', category: 'Beach', duration: '2 Days / 1 Night', price: 5999, rating: 4.4, reviews: 274, badge: 'Weekend Special', image: '/images/destinations/alibaug.svg', location: 'Alibaug, Raigad', groupSize: 'Max 20 persons', description: 'Golden beaches, historic Kolaba Fort, ferry rides and fresh seafood.', longDescription: "Alibaug is the Malibu of Mumbai — a beautiful coastal town accessible by scenic ferry from Gateway of India. Known for clean sandy beaches, the historically significant Kolaba Fort accessible at low tide, and fresh Konkani seafood.", highlights: ['Alibaug Beach', 'Kolaba Fort (Sea Fort)', 'Ferry from Gateway of India', 'Kihim Beach', 'Fresh Seafood', 'Revdanda Fort'], itinerary: [{ day: 'Day 1', title: 'Ferry & Beach', desc: 'Ferry from Gateway of India (optional). Kolaba Fort visit. Beach resort. Seafood dinner.' }, { day: 'Day 2', title: 'Kihim Beach & Departure', desc: 'Kihim Beach. Revdanda Fort. Lunch. Depart by 3 PM.' }], inclusions: ['1 Night Beach Resort', 'Breakfast', 'Road Transport', 'Sightseeing'], exclusions: ['Ferry Tickets', 'Water Sports', 'Lunch & Dinner', 'Personal Expenses'] },
];

const BADGE_COLORS = {
  'Most Popular': { bg: 'rgba(255,51,102,0.2)', color: '#ff6b8a', border: 'rgba(255,51,102,0.4)' },
  'Budget Friendly': { bg: 'rgba(16,185,129,0.2)', color: '#34d399', border: 'rgba(16,185,129,0.4)' },
  'UNESCO Site': { bg: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: 'rgba(245,158,11,0.4)' },
  'Adventure': { bg: 'rgba(239,68,68,0.2)', color: '#f87171', border: 'rgba(239,68,68,0.4)' },
  'Nature & Wildlife': { bg: 'rgba(52,211,153,0.2)', color: '#6ee7b7', border: 'rgba(52,211,153,0.4)' },
  'Eco-Friendly': { bg: 'rgba(16,185,129,0.2)', color: '#34d399', border: 'rgba(16,185,129,0.4)' },
  'Spiritual': { bg: 'rgba(167,139,250,0.2)', color: '#c4b5fd', border: 'rgba(167,139,250,0.4)' },
  'Royal Heritage': { bg: 'rgba(245,158,11,0.2)', color: '#fbbf24', border: 'rgba(245,158,11,0.4)' },
  'Weekend Special': { bg: 'rgba(99,102,241,0.2)', color: '#a5b4fc', border: 'rgba(99,102,241,0.4)' },
};

const SAMPLE_REVIEWS = [
  { name: 'Anjali Sharma', date: 'March 2025', rating: 5, comment: 'Absolutely fantastic! Well organized, knowledgeable guide, every detail taken care of. Will definitely book again!', initials: 'AS', gradient: 'linear-gradient(135deg, #FF3366, #7C3AED)' },
  { name: 'Rajesh Patil', date: 'February 2025', rating: 5, comment: 'Best tour in years. Shreeja Tours handled everything seamlessly. Excellent accommodations and perfectly timed sightseeing.', initials: 'RP', gradient: 'linear-gradient(135deg, #7C3AED, #06B6D4)' },
  { name: 'Meera Joshi', date: 'January 2025', rating: 4, comment: 'Really enjoyed the trip! Great value for money. The food included was delicious. Minor delay on Day 2 but overall great.', initials: 'MJ', gradient: 'linear-gradient(135deg, #06B6D4, #10B981)' },
];

function TourDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');

  const tour = PACKAGES.find(t => t._id === id) || PACKAGES[0];
  const badgeStyle = BADGE_COLORS[tour.badge] || BADGE_COLORS['Most Popular'];
  const tabs = ['overview', 'itinerary', 'inclusions', 'reviews'];

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <div style={{ position: 'relative', height: '420px', overflow: 'hidden', background: 'linear-gradient(135deg, #1c2331, #283046)' }}>
        <img src={tour.image || (tour.images && tour.images[0]) || '/images/destinations/default.png'} alt={tour.title || tour.name} onError={(e) => { e.target.style.display = 'none'; }} style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.6 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(13,17,23,1) 0%, rgba(13,17,23,0.4) 60%, transparent 100%)' }} />
        <div style={{ position: 'absolute', bottom: '40px', left: '5%', right: '5%' }}>
          <div style={{ display: 'flex', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.8rem', padding: '4px 12px', borderRadius: '20px', background: badgeStyle.bg, color: badgeStyle.color, border: `1px solid ${badgeStyle.border}`, fontWeight: '600' }}>{tour.badge}</span>
            <span style={{ fontSize: '0.8rem', color: '#a78bfa', padding: '4px 12px', borderRadius: '20px', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)' }}>{tour.category}</span>
          </div>
          <h1 style={{ fontSize: 'clamp(1.8rem,4vw,3rem)', fontWeight: '800', marginBottom: '12px', maxWidth: '700px' }}>{tour.title}</h1>
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{ color: '#fbbf24' }}>★ <strong style={{ color: '#fff' }}>{tour.rating}</strong> <span style={{ color: '#8b949e' }}>({tour.reviews} reviews)</span></span>
            <span style={{ color: '#8b949e' }}>📍 {tour.location}</span>
            <span style={{ color: '#a78bfa' }}>🕒 {tour.duration}</span>
            <span style={{ color: '#8b949e' }}>👥 {tour.groupSize}</span>
          </div>
        </div>
        <button onClick={() => navigate('/tours')} style={{ position: 'absolute', top: '24px', left: '5%', background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', color: '#fff', padding: '10px 18px', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', fontSize: '0.9rem', fontWeight: '500' }}>← Back to Tours</button>
      </div>

      {/* Layout */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 5% 60px', display: 'grid', gridTemplateColumns: '1fr 340px', gap: '40px', alignItems: 'start' }}>
        {/* Left */}
        <div>
          {/* Tabs */}
          <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid var(--surface-border)', marginBottom: '32px' }}>
            {tabs.map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{ padding: '12px 20px', background: 'transparent', border: 'none', borderBottom: activeTab === tab ? '2px solid #7C3AED' : '2px solid transparent', color: activeTab === tab ? '#7C3AED' : '#8b949e', fontFamily: 'Outfit,sans-serif', fontSize: '0.95rem', fontWeight: '600', cursor: 'pointer', textTransform: 'capitalize', marginBottom: '-1px' }}>{tab}</button>
            ))}
          </div>

          {activeTab === 'overview' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '16px' }}>About This Tour</h2>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.9', fontSize: '1.05rem', marginBottom: '32px' }}>{tour.longDescription}</p>
              <h3 style={{ fontSize: '1.2rem', fontWeight: '700', marginBottom: '16px' }}>Tour Highlights</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(200px,1fr))', gap: '12px' }}>
                {tour.highlights.map((h, i) => (
                  <div key={i} className="glass-panel" style={{ padding: '12px 16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ color: '#7C3AED', fontWeight: 'bold' }}>✓</span>
                    <span style={{ fontSize: '0.92rem' }}>{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'itinerary' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>Day-by-Day Itinerary</h2>
              <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', left: '19px', top: '24px', bottom: '24px', width: '2px', background: 'linear-gradient(to bottom, #7C3AED, #FF3366)', borderRadius: '2px' }} />
                {tour.itinerary.map((day, i) => (
                  <div key={i} style={{ display: 'flex', gap: '20px', marginBottom: '28px' }}>
                    <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--brand-gradient)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.8rem', color: '#fff', flexShrink: 0, zIndex: 1 }}>{i + 1}</div>
                    <div className="glass-panel" style={{ flex: 1, borderRadius: '12px', padding: '20px 24px' }}>
                      <div style={{ color: '#a78bfa', fontSize: '0.8rem', fontWeight: '600', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>{day.day}</div>
                      <h4 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '10px' }}>{day.title}</h4>
                      <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>{day.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'inclusions' && (
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '24px' }}>What's Included</h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                <div className="glass-panel" style={{ borderRadius: '14px', padding: '28px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', color: '#34d399' }}>✅ Inclusions</h3>
                  {tour.inclusions.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ color: '#34d399' }}>✓</span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
                <div className="glass-panel" style={{ borderRadius: '14px', padding: '28px' }}>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '20px', color: '#f87171' }}>❌ Exclusions</h3>
                  {tour.exclusions.map((item, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
                      <span style={{ color: '#f87171' }}>✗</span>
                      <span style={{ fontSize: '0.95rem', color: 'var(--text-secondary)' }}>{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: '700' }}>Traveller Reviews</h2>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '2rem', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{tour.rating}</span>
                  <div>
                    <div style={{ color: '#fbbf24' }}>{'★'.repeat(Math.round(tour.rating))}</div>
                    <div style={{ color: '#8b949e', fontSize: '0.8rem' }}>{tour.reviews} reviews</div>
                  </div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {SAMPLE_REVIEWS.map((review, i) => (
                  <div key={i} className="glass-panel" style={{ borderRadius: '14px', padding: '24px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '14px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: review.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', fontSize: '0.85rem', color: '#fff', flexShrink: 0 }}>{review.initials}</div>
                        <div>
                          <div style={{ fontWeight: '700' }}>{review.name}</div>
                          <div style={{ color: '#8b949e', fontSize: '0.8rem' }}>{review.date}</div>
                        </div>
                      </div>
                      <div style={{ color: '#fbbf24' }}>{'★'.repeat(review.rating)}</div>
                    </div>
                    <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', fontSize: '0.95rem' }}>{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right — Booking Card */}
        <div style={{ position: 'sticky', top: '100px' }}>
          <div className="glass-panel" style={{ borderRadius: '20px', padding: '30px', border: '1px solid rgba(124,58,237,0.2)' }}>
            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '0.85rem', color: '#8b949e', marginBottom: '4px' }}>Starting from</div>
              <div style={{ fontSize: '2.4rem', fontWeight: '800', background: 'var(--brand-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>₹{tour.price?.toLocaleString()}</div>
              <div style={{ fontSize: '0.85rem', color: '#8b949e' }}>per person</div>
            </div>
            <div style={{ borderTop: '1px solid var(--surface-border)', borderBottom: '1px solid var(--surface-border)', padding: '20px 0', marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[['🕒', 'Duration', tour.duration], ['📍', 'Location', tour.location], ['👥', 'Group Size', tour.groupSize], ['🌟', 'Rating', `${tour.rating} (${tour.reviews} reviews)`]].map(([icon, label, val], i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ color: '#8b949e', fontSize: '0.88rem' }}>{icon} {label}</span>
                  <span style={{ fontSize: '0.9rem', fontWeight: '600', textAlign: 'right', maxWidth: '150px' }}>{val}</span>
                </div>
              ))}
            </div>
            <Link to={`/book/${tour._id}`} className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.05rem', borderRadius: '12px', marginBottom: '12px', display: 'block', textAlign: 'center' }}>🎒 Book This Tour</Link>
            <Link to="/contact" className="btn-outline" style={{ width: '100%', padding: '13px', fontSize: '0.95rem', borderRadius: '12px', display: 'block', textAlign: 'center' }}>💬 Ask a Question</Link>
            <div style={{ marginTop: '20px', padding: '16px', background: 'rgba(52,211,153,0.08)', borderRadius: '10px', border: '1px solid rgba(52,211,153,0.2)', textAlign: 'center' }}>
              <div style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: '600' }}>✅ Free Cancellation</div>
              <div style={{ color: '#8b949e', fontSize: '0.78rem', marginTop: '4px' }}>Cancel up to 7 days before for a full refund</div>
            </div>
          </div>
          {/* Related */}
          <div style={{ marginTop: '24px' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '700', marginBottom: '14px', color: '#8b949e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Similar Packages</h3>
            {PACKAGES.filter(t => t._id !== tour._id && t.category === tour.category).slice(0, 2).map(related => (
              <Link key={related._id} to={`/tours/${related._id}`} style={{ display: 'block' }}>
                <div className="glass-panel" style={{ borderRadius: '12px', padding: '14px', marginBottom: '12px', display: 'flex', gap: '12px', alignItems: 'center', transition: 'transform 0.2s ease' }}
                  onMouseOver={(e) => e.currentTarget.style.transform = 'translateX(4px)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'translateX(0)'}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '10px', background: 'linear-gradient(135deg,#1c2331,#283046)', flexShrink: 0, overflow: 'hidden' }}>
                    <img src={related.image || (related.images && related.images[0]) || '/images/destinations/default.png'} alt={related.title || related.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} onError={(e) => { e.target.style.display = 'none'; }} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '4px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{related.title}</div>
                    <div style={{ fontSize: '0.8rem', color: '#a78bfa', fontWeight: '700' }}>₹{related.price?.toLocaleString()}</div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TourDetail;
