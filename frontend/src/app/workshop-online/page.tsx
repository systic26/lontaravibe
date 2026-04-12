import { createClient } from "@/lib/supabase-server";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Star, Clock, Video } from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/ui/BackButton";

export default async function WorkshopOnlinePage() {
  const supabase = await createClient();
  const { data: workshops } = await supabase.from('workshops').select('*');
  const displayData = workshops && workshops.length > 0 ? workshops : [];

  return (
    <div className="container mx-auto px-4 md:px-8 py-12">
      <BackButton fallbackPath="/" />
      <div className="mb-10 mt-6 border-b pb-6">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-3 flex items-center gap-3">
          <Video className="text-teal-600" size={36}/> Workshop Online LontaraVibe
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl">
          Ikuti kelas pengrajin ahli via Zoom/Meet dari kenyamanan rumah Anda. Pelajari teknik membuat keramik, bertenun, hingga kriya lainnya secara interaktif.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayData.map((item) => (
          <Card key={item.id} className="overflow-hidden border-0 shadow-lg shadow-teal-50 hover:shadow-xl transition-all hover:-translate-y-1 flex flex-col">
            <div className="h-48 bg-gradient-to-br from-teal-50 to-slate-100 flex items-center justify-center text-6xl shadow-inner relative">
              {item.category === 'Keramik' ? '🏺' : item.category === 'Tekstil' ? '🧵' : '🧺'}
              <div className="absolute top-4 right-4 bg-teal-600 text-white px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
                 LIVE
              </div>
              <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-xs font-semibold flex items-center gap-1 shadow-sm">
                 <Star size={14} className="text-yellow-500 fill-yellow-500" /> {item.rating || '4.8'}
              </div>
            </div>
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start mb-2">
                 <Badge variant="outline" className="text-xs bg-white text-teal-600 border-teal-200">{item.category}</Badge>
                 <span className="font-semibold text-teal-600">Rp {item.price?.toLocaleString('id-ID')}</span>
              </div>
              <CardTitle className="text-xl text-slate-900">{item.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex items-center gap-2 text-sm text-slate-600 mb-2">
                <MapPin size={16} className="text-slate-400" />
                Daring (Zoom / Google Meet)
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-600">
                <Clock size={16} className="text-slate-400" />
                {item.duration}
              </div>
            </CardContent>
            <CardFooter className="pt-0">
               <Link href={`/workshop/${item.id}`} className="w-full">
                 <Button className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                   Daftar Kelas Ini
                 </Button>
               </Link>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
