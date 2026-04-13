"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User, Phone, MapPin, Camera, Save, ArrowLeft } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function ProfilePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [user, setUser] = useState<any>(null);
  
  // Form state
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [message, setMessage] = useState({ type: "", text: "" });

  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function loadProfile() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/login");
        return;
      }
      setUser(user);
      setFullName(user.user_metadata?.full_name || "");
      setPhone(user.user_metadata?.phone || "");
      setAddress(user.user_metadata?.address || "");
      
      const { data: profileData } = await supabase.from("profiles").select("avatar_url").eq("id", user.id).single();
      if (profileData?.avatar_url) {
         setAvatarUrl(profileData.avatar_url);
      } else {
         setAvatarUrl(user.user_metadata?.avatar_url || "");
      }
      setLoading(false);
    }
    loadProfile();
  }, [router]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
         setMessage({ type: "error", text: "Oops! Ukuran foto maksimal 5MB ya." });
         return;
      }
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const MAX_WIDTH = 300;
          const MAX_HEIGHT = 300;
          let width = img.width;
          let height = img.height;

          if (width > height) {
            if (width > MAX_WIDTH) {
              height *= MAX_WIDTH / width;
              width = MAX_WIDTH;
            }
          } else if (height > MAX_HEIGHT) {
             width *= MAX_HEIGHT / height;
             height = MAX_HEIGHT;
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx?.drawImage(img, 0, 0, width, height);

          // Compress to JPEG with 80% quality
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.8);
          setAvatarUrl(compressedDataUrl);
          setMessage({ type: "success", text: "Foto telah dicompress cerdas! Siap disimpan." });
        };
        img.src = event.target?.result as string;
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setMessage({ type: "", text: "" });

    try {
      // 1. Update auth.users metadata (Hapus avatar_url dari sini agar Cookie Session tidak membengkak menyebabkan HTTP 431)
      const { error: authError } = await supabase.auth.updateUser({
        data: {
          full_name: fullName,
          phone: phone,
          address: address,
          avatar_url: null // PENAWAR RACUN: Memusnahkan riwayat base64 dari session agar Cookie tidak pernah membengkak lagi
        }
      });
      if (authError) throw authError;

      // 2. Sync to profiles table (avatar_url murni disimpan di Database Postgres)
      const { error: profileError } = await supabase.from('profiles').update({
        full_name: fullName,
        phone: phone,
        address: address,
        avatar_url: avatarUrl
      }).eq('id', user.id);
      
      if (profileError && profileError.code !== '23505') throw profileError;

      setMessage({ type: "success", text: "Profil berhasil diperbarui dengan gaya! ✨" });
      
      setTimeout(() => router.refresh(), 500);

    } catch (error: any) {
      if (error.code === '23505') {
         setMessage({ type: "error", text: "Nomor HP sudah terdaftar di akun lain." });
      } else {
         setMessage({ type: "error", text: error.message || "Gagal menyimpan profil." });
      }
    } finally {
      setSaving(false);
    }
  };

  const getInitials = () => {
    if (fullName) return fullName.substring(0, 2).toUpperCase();
    if (user?.email) return user.email.substring(0, 2).toUpperCase();
    return "U";
  };

  if (loading) return (
     <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
     </div>
  );

  return (
    <div className="container max-w-3xl mx-auto px-4 py-12 relative animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
      
      <button onClick={() => router.back()} className="group mb-6 flex items-center gap-2 text-slate-500 hover:text-purple-600 font-medium transition-all hover:-translate-x-2">
        <ArrowLeft size={20} className="group-hover:scale-125 transition-transform duration-300" /> 
        Kembali Memutar
      </button>

      <Card className="border-0 shadow-2xl shadow-purple-900/5 rounded-3xl overflow-hidden bg-white/80 backdrop-blur-xl">
        {/* Decorative Header */}
        <div className="h-32 bg-gradient-to-r from-purple-400 via-pink-300 to-teal-400 relative">
           <div className="absolute inset-0 bg-white/20 backdrop-blur-[2px]"></div>
        </div>

        <CardContent className="px-6 sm:px-12 pb-12 relative -mt-16">
          <form onSubmit={handleSave} className="space-y-8">
            
            {/* Squishy Avatar Upload from Device */}
            <div className="flex flex-col items-center">
               <input 
                  type="file" 
                  ref={fileInputRef} 
                  onChange={handleFileChange} 
                  accept="image/*" 
                  className="hidden" 
               />
               <div 
                 onClick={() => fileInputRef.current?.click()}
                 className="relative group cursor-pointer active:scale-90 transition-transform duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)]"
               >
                 <Avatar className="w-32 h-32 border-4 border-white shadow-xl ring-4 ring-purple-50 group-hover:ring-purple-200 transition-all duration-300">
                   <AvatarImage src={avatarUrl} className="object-cover" />
                   <AvatarFallback className="bg-gradient-to-br from-pink-100 to-purple-200 text-purple-700 text-3xl font-bold">
                     {getInitials()}
                   </AvatarFallback>
                 </Avatar>
                 <div className="absolute bottom-0 right-0 w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white group-hover:scale-110 transition-transform">
                    <Camera size={18} />
                 </div>
               </div>
               <p className="mt-4 text-sm text-slate-500 font-medium text-center bg-slate-50 px-4 py-2 rounded-full cursor-pointer hover:bg-slate-100 transition-colors" onClick={() => fileInputRef.current?.click()}>
                 Pilih Foto Profil dari Perangkat 📸
               </p>
            </div>

            {/* Status Message */}
            {message.text && (
              <div className={`p-4 rounded-xl text-sm font-medium border animate-in zoom-in-95 duration-300 ${message.type === 'success' ? 'bg-teal-50 border-teal-200 text-teal-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                 {message.text}
              </div>
            )}

            {/* Input Fields Focus-Squish */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="space-y-2 group/input">
                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-purple-400 group-focus-within/input:text-purple-600 transition-colors" /> Nama Lengkap
                 </label>
                 <Input 
                   required
                   value={fullName}
                   onChange={e => setFullName(e.target.value)}
                   className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:scale-[1.02] transition-transform duration-300 shadow-sm"
                 />
               </div>
               <div className="space-y-2 group/input">
                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <User size={16} className="text-slate-400" /> Alamat Email (Permanen)
                 </label>
                 <Input 
                   disabled
                   value={user?.email || ""}
                   className="rounded-xl bg-slate-100 text-slate-500 border-transparent shadow-inner opacity-70 cursor-not-allowed"
                 />
               </div>
               <div className="space-y-2 group/input">
                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <Phone size={16} className="text-teal-400 group-focus-within/input:text-teal-600 transition-colors" /> Nomor Handphone
                 </label>
                 <Input 
                   type="tel"
                   value={phone}
                   onChange={e => setPhone(e.target.value)}
                   className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:scale-[1.02] transition-transform duration-300 shadow-sm"
                 />
               </div>
               <div className="space-y-2 group/input">
                 <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                    <MapPin size={16} className="text-pink-400 group-focus-within/input:text-pink-600 transition-colors" /> Alamat Pengiriman DIY Kit
                 </label>
                 <Input 
                   value={address}
                   onChange={e => setAddress(e.target.value)}
                   className="rounded-xl border-slate-200 bg-slate-50 focus:bg-white focus:scale-[1.02] transition-transform duration-300 shadow-sm"
                 />
               </div>
            </div>

            <Button 
               type="submit" 
               disabled={saving}
               className="w-full sm:w-auto px-8 h-12 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-lg shadow-lg shadow-purple-500/30 transition-all duration-300 active:scale-95 flex items-center justify-center gap-2 mx-auto mt-8"
            >
               {saving ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
               ) : (
                  <><Save size={20} /> Simpan Mahakarya</>
               )}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Decorative floating shapes in background */}
      <div className="absolute top-20 left-10 w-24 h-24 bg-teal-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob pointer-events-none"></div>
      <div className="absolute top-40 right-10 w-32 h-32 bg-pink-300 rounded-full mix-blend-multiply filter blur-2xl opacity-30 animate-blob animation-delay-2000 pointer-events-none"></div>
    </div>
  );
}
