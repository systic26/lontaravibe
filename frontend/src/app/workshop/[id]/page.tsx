import { Metadata } from 'next';
import { createClient } from '@/lib/supabase-server';
import WorkshopClient from './WorkshopClient';

// OPTIMASI SEO: Dynamic Metadata Generator
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
   try {
       const resolvedParams = await params;
       const supabase = await createClient();
       const { data } = await supabase.from('workshops').select('title, description').eq('id', resolvedParams.id).single();
       
       if (!data) return { title: 'Workshop Tidak Ditemukan | LontaraVibe' };
       
       // Pemotongan deskripsi otomatis untuk SEO Description (Maks 160 Karakter)
       const descSnippet = data.description 
            ? (data.description.length > 155 ? data.description.substring(0, 155) + '...' : data.description) 
            : 'Ikuti workshop keramik dan DIY Kit autentik bersama perajin terverifikasi Nusantara.';
       
       return {
          title: `${data.title} - Booking Tiket Workshop | LontaraVibe`,
          description: descSnippet,
          openGraph: {
             title: `${data.title} | LontaraVibe Workshop`,
             description: descSnippet,
             type: 'website'
          }
       };
   } catch {
       return { title: 'Rincian Workshop | LontaraVibe' };
   }
}

// Render Komponen Klien
export default function WorkshopDetailPage() {
   return <WorkshopClient />;
}
