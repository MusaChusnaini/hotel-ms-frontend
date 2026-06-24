"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 1. Buat cetakan tipe data sesuai dengan tabel database
interface Facility {
  id: number;
  facilityName: string; // Spring Boot mengubah 'facility_name' menjadi 'facilityName' di JSON
  price: number;
}

export default function FacilitiesPage() {
  const router = useRouter();

  const [masterData, setMasterData] = useState<any>(null);
  const [selectedFacilities, setSelectedFacilities] = useState<number[]>([]);
  
  // 2. State baru untuk menampung data asli dari database
  const [availableFacilities, setAvailableFacilities] = useState<Facility[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Tarik data keranjang dari memori lokal
    const savedData = sessionStorage.getItem('masterBookingData');
    if (savedData) {
      setMasterData(JSON.parse(savedData));
    } else {
      alert("Data pesanan tidak ditemukan. Silakan isi dari awal.");
      router.push('/');
      return;
    }

    // 3. Tembak API Backend untuk mengambil daftar fasilitas
    const fetchFacilities = async () => {
      try {
        const response = await fetch('/api/facilities'); 
        if (response.ok) {
          const data = await response.json();
          setAvailableFacilities(data);
        } else {
          console.error("Gagal mengambil data fasilitas dari server.");
        }
      } catch (error) {
        console.error("Terjadi kesalahan jaringan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFacilities();
  }, [router]);

  const handleToggleFacility = (facilityId: number) => {
    setSelectedFacilities((prevSelected) => {
      if (prevSelected.includes(facilityId)) {
        return prevSelected.filter((id) => id !== facilityId);
      } else {
        return [...prevSelected, facilityId];
      }
    });
  };

  const handleLanjutkan = () => {
    const facilitiesPayload = selectedFacilities.map((id) => ({
      facilityId: id,
      quantity: 1 
    }));

    const updatedMasterData = {
      ...masterData,
      facilities: facilitiesPayload
    };

    sessionStorage.setItem('masterBookingData', JSON.stringify(updatedMasterData));
    router.push('/summary');
  };

  if (!masterData) return <div style={{ textAlign: 'center', padding: '50px' }}>Memuat data pesanan...</div>;

  // Nama gambar menyesuaikan tipe kamar, kita ambil kata pertamanya saja
  const roomImageName = masterData.roomName ? masterData.roomName.split(' ')[0].toLowerCase() : "standard";

  return (
    <div className="page-container">
      {/* --- PROGRESS BAR --- */}
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

      <div className="title-section">
        <p className="step-subtitle">LANGKAH 3 DARI 5</p>
        <h1 className="main-title">Upgrade Fasilitas</h1>
        <p className="desc-text">Tambahkan kenyamanan ekstra untuk kamar {masterData.roomName} Anda</p>
      </div>

      <div className="facilities-content">
        
        {/* KARTU KAMAR TERPILIH */}
        <div className="selected-room-card">
          <img 
            src={`/kamar-${roomImageName}.jpg`} 
            alt={masterData.roomName} 
            className="selected-room-img" 
            onError={(e) => { (e.target as HTMLImageElement).src = '/kamar-default.jpg'; }} 
          />
          <div className="selected-room-info">
            <h3>{masterData.roomName}</h3>
            <p className="price-text">
              <span className="highlight-price">
                Rp {new Intl.NumberFormat('id-ID').format(masterData.basePrice)}
              </span> / malam
            </p>
          </div>
        </div>

        {/* DAFTAR FASILITAS DARI DATABASE */}
        <div className="facilities-list">
          {isLoading ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#777' }}>
              Memuat opsi fasilitas tambahan...
            </div>
          ) : availableFacilities.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2rem', color: '#777', border: '1px dashed #ccc', borderRadius: '8px' }}>
              Tidak ada fasilitas tambahan yang tersedia saat ini.
            </div>
          ) : (
            availableFacilities.map((item) => {
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
                    <div className="custom-radio" style={{ backgroundColor: isChecked ? '#8B5E34' : 'transparent' }}>
                      {isChecked && <span style={{ color: 'white', fontSize: '12px' }}>✓</span>}
                    </div>
                  </div>
                  <div className="facility-info">
                    {/* Menggunakan property dari Database */}
                    <h4>{item.facilityName}</h4> 
                    <p style={{ color: '#888', fontSize: '0.85rem' }}>Fasilitas ekstra ruangan</p>
                  </div>
                  <div className="facility-price">
                    +Rp {new Intl.NumberFormat('id-ID').format(item.price)}
                  </div>
                </label>
              );
            })
          )}
        </div>

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