import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase-server";
import { logout } from "@/app/auth/actions";
import { LogOut, User } from "lucide-react";

import { MobileNav } from "@/components/ui/MobileNav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "LontaraVibe - Edutech, Tourism & Analytics",
  description: "Platform menghubungkan perajin lokal dengan pengguna untuk workshop & DIY Kit.",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  let isAdmin = false;
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role').eq('id', user.id).single();
    if (profile?.role === 'admin') isAdmin = true;
  }

  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-teal-500 to-purple-600 bg-clip-text text-transparent">LontaraVibe</span>
            </Link>
            
            {/* Navigasi Desktop */}
            <nav className="hidden md:flex gap-6 items-center">
              <Link href="/" className="text-sm font-medium hover:text-teal-600 transition-colors">Beranda</Link>
              <div className="relative group py-2">
                <Link href="/explore" className="text-sm font-medium hover:text-teal-600 transition-colors">Explore</Link>
                <div className="absolute top-full -left-4 w-48 bg-white rounded-xl shadow-lg border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col overflow-hidden">
                  <Link href="/workshop-online" className="px-4 py-3 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 transition-colors">Workshop Online</Link>
                  <Link href="/diy-kits" className="px-4 py-3 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 border-t border-slate-50 transition-colors">Katalog DIY Kit</Link>
                  <Link href="/artikel-budaya" className="px-4 py-3 text-sm text-slate-700 hover:bg-teal-50 hover:text-teal-700 border-t border-slate-50 transition-colors">Artikel Budaya</Link>
                </div>
              </div>
              <Link href="/contact" className="text-sm font-medium text-purple-600 hover:text-purple-700 transition-colors">Kontak</Link>
              {isAdmin && (
                <Link href="/dashboard/admin" className="text-sm font-medium hover:text-teal-600 transition-colors">Analytics UMKM</Link>
              )}
            </nav>

            {/* Auth & Profil Desktop */}
            <div className="hidden md:flex gap-4 items-center">
               {user ? (
                  <div className="relative group py-2">
                    <button className="text-sm font-medium text-slate-600 hover:text-teal-600 flex items-center gap-2 transition-colors cursor-pointer focus:outline-none">
                      <User size={16}/> {user.user_metadata?.full_name || user.email?.split('@')[0]}
                    </button>
                    <div className="absolute top-full right-0 w-64 bg-white rounded-xl shadow-xl border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 flex flex-col p-4 cursor-default">
                        <p className="font-bold text-slate-800 break-words">{user.user_metadata?.full_name || 'Pengguna LontaraVibe'}</p>
                        <p className="text-xs text-slate-500 mb-1 break-words">{user.email}</p>
                        {user.user_metadata?.phone && (
                           <p className="text-xs text-slate-500 mb-1 break-words">📞 {user.user_metadata.phone}</p>
                        )}
                        {user.user_metadata?.address && (
                           <p className="text-xs text-slate-500 mb-3 break-words">📍 {user.user_metadata.address}</p>
                        )}
                        <hr className="my-2 border-slate-100" />
                        <Link href="/reset-password" className="text-sm text-yellow-600 hover:text-yellow-700 hover:underline py-2 mb-2 flex items-center gap-2">
                           🔑 Reset Password
                        </Link>
                        <form action={logout}>
                          <Button variant="outline" size="sm" type="submit" className="w-full text-red-500 hover:bg-red-50 hover:text-red-700 border-red-100 shadow-sm mt-1">
                            <LogOut size={16} className="mr-2"/> Keluar (Logout)
                          </Button>
                        </form>
                    </div>
                  </div>
               ) : (
                 <>
                   <Link href="/login">
                     <Button variant="outline" className="border-teal-500 text-teal-700 hover:bg-teal-50">Log In</Button>
                   </Link>
                   <Link href="/register">
                     <Button className="bg-yellow-500 hover:bg-yellow-600 text-white">Sign Up</Button>
                   </Link>
                 </>
               )}
            </div>

            {/* Navigasi Mobile Khusus HP / Tablet */}
            <MobileNav user={user} isAdmin={isAdmin} />
          </div>
        </header>
        <main className="flex-1">
          {children}
        </main>
        <footer className="border-t bg-white py-8 mt-12">
           <div className="container mx-auto px-4 text-center text-sm text-slate-500">
             &copy; {new Date().getFullYear()} LontaraVibe. All rights reserved.
           </div>
        </footer>
      </body>
    </html>
  );
}
