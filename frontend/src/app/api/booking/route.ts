import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase-server";

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const { workshop_id, date, guests } = body;
    const user_id = user.id;
    
    if (!workshop_id || !date) {
       return NextResponse.json({ success: false, error: "Data booking tidak lengkap" }, { status: 400 });
    }

    // Get Workshop Price to calculate total
    const { data: workshop } = await supabase.from('workshops').select('price').eq('id', workshop_id).single();
    const price = workshop ? workshop.price : 150000;
    const total_price = price * (guests || 1);

    // Insert ke Supabase
    const { data, error } = await supabase.from('bookings').insert([{ 
        workshop_id, 
        user_id, 
        booking_date: date, 
        guests: guests || 1,
        total_price 
    }]).select();
    
    if (error) throw error;
    
    // Optional: Call FastAPI untuk real-time prediction counter (diabaikan untuk speed MVP)

    return NextResponse.json({ 
      success: true, 
      booking_id: data[0].id, 
      message: "Booking berhasil dibuat!" 
    });
  } catch (error) {
    const err = error as Error;
    console.error("Booking Error:", err.message);
    return NextResponse.json({ success: false, error: "Internal Server Error", detail: err.message }, { status: 500 });
  }
}
