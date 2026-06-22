import React from 'react';

export default function GuestDataPage() {
  return (
    <div className="page-container">
      {/* --- PROGRESS BAR SECTION --- */}
      <div className="progress-container">
        <div className="step active">
          <div className="circle">1</div>
          <span>Identitas</span>
        </div>
        <div className="line"></div>
        <div className="step">
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
        <p className="step-subtitle">LANGKAH 1 DARI 5</p>
        <h1 className="main-title">Data Tamu</h1>
        <p className="desc-text">Lengkapi informasi untuk melanjutkan reservasi</p>
      </div>

      {/* --- FORM CARD SECTION --- */}
      <div className="form-card">
        <form>
          {/* Grid Top: Data Diri */}
          <div className="form-grid">
            <div className="input-group">
              <label>Nama Lengkap</label>
              <input type="text" placeholder="Contoh: Budi Santoso" />
            </div>
            <div className="input-group">
              <label>NIK / Kode Paspor</label>
              <input type="text" placeholder="16 digit NIK atau nomor paspor" />
            </div>
            <div className="input-group">
              <label>Nomor Telepon</label>
              <input type="tel" placeholder="08xx-xxxx-xxxx" />
            </div>
            <div className="input-group">
              <label>Email</label>
              <input type="email" placeholder="tamu@email.com" />
            </div>
          </div>

          <hr className="divider" />

          {/* Grid Bottom: Tanggal Menginap */}
          <div className="section-title">TANGGAL MENGINAP</div>
          <div className="form-grid">
            <div className="input-group">
              <label>Check In</label>
              <input type="date" />
            </div>
            <div className="input-group">
              <label>Check Out</label>
              <input type="date" />
            </div>
          </div>
        </form>
      </div>

      {/* --- ACTION BUTTON --- */}
      <div className="action-container">
        <button className="btn-primary">
          Lanjutkan ke Pilih Kamar &gt;
        </button>
      </div>
    </div>
  );
}