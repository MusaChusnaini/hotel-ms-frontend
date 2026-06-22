import React from 'react';

export default function CheckoutSummaryPage() {
  return (
    <div className="page-container">
      {/* --- PROGRESS BAR SECTION --- */}
      <div className="progress-container">
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Identitas</span>
        </div>
        <div className="line"></div>
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Pilih Kamar</span>
        </div>
        <div className="line"></div>
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Fasilitas</span>
        </div>
        <div className="line"></div>
        <div className="step active">
          <div className="circle">4</div>
          <span>Checkout</span>
        </div>
        <div className="line"></div>
        <div className="step">
          <div className="circle">5</div>
          <span>Pembayaran</span>
        </div>
      </div>

      {/* --- HEADER TITLE SECTION --- */}
      <div className="title-section">
        <p className="step-subtitle">LANGKAH 4 DARI 5</p>
        <h1 className="main-title">Ringkasan Pesanan</h1>
        <p className="desc-text">Periksa detail pesanan sebelum melanjutkan</p>
      </div>

      {/* --- SUMMARY MAIN CARD --- */}
      <div className="summary-main-card">
        {/* Gambar Hero (bisa pakai gambar dari step 2, CSS akan memotongnya proporsional) */}
        <img 
          src="/kamar-standard.jpg" 
          alt="Kamar Standard" 
          className="summary-hero-img" 
        />
        
        <div className="summary-body">
          <div className="summary-header-row">
            <div>
              <h2 className="summary-title">Kamar Standard</h2>
              <p className="summary-subtitle">Lantai 3 - Standard</p>
            </div>
            <span className="badge badge-type">Standard</span>
          </div>

          {/* Tag Fasilitas Kamar */}
          <div className="amenities-tags">
            <span className="tag-pill">1 Queen Bed</span>
            <span className="tag-pill">30 m²</span>
            <span className="tag-pill">Pemandangan Kota</span>
            <span className="tag-pill">Free WiFi</span>
          </div>

          <hr className="divider-thin" />

          {/* Rincian Identitas & Jadwal */}
          <div className="info-list">
            <div className="info-row">
              <span className="info-label">Tamu</span>
              <span className="info-value">Musa</span>
            </div>
            <div className="info-row">
              <span className="info-label">Check In</span>
              <span className="info-value">2026-01-12</span>
            </div>
            <div className="info-row">
              <span className="info-label">Check Out</span>
              <span className="info-value">2026-01-14</span>
            </div>
            <div className="info-row">
              <span className="info-label">Durasi</span>
              <span className="info-value">2 malam</span>
            </div>
          </div>
        </div>
      </div>

      {/* --- PRICE BREAKDOWN CARD --- */}
      <div className="price-card">
        <div className="price-section-title">RINCIAN HARGA</div>
        
        <div className="info-list">
          <div className="info-row">
            <span className="info-label">Kamar (2 malam)</span>
            <span className="price-number">Rp 3.000.000</span>
          </div>
        </div>

        <div className="price-total-row">
          <span>Total</span>
          <span className="price-total-value">Rp 3.000.000</span>
        </div>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="action-container action-buttons-row">
        <button className="btn-secondary">
          &lt; Kembali
        </button>
        <button className="btn-primary flex-grow">
          Lanjutkan ke Pembayaran &gt;
        </button>
      </div>
    </div>
  );
}