"use client"
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { PlayCircle, ArrowLeft, Video, Lock, KeyRound } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const MOCK_MODULES = [
  { id: 1, title: "1. Persiapan Alat & Pemahaman Materi", duration: "05:22", url: "https://www.youtube.com/embed/lJIrF4YjHfQ" },
  { id: 2, title: "2. Teknik Dasar & Eksekusi", duration: "12:45", url: "https://www.youtube.com/embed/LXb3EKWsInQ" },
  { id: 3, title: "3. Trik Rahasia Pengrajin Ahli", duration: "08:15", url: "https://www.youtube.com/embed/aqz-KE-bpKQ" },
  { id: 4, title: "4. Sentuhan Akhir & Polishing", duration: "10:30", url: "https://www.youtube.com/embed/tgbNymZ7vqY" }
];

export default function LearnDashboard() {
   const params = useParams();
   const router = useRouter();
   const [workshop, setWorkshop] = useState<any>(null);
   const [loading, setLoading] = useState(true);
   
   // State Keamanan Lapis Ganda
   const [blockReason, setBlockReason] = useState<"no_session" | "no_ticket" | null>(null);
   const [pinPassed, setPinPassed] = useState(false);
   const [pinInput, setPinInput] = useState("");
   const [pinError, setPinError] = useState(false);
   const [validPins, setValidPins] = useState<string[]>([]);

   const [activeModule, setActiveModule] = useState(MOCK_MODULES[0]);

   useEffect(() => {
       const fetchAuthAndData = async () => {
          const { data: authData } = await supabase.auth.getUser();
          if (!authData?.user) {
             setBlockReason("no_session");
             setLoading(false);
             return;
          }
          
          // VERIFIKASI Lapis 1: Cek apakah user sudah mem-booking kelas ini
          const { data: bookingData } = await supabase
            .from('bookings')
            .select('id')
            .eq('workshop_id', params.workshop_id)
            .eq('user_id', authData.user.id)
            .in('status', ['confirmed', 'completed', 'pending']);

          if (!bookingData || bookingData.length === 0) {
             setBlockReason("no_ticket"); // Ubah marker menjadi tidak punya tiket
             setLoading(false);
             return;
          }
          
          // GENERATE DINAMIS KODE KUNCI VIBE PREMIUM
          const pinsArray = bookingData.map((b: any) => {
             const splitId = b.id.split('-');
             return `VIBE-${splitId[0].toUpperCase()}-${splitId[1].toUpperCase()}`;
          });
          setValidPins(pinsArray);
          
          // Lolos Lapis 1, ambil data judul kelas
          const { data } = await supabase.from('workshops').select('title').eq('id', params.workshop_id).single();
          if (data) setWorkshop(data);
          
          setLoading(false);
       };
       fetchAuthAndData();
   }, [params.workshop_id]);

   const handlePinSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validPins.includes(pinInput.trim().toUpperCase())) {
          setPinPassed(true);
          setPinError(false);
      } else {
          setPinError(true);
      }
   };

   if (loading) return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Memuat Bioskop Pembelajaran...</div>;

   // Lapis Keselamatan 1: Blokir mutlak bagi penyusup
   if (blockReason === "no_session") {
      return (
         <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
            <Lock size={64} className="text-slate-600 mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Akses Terkunci</h1>
            <p className="text-slate-400 mb-8 max-w-md">Anda harus masuk (Login) terlebih dahulu untuk mengakses Bioskop Edutech Pembelajaran ini.</p>
            <Link href="/login"><Button className="bg-teal-600 hover:bg-teal-700">Masuk Sekarang</Button></Link>
         </div>
      );
   }

   if (blockReason === "no_ticket") {
      return (
         <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
            <Lock size={64} className="text-slate-600 mb-6" />
            <h1 className="text-3xl font-bold text-white mb-4">Belum Punya Tiket</h1>
            <p className="text-slate-400 mb-8 max-w-md">Akun Anda terpantau sah, namun Anda belum memesan tiket untuk kelas ini. Silakan beli tiket terlebih dahulu untuk mensponsori pengrajin lokal.</p>
            <Link href={`/explore`}><Button className="bg-teal-600 hover:bg-teal-700">Beli Tiket Kelas</Button></Link>
         </div>
      );
   }

   // Lapis Keselamatan 2: Form Input PIN dari Email (Untuk member sah yang memiliki tiket)
   if (!pinPassed) {
      return (
         <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center p-6">
            <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-2xl">
               <div className="w-16 h-16 bg-teal-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                 <KeyRound size={32} className="text-teal-400" />
               </div>
               <h1 className="text-2xl font-bold text-white mb-2">Masukkan Kode Kunci</h1>
               <p className="text-slate-400 text-sm mb-8">
                  Walaupun Anda telah membeli tiket kelas <b>"{workshop?.title}"</b>, silakan verifikasi dengan memasukkan PIN Token unik yang telah kami kirimkan ke Email Pembelian Anda.
               </p>
               
               <form onSubmit={handlePinSubmit} className="space-y-4">
                  <div>
                    <Input 
                       type="text" 
                       placeholder="Contoh: VIBE-B8F2-A10C" 
                       value={pinInput}
                       onChange={(e) => setPinInput(e.target.value)}
                       className="bg-slate-950 border-slate-800 text-center uppercase tracking-widest font-mono text-white placeholder:text-slate-600 h-14 text-lg focus-visible:ring-teal-500"
                    />
                    {pinError && <p className="text-red-400 text-xs mt-2 text-left">Gagal: Kode Akses tidak valid untuk sesi Anda.</p>}
                  </div>
                  <Button type="submit" className="w-full h-12 bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm">
                     Verifikasi & Tonton Video
                  </Button>
               </form>
               <button onClick={() => router.push('/profile')} className="text-xs text-slate-500 hover:text-slate-300 mt-6 block w-full">Kembali ke Profil</button>
            </div>
         </div>
      );
   }

   // Tampilan Utama Mode Bioskop
   return (
      <div className="min-h-screen bg-slate-950 text-slate-200 flex flex-col font-sans">
         {/* Top Navbar */}
         <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 lg:px-6 shrink-0">
             <div className="flex items-center gap-4 w-full">
                <Button variant="ghost" size="icon" onClick={() => router.push('/profile')} className="text-slate-400 hover:text-white hover:bg-slate-800 shrink-0">
                   <ArrowLeft size={20} />
                </Button>
                <div className="min-w-0">
                   <h1 className="font-bold text-white text-sm lg:text-base truncate">{workshop?.title || "LontaraVibe Masterclass"}</h1>
                   <p className="text-[10px] lg:text-xs text-slate-400">Edutech Online Classroom</p>
                </div>
             </div>
         </header>

         {/* Main Content Layout */}
         <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
            
            {/* Left: Video Player Bioskop */}
            <div className="flex-1 flex flex-col bg-black border-b lg:border-b-0 lg:border-r border-slate-800 overflow-y-auto">
                <div className="w-full aspect-video bg-slate-900 relative group shrink-0">
                   <iframe 
                      src={activeModule.url + "?rel=0&modestbranding=1&autohide=1&showinfo=0"} 
                      className="absolute inset-0 w-full h-full border-0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                      allowFullScreen
                   ></iframe>
                </div>
                
                {/* Meta Deskripsi Video */}
                <div className="p-6 bg-slate-950 hidden lg:block shrink-0">
                   <h2 className="text-3xl font-bold text-white mb-3">{activeModule.title}</h2>
                   <p className="text-slate-400 text-lg leading-relaxed max-w-4xl">Pembelajaran eksklusif ini dipandu langsung oleh perajin lokal ahli nusantara. Ikuti instruksi ini dengan saksama dan siapkan alat sesuai panduan untuk hasil karya terbaik Anda!</p>
                </div>
            </div>

            {/* Right: Modules Sidebar (Playlist) */}
            <div className="w-full lg:w-96 xl:w-[450px] bg-slate-900 flex flex-col h-[50vh] lg:h-auto shrink-0 border-l border-slate-800">
                <div className="p-5 border-b border-slate-800 shrink-0 bg-slate-900/90 backdrop-blur-sm z-10 shadow-sm">
                   <h3 className="font-bold text-white text-lg">Daftar Modul Belajar</h3>
                   <p className="text-sm text-slate-400 mt-1">{MOCK_MODULES.length} Video • Tersertifikasi Pengrajin</p>
                </div>
                
                <div className="flex-1 overflow-y-auto">
                   <div className="flex flex-col">
                      {MOCK_MODULES.map((mod) => (
                         <button 
                            key={mod.id} 
                            onClick={() => setActiveModule(mod)}
                            className={`flex items-start gap-4 p-5 text-left border-b border-slate-800/50 transition-all duration-300 ${activeModule.id === mod.id ? 'bg-slate-800 border-l-4 border-l-teal-500' : 'hover:bg-slate-800/50 border-l-4 border-l-transparent'}`}
                         >
                            <div className="mt-1 shrink-0">
                               {activeModule.id === mod.id ? (
                                  <Video size={20} className="text-teal-400 animate-pulse" />
                               ) : (
                                  <PlayCircle size={20} className="text-slate-500" />
                               )}
                            </div>
                            <div>
                               <p className={`font-semibold text-sm lg:text-base leading-snug mb-1 ${activeModule.id === mod.id ? 'text-white' : 'text-slate-300'}`}>{mod.title}</p>
                               <span className="text-xs text-slate-500 flex items-center gap-1 font-medium"><PlayCircle size={12}/> {mod.duration}</span>
                            </div>
                         </button>
                      ))}
                   </div>
                </div>
            </div>

            {/* Mobile Title View */}
            <div className="p-5 bg-slate-950 block lg:hidden shrink-0 pb-10">
               <h2 className="text-xl font-bold text-white mb-2">{activeModule.title}</h2>
               <p className="text-sm text-slate-400 leading-relaxed">Pembelajaran eksklusif ini dipandu langsung oleh perajin lokal ahli nusantara.</p>
            </div>
         </div>
      </div>
   );
}
