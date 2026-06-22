import React from 'react';

// Data simulasi (mock data) untuk fasilitas tambahan
const facilitiesData = [
  {
    id: 'f1',
    title: 'Balkoni',
    desc: 'Teras pribadi dengan kursi santai & pemandangan eksklusif',
    price: 500000,
  },
  {
    id: 'f2',
    title: 'Mini Bar',
    desc: 'Minuman dan camilan pilihan premium',
    price: 200000,
  },
  {
    id: 'f3',
    title: 'Food Delivery 24 Jam',
    desc: 'Layanan antar makanan sepanjang waktu',
    price: 300000,
  },
];

export default function FacilitiesPage() {
  return (
    <div className="page-container">
      {/* --- PROGRESS BAR SECTION --- */}
      <div className="progress-container">
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Identitas</span>
        </div>
        <div className="line"></div>
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Pilih Kamar</span>
        </div>
        <div className="line"></div>
        <div className="step active">
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
        <p className="step-subtitle">LANGKAH 3 DARI 5</p>
        <h1 className="main-title">Upgrade Fasilitas</h1>
        <p className="desc-text">Tambahkan kenyamanan ekstra untuk pengalaman terbaik</p>
      </div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="facilities-content">
        
        {/* Kartu Ringkasan Kamar Terpilih */}
        <div className="selected-room-card">
          <img src="/kamar-standard.jpg" alt="Kamar Standard" className="selected-room-img" />
          <div className="selected-room-info">
            <h3>Kamar Standard</h3>
            <p className="floor-text">Lantai 3</p>
            <p className="price-text">
              <span className="highlight-price">Rp 1.500.000</span> / malam
            </p>
          </div>
        </div>

        {/* Daftar Fasilitas */}
        <div className="facilities-list">
          {facilitiesData.map((item) => (
            <label key={item.id} className="facility-item">
              <div className="radio-wrapper">
                <input type="checkbox" className="hidden-checkbox" />
                <div className="custom-radio"></div>
              </div>
              <div className="facility-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
              <div className="facility-price">
                +Rp {new Intl.NumberFormat('id-ID').format(item.price)}
              </div>
            </label>
          ))}
        </div>

        {/* Tombol Aksi */}
        <div className="action-buttons-row">
          <button className="btn-secondary">
            &lt; Kembali
          </button>
          <button className="btn-primary flex-grow">
            Lanjutkan ke Checkout &gt;
          </button>
        </div>

      </div>
    </div>
  );
}