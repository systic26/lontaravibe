import { createClient } from "@/lib/supabase-server";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Package, Sparkles, TrendingUp, Flame } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";

async function getRecommendations(userId: string) {
  try {
    const res = await fetch(`http://localhost:8000/recommend_workshop/${userId}`, { cache: "no-store" });
    if (!res.ok) return [];
    const data = await res.json();
    return data.recommendations?.slice(0, 5) || [];
  } catch (err) {
    return [];
  }
}

async function getInsights() {
  try {
    const res = await fetch(`http://localhost:8000/predict_demand`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    return null;
  }
}

export default async function ExplorePage() {
  const supabase = await createClient();
  const { data: userData } = await supabase.auth.getUser();
  const userId = userData?.user?.id || "guest";

  // Parallel Fetching
  const [
    { data: workshops, error },
    { data: diyKits },
    recommendations,
    insightsData
  ] = await Promise.all([
    supabase.from('workshops').select('*'),
    supabase.from('diy_kits').select('*'),
    getRecommendations(userId),
    getInsights()
  ]);

  // Fallback in case Supabase is empty or err
  const displayData = workshops && workshops.length > 0 ? workshops : [];
  const displayKits = diyKits && diyKits.length > 0 ? diyKits : [];
  const hasInsights = insightsData && insightsData.success;

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <BackButton fallbackPath="/" />
      
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4 mt-6">
        <div>
           <h1 className="text-3xl font-bold text-slate-900 mb-2">Explore LontaraVibe</h1>
           <p className="text-slate-500">Temukan lokakarya kerajinan lokal dan DIY Kit terbaik untuk Anda.</p>
        </div>
      </div>

      {/* AI Insight Box */}
      {hasInsights && (
        <div className="bg-gradient-to-r from-teal-50 to-emerald-50 border border-teal-100 p-5 rounded-xl shadow-md mb-8 flex items-start gap-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <Sparkles className="text-teal-600 mt-1 flex-shrink-0" size={28} />
          <div>
            <h3 className="font-bold text-teal-800 text-lg mb-1">Insight AI Populer Hari Ini</h3>
            <p className="text-teal-700">
               💡 Workshop berjenis Keramik sedang sangat diminati berturut-turut menjelang akhir pekan. Pemesanan diprediksi meningkat drastis. Segera amankan kursi Anda!
            </p>
          </div>
        </div>
      )}

      {/* Rekomendasi Untuk Kamu */}
      {recommendations.length > 0 && (
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-900 mb-2 flex items-center gap-2">
            <TrendingUp className="text-amber-500" /> Rekomendasi untuk Kamu
          </h2>
          <p className="text-slate-500 text-sm mb-6">Dipilih berdasarkan tren & minat pengguna</p>
          
          <div className="flex gap-4 overflow-x-auto pb-6 snap-x hide-scrollbar">
            {recommendations.map((rec: any, idx: number) => (
              <div key={idx} className="snap-start min-w-[280px] md:min-w-[300px]">
                <Card className="h-full border-amber-100 bg-amber-50/20 shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer flex flex-col overflow-hidden">
                  <div className="h-32 bg-amber-100 flex items-center justify-center text-4xl">
                    {rec.name?.includes('Tenun') ? '🧵' : '🏺'}
                  </div>
                  <CardHeader className="py-4 pb-2">
                    <Badge className="bg-amber-500 hover:bg-amber-600 text-white w-fit mb-2 text-[10px] uppercase font-bold tracking-wider hover:scale-105 transition-transform">
                       🌟 Direkomendasikan
                    </Badge>
                    <CardTitle className="text-lg text-slate-800 line-clamp-1">{rec.name}</CardTitle>
                  </CardHeader>
                  <CardContent className="mt-auto pt-2 pb-4">
                     <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                        <Star size={16} className="text-amber-500 fill-amber-500" /> Model Rating AI: {(rec.score * 5).toFixed(1)} / 5.0
                     </div>
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
          <div className="w-full border-b border-slate-100 mt-2 mb-10"></div>
        </div>
      )}

      {error && (
         <div className="bg-red-50 text-red-600 p-4 rounded-md mb-8">
           Gagal mengambil daftar Workshop dari Supabase: {error.message}.
         </div>
      )}

      {displayData.length === 0 && !error ? (
         <div className="text-center py-20 text-slate-500 bg-slate-50 border rounded-lg">
           Belum ada katalog workshop saat ini! Silakan hubungi admin atau kembalilah secara berkala.
         </div>
      ) : (
         <>
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Katalog Lengkap</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayData.map((item) => (
              <Card key={item.id} className="overflow-hidden border-0 shadow-md shadow-slate-100/50 hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col group">
                <div className="h-48 bg-slate-100 flex items-center justify-center text-6xl shadow-inner relative overflow-hidden">
                  {item.category === 'Keramik' ? '🏺' : item.category === 'Tekstil' ? '🧵' : '🧺'}
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
                     <Star size={14} className="text-yellow-500 fill-yellow-500" /> {item.rating || '4.5'}
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                     <div className="flex flex-wrap gap-2">
                       <Badge variant="outline" className="text-xs bg-white text-teal-600 border-teal-200">{item.category}</Badge>
                       {item.category === 'Keramik' && (
                         <Badge className="text-[10px] bg-red-100 text-red-600 border-0 flex items-center gap-1 font-bold shadow-sm"><Flame size={12}/> Trending</Badge>
                       )}
                       {parseFloat(item.rating || '0') > 4.7 && (
                         <Badge className="text-[10px] bg-yellow-100 text-yellow-700 border-0 flex items-center gap-1 font-bold shadow-sm"><Star size={12}/> Top Rated</Badge>
                       )}
                     </div>
                     <span className="font-semibold text-teal-600 whitespace-nowrap">Rp {item.price?.toLocaleString('id-ID')}</span>
                  </div>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-teal-600 transition-colors">{item.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                    <MapPin size={16} className="text-slate-400" />
                    {item.location}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-slate-600">
                    <Clock size={16} className="text-slate-400" />
                    {item.duration}
                  </div>
                </CardContent>
                <CardFooter className="pt-0">
                   <Link href={`/workshop/${item.id}`} className="w-full">
                     <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-transform active:scale-95">
                       Lihat Detail & Pesan
                     </Button>
                   </Link>
                </CardFooter>
              </Card>
            ))}
          </div>
         </>
      )}

      {displayKits.length > 0 && (
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Package className="text-purple-600" /> Beli DIY Kit Langsung
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayKits.map((kit) => (
              <Card key={kit.id} className="overflow-hidden border-0 shadow-md shadow-purple-100/50 hover:shadow-xl transition-all duration-300 hover:scale-105 flex flex-col group">
                <div className="h-40 bg-purple-50 flex items-center justify-center text-6xl shadow-inner relative">
                  📦
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm text-purple-700">
                     Sisa: {kit.stock}
                  </div>
                </div>
                <CardHeader className="pb-3">
                  <div className="flex justify-between items-start mb-2">
                     <Badge variant="outline" className="text-xs bg-white text-purple-600 border-purple-200">DIY Kit</Badge>
                     <span className="font-semibold text-purple-600 whitespace-nowrap">Rp {kit.price?.toLocaleString('id-ID')}</span>
                  </div>
                  <CardTitle className="text-xl text-slate-900 group-hover:text-purple-600 transition-colors">{kit.name}</CardTitle>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-sm text-slate-600">{kit.description}</p>
                </CardContent>
                <CardFooter className="pt-0">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-md transition-transform active:scale-95 cursor-not-allowed" disabled>
                      Pesan Sekarang
                    </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
