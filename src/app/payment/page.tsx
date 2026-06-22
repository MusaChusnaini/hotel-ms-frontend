import React from 'react';

export default function PaymentPage() {
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
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Fasilitas</span>
        </div>
        <div className="line"></div>
        <div className="step completed">
          <div className="circle">✓</div>
          <span>Checkout</span>
        </div>
        <div className="line"></div>
        <div className="step active">
          <div className="circle">5</div>
          <span>Pembayaran</span>
        </div>
      </div>

      {/* --- HEADER TITLE SECTION --- */}
      <div className="title-section">
        <p className="step-subtitle">LANGKAH 5 DARI 5</p>
        <h1 className="main-title">Pembayaran</h1>
        <p className="desc-text">Selesaikan pembayaran untuk mengonfirmasi reservasi</p>
      </div>

      {/* --- TOTAL PAYMENT SUMMARY --- */}
      <div className="total-payment-box">
        <span className="total-label">Total yang harus dibayar</span>
        <span className="total-amount">Rp 3.000.000</span>
      </div>

      {/* --- PAYMENT FORM CARD --- */}
      <div className="form-card">
        <form>
          <div className="input-group full-width">
            <label>Metode Pembayaran</label>
            <div className="select-wrapper">
              <select className="custom-select">
                <option value="credit-card">Kartu Kredit / Debit</option>
                <option value="bank-transfer">Transfer Bank</option>
                <option value="e-wallet">E-Wallet (OVO/Gopay)</option>
              </select>
            </div>
          </div>

          <div className="input-group full-width mt-20">
            <label>Nomor Kartu</label>
            <input 
              type="text" 
              placeholder="1234 5678 9012 3456" 
              className="card-number-input"
            />
          </div>

          <div className="input-group full-width mt-20">
            <label>Nama Pemegang Kartu</label>
            <input type="text" placeholder="Nama sesuai kartu" />
          </div>

          <div className="form-grid mt-20">
            <div className="input-group">
              <label>Berlaku s/d</label>
              <input type="text" placeholder="MM/YY" />
            </div>
            <div className="input-group">
              <label>CVV</label>
              <input type="password" placeholder="• • •" />
            </div>
          </div>
        </form>
      </div>

      {/* --- ACTION BUTTONS --- */}
      <div className="action-container action-buttons-row">
        <button className="btn-secondary">
          &lt; Kembali
        </button>
        <button className="btn-primary flex-grow">
          Bayar Sekarang: Rp 3.000.000
        </button>
      </div>
    </div>
  );
}