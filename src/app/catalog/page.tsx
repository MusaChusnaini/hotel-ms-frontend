"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface RoomType {
  id: number;
  name: string;
  description: string;
  basePrice: number;
  floor?: number; 
}

export default function RoomCatalogPage() {
  const router = useRouter();
  
  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const response = await fetch('/api/room-types'); 
        if (response.ok) {
          const data = await response.json();
          setRooms(data);
        } else {
          console.error("Gagal mengambil data kamar dari backend.");
        }
      } catch (error) {
        console.error("Terjadi kesalahan jaringan:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRooms();
  }, []);

  // --- INI ADALAH LOGIKA BARU UNTUK BIG JSON ---
  const handlePilihKamar = (room: RoomType) => {
    // 1. Ambil "Big JSON" yang sudah dibuat di Step 1
    const savedData = sessionStorage.getItem('masterBookingData');
    
    if (savedData) {
      // 2. Bongkar datanya (Ubah dari teks JSON menjadi Object)
      const masterData = JSON.parse(savedData);
      
      // 3. Isi bagian data kamar yang masih kosong
      masterData.roomId = room.id;
      masterData.roomName = room.name; // Hanya untuk UI, tidak masuk DB
      masterData.basePrice = room.basePrice;
      
      // 4. Tutup dan timpa kembali data lamanya di brankas lokal
      sessionStorage.setItem('masterBookingData', JSON.stringify(masterData));
      
      // 5. Lanjut ke Step 3 (Fasilitas)
      router.push('/upgrade'); // Ubah '/upgrade' menjadi '/fasilitas' sesuai struktur foldermu
    } else {
      // Keamanan ekstra: Jika user iseng bypass URL langsung ke /catalog
      alert("Data tamu tidak ditemukan! Silakan isi identitas terlebih dahulu.");
      router.push('/'); // Lempar balik ke Step 1
    }
  };

  return (
    <div className="page-container">
      {/* --- PROGRESS BAR SECTION --- */}
      <div className="progress-container">
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Identitas</span>
        </div>
        <div className="line"></div>
        <div className="step active">
          <div className="circle">2</div>
          <span>Pilih Kamar</span>
        </div>
        <div className="line"></div>
        <div className="step">
          <div className="circle">3</div>
          <span>Fasilitas</span>
        </div>
        <div className="line"></div>
        <div className="step">
          <div className="circle">4</div>
          <span>Checkout</span>
        </div>
        <div className="line"></div>
        <div className="step">
          <div className="circle">5</div>
          <span>Pembayaran</span>
        </div>
      </div>

      {/* --- HEADER TITLE SECTION --- */}
      <div className="title-section">
        <p className="step-subtitle">LANGKAH 2 DARI 5</p>
        <h1 className="main-title">Katalog Kamar</h1>
        <p className="desc-text">Pilih kamar yang sesuai dengan kebutuhan Anda</p>
      </div>

      {/* --- ROOM GRID SECTION --- */}
      <div className="room-grid">
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '2rem', width: '100%' }}>
            <h3>Memuat daftar kamar...</h3>
          </div>
        ) : (
          rooms.map((room) => {
            // Mengubah dummy status agar sinkron dengan bahasa Inggris di PostgreSQL kamu
            let roomStatus = "AVAILABLE"; 
            const roomTingkat = room.name ? room.name.split(' ')[0].toLowerCase() : "standard"; 
            
            // Pengecekan sekarang menggunakan "BOOKED"
            const isOccupied = roomStatus === "BOOKED" || roomStatus === "DIRTY";
            
            return (
              <div key={room.id} className={`room-card ${isOccupied ? 'occupied' : ''}`}>
                <div className="room-image-container">
                  {isOccupied ? (
                      <div className="image-placeholder"></div>
                  ) : (
                      <img 
                        src={`/kamar-${roomTingkat}.jpg`} 
                        alt={room.name} 
                        className="room-image"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/kamar-default.jpg'; }} 
                      />
                  )}
                  
                  <span className="badge badge-type">{room.name.split(' ')[0]}</span>
                  <span className={`badge badge-status ${isOccupied ? 'status-terisi' : 'status-tersedia'}`}>
                    {roomStatus}
                  </span>
                </div>

                <div className="room-content">
                  <h3 className="room-name">{room.name}</h3>
                  <p className="room-floor">Lantai: {room.floor || "Menyesuaikan"}</p> 
                  <p className="room-desc">{room.description}</p>
                  
                  <div className="room-footer">
                    <div className="price-container">
                      <span className="price-label">per malam</span>
                      <span className="price-value">
                        Rp {new Intl.NumberFormat('id-ID').format(room.basePrice)}
                      </span>
                    </div>
                    <button 
                      className="btn-detail" 
                      disabled={isOccupied}
                      onClick={() => handlePilihKamar(room)}
                      style={{ cursor: isOccupied ? 'not-allowed' : 'pointer' }}
                    >
                      Pilih Kamar
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