"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PaymentPage() {
  const router = useRouter();

  const [masterData, setMasterData] = useState<any>(null);
  const [paymentMethod, setPaymentMethod] = useState<string>('TRANSFER');

  useEffect(() => {
    // 1. Buka brankas untuk mengambil total harga
    const savedData = sessionStorage.getItem('masterBookingData');
    if (savedData) {
      setMasterData(JSON.parse(savedData));
    } else {
      alert("Data pesanan tidak ditemukan.");
      router.push('/');
    }
  }, [router]);

  const handleBayar = (e: React.FormEvent) => {
    e.preventDefault(); // Mencegah reload halaman

    // 2. Masukkan metode pembayaran ke dalam Big JSON
    const updatedMasterData = {
      ...masterData,
      paymentMethod: paymentMethod 
    };

    // 3. Simpan kembali ke brankas lokal
    sessionStorage.setItem('masterBookingData', JSON.stringify(updatedMasterData));

    // 4. Logika Percabangan (Simulasi Gacha / Randomizer)
    // Karena kamu ingin ada skenario Sukses / Gagal, kita bisa membuat simulasi probabilitas.
    // Misal: 80% peluang sukses, 20% peluang gagal (seperti gacha drop rate).
    const isSuccess = false; 

    if (isSuccess) {
      // Lempar ke halaman sukses
      router.push('/payment/success'); 
    } else {
      // Lempar ke halaman gagal
      router.push('/payment/failed'); 
    }
  };

  // Tampilkan loading jika data belum ditarik
  if (!masterData) return <div style={{ textAlign: 'center', padding: '50px' }}>Menyiapkan gerbang pembayaran...</div>;

  return (
    <div className="page-container" style={{ backgroundColor: '#F9F8F6', minHeight: '100vh', paddingBottom: '3rem' }}>
      {/* --- PROGRESS BAR SECTION --- */}
      <div className="progress-container">
        <div className="step completed"><div className="circle">✓</div><span>Identitas</span></div>
        <div className="line"></div>
        <div className="step completed"><div className="circle">✓</div><span>Pilih Kamar</span></div>
        <div className="line"></div>
        <div className="step completed"><div className="circle">✓</div><span>Fasilitas</span></div>
        <div className="line"></div>
        <div className="step completed"><div className="circle">✓</div><span>Checkout</span></div>
        <div className="line"></div>
        <div className="step active"><div className="circle">5</div><span>Pembayaran</span></div>
      </div>

      {/* --- HEADER TITLE SECTION --- */}
      <div className="title-section" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p className="step-subtitle" style={{ color: '#C07D53', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px' }}>LANGKAH 5 DARI 5</p>
        <h1 className="main-title" style={{ fontFamily: 'serif', fontSize: '2.5rem', margin: '0.5rem 0' }}>Pembayaran</h1>
        <p className="desc-text" style={{ color: '#777' }}>Selesaikan pembayaran untuk mengonfirmasi reservasi</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        {/* --- TOTAL PAYMENT SUMMARY --- */}
        <div className="total-payment-box" style={{ backgroundColor: '#EFEBE4', padding: '1.5rem', borderRadius: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
          <span className="total-label" style={{ color: '#777', fontWeight: '500' }}>Total yang harus dibayar</span>
          <span className="total-amount" style={{ color: '#B06B3E', fontSize: '1.5rem', fontWeight: 'bold', fontFamily: 'monospace' }}>
            Rp {new Intl.NumberFormat('id-ID').format(masterData.totalAmount || 0)}
          </span>
        </div>

        {/* --- PAYMENT FORM CARD --- */}
        <div className="form-card" style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
          <form onSubmit={handleBayar}>
            
            <div className="input-group full-width" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Metode Pembayaran</label>
              <div className="select-wrapper">
                <select 
                  className="custom-select" 
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #DDD', outline: 'none' }}
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                >
                  <option value="TRANSFER">TRANSFER</option>
                  <option value="QRIS">QRIS</option>
                  <option value="CASH">Bayar di Resepsionis (Cash)</option>
                </select>
              </div>
            </div>

            {/* Field kartu kredit hanya ilustrasi UI, datanya tidak akan kita simpan ke DB demi keamanan */}
            <div className="input-group full-width" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Nomor Kartu</label>
              <input 
                type="text" 
                placeholder="1234 5678 9012 3456" 
                className="card-number-input"
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #DDD', fontFamily: 'monospace', fontSize: '1rem', outline: 'none' }}
                disabled={paymentMethod !== 'TRANSFER'} // Nonaktifkan jika pilih transfer/qris
              />
            </div>

            <div className="input-group full-width" style={{ marginBottom: '1.5rem' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Nama Pemegang Kartu</label>
              <input 
                type="text" 
                placeholder="Nama sesuai kartu" 
                style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #DDD', outline: 'none' }}
                disabled={paymentMethod !== 'TRANSFER'}
              />
            </div>

            <div className="form-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>Berlaku s/d</label>
                <input 
                  type="text" 
                  placeholder="MM/YY" 
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #DDD', outline: 'none' }}
                  disabled={paymentMethod !== 'TRANSFER'}
                />
              </div>
              <div className="input-group">
                <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '0.9rem' }}>CVV</label>
                <input 
                  type="password" 
                  placeholder="• • •" 
                  style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid #DDD', outline: 'none' }}
                  disabled={paymentMethod !== 'TRANSFER'}
                />
              </div>
            </div>

            {/* --- ACTION BUTTONS --- */}
            <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem' }}>
              <button 
                type="button"
                onClick={() => router.push('/summary')}
                style={{ padding: '0.8rem 1.5rem', backgroundColor: 'transparent', border: '1px solid #DDD', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#555' }}
              >
                &lt; Kembali
              </button>
              <button 
                type="submit"
                style={{ flexGrow: 1, padding: '0.8rem', backgroundColor: '#6B543A', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
              >
                Bayar Sekarang: Rp {new Intl.NumberFormat('id-ID').format(masterData.totalAmount || 0)}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}