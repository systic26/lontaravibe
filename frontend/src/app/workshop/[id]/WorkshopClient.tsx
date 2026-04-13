"use client"
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, Users, Star, Calendar, MonitorPlay } from "lucide-react";
import { supabase } from "@/lib/supabase";
import { BackButton } from "@/components/ui/BackButton";
import { type User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";

interface Workshop {
  id: string;
  title: string;
  price: number;
  description: string;
  location: string;
  duration: string;
  category: string;
  rating?: string;
  [key: string]: unknown;
}

export default function WorkshopClient() {
  const params = useParams();
  const router = useRouter();
  const [workshop, setWorkshop] = useState<Workshop | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingStatus, setBookingStatus] = useState("");
  
  // Form State
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(1);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const fetchWorkshopAndAuth = async () => {
      try {
        const { data: authData } = await supabase.auth.getUser();
        if (authData?.user) setUser(authData.user);

        const { data, error } = await supabase
          .from('workshops')
          .select('*')
          .eq('id', params.id as string)
          .single();
        
        if (error) console.error("Supabase Error:", error);
        if (data) setWorkshop(data as Workshop);
      } catch (err) {
        console.error("Failed fetching workshop", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshopAndAuth();
  }, [params.id]);

  const handleBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
       router.push('/login');
       return;
    }
    setBookingStatus("loading");
    
    try {
      const res = await fetch("/api/booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          workshop_id: workshop?.id || params.id,
          date,
          guests
        })
      });
      const resData = await res.json();
      if(resData.success) {
         setBookingStatus("success");
      } else {
         setBookingStatus("error");
      }
    } catch(err) {
      console.error(err);
      setBookingStatus("error");
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  // Fallback UI if data is not exist in DB yet
  const displayData = workshop || {
      id: params.id as string,
      title: "Katalog Tidak Ditemukan",
      price: 0,
      description: "Data workshop ini tidak ditemukan di Supabase. Pastikan Anda telah melakukan Seeding Data.",
      location: "Unknown", duration: "-", category: "Unknown", rating: "4.5"
  };

  return (
    <div className="container mx-auto px-4 py-12">
       <BackButton fallbackPath="/explore" />
       <div className="flex flex-col lg:flex-row gap-8">
       {/* Left Content */}
       <div className="lg:w-2/3">
          <Badge className="mb-4 bg-teal-100 text-teal-700">{displayData.category}</Badge>
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{displayData.title}</h1>
          <div className="flex flex-wrap gap-4 text-slate-600 mb-8 border-b pb-6">
             <div className="flex items-center gap-1"><MapPin size={18}/> {displayData.location}</div>
             <div className="flex items-center gap-1"><Clock size={18}/> {displayData.duration}</div>
             <div className="flex items-center gap-1 text-yellow-600"><Star size={18} className="fill-yellow-500"/> {displayData.rating || "4.5"}</div>
          </div>

          <div className="prose max-w-none text-slate-700">
             <h3 className="text-xl font-semibold mb-2">Tentang Workshop Ini</h3>
             <p>{displayData.description}</p>
          </div>
       </div>

       {/* Right Booking Card */}
       <div className="lg:w-1/3">
          <Card className="sticky top-24 shadow-xl border-slate-100">
             <CardHeader>
                <CardTitle className="text-2xl text-teal-600">Rp {displayData.price?.toLocaleString('id-ID')}</CardTitle>
                <p className="text-sm text-slate-500">per orang</p>
             </CardHeader>
             <CardContent>
                <form onSubmit={handleBooking} className="space-y-4">
                   <div className="space-y-2">
                     <label className="text-sm font-medium flex items-center gap-2"><Calendar size={16}/> Tanggal</label>
                     <Input type="date" required value={date} onChange={e => setDate(e.target.value)}/>
                   </div>
                   <div className="space-y-2">
                     <label className="text-sm font-medium flex items-center gap-2"><Users size={16}/> Jumlah Peserta</label>
                     <Input type="number" min="1" required value={guests} onChange={e => setGuests(parseInt(e.target.value))}/>
                   </div>
                   
                   <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" disabled={bookingStatus === "loading"}>
                      {!user ? "Login untuk Memesan" : bookingStatus === "loading" ? "Memproses..." : "Pesan Sekarang"}
                   </Button>

                   {bookingStatus === "success" && (
                      <div className="p-3 bg-emerald-50 text-emerald-700 text-sm rounded-md border border-emerald-200">
                         🎉 Booking Berhasil!
                      </div>
                   )}
                   {bookingStatus === "error" && (
                      <div className="p-3 bg-red-50 text-red-700 text-sm rounded-md border border-red-200">
                         {!user ? "Anda harus login terlebih dahulu." : "Gagal membuat booking. Segarkan halaman atau coba lagi."}
                      </div>
                   )}
                </form>

                <div className="w-full border-t border-slate-100 my-6"></div>
                
                <div className="text-center">
                   <p className="text-xs text-slate-500 mb-3">Sudah punya tiket untuk kelas ini?</p>
                   <Link href={`/learn/${displayData.id}`}>
                      <Button variant="outline" className="w-full border-teal-600 text-teal-700 hover:bg-teal-50 shadow-sm flex items-center justify-center gap-2">
                        <MonitorPlay size={16} /> Akses Bioskop Belajar
                      </Button>
                   </Link>
                </div>
             </CardContent>
          </Card>
       </div>
       </div>
    </div>
  );
}
