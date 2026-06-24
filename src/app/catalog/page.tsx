"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// 1. Interface disesuaikan dengan struktur JSON 13 kamar
interface PhysicalRoom {
  id: number;
  roomNumber: string;
  status: string;
  roomType: {
    id: number;
    name: string;
    description: string;
    basePrice: number;
  };
}

export default function RoomCatalogPage() {
  const router = useRouter();
  
  const [rooms, setRooms] = useState<PhysicalRoom[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        // 2. Ubah endpoint untuk mengambil dari tabel 'rooms' (bukan room-types)
        // Sesuaikan URL ini dengan endpoint Spring Boot kamu yang menghasilkan JSON 13 kamar tersebut
        const response = await fetch('/api/rooms'); 
        
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        } else {
          console.error("Gagal mengambil data kamar fisik dari backend.");
        }
      } catch (error) {
        console.error("Terjadi kesalahan jaringan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  const handlePilihKamar = (room: PhysicalRoom) => {
    const savedData = sessionStorage.getItem('masterBookingData');
    
    if (savedData) {
      const masterData = JSON.parse(savedData);
      
      // 3. Simpan ID kamar fisik (misal ID 7 untuk Kamar 201) agar Spring Boot tidak error
      masterData.roomId = room.id;
      masterData.roomName = `${room.roomType.name} (No. ${room.roomNumber})`; 
      masterData.basePrice = room.roomType.basePrice;
      
      sessionStorage.setItem('masterBookingData', JSON.stringify(masterData));
      
      router.push('/upgrade'); 
    } else {
      alert("Data tamu tidak ditemukan! Silakan isi identitas terlebih dahulu.");
      router.push('/'); 
    }
  };

  return (
    <div className="page-container">
      {/* --- PROGRESS BAR SECTION --- */}
      <div className="progress-container">
        <div className="step completed"><div className="circle">✓</div><span>Identitas</span></div>
        <div className="line"></div>
        <div className="step active"><div className="circle">2</div><span>Pilih Kamar</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">3</div><span>Fasilitas</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">4</div><span>Checkout</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">5</div><span>Pembayaran</span></div>
      </div>

      <div className="title-section">
        <p className="step-subtitle">LANGKAH 2 DARI 5</p>
        <h1 className="main-title">Katalog Kamar</h1>
        <p className="desc-text">Pilih kamar spesifik yang sesuai dengan kebutuhan Anda</p>
      </div>

      <div className="room-grid">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem', width: '100%' }}>
            <h3>Memuat 13 daftar kamar...</h3>
          </div>
        ) : (
          rooms.map((room) => {
            const actualStatus = room.status ? room.status.toUpperCase() : "AVAILABLE";
            const isOccupied = actualStatus === "BOOKED" || actualStatus === "DIRTY";
            
            let badgeText = "Tersedia";
            if (actualStatus === "BOOKED") badgeText = "Penuh";
            if (actualStatus === "DIRTY") badgeText = "Kotor/Perbaikan";

            const roomTingkat = room.roomType.name ? room.roomType.name.split(' ')[0].toLowerCase() : "standard"; 
            
            return (
              <div key={room.id} className={`room-card ${isOccupied ? 'occupied' : ''}`}>
                <div className="room-image-container">
                  {isOccupied ? (
                      <div className="image-placeholder"></div>
                  ) : (
                      <img 
                        src={`/kamar-${roomTingkat}.jpg`} 
                        alt={room.roomType.name} 
                        className="room-image"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/kamar-default.jpg'; }} 
                      />
                  )}
                  
                  {/* Menampilkan Tipe Kamar dan Nomor Pintunya */}
                  <span className="badge badge-type">Pintu {room.roomNumber}</span>
                  <span className={`badge badge-status ${isOccupied ? 'status-terisi' : 'status-tersedia'}`}>
                    {badgeText}
                  </span>
                </div>

                <div className="room-content">
                  <h3 className="room-name">{room.roomType.name}</h3>
                  <p className="room-desc">{room.roomType.description}</p>
                  
                  <div className="room-footer">
                    <div className="price-container">
                      <span className="price-label">per malam</span>
                      <span className="price-value">
                        Rp {new Intl.NumberFormat('id-ID').format(room.roomType.basePrice)}
                      </span>
                    </div>
                    <button 
                      className="btn-detail" 
                      disabled={isOccupied}
                      onClick={() => handlePilihKamar(room)}
                      style={{ cursor: isOccupied ? 'not-allowed' : 'pointer' }}
                    >
                      {isOccupied ? 'Tidak Tersedia' : 'Pilih Kamar Ini'}
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}