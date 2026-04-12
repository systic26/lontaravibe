import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Palette, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="w-full relative px-4 md:px-8 py-24 md:py-32 flex flex-col items-center text-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-100 via-teal-50 to-white" />
        <Badge variant="outline" className="mb-4 border-purple-200 text-purple-700 bg-purple-50">Introducing LontaraVibe</Badge>
        <p className="text-teal-600 font-semibold tracking-wide uppercase mb-6 text-sm md:text-base">Transformasi Kreativitas Lokal</p>
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-tight mb-6 text-slate-900">
          Lestarikan Budaya,
          <br className="hidden md:block"/> Bangun Kreativitas Anda
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mb-10">
          Platform edutech dan pariwisata yang menghubungkan Anda dengan perajin lokal. Ikuti workshop, beli DIY Kit, dan dukung UMKM Nusantara.
        </p>
        <div className="flex gap-4 flex-col sm:flex-row">
          <Link href="/explore">
            <Button size="lg" className="w-full sm:w-auto bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-500/30">
              Explore Workshop
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="w-full sm:w-auto bg-white border-yellow-400 text-yellow-700 hover:bg-yellow-50">
            Pesan DIY Kit
          </Button>
        </div>
      </section>

      {/* Feature Section */}
      <section className="w-full bg-white py-20 px-4 md:px-8">
        <div className="container mx-auto">
           <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengapa Memilih LontaraVibe?</h2>
             <p className="text-slate-500 max-w-xl mx-auto">Ekosistem lengkap untuk belajar, berkreasi, dan mengembangkan bisnis kerajinan lokal Anda.</p>
           </div>
           
           <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
             <Card className="border-0 shadow-xl shadow-slate-100/50 hover:-translate-y-1 transition-transform">
               <CardContent className="pt-6 text-center flex flex-col items-center">
                 <div className="w-12 h-12 bg-yellow-100 text-yellow-600 rounded-2xl flex items-center justify-center mb-4">
                   <Palette size={24} />
                 </div>
                 <h3 className="font-semibold text-lg mb-2 text-slate-900">Kelas Otentik</h3>
                 <p className="text-slate-500 text-sm">Belajar langsung dari perajin lokal ahli di daerah Anda melalui lokakarya eksklusif.</p>
               </CardContent>
             </Card>
             <Card className="border-0 shadow-xl shadow-slate-100/50 hover:-translate-y-1 transition-transform">
               <CardContent className="pt-6 text-center flex flex-col items-center">
                 <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mb-4">
                   <Users size={24} />
                 </div>
                 <h3 className="font-semibold text-lg mb-2 text-slate-900">Dukungan Komunitas</h3>
                 <p className="text-slate-500 text-sm">Bergabung dengan sesama pembuat karya dan dukung keberlangsungan UMKM.</p>
               </CardContent>
             </Card>
             <Card className="border-0 shadow-xl shadow-slate-100/50 hover:-translate-y-1 transition-transform">
               <CardContent className="pt-6 text-center flex flex-col items-center">
                 <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-2xl flex items-center justify-center mb-4">
                   <TrendingUp size={24} />
                 </div>
                 <h3 className="font-semibold text-lg mb-2 text-slate-900">Data & Analitik UMKM</h3>
                 <p className="text-slate-500 text-sm">Insight berbasis Data Science untuk melihat tren penjualan dan memprediksi demand produk.</p>
               </CardContent>
             </Card>
           </div>
        </div>
      </section>
    </div>
  );
}
