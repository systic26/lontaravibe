import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase-server";
import { logout } from "@/app/auth/actions";
import { LogOut, User } from "lucide-react";

import { MobileNav } from "@/components/ui/MobileNav";
import { Navbar } from "@/components/layout/Navbar";

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
  let userProfile = null;
  if (user) {
    const { data: profile } = await supabase.from('profiles').select('role, avatar_url').eq('id', user.id).single();
    if (profile) {
       userProfile = profile;
       if (profile.role === 'admin') isAdmin = true;
    }
  }

  return (
    <html lang="id">
      <body className={`${inter.className} min-h-screen flex flex-col bg-slate-50 text-slate-900`}>
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
          <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-bold bg-gradient-to-r from-yellow-500 via-teal-500 to-purple-600 bg-clip-text text-transparent">LontaraVibe</span>
            </Link>
            
            {/* Navigasi & Auth Desktop (Client Component) */}
            <Navbar user={user} isAdmin={isAdmin} profileAvatarUrl={userProfile?.avatar_url} />

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
