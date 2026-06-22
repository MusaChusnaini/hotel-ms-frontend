import React from 'react';

export default function PaymentFailedPage() {
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
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Checkout</span>
        </div>
        <div className="line"></div>
        <div className="step active">
          <div className="circle">5</div>
          <span>Pembayaran</span>
        </div>
      </div>

      {/* --- ERROR CARD CONTAINER --- */}
      <div className="error-card">
        
        {/* Ikon Peringatan (SVG murni) */}
        <div className="error-icon-wrapper">
          <svg 
            className="error-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="error-title">Pembayaran Gagal</h1>
        <p className="error-subtitle">
          Transaksi tidak dapat diproses. Silakan periksa informasi<br/>kartu Anda dan coba kembali.
        </p>

        {/* Kotak Rincian Alasan */}
        <div className="error-reasons-box">
          <p className="error-reasons-title">Kemungkinan alasan kegagalan:</p>
          <ul className="error-reasons-list">
            <li>* Nomor kartu tidak valid atau telah kedaluwarsa</li>
            <li>* Saldo atau limit kartu tidak mencukupi</li>
            <li>* Kartu diblokir oleh bank penerbit</li>
            <li>* Koneksi terputus saat pemrosesan transaksi</li>
          </ul>
        </div>

        {/* Tombol Aksi */}
        <div className="error-actions">
          <button className="btn-primary full-width">
            Coba Lagi
          </button>
          <button className="btn-secondary full-width">
            Kembali ke Checkout
          </button>
        </div>
        
      </div>
    </div>
  );
}