"use client"

import { useState } from "react"
import Link from "next/link"
import { Menu, X, LogOut, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { logout } from "@/app/auth/actions"

interface MobileNavProps {
  user: any;
  isAdmin: boolean;
}

export function MobileNav({ user, isAdmin }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)
  const closeMenu = () => setIsOpen(false)

  return (
    <div className="md:hidden">
      <Button variant="ghost" size="icon" onClick={toggleMenu} aria-label="Toggle menu" className="text-slate-700 hover:bg-slate-100">
        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
      </Button>

      {isOpen && (
        <div className="absolute top-[64px] left-0 w-full h-[100dvh] bg-white/95 backdrop-blur-md shadow-2xl flex flex-col z-50 border-t border-slate-100 overflow-hidden">
          <nav className="flex flex-col p-6 gap-6 overflow-y-auto w-full h-full pb-32">
            <div className="flex flex-col space-y-5 pb-6 border-b border-slate-100">
              <Link href="/" onClick={closeMenu} className="text-xl font-medium hover:text-teal-600 transition-colors flex items-center justify-between">
                 Beranda
              </Link>
              
              <div className="flex flex-col space-y-3">
                 <div className="text-xl font-medium text-slate-800">Explore Katalog</div>
                 <div className="pl-4 border-l-2 border-slate-200 flex flex-col space-y-4 pt-2">
                    <Link href="/workshop-online" onClick={closeMenu} className="text-slate-600 hover:text-teal-600 transition-colors">Workshop Online</Link>
                    <Link href="/diy-kits" onClick={closeMenu} className="text-slate-600 hover:text-teal-600 transition-colors">Katalog DIY Kits</Link>
                    <Link href="/artikel-budaya" onClick={closeMenu} className="text-slate-600 hover:text-teal-600 transition-colors">Artikel Budaya & Inspirasi</Link>
                 </div>
              </div>
              
              <Link href="/contact" onClick={closeMenu} className="text-xl font-medium text-purple-600 hover:text-purple-700 transition-colors">Hubungi Kami</Link>
              
              {isAdmin && (
                <Link href="/dashboard/admin" onClick={closeMenu} className="text-xl font-medium hover:text-teal-600 transition-colors bg-teal-50 p-3 rounded-lg border border-teal-100">Analytics UMKM Dashboard</Link>
              )}
            </div>

            <div className="flex flex-col mt-2 h-full">
              {user ? (
                 <div className="bg-gradient-to-br from-slate-50 to-white shadow-sm p-5 rounded-2xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                       <div className="w-12 h-12 bg-teal-100 text-teal-700 rounded-full flex items-center justify-center border border-teal-200">
                          <User size={24} />
                       </div>
                       <div className="overflow-hidden flex-1">
                          <p className="font-bold text-slate-800 truncate text-lg line-clamp-1">{user.user_metadata?.full_name || 'Pengguna Tetap'}</p>
                          <p className="text-sm text-slate-500 truncate">{user.email}</p>
                       </div>
                    </div>
                    {user.user_metadata?.phone && (
                       <p className="text-sm text-slate-600 mb-2 font-medium">📞 {user.user_metadata.phone}</p>
                    )}
                    {user.user_metadata?.address && (
                       <p className="text-sm text-slate-600 mb-4 font-medium line-clamp-2">📍 {user.user_metadata.address}</p>
                    )}
                    <Link href="/reset-password" onClick={closeMenu} className="text-sm text-yellow-600 hover:text-yellow-700 my-4 inline-block font-semibold w-fit px-3 py-1.5 bg-yellow-50 rounded-md">
                       🔑 Reset / Pemulihan Kata Sandi
                    </Link>
                    <form action={logout} className="mt-2">
                      <Button variant="outline" type="submit" className="w-full text-red-600 hover:bg-red-50 hover:text-red-700 border-red-200 shadow-sm font-semibold h-11" onClick={closeMenu}>
                        <LogOut size={18} className="mr-2"/> Simpan Perubahan & Keluar
                      </Button>
                    </form>
                 </div>
              ) : (
                 <div className="flex flex-col gap-4 p-2">
                   <Link href="/login" onClick={closeMenu} className="w-full">
                     <Button variant="outline" className="w-full border-teal-500 text-teal-700 hover:bg-teal-50 h-12 text-lg rounded-xl font-medium">Masuk Sekarang</Button>
                   </Link>
                   <Link href="/register" onClick={closeMenu} className="w-full">
                     <Button className="w-full bg-yellow-500 text-white hover:bg-yellow-600 shadow-md shadow-yellow-500/20 h-12 text-lg rounded-xl font-medium">Daftar Akun Baru</Button>
                   </Link>
                 </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}
