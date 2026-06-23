"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

// Data fasilitas disamakan dengan step sebelumnya untuk kalkulasi harga
const facilitiesData = [
  { id: 1, title: 'Balkoni', price: 500000 },
  { id: 2, title: 'Mini Bar', price: 200000 },
  { id: 3, title: 'Food Delivery 24 Jam', price: 300000 },
];

export default function CheckoutPage() {
  const router = useRouter();

  const [masterData, setMasterData] = useState<any>(null);
  const [stayDuration, setStayDuration] = useState<number>(0);
  const [totalPrice, setTotalPrice] = useState<number>(0);

  useEffect(() => {
    const savedData = sessionStorage.getItem('masterBookingData');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setMasterData(parsedData);

      // 1. Hitung Durasi Menginap (Selisih Hari)
      const inDate = new Date(parsedData.checkInDate);
      const outDate = new Date(parsedData.checkOutDate);
      const diffTime = Math.abs(outDate.getTime() - inDate.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const nights = diffDays > 0 ? diffDays : 1; 
      setStayDuration(nights);

      // 2. Hitung Total Harga Kamar
      const totalRoomPrice = (parsedData.basePrice || 0) * nights;

      // 3. Hitung Total Harga Fasilitas Tambahan
      let totalFacilitiesPrice = 0;
      if (parsedData.facilities && parsedData.facilities.length > 0) {
        parsedData.facilities.forEach((fac: any) => {
          const facilityDetail = facilitiesData.find(f => f.id === fac.facilityId);
          if (facilityDetail) totalFacilitiesPrice += facilityDetail.price;
        });
      }

      // 4. Set Grand Total
      setTotalPrice(totalRoomPrice + totalFacilitiesPrice);

    } else {
      router.push('/');
    }
  }, [router]);

  const handleLanjutkan = () => {
    const updatedMasterData = { ...masterData, totalAmount: totalPrice };
    sessionStorage.setItem('masterBookingData', JSON.stringify(updatedMasterData));
    router.push('/payment'); 
  };

  if (!masterData) return <div style={{ textAlign: 'center', padding: '50px' }}>Memuat ringkasan...</div>;

  const roomImageName = masterData.roomName ? masterData.roomName.split(' ')[0].toLowerCase() : "standard";
  const roomTypeLabel = masterData.roomName ? masterData.roomName.split(' ')[1] : "Standard";

  return (
    <div className="page-container" style={{ backgroundColor: '#F9F8F6', minHeight: '100vh', paddingBottom: '3rem' }}>
      
      {/* --- PROGRESS BAR --- */}
      <div className="progress-container">
        <div className="step completed"><div className="circle">✓</div><span>Identitas</span></div>
        <div className="line"></div>
        <div className="step completed"><div className="circle">✓</div><span>Pilih Kamar</span></div>
        <div className="line"></div>
        <div className="step completed"><div className="circle">✓</div><span>Fasilitas</span></div>
        <div className="line"></div>
        <div className="step active"><div className="circle">4</div><span>Checkout</span></div>
        <div className="line"></div>
        <div className="step"><div className="circle">5</div><span>Pembayaran</span></div>
      </div>

      <div className="title-section" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <p className="step-subtitle" style={{ color: '#C07D53', fontWeight: 'bold', fontSize: '0.85rem', letterSpacing: '1px' }}>LANGKAH 4 DARI 5</p>
        <h1 className="main-title" style={{ fontFamily: 'serif', fontSize: '2.5rem', margin: '0.5rem 0' }}>Ringkasan Pesanan</h1>
        <p className="desc-text" style={{ color: '#777' }}>Periksa detail pesanan sebelum melanjutkan</p>
      </div>

      <div style={{ maxWidth: '600px', margin: '0 auto' }}>
        
        {/* === KARTU 1: DETAIL KAMAR & TAMU === */}
        <div className="card-main" style={{ backgroundColor: '#fff', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '1.5rem' }}>
          {/* Gambar Kamar */}
          <div style={{ width: '100%', height: '200px', overflow: 'hidden' }}>
            <img 
              src={`/kamar-${roomImageName}.jpg`} 
              alt={masterData.roomName} 
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => { (e.target as HTMLImageElement).src = '/kamar-default.jpg'; }} 
            />
          </div>

          <div style={{ padding: '1.5rem' }}>
            {/* Header Kamar & Badge */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', margin: 0 }}>{masterData.roomName}</h2>
              <span style={{ backgroundColor: '#FDF0DD', color: '#B06B3E', padding: '4px 12px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold' }}>
                {roomTypeLabel}
              </span>
            </div>
            
            <p style={{ color: '#777', fontSize: '0.9rem', margin: '0 0 1rem 0' }}>Lantai {masterData.floor || '3'} - {roomTypeLabel}</p>

            {/* Badges Fasilitas Ruangan (Visual Placeholder) */}
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {['1 Queen Bed', '30 m²', 'Pemandangan Kota', 'Free WiFi'].map((badge, idx) => (
                <span key={idx} style={{ backgroundColor: '#F2EFE9', color: '#555', padding: '4px 10px', borderRadius: '6px', fontSize: '0.8rem' }}>
                  {badge}
                </span>
              ))}
            </div>

            <hr style={{ border: 'none', borderTop: '1px solid #EEE', margin: '1.5rem 0' }} />

            {/* Tabel Informasi Tamu */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.95rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#777' }}>Tamu</span>
                <span style={{ fontWeight: 'bold' }}>{masterData.fullName}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#777' }}>Check In</span>
                <span style={{ fontWeight: 'bold' }}>{masterData.checkInDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#777' }}>Check Out</span>
                <span style={{ fontWeight: 'bold' }}>{masterData.checkOutDate}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span style={{ color: '#777' }}>Durasi</span>
                <span style={{ fontWeight: 'bold' }}>{stayDuration} malam</span>
              </div>
            </div>
          </div>
        </div>

        {/* === KARTU 2: RINCIAN HARGA === */}
        <div className="card-price" style={{ backgroundColor: '#fff', borderRadius: '12px', padding: '1.5rem', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '0.85rem', color: '#777', letterSpacing: '1px', marginBottom: '1rem' }}>RINCIAN HARGA</h4>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#555' }}>
            <span>Kamar ({stayDuration} malam)</span>
            <span style={{ fontFamily: 'monospace' }}>Rp {new Intl.NumberFormat('id-ID').format((masterData.basePrice || 0) * stayDuration)}</span>
          </div>

          {/* Menampilkan Fasilitas jika ada */}
          {masterData.facilities && masterData.facilities.map((fac: any, index: number) => {
            const detail = facilitiesData.find(f => f.id === fac.facilityId);
            if (!detail) return null;
            return (
              <div key={index} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#555' }}>
                <span>{detail.title}</span>
                <span style={{ fontFamily: 'monospace' }}>Rp {new Intl.NumberFormat('id-ID').format(detail.price)}</span>
              </div>
            );
          })}

          <hr style={{ border: 'none', borderTop: '1px dashed #DDD', margin: '1rem 0' }} />

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Total</span>
            <span style={{ color: '#B06B3E', fontWeight: 'bold', fontSize: '1.2rem', fontFamily: 'monospace' }}>
              Rp {new Intl.NumberFormat('id-ID').format(totalPrice)}
            </span>
          </div>
        </div>

        {/* === TOMBOL AKSI === */}
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button 
            onClick={() => router.push('/fasilitas')}
            style={{ padding: '0.8rem 1.5rem', backgroundColor: 'transparent', border: '1px solid #DDD', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', color: '#555' }}
          >
            &lt; Kembali
          </button>
          <button 
            onClick={handleLanjutkan}
            style={{ flexGrow: 1, padding: '0.8rem', backgroundColor: '#B06B3E', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold', fontSize: '1rem' }}
          >
            Lanjutkan ke Pembayaran &gt;
          </button>
        </div>

      </div>
    </div>
  );
}