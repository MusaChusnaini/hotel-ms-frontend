'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GuestDataPage() {
  const router = useRouter();

  // Inisialisasi "Big JSON" sejak awal (Blueprint untuk semua tabel)
  const [formData, setFormData] = useState({
    // === TARGET TABEL: guests & bookings (Diisi di Langkah 1) ===
    fullName: '',
    nikOrPassport: '',
    phoneNumber: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',

    // === TARGET TABEL: bookings (Diisi di Langkah 2) ===
    roomId: null,
    roomName: '', // Hanya untuk tampilan UI, tidak masuk DB
    basePrice: 0,

    // === TARGET TABEL: booking_facilities (Diisi di Langkah 3) ===
    facilities: [], // Akan berisi array fasilitas, misal: [{ facilityId: 1, quantity: 2 }]

    // === TARGET TABEL: payments (Diisi di Langkah 5) ===
    totalAmount: 0,
    paymentMethod: '' // 'CASH', 'TRANSFER', atau 'QRIS'
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    // Karena struktur kita flat (rata), handleChange ini tetap bisa dipakai
    // untuk mengisi data fullName, nikOrPassport, dll secara otomatis.
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanjutkan = (e: any) => {
    e.preventDefault();
    
    // Validasi sederhana
    if (!formData.fullName || !formData.nikOrPassport || !formData.checkInDate || !formData.checkOutDate) {
      alert("Mohon lengkapi data wajib (Nama, NIK, dan Tanggal)!");
      return;
    }

    // Simpan KESELURUHAN "Big Data" ke sessionStorage dengan kunci utama
    sessionStorage.setItem('masterBookingData', JSON.stringify(formData));

    // Pindah ke Step 2
    router.push('/catalog'); 
  };

  return (
    <div className="page-container">
      {/* --- PROGRESS BAR --- */}
      <div className="progress-container">
        <div className="step active"><div className="circle">1</div><span>Identitas</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">2</div><span>Pilih Kamar</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">3</div><span>Fasilitas</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">4</div><span>Checkout</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">5</div><span>Pembayaran</span></div>
      </div>

      <div className="title-section">
        <p className="step-subtitle">LANGKAH 1 DARI 5</p>
        <h1 className="main-title">Data Tamu</h1>
        <p className="desc-text">Lengkapi informasi untuk melanjutkan reservasi</p>
      </div>

      <div className="form-card">
        <form onSubmit={handleLanjutkan}>
          <div className="form-grid">
            <div className="input-group">
              <label>Nama Lengkap</label>
              <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="Contoh: Budi Santoso" />
            </div>
            <div className="input-group">
              <label>NIK / Kode Paspor</label>
              <input type="text" name="nikOrPassport" value={formData.nikOrPassport} onChange={handleChange} placeholder="16 digit NIK atau nomor paspor" />
            </div>
            <div className="input-group">
              <label>Nomor Telepon</label>
              <input type="tel" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} placeholder="08xx-xxxx-xxxx" />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="tamu@email.com" />
            </div>
          </div>

          <hr className="divider" />

          <div className="section-title">TANGGAL MENGINAP</div>
          <div className="form-grid">
            <div className="input-group">
              <label>Check In</label>
              <input type="date" name="checkInDate" value={formData.checkInDate} onChange={handleChange} />
            </div>
            <div className="input-group">
              <label>Check Out</label>
              <input type="date" name="checkOutDate" value={formData.checkOutDate} onChange={handleChange} />
            </div>
          </div>

          <div className="action-container" style={{ marginTop: '2rem' }}>
            <button type="submit" className="btn-primary" style={{ cursor: 'pointer', width: '100%' }}>
              Lanjutkan ke Pilih Kamar &gt;
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}