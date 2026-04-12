import { createClient } from "@/lib/supabase-server";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Package, PlayCircle } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default async function DIYKitsPage() {
  const supabase = await createClient();
  const { data: diyKits } = await supabase.from('diy_kits').select('*');
  const displayKits = diyKits && diyKits.length > 0 ? diyKits : [];

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <BackButton fallbackPath="/" />
      
      <div className="mb-12 mt-6">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center gap-3">
          <Package className="text-purple-600" size={36}/> Katalog DIY Kit Nusantara
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Berkreasi dari rumah. Beli paket bahan kerajinan komplit beserta panduan dasar yang dikirim langsung ke pintu Anda.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20 items-center bg-purple-50 p-6 md:p-10 rounded-3xl border border-purple-100">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">
            Belajar Merakit Sensasi Tanah Liat
          </h2>
          <p className="text-slate-600 mb-6 leading-relaxed">
            Takut salah mencoba alat dan bahan yang ada di dalam DIY Kit Anda? Simak video panduan tutorial dari salah satu perajin lokal ahli dari LontaraVibe mengenai "Dasar-Dasar Mencetak Tanah Liat".
          </p>
          <div className="flex items-center gap-2 text-purple-700 font-semibold bg-white w-fit px-4 py-2 rounded-full shadow-sm">
             <PlayCircle size={20}/> Tonton Hingga Tuntas
          </div>
        </div>
        <div className="relative rounded-2xl overflow-hidden shadow-2xl aspect-video bg-black">
          {/* Embedding a relevant dummy YouTube video placeholder for crafting */}
          <iframe 
             className="w-full h-full"
             src="https://www.youtube.com/embed/5TXZq5-F-K4?si=1fD0TfFm4uR2Wf3b" 
             title="Video Pembuatan Kerajinan Tanah Liat" 
             allowFullScreen
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          ></iframe>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-6">Paket Kit Tersedia</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayKits.map((kit) => (
          <Card key={kit.id} className="overflow-hidden border-0 shadow-lg shadow-purple-100/50 hover:shadow-xl transition-all flex flex-col">
            <div className="h-40 bg-purple-50 flex items-center justify-center text-6xl shadow-inner relative">
              📦
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm text-purple-700">
                 Sisa Stok: {kit.stock}
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                 <Badge variant="outline" className="text-xs bg-white text-purple-600 border-purple-200">Bahan Praktek</Badge>
                 <span className="font-bold text-purple-600">Rp {kit.price?.toLocaleString('id-ID')}</span>
              </div>
              <CardTitle className="text-xl text-slate-900">{kit.name}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <p className="text-sm text-slate-600 line-clamp-3">{kit.description}</p>
            </CardContent>
            <CardFooter className="pt-0">
                <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white cursor-not-allowed shadow-md shadow-purple-500/20" disabled>
                  Pesan Sekarang (Segera Hadir)
                </Button>
            </CardFooter>
          </Card>
        ))}
        {displayKits.length === 0 && (
           <div className="col-span-full py-16 text-center text-slate-500 bg-slate-50 rounded-xl border border-dashed">
             Belum ada DIY Kit. Jalankan Seeding DB terlebih dahulu.
           </div>
        )}
      </div>
    </div>
  );
}
