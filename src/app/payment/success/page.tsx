import React from 'react';

export default function PaymentSuccessPage() {
  return (
    <div className="page-container">
      {/* --- PROGRESS BAR SECTION --- */}
      {/* Di tahap ini, semua lingkaran sudah berwarna cokelat (selesai) */}
      <div className="progress-container">
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Identitas</span>
        </div>
        <div className="line completed"></div>
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Pilih Kamar</span>
        </div>
        <div className="line completed"></div>
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Fasilitas</span>
        </div>
        <div className="line completed"></div>
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Checkout</span>
        </div>
        <div className="line completed"></div>
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Pembayaran</span>
        </div>
      </div>

      {/* --- SUCCESS CARD CONTAINER --- */}
      <div className="success-card">
        
        {/* Ikon Sukses (Lingkaran Hijau) */}
        <div className="success-icon-wrapper">
          <svg 
            className="success-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="3"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="success-title">Pembayaran Terkonfirmasi!</h1>
        <p className="success-subtitle">
          Terima kasih, Musa. Reservasi Anda telah berhasil<br/>dikonfirmasi dan akan segera diproses.
        </p>

        {/* Kotak Rincian Reservasi yang Berhasil */}
        <div className="booking-details-box">
          <div className="info-list">
            <div className="info-row">
              <span className="info-label">Kamar</span>
              <span className="info-value">Kamar Standard</span>
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
          
          <div className="price-total-row mt-20">
            <span>Total Dibayar</span>
            <span className="success-price">Rp 3.000.000</span>
          </div>
        </div>

        {/* Notifikasi Email */}
        <p className="email-notice">
          Konfirmasi telah dikirim ke <strong>musa@gmail.com</strong>
        </p>

        {/* Opsional: Tombol Kembali ke Beranda jika Anda butuh */}
        <button className="btn-primary mt-20" style={{ maxWidth: '300px' }}>
          Kembali ke Beranda
        </button>
        
      </div>
    </div>
  );
}