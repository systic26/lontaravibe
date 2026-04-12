import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Camera } from "lucide-react";
import { BackButton } from "@/components/ui/BackButton";

export default function ArtikelBudayaPage() {
  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <BackButton fallbackPath="/" />
      
      <div className="mb-12 mt-6 max-w-3xl">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-4 flex items-center gap-3">
          <BookOpen className="text-yellow-600" size={36}/> Artikel & Sejarah Budaya
        </h1>
        <p className="text-lg text-slate-600 leading-relaxed">
          Eksplorasi jejak literatur karsa dan kriya kuno. Pelajari lebih dalam kisah di balik tiap simpul tenun, ukiran kayu, dan gerabah bersejarah di Nusantara.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Sidebar Articles */}
         <div className="lg:col-span-1 space-y-6">
            <h3 className="font-bold text-xl text-slate-900 mb-2 border-b pb-2">Bacaan Populer</h3>
            
            <Card className="hover:shadow-md transition-shadow border-slate-100 cursor-pointer">
              <CardContent className="p-4 flex gap-4 items-center">
                 <div className="w-20 h-20 bg-slate-200 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center text-3xl">🧵</div>
                 <div>
                    <Badge variant="outline" className="text-[10px] mb-1">Sejarah</Badge>
                    <h4 className="font-semibold text-sm line-clamp-2 text-slate-800">Filosofi Dibalik Corak Tenun Sutera Sengkang Sulawesi</h4>
                 </div>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow border-slate-100 cursor-pointer">
              <CardContent className="p-4 flex gap-4 items-center">
                 <div className="w-20 h-20 bg-slate-200 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center text-3xl">🏺</div>
                 <div>
                    <Badge variant="outline" className="text-[10px] mb-1">Tradisi Lokal</Badge>
                    <h4 className="font-semibold text-sm line-clamp-2 text-slate-800">Tanah Liat Takalar: Mewariskan Periuk dari Generasi ke Generasi</h4>
                 </div>
              </CardContent>
            </Card>
            
            <Card className="hover:shadow-md transition-shadow border-slate-100 cursor-pointer">
              <CardContent className="p-4 flex gap-4 items-center">
                 <div className="w-20 h-20 bg-slate-200 rounded-md overflow-hidden flex-shrink-0 flex items-center justify-center text-3xl">🥥</div>
                 <div>
                    <Badge variant="outline" className="text-[10px] mb-1">Eksplorasi</Badge>
                    <h4 className="font-semibold text-sm line-clamp-2 text-slate-800">Bahan Alami yang Sering Digunakan dalam Kriya Kuno</h4>
                 </div>
              </CardContent>
            </Card>
         </div>

         {/* Main Featured Documentary */}
         <div className="lg:col-span-2">
           <div className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-100 border border-slate-100">
             <div className="flex items-center gap-2 mb-4 text-emerald-700 font-semibold text-sm bg-emerald-50 w-fit px-3 py-1 rounded-full">
               <Camera size={16}/> LontaraVibe Documentary Original
             </div>
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Mengenal Mahakarya Kerajinan Keramik Khas Nusantara</h2>
             <p className="text-slate-600 mb-6">
                Liputan khusus proses tradisional pembuatan tembikar dari tanah merah yang tetap bertahan di era modern. Saksikan dokumentasi memukau dari LontaraVibe.
             </p>
             <div className="relative rounded-xl overflow-hidden shadow-md aspect-video bg-slate-900 w-full">
               <iframe 
                  className="w-full h-full"
                  src="https://www.youtube.com/embed/PZ53r5h6hSg?si=hC7q-w6P30E8x0Kz" 
                  title="Dokumenter Sejarah Keramik Nusantara" 
                  allowFullScreen
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
               ></iframe>
             </div>
             
             <div className="mt-8 prose text-slate-700">
                <p>
                  Tanah liat telah menjadi bagian tak terpisahkan dari peradaban manusia sejak ribuan tahun lalu. Di Nusantara, teknik pembuatan keramik dan tembikar diwariskan secara turun-temurun, membawa nilai estetika serta filosofi yang medalam pada setiap lekukannya.
                </p>
                <p>
                  Melalui video dokumenter di atas, LontaraVibe mengajak Anda mengapresiasi mahakarya ini. Mari dukung perajin lokal dengan terus belajar tentang teknik tradisional dan menjaga kelestariannya.
                </p>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
