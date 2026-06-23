'use client';

import React, { useState } from 'react';

export default function GuestDataPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    nik: '',
    phoneNumber: '',
    email: '',
    checkInDate: '',
    checkOutDate: ''
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanjutkan = async (e: any) => {
    e.preventDefault();
    
    alert('Woi fungsi ini kepanggil bro! Proses nembak ke BE dimulai!');

    try {
      const response = await fetch('http://localhost:8081/api/guests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: formData.fullName || 'Dummy Nama',
          nik: formData.nik || '1234567890123456',
          phoneNumber: formData.phoneNumber || '0812345678',
          email: formData.email || 'dummy@gmail.com'
        }),
      });

      if (response.ok) {
        alert('Mantap bro! Data tamu berhasil masuk ke PostgreSQL!');
        window.location.href = '/catalog';
      } else {
        alert('Backend menolak request!');
      }
    } catch (error) {
      alert('Gagal konek ke backend port 8081! Tapi fungsi klik tombol lu udah sukses jalan!');
    }
  };

  return (
    <div className="page-container">
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
              <input type="text" name="nik" value={formData.nik} onChange={handleChange} placeholder="16 digit NIK atau nomor paspor" />
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