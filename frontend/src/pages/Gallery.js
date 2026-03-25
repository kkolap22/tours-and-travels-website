import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GALLERY_ITEMS = [
  { id: 1, src: '/images/destinations/mahabaleshwar.png', title: 'Mahabaleshwar Valley', category: 'Hill Station', span: 'wide' },
  { id: 2, src: '/images/destinations/tarkarli.png', title: 'Tarkarli Beach', category: 'Beach', span: 'normal' },
  { id: 3, src: '/images/destinations/tadoba.png', title: 'Tadoba Tiger Safari', category: 'Wildlife', span: 'normal' },
  { id: 4, src: '/images/destinations/ajanta_ellora.png', title: 'Ajanta Cave Paintings', category: 'Heritage', span: 'tall' },
  { id: 5, src: '/images/destinations/lonavala.png', title: 'Lonavala Misty Hills', category: 'Hill Station', span: 'normal' },
  { id: 6, src: '/images/destinations/matheran.png', title: 'Matheran Toy Train', category: 'Hill Station', span: 'wide' },
  { id: 7, src: '/images/destinations/nashik.svg', title: 'Nashik Vineyards', category: 'Pilgrimage', span: 'normal' },
  { id: 8, src: '/images/destinations/kolhapur.svg', title: 'Kolhapur Palace', category: 'Heritage', span: 'normal' },
  { id: 9, src: '/images/destinations/alibaug.svg', title: 'Alibaug Coastline', category: 'Beach', span: 'normal' },
];

const CATS = ['All', 'Hill Station', 'Beach', 'Heritage', 'Wildlife', 'Pilgrimage'];

const EMOJI_MAP = { 'Hill Station': '🏔️', 'Beach': '🏖️', 'Heritage': '🏛️', 'Wildlife': '🦁', 'Pilgrimage': '🙏' };

function Gallery() {
  const [filter, setFilter] = useState('All');
  const [lightbox, setLightbox] = useState(null);

  const filtered = filter === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter(g => g.category === filter);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section style={{ padding: '80px 5% 60px', textAlign: 'center', background: 'radial-gradient(circle at 70% 0%, rgba(124,58,237,0.12), transparent 50%), radial-gradient(circle at 20% 100%, rgba(255,51,102,0.08), transparent 50%)', borderBottom: '1px solid var(--surface-border)' }}>
        <div style={{ display: 'inline-block', background: 'rgba(124,58,237,0.15)', border: '1px solid rgba(124,58,237,0.3)', borderRadius: '30px', padding: '6px 16px', fontSize: '0.85rem', color: '#a78bfa', marginBottom: '20px', letterSpacing: '1px' }}>📸 PHOTO GALLERY</div>
        <h1 style={{ fontSize: 'clamp(2rem,5vw,3.2rem)', fontWeight: '800', marginBottom: '16px' }}>Explore Through <span className="text-gradient">Our Lens</span></h1>
        <p style={{ color: '#8b949e', fontSize: '1.05rem', maxWidth: '560px', margin: '0 auto' }}>Beautiful moments captured across Maharashtra's most stunning destinations. Every photo tells a story.</p>
      </section>

      {/* Category Filter */}
      <div style={{ display: 'flex', gap: '10px', padding: '24px 5%', borderBottom: '1px solid var(--surface-border)', overflowX: 'auto', scrollbarWidth: 'none', flexWrap: 'wrap' }}>
        {CATS.map(cat => (
          <button key={cat} onClick={() => setFilter(cat)} style={{ whiteSpace: 'nowrap', padding: '9px 22px', borderRadius: '30px', border: filter === cat ? 'none' : '1px solid #30363d', background: filter === cat ? 'var(--brand-gradient)' : 'transparent', color: filter === cat ? '#fff' : '#8b949e', fontFamily: 'Outfit,sans-serif', fontSize: '0.9rem', fontWeight: '600', cursor: 'pointer', boxShadow: filter === cat ? '0 4px 15px rgba(124,58,237,0.3)' : 'none' }}>
            {EMOJI_MAP[cat] || '🌍'} {cat}
          </button>
        ))}
      </div>

      {/* Gallery Masonry Grid */}
      <section style={{ padding: '40px 5% 60px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ columns: '3 300px', gap: '16px' }}>
          {filtered.map(item => (
            <div key={item.id} onClick={() => setLightbox(item)} style={{ breakInside: 'avoid', marginBottom: '16px', borderRadius: '14px', overflow: 'hidden', cursor: 'pointer', position: 'relative', background: 'linear-gradient(135deg,#1c2331,#283046)', display: 'block' }}
              onMouseOver={e => { e.currentTarget.querySelector('.overlay').style.opacity = '1'; e.currentTarget.querySelector('img').style.transform = 'scale(1.07)'; }}
              onMouseOut={e => { e.currentTarget.querySelector('.overlay').style.opacity = '0'; e.currentTarget.querySelector('img').style.transform = 'scale(1)'; }}>
              <img src={item.src} alt={item.title} style={{ width: '100%', display: 'block', objectFit: 'cover', transition: 'transform 0.5s ease', minHeight: '180px' }} onError={e => { e.target.style.minHeight = '200px'; e.target.style.background = 'linear-gradient(135deg,#1c2331,#283046)'; e.target.style.display = 'block'; }} />
              <div className="overlay" style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', opacity: 0, transition: 'opacity 0.3s ease', display: 'flex', alignItems: 'flex-end', padding: '20px' }}>
                <div>
                  <span style={{ background: 'rgba(124,58,237,0.8)', borderRadius: '20px', padding: '3px 10px', fontSize: '0.75rem', color: '#c4b5fd', marginBottom: '8px', display: 'inline-block' }}>{item.category}</span>
                  <div style={{ fontWeight: '700', fontSize: '1rem' }}>{item.title}</div>
                </div>
              </div>
              <div style={{ position: 'absolute', top: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', borderRadius: '8px', padding: '6px 8px', fontSize: '0.9rem' }}>🔍</div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '60px', color: '#8b949e' }}>
            <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📷</div>
            <p>No photos in this category yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.92)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div onClick={e => e.stopPropagation()} style={{ maxWidth: '800px', width: '100%', borderRadius: '20px', overflow: 'hidden', position: 'relative' }}>
            <img src={lightbox.src} alt={lightbox.title} style={{ width: '100%', maxHeight: '70vh', objectFit: 'cover', display: 'block' }} onError={e => { e.target.style.display = 'none'; }} />
            <div style={{ padding: '20px 24px', background: '#161b22', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h3 style={{ fontWeight: '700', marginBottom: '4px' }}>{lightbox.title}</h3>
                <span style={{ color: '#a78bfa', fontSize: '0.85rem' }}>{lightbox.category}</span>
              </div>
              <Link to="/tours" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>Book This Tour</Link>
            </div>
            <button onClick={() => setLightbox(null)} style={{ position: 'absolute', top: '14px', right: '14px', background: 'rgba(0,0,0,0.7)', border: 'none', borderRadius: '50%', width: '36px', height: '36px', color: '#fff', cursor: 'pointer', fontSize: '1.1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✕</button>
          </div>
        </div>
      )}

      {/* CTA */}
      <section style={{ background: 'radial-gradient(circle at center, rgba(124,58,237,0.1), transparent 65%)', borderTop: '1px solid var(--surface-border)', padding: '70px 5%', textAlign: 'center' }}>
        <h2 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '12px' }}>Ready to Create Your Own <span className="text-gradient">Memories?</span></h2>
        <p style={{ color: '#8b949e', marginBottom: '28px', fontSize: '1.05rem' }}>Join thousands of happy travellers who've explored with Shreeja Tours.</p>
        <Link to="/tours" className="btn-primary" style={{ padding: '15px 36px', fontSize: '1rem' }}>Explore All Tours →</Link>
      </section>
    </div>
  );
}

export default Gallery;
