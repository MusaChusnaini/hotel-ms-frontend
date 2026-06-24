"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentFailedPage() {
  const router = useRouter();

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
          <span>Summary</span> {/* Teks diperbarui menjadi Summary */}
        </div>
        <div className="line"></div>
        <div className="step active">
          <div className="circle">5</div>
          <span>Pembayaran</span>
        </div>
      </div>

      {/* --- ERROR CARD CONTAINER --- */}
      <div className="error-card" style={{ maxWidth: '500px', margin: '2rem auto', backgroundColor: '#fff', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        {/* Ikon Peringatan (SVG murni) */}
        <div className="error-icon-wrapper" style={{ width: '80px', height: '80px', backgroundColor: '#FFEBEE', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <svg 
            className="error-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#F44336" 
            strokeWidth="2"
            style={{ width: '40px', height: '40px' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <h1 className="error-title" style={{ fontFamily: 'serif', fontSize: '2rem', color: '#333', marginBottom: '1rem' }}>Pembayaran Gagal</h1>
        <p className="error-subtitle" style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
          Transaksi tidak dapat diproses. Silakan periksa informasi<br/>metode pembayaran Anda dan coba kembali.
        </p>

        {/* Kotak Rincian Alasan */}
        <div className="error-reasons-box" style={{ backgroundColor: '#F9F8F6', borderRadius: '12px', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
          <p className="error-reasons-title" style={{ fontWeight: 'bold', marginBottom: '0.5rem', color: '#333' }}>Kemungkinan alasan kegagalan:</p>
          <ul className="error-reasons-list" style={{ color: '#777', fontSize: '0.95rem', paddingLeft: '1rem', lineHeight: '1.5' }}>
            <li>Nomor kartu tidak valid atau telah kedaluwarsa</li>
            <li>Saldo atau limit tidak mencukupi</li>
            <li>Diblokir oleh bank penerbit atau provider</li>
            <li>Koneksi terputus saat pemrosesan transaksi</li>
          </ul>
        </div>

        {/* Tombol Aksi */}
        <div className="error-actions" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <button 
            className="btn-primary full-width"
            onClick={() => router.push('/summary')}
            style={{ padding: '1rem', backgroundColor: '#B06B3E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            Coba Lagi
          </button>
          <button 
            className="btn-secondary full-width"
            onClick={() => router.push('/')}
            style={{ padding: '1rem', backgroundColor: 'transparent', color: '#555', border: '1px solid #DDD', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            Kembali ke Home
          </button>
        </div>
        
      </div>
    </div>
  );
}