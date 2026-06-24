'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function GuestDataPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    fullName: '',
    nikOrPassport: '',
    phoneNumber: '',
    email: '',
    checkInDate: '',
    checkOutDate: '',
    roomId: null,
    roomName: '', 
    basePrice: 0,
    facilities: [], 
    totalAmount: 0,
    paymentMethod: '' 
  });

  // State tambahan untuk menampilkan tulisan "Mengecek email..." saat tombol ditekan
  const [isChecking, setIsChecking] = useState(false);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleLanjutkan = async (e: any) => {
    e.preventDefault();
    
    // 1. Validasi sederhana (Cek kosong)
    if (!formData.fullName || !formData.nikOrPassport || !formData.email || !formData.checkInDate || !formData.checkOutDate) {
      alert("Mohon lengkapi semua data wajib!");
      return;
    }

    setIsChecking(true); // Nyalakan efek loading

    try {
      // 2. Tarik data dari database melalui endpoint API
      const response = await fetch('/api/guests');
      
      if (response.ok) {
        const guests = await response.json();
        
        // 3. Cek apakah ada tamu dengan email yang sama persis
        // Fungsi .some() akan mengembalikan nilai 'true' jika ada yang cocok
        const isEmailTaken = guests.some((guest: any) => guest.email === formData.email);

        if (isEmailTaken) {
          alert("Email ini sudah terdaftar di sistem! Silakan gunakan email lain.");
          setIsChecking(false);
          return; // Hentikan proses, jangan lanjut ke step 2
        }
      } else {
        console.warn("Gagal mengecek email ke server. Melanjutkan proses...");
      }
    } catch (error) {
      console.error("Terjadi kesalahan jaringan saat mengecek email:", error);
      // Opsional: Kamu bisa memilih untuk menghentikan user atau tetap membiarkan lewat 
      // jika server sedang gangguan sementara.
    }

    setIsChecking(false); // Matikan efek loading

    // 4. Jika email aman, simpan ke brankas lokal
    sessionStorage.setItem('masterBookingData', JSON.stringify(formData));

    // 5. Lanjut ke halaman berikutnya
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
            <button type="submit" className="btn-primary" disabled={isChecking} style={{ cursor: isChecking ? 'not-allowed' : 'pointer', width: '100%', opacity: isChecking ? 0.7 : 1 }}>
              {isChecking ? 'Mengecek Data...' : 'Lanjutkan ke Pilih Kamar >'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}