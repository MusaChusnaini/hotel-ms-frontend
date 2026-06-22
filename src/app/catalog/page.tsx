import React from 'react';

// Mendefinisikan struktur data kamar
const roomData = [
  {
    id: 1,
    name: "Kamar Standard",
    tingkat: "standard", // Sesuai aturan penamaan file gambar: kamar-standard.jpg
    floor: 3,
    desc: "Kamar standard yang nyaman dengan tempat tidur queen size dan pemandangan kota.",
    price: 1500000,
    status: "Tersedia",
  },
  {
    id: 2,
    name: "Kamar Deluxe",
    tingkat: "deluxe",
    floor: 7,
    desc: "Kamar deluxe luas dengan dekorasi premium dan pemandangan taman yang asri.",
    price: 2500000,
    status: "Tersedia",
  },
  {
    id: 3,
    name: "Suite Executive",
    tingkat: "executive",
    floor: 12,
    desc: "Suite eksekutif mewah dengan ruang tamu terpisah dan pemandangan pantai.",
    price: 4000000,
    status: "Terisi",
  },
  {
    id: 4,
    name: "Standard Plus",
    tingkat: "standard",
    floor: 5,
    desc: "Kamar standard yang lebih luas dengan desain modern kontemporer. Ideal untuk staycation.",
    price: 1800000,
    status: "Tersedia",
  },
  {
    id: 5,
    name: "Deluxe Twin",
    tingkat: "deluxe",
    floor: 8,
    desc: "Kamar deluxe dengan dua tempat tidur single untuk perjalanan bersama rekan atau keluarga.",
    price: 2800000,
    status: "Tersedia",
  },
  {
    id: 6,
    name: "Executive Corner Suite",
    tingkat: "executive",
    floor: 15,
    desc: "Suite corner premium di lantai tertinggi dengan jendela 270° menghadap kota dan laut.",
    price: 4500000,
    status: "Tersedia",
  },
];

export default function RoomCatalogPage() {
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
        {roomData.map((room) => {
          const isOccupied = room.status === "Terisi";
          
          return (
            <div key={room.id} className={`room-card ${isOccupied ? 'occupied' : ''}`}>
              <div className="room-image-container">
                {/* Mengambil gambar dari folder public berdasarkan tingkat */}
                {isOccupied ? (
                    <div className="image-placeholder"></div>
                ) : (
                    <img 
                      src={`/kamar-${room.tingkat}.jpg`} 
                      alt={room.name} 
                      className="room-image"
                    />
                )}
                
                {/* Badges */}
                <span className="badge badge-type">{room.tingkat.split('-')[0]}</span>
                <span className={`badge badge-status ${isOccupied ? 'status-terisi' : 'status-tersedia'}`}>
                  {room.status}
                </span>
              </div>

              <div className="room-content">
                <h3 className="room-name">{room.name}</h3>
                <p className="room-floor">Lantai {room.floor}</p>
                <p className="room-desc">{room.desc}</p>
                
                <div className="room-footer">
                  <div className="price-container">
                    <span className="price-label">per malam</span>
                    <span className="price-value">
                      Rp {new Intl.NumberFormat('id-ID').format(room.price)}
                    </span>
                  </div>
                  <button className="btn-detail" disabled={isOccupied}>
                    Lihat Detail
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}