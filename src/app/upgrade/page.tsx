"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Data simulasi (Pastikan ID berupa angka agar cocok dengan database PostgreSQL)
const facilitiesData = [
  {
    id: 1,
    title: 'Balkoni',
    desc: 'Teras pribadi dengan kursi santai & pemandangan eksklusif',
    price: 500000,
  },
  {
    id: 2,
    title: 'Mini Bar',
    desc: 'Minuman dan camilan pilihan premium',
    price: 200000,
  },
  {
    id: 3,
    title: 'Food Delivery 24 Jam',
    desc: 'Layanan antar makanan sepanjang waktu',
    price: 300000,
  },
];

export default function FacilitiesPage() {
  const router = useRouter();

  // 1. State untuk menampung Big JSON dari sessionStorage
  const [masterData, setMasterData] = useState<any>(null);
  
  // 2. State untuk menyimpan daftar ID fasilitas yang dicentang user
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);

  // 3. Ambil data saat halaman dimuat
  useEffect(() => {
    const savedData = sessionStorage.getItem('masterBookingData');
    if (savedData) {
      setMasterData(JSON.parse(savedData));
    } else {
      // Jika tidak ada data, tendang kembali ke Step 1
      alert("Data pesanan tidak ditemukan. Silakan isi dari awal.");
      router.push('/');
    }
  }, [router]);

  // 4. Fungsi untuk menangani centang fasilitas
  const handleToggleFacility = (facilityId: number) => {
    setSelectedFacilities((prevSelected) => {
      // Jika sudah ada di array, hapus (uncheck). Jika belum, tambahkan (check).
      if (prevSelected.includes(facilityId)) {
        return prevSelected.filter((id) => id !== facilityId);
      } else {
        return [...prevSelected, facilityId];
      }
    });
  };

  // 5. Fungsi saat tombol "Lanjutkan ke Checkout" ditekan
  const handleLanjutkan = () => {
    // Ubah format array [1, 3] menjadi format object database: 
    // [{ facilityId: 1, quantity: 1 }, { facilityId: 3, quantity: 1 }]
    const facilitiesPayload = selectedFacilities.map((id) => ({
      facilityId: id,
      quantity: 1 // Anggap default quantity adalah 1 untuk setiap fasilitas
    }));

    // Isi array fasilitas di dalam Big JSON
    const updatedMasterData = {
      ...masterData,
      facilities: facilitiesPayload
    };

    // Simpan kembali ke brankas lokal
    sessionStorage.setItem('masterBookingData', JSON.stringify(updatedMasterData));

    // Pindah ke Step 4
    router.push('/summary');
  };

  // Tampilkan layar loading sebentar sebelum data memori berhasil ditarik
  if (!masterData) return <div style={{ textAlign: 'center', padding: '50px' }}>Memuat data pesanan...</div>;

  // Menentukan gambar kamar berdasarkan nama kamar dari Step 2
  const roomImageName = masterData.roomName ? masterData.roomName.split(' ')[0].toLowerCase() : "standard";

  return (
    <div className="page-container">
      {/* --- PROGRESS BAR SECTION --- */}
      <div className="progress-container">
        <div className="step completed"><div className="circle">✓</div><span>Identitas</span></div>
        <div className="line"></div>
        <div className="step completed"><div className="circle">✓</div><span>Pilih Kamar</span></div>
        <div className="line"></div>
        <div className="step active"><div className="circle">3</div><span>Fasilitas</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">4</div><span>Checkout</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">5</div><span>Pembayaran</span></div>
      </div>

      {/* --- HEADER TITLE SECTION --- */}
      <div className="title-section">
        <p className="step-subtitle">LANGKAH 3 DARI 5</p>
        <h1 className="main-title">Upgrade Fasilitas</h1>
        <p className="desc-text">Tambahkan kenyamanan ekstra untuk kamar {masterData.roomName} Anda</p>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="facilities-content">
        
        {/* Kartu Ringkasan Kamar Terpilih (Ditarik Dinamis dari JSON) */}
        <div className="selected-room-card">
          <img 
            src={`/kamar-${roomImageName}.jpg`} 
            alt={masterData.roomName} 
            className="selected-room-img" 
            onError={(e) => { (e.target as HTMLImageElement).src = '/kamar-default.jpg'; }} 
          />
          <div className="selected-room-info">
            <h3>{masterData.roomName}</h3>
            {/* Lantai bisa ditarik juga jika sebelumnya disimpan di masterData */}
            <p className="price-text">
              <span className="highlight-price">
                Rp {new Intl.NumberFormat('id-ID').format(masterData.basePrice)}
              </span> / malam
            </p>
          </div>
        </div>

        {/* Daftar Fasilitas */}
        <div className="facilities-list">
          {facilitiesData.map((item) => {
            const isChecked = selectedFacilities.includes(item.id);
            
            return (
              <label key={item.id} className="facility-item" style={{ cursor: 'pointer', border: isChecked ? '2px solid #8B5E34' : '1px solid #ccc' }}>
                <div className="radio-wrapper">
                  <input 
                    type="checkbox" 
                    className="hidden-checkbox" 
                    checked={isChecked}
                    onChange={() => handleToggleFacility(item.id)}
                  />
                  {/* Visualisasi Checkbox Kustom */}
                  <div className="custom-radio" style={{ backgroundColor: isChecked ? '#8B5E34' : 'transparent' }}>
                    {isChecked && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                  </div>
                </div>
                <div className="facility-info">
                  <h4>{item.title}</h4>
                  <p>{item.desc}</p>
                </div>
                <div className="facility-price">
                  +Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                </div>
              </label>
            );
          })}
        </div>

        {/* Tombol Aksi */}
        <div className="action-buttons-row">
          <button className="btn-secondary" onClick={() => router.push('/catalog')}>
            &lt; Kembali
          </button>
          <button className="btn-primary flex-grow" onClick={handleLanjutkan}>
            Lanjutkan ke Checkout &gt;
          </button>
        </div>

      </div>
    </div>
  );
}