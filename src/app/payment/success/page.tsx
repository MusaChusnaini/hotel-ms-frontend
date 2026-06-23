"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentSuccessPage() {
  const router = useRouter();
  const [masterData, setMasterData] = useState<any>(null);
  const [stayDuration, setStayDuration] = useState<number>(0);
  
  // State untuk mengontrol tulisan "Sedang menyimpan..."
  const [isSavingToDB, setIsSavingToDB] = useState<boolean>(true);

  useEffect(() => {
    const savedData = sessionStorage.getItem('masterBookingData');
    
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setMasterData(parsedData);

      // Hitung ulang durasi untuk ditampilkan di UI
      const inDate = new Date(parsedData.checkInDate);
      const outDate = new Date(parsedData.checkOutDate);
      const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
      const nights = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) || 1;
      setStayDuration(nights);

      // Eksekusi fungsi penyimpanan ke Database
      simpanKeDatabase(parsedData);

    } else {
      // Jika kosong (mungkin user me-refresh halaman setelah sukses), tendang ke home
      router.push('/');
    }
  }, [router]);

  // --- FUNGSI KOSONG UNTUK DISKUSI ---
    const simpanKeDatabase = async (dataPayload: any) => {
    try {
      const response = await fetch('/api/bookings/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // Mengubah object Javascript menjadi string JSON
        body: JSON.stringify(dataPayload), 
      });

      if (response.ok) {
        console.log("Transaksi sukses tersimpan di Database!");
        // Bersihkan keranjang agar tidak ada duplikasi jika user me-refresh web
        sessionStorage.removeItem('masterBookingData');
        setIsSavingToDB(false); // Matikan efek loading, tampilkan UI Sukses
      } else {
        // Menangkap pesan error dari Spring Boot jika ada yang salah
        const errorData = await response.text();
        alert(`Gagal memproses pesanan: ${errorData}`);
        router.push('/payment'); // Kembalikan ke halaman pembayaran
      }
    } catch (error) {
      console.error("Kesalahan koneksi jaringan:", error);
      alert("Server Backend tidak dapat dihubungi. Pastikan Spring Boot menyala.");
    }
  };

  // Tampilkan layar loading saat fungsi simpanKeDatabase masih berjalan
  if (isSavingToDB || !masterData) {
    return (
      <div style={{ textAlign: 'center', padding: '100px', fontFamily: 'sans-serif' }}>
        <h2>Memproses Reservasi Anda...</h2>
        <p style={{ color: '#777' }}>Mohon jangan tutup halaman ini.</p>
      </div>
    );
  }

  return (
    <div className="page-container" style={{ backgroundColor: '#F9F8F6', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* --- PROGRESS BAR SECTION --- */}
      <div className="progress-container">
        <div className="step completed"><div className="circle">✓</div><span>Identitas</span></div>
        <div className="line completed" style={{ backgroundColor: '#B06B3E' }}></div>
        <div className="step completed"><div className="circle">✓</div><span>Pilih Kamar</span></div>
        <div className="line completed" style={{ backgroundColor: '#B06B3E' }}></div>
        <div className="step completed"><div className="circle">✓</div><span>Fasilitas</span></div>
        <div className="line completed" style={{ backgroundColor: '#B06B3E' }}></div>
        <div className="step completed"><div className="circle">✓</div><span>Checkout</span></div>
        <div className="line completed" style={{ backgroundColor: '#B06B3E' }}></div>
        <div className="step completed"><div className="circle">✓</div><span>Pembayaran</span></div>
      </div>

      {/* --- SUCCESS CARD CONTAINER --- */}
      <div className="success-card" style={{ maxWidth: '500px', margin: '2rem auto', backgroundColor: '#fff', borderRadius: '16px', padding: '3rem 2rem', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        
        {/* Ikon Sukses (Lingkaran Hijau) */}
        <div className="success-icon-wrapper" style={{ width: '80px', height: '80px', backgroundColor: '#E8F5E9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem auto' }}>
          <svg 
            className="success-icon" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="#4CAF50" 
            strokeWidth="3"
            style={{ width: '40px', height: '40px' }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h1 className="success-title" style={{ fontFamily: 'serif', fontSize: '2rem', color: '#333', marginBottom: '1rem' }}>Pembayaran Terkonfirmasi!</h1>
        <p className="success-subtitle" style={{ color: '#666', lineHeight: '1.6', marginBottom: '2rem' }}>
          Terima kasih, {masterData.fullName}. Reservasi Anda telah berhasil<br/>dikonfirmasi dan sudah tersimpan di sistem kami.
        </p>

        {/* Kotak Rincian Reservasi yang Berhasil */}
        <div className="booking-details-box" style={{ backgroundColor: '#F9F8F6', borderRadius: '12px', padding: '1.5rem', textAlign: 'left', marginBottom: '2rem' }}>
          <div className="info-list" style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem' }}>
            <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="info-label" style={{ color: '#777' }}>Kamar</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{masterData.roomName}</span>
            </div>
            <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="info-label" style={{ color: '#777' }}>Check In</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{masterData.checkInDate}</span>
            </div>
            <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="info-label" style={{ color: '#777' }}>Check Out</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{masterData.checkOutDate}</span>
            </div>
            <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="info-label" style={{ color: '#777' }}>Durasi</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{stayDuration} malam</span>
            </div>
            <div className="info-row" style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span className="info-label" style={{ color: '#777' }}>Metode</span>
              <span className="info-value" style={{ fontWeight: 'bold' }}>{masterData.paymentMethod}</span>
            </div>
          </div>
          
          <hr style={{ border: 'none', borderTop: '1px dashed #DDD', margin: '1rem 0' }} />

          <div className="price-total-row mt-20" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '1.1rem' }}>
            <span style={{ fontWeight: 'bold' }}>Total Dibayar</span>
            <span className="success-price" style={{ color: '#B06B3E', fontWeight: 'bold', fontFamily: 'monospace', fontSize: '1.25rem' }}>
              Rp {new Intl.NumberFormat('id-ID').format(masterData.totalAmount || 0)}
            </span>
          </div>
        </div>

        {/* Notifikasi Email */}
        <p className="email-notice" style={{ fontSize: '0.9rem', color: '#777', marginBottom: '2rem' }}>
          Konfirmasi detail telah dikirim ke <strong style={{ color: '#333' }}>{masterData.email}</strong>
        </p>

        {/* Tombol Kembali ke Beranda */}
        <button 
          className="btn-primary mt-20" 
          onClick={() => router.push('/')}
          style={{ width: '100%', padding: '1rem', backgroundColor: '#B06B3E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
        >
          Kembali ke Beranda
        </button>
        
      </div>
    </div>
  );
}