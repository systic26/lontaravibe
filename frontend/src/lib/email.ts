import nodemailer from 'nodemailer';

export const sendTicketEmail = async (
  toEmail: string, 
  userName: string, 
  workshopTitle: string, 
  totalPrice: number, 
  workshopId: string,
  bookingId: string
) => {
  // Hanya jalankan SMTP Google jika kredensial diatur `.env.local`
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.warn("SMTP Gmail Credentials missing. Mocking email send to:", toEmail);
      return false;
  }

  try {
     const transporter = nodemailer.createTransport({
       service: 'gmail',
       auth: {
         user: process.env.EMAIL_USER,
         pass: process.env.EMAIL_PASS,
       },
     });
   
     const learnUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}/learn/${workshopId}`;
     
     // Memahat bentuk Premium Pin
     const splitId = bookingId.split('-');
     const premiumPin = `VIBE-${splitId[0].toUpperCase()}-${splitId[1].toUpperCase()}`;
     
     // Generate QR Code Fisik otomatis menggunakan API External Render (tambahkan margin agar tidak terpotong radius css)
     const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${premiumPin}&margin=15&bgcolor=ffffff&color=000000`;
   
     const htmlContent = `
       <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background-color: #f8fafc; padding: 20px; border-radius: 8px;">
         <div style="text-align: center; margin-bottom: 20px;">
           <h1 style="color: #0f172a; margin: 0;">LontaraVibe</h1>
           <p style="color: #8b5cf6; font-weight: bold; margin-top: 5px;">Bukti Pembelian & Kunci Akses</p>
         </div>
         
         <div style="background-color: #ffffff; padding: 24px; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05); border: 1px solid #e2e8f0;">
           <p style="color: #334155; font-size: 16px;">Halo <strong>${userName || 'Sobat Vibe'}</strong>,</p>
           <p style="color: #334155; line-height: 1.5;">Terima kasih atas pesanan Anda! Sistem kami telah memvalidasi tiket sebesar (Rp ${totalPrice.toLocaleString('id-ID')}) untuk kelas yang sangat istimewa ini:</p>
           
           <div style="background-color: #f1f5f9; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #14b8a6;">
              <h3 style="margin: 0; color: #0f172a;">${workshopTitle}</h3>
           </div>
   
           <p style="color: #334155; line-height: 1.5;">Sebagai pemegang tiket yang sah, sistem pertahanan LontaraVibe telah memasukkan Akun Anda ke dalam Daftar Undangan Terbatas. Anda diwajibkan memasuki <b>KODE KUNCI</b> berikut ini pada Bioskop Belajar. Jika Anda datang ke lokasi fisik pengrajin, tunjukkan <b>QR Code</b> ini kepada Panitia!</p>
   
           <div style="background-color: #f8fafc; border: 2px dashed #cbd5e1; padding: 20px; text-align: center; margin: 25px 0; border-radius: 8px;">
               <div style="margin-bottom: 20px;">
                  <img src="${qrCodeUrl}" alt="Tiket QR LontaraVibe" style="border-radius: 8px; border: 1px solid #e2e8f0; padding: 5px; background: white;" />
               </div>
               
               <p style="color: #64748b; font-size: 13px; margin: 0 0 10px 0; text-transform: uppercase; letter-spacing: 1px;">KODE KUNCI RAHASIA ANDA</p>
               <h2 style="margin: 0; color: #14b8a6; font-size: 26px; letter-spacing: 3px; font-family: monospace;">${premiumPin}</h2>
           </div>
           
           <div style="text-align: center; margin: 30px 0;">
             <a href="${learnUrl}" style="background-color: #0f172a; color: white; text-decoration: none; padding: 14px 28px; border-radius: 50px; font-weight: bold; font-size: 16px; display: inline-block; box-shadow: 0 4px 10px rgba(15, 23, 42, 0.4);">
                🔓 Buka Bioskop Belajar
             </a>
           </div>
   
           <p style="color: #64748b; font-size: 14px; border-top: 1px solid #e2e8f0; padding-top: 15px;">
              Siapkan alat dan bahan sesuai anjuran perajin. Mari lestarikan keterampilan tradisional Nusantara bersama-sama!
           </p>
         </div>
         <p style="text-align: center; color: #94a3b8; font-size: 12px; margin-top: 20px;">
           &copy; ${new Date().getFullYear()} LontaraVibe Edutech Nusantara
         </p>
       </div>
     `;
   
     await transporter.sendMail({
       from: `"LontaraVibe Masterclass" <${process.env.EMAIL_USER}>`,
       to: toEmail,
       subject: `Kunci Akses Kelas Resmi: ${workshopTitle} ✨`,
       html: htmlContent,
     });
     
     return true;
  } catch (error) {
     console.error("Gagal mengirim email smtp", error);
     return false;
  }
};
