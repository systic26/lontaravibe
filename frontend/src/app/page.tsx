import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, TrendingUp, Users } from "lucide-react";
import Link from "next/link";
import { TypewriterText } from "@/components/ui/TypewriterText";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative px-4 md:px-8 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
        {/* Background Gradient */}
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100 via-teal-50 to-white" />
        
        {/* Natural & Cute Floating Objects */}
        <div className="absolute top-16 left-[5%] md:left-[15%] text-5xl animate-bounce opacity-80" style={{ animationDuration: '4s' }}>🏺</div>
        <div className="absolute top-28 right-[5%] md:right-[15%] text-4xl animate-bounce opacity-80" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>🧵</div>
        <div className="absolute bottom-12 right-[10%] md:right-[25%] text-4xl animate-bounce opacity-80 z-0" style={{ animationDuration: '5s', animationDelay: '1.2s' }}>🎨</div>
        <div className="absolute top-1/2 left-[10%] md:left-[22%] text-3xl animate-pulse opacity-60" style={{ animationDuration: '2s' }}>✨</div>
        <div className="absolute bottom-24 left-[5%] md:left-[20%] text-4xl animate-bounce opacity-70" style={{ animationDuration: '4.2s', animationDelay: '0.8s' }}>🧺</div>

        <Badge variant="outline" className="mb-4 border-purple-200 text-purple-700 bg-purple-50 px-4 py-1.5 shadow-sm animate-in fade-in slide-in-from-top-6 duration-700 ease-out z-10">
           ✨ Introducing LontaraVibe
        </Badge>
        
        <p className="text-teal-600 font-bold tracking-widest uppercase mb-6 text-sm md:text-base animate-in inline-block fade-in zoom-in-95 duration-700 delay-150 z-10">
           Transformasi Kreativitas Lokal
        </p>
        
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6 text-slate-900 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-300 z-10">
          Lestarikan Budaya,
          <br className="hidden md:block"/> Bangun Kreativitas Anda
        </h1>
        
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10 h-24 md:h-20 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-500 z-10 mx-auto px-4">
          Platform edutech dan pariwisata yang <TypewriterText text="menghubungkan Anda dengan perajin lokal." startDelay={1500} />
          <br className="hidden md:block"/> Ikuti workshop, beli DIY Kit, dan dukung UMKM Nusantara.
        </p>
        
        <div className="flex gap-4 flex-col sm:flex-row animate-in zoom-in-95 fade-in duration-700 delay-700 z-10">
          <Link href="/explore">
            <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white shadow-xl shadow-teal-500/30 transition-all hover:scale-105 active:scale-95 duration-300 rounded-full px-8">
              Explore Workshop
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white border-yellow-400 text-yellow-700 hover:bg-yellow-50 shadow-lg hover:shadow-xl transition-all hover:scale-105 hover:-rotate-2 active:scale-95 duration-300 rounded-full px-8">
            Pesan DIY Kit 📦
          </Button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full bg-white py-20 px-4 md:px-8 border-t border-slate-100">
        <div className="container mx-auto">
           <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Memilih LontaraVibe?</h2>
             <p className="text-slate-500 max-w-xl mx-auto">Ekosistem lengkap untuk belajar, berkreasi, dan mengembangkan bisnis kerajinan lokal Anda.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             <Card className="border-0 shadow-xl shadow-slate-100/80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
               <CardContent className="pt-8 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                   <Palette size={32} />
                 </div>
                 <h3 className="font-bold text-xl mb-3 text-slate-900">Kelas Otentik</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Belajar langsung dari perajin lokal ahli di daerah Anda melalui lokakarya eksklusif tatap muka.</p>
               </CardContent>
             </Card>
             <Card className="border-0 shadow-xl shadow-slate-100/80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
               <CardContent className="pt-8 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-300">
                   <Users size={32} />
                 </div>
                 <h3 className="font-bold text-xl mb-3 text-slate-900">Dukungan Komunitas</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Bergabung dengan sesama pembuat karya dan dukung keberlangsungan ekonomi sirkular UMKM.</p>
               </CardContent>
             </Card>
             <Card className="border-0 shadow-xl shadow-slate-100/80 hover:-translate-y-2 hover:shadow-2xl transition-all duration-300 group cursor-pointer">
               <CardContent className="pt-8 text-center flex flex-col items-center">
                 <div className="w-16 h-16 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
                   <TrendingUp size={32} />
                 </div>
                 <h3 className="font-bold text-xl mb-3 text-slate-900">Data & Analitik UMKM</h3>
                 <p className="text-slate-500 text-sm leading-relaxed">Insight berbasis AI Data Science untuk melihat tren penjualan dan memprediksi demand kerajinan.</p>
               </CardContent>
             </Card>
           </div>
        </div>
      </section>
    </div>
  );
}
