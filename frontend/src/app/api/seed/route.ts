import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";

export async function GET() {
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ success: false, error: "Unauthorized in production" }, { status: 401 });
  }
  
  try {
    // 1. Mock Artisan (Admin Profile)
    await supabase
        .from('profiles')
        .insert([{ id: '00000000-0000-0000-0000-000000000000', full_name: 'Admin Lontara', role: 'admin' }]) // Will fail if UUID not exist in auth, so we just seed Workshops without FK for a moment or create generic workshops if RLS allows.
        .select();

    // Untuk memastikan RLS tidak memblokir di MVP, jalankan query langsung.
    // Jika auth.uuid error karena fk, kita lewati artisan_id
    const workshops = [
      {
        title: "Basic Pottery Making",
        description: "Belajar membuat kerajinan keramik dasar dengan tanah liat lokal.",
        category: "Keramik",
        price: 150000,
        location: "Kampung Gerabah, Takalar",
        duration: "2 Jam",
        rating: 4.8
      },
      {
        title: "Tenun Sutera Bugis",
        description: "Teknik dasar menenun kain sutera khas Bugis.",
        category: "Tekstil",
        price: 350000,
        location: "Sengkang, Wajo",
        duration: "4 Jam",
        rating: 4.9
      }
    ];

    const kits = [
      {
        name: "DIY Kit: Anyaman Rotan",
        description: "Paket lengkap membuat anyaman rotan untuk pemula di rumah.",
        price: 120000,
        stock: 50
      }
    ];

    const { error: wErr } = await supabase.from('workshops').insert(workshops);
    const { error: kErr } = await supabase.from('diy_kits').insert(kits);

    if (wErr || kErr) {
        const errorMsg = wErr?.message || kErr?.message;
        return NextResponse.json({ 
            success: false, 
            error: errorMsg,
            hint: "Penambahan data gagal karena proteksi database. Pastikan Anda telah menjalankan `schema.sql` di Supabase SQL Editor. Jika sudah, mungkin aturan Row-Level Security (RLS) pada tabel bersangkutan mencekal akses 'Insert'. Matikan RLS sejenak saat melakukan seed." 
        }, { status: 400 });
    }

    return NextResponse.json({ success: true, message: "Seed data berhasil dimasukkan!" });
  } catch (error) {
    const err = error as Error;
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
