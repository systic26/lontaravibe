"use client";

import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { Search, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { logout } from "@/app/auth/actions";
import { useState } from "react";

interface NavbarProps {
  user: any;
  isAdmin: boolean;
  profileAvatarUrl?: string;
}

// Helper to check active state
function isActive(path: string, currentPath: string, exact = false) {
  if (exact) return path === currentPath;
  return currentPath.startsWith(path);
}

export function Navbar({ user, isAdmin, profileAvatarUrl }: NavbarProps) {
  const pathname = usePathname() || "";
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/explore?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  const getInitials = (name: string, email: string) => {
    if (name) {
      const parts = name.split(" ");
      if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
      return name.substring(0, 2).toUpperCase();
    }
    if (email) return email.substring(0, 2).toUpperCase();
    return "U";
  };

  const activeExplore = isActive('/explore', pathname) || 
                        isActive('/workshop', pathname) || 
                        isActive('/diy-kits', pathname) || 
                        isActive('/artikel', pathname);

  return (
    <>
      <nav className="hidden lg:flex gap-8 items-center flex-1 ml-10">
        <Link href="/" className={`text-sm font-medium transition-all hover:text-teal-600 ${isActive('/', pathname, true) ? 'text-teal-600 font-bold border-b-[3px] border-teal-600 rounded-sm pb-1' : 'text-slate-600'}`}>Beranda</Link>
        
        <div className="relative group py-2">
          <Link href="/explore" className={`text-sm font-medium transition-all hover:text-purple-600 ${activeExplore ? 'text-purple-600 font-bold border-b-[3px] border-purple-600 rounded-sm pb-1' : 'text-slate-600'}`}>Explore ▸</Link>
          <div className="absolute top-full -left-4 w-48 bg-white/95 backdrop-blur-sm rounded-xl shadow-xl border border-slate-100 opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-50 flex flex-col overflow-hidden origin-top scale-95 group-hover:scale-100">
            <Link href="/workshop-online" className="px-4 py-3 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 transition-colors font-medium">Workshop Online</Link>
            <Link href="/diy-kits" className="px-4 py-3 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 border-t border-slate-50 transition-colors font-medium">Katalog DIY Kit</Link>
            <Link href="/artikel-budaya" className="px-4 py-3 text-sm text-slate-700 hover:bg-purple-50 hover:text-purple-700 border-t border-slate-50 transition-colors font-medium">Artikel Budaya</Link>
          </div>
        </div>
        
        <Link href="/contact" className={`text-sm font-medium transition-all hover:text-purple-600 ${isActive('/contact', pathname) ? 'text-purple-600 font-bold border-b-[3px] border-purple-600 rounded-sm pb-1' : 'text-slate-600'}`}>Kontak</Link>
        
        {isAdmin && (
          <Link href="/dashboard/admin" className={`text-sm font-medium transition-all hover:text-teal-600 ${isActive('/dashboard/admin', pathname) ? 'text-teal-600 font-bold border-b-[3px] border-teal-600 rounded-sm pb-1' : 'text-slate-600'}`}>Analytics</Link>
        )}
      </nav>

      {/* Right Section: Search & Auth */}
      <div className="hidden md:flex gap-2 items-center ml-auto">
        {/* Elastic Search Bar */}
        <form onSubmit={handleSearch} className="relative group/search ml-2 mr-4 hidden lg:block">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400 group-focus-within/search:text-purple-500 transition-colors duration-300">
               <Search size={16} />
            </div>
            <input 
               type="text" 
               placeholder="Cari kelas..." 
               value={searchQuery}
               onChange={(e) => setSearchQuery(e.target.value)}
               className="pl-9 pr-4 py-2 bg-slate-100 border-2 border-transparent focus:bg-white focus:border-purple-300 focus:ring-4 focus:ring-purple-50 outline-none rounded-full text-sm w-[140px] focus:w-[260px] transition-all duration-500 ease-out shadow-sm placeholder:text-slate-400"
            />
        </form>

        {user ? (
          <div className="relative group py-2">
            <button className="flex items-center gap-2 transition-transform hover:scale-105 active:scale-95 cursor-pointer focus:outline-none">
              <Avatar className="h-10 w-10 border-2 border-white shadow-md ring-2 ring-transparent group-hover:ring-purple-200 transition-all duration-300">
                 <AvatarImage src={profileAvatarUrl || user.user_metadata?.avatar_url || ""} className="object-cover" />
                 <AvatarFallback className="bg-gradient-to-br from-purple-100 to-teal-100 text-purple-700 font-bold text-xs">
                    {getInitials(user.user_metadata?.full_name, user.email)}
                 </AvatarFallback>
              </Avatar>
            </button>
            
            {/* Dropdown Profile */}
            <div className="absolute top-full right-0 w-64 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50 flex flex-col p-2 cursor-default origin-top-right scale-95 group-hover:scale-100">
                <div className="px-4 py-3 border-b border-slate-50 mb-2 bg-slate-50/50 rounded-t-xl">
                   <p className="font-bold text-slate-800 break-words text-sm truncate">{user.user_metadata?.full_name || 'Pengguna LontaraVibe'}</p>
                   <p className="text-xs text-slate-500 break-words truncate">{user.email}</p>
                </div>
                
                <Link href="/profile" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 font-medium hover:text-purple-700 hover:bg-purple-50 rounded-lg transition-colors w-full text-left">
                   <Settings size={16} className="text-slate-400" /> Profil & Pengaturan
                </Link>
                {isAdmin && (
                  <Link href="/dashboard/admin" className="flex items-center gap-3 px-3 py-2 text-sm text-slate-700 font-medium hover:text-teal-700 hover:bg-teal-50 rounded-lg transition-colors w-full text-left">
                     <LayoutDashboard size={16} className="text-slate-400" /> Dashboard Admin
                  </Link>
                )}
                
                <hr className="my-2 border-slate-100 mx-2" />
                
                <form action={logout} className="px-2 pb-1">
                  <Button variant="ghost" size="sm" type="submit" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 justify-start h-9 font-medium rounded-lg">
                    <LogOut size={16} className="mr-3 text-red-400"/> Keluar
                  </Button>
                </form>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link href="/login">
              <Button variant="ghost" size="sm" className="text-slate-600 hover:text-teal-700 hover:bg-teal-50 font-semibold h-9 px-4 rounded-full">Masuk</Button>
            </Link>
            <Link href="/register">
              <Button size="sm" className="bg-yellow-500 hover:bg-yellow-600 text-white rounded-full px-6 h-9 shadow-md hover:shadow-lg transition-all hover:-translate-y-0.5 font-semibold text-sm">Daftar</Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
