"use client"
import { useActionState } from 'react'
import { signup } from '@/app/auth/actions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { BackButton } from "@/components/ui/BackButton"

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(signup, null)

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12">
      <div className="w-full max-w-md mb-4">
        <BackButton fallbackPath="/" />
      </div>
      <Card className="w-full max-w-md shadow-xl border-slate-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">Daftar LontaraVibe</CardTitle>
          <CardDescription>Gabung dan mulai booking workshop favorit</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                {state.error}
              </div>
            )}
            {state?.success && (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-md text-sm border border-emerald-200">
                {state.success}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">Nama Lengkap</label>
              <Input id="name" name="name" type="text" placeholder="Masukkan nama lengkap..." required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <label htmlFor="address" className="text-sm font-medium">Alamat</label>
              <Input id="address" name="address" type="text" placeholder="Contoh: Jl. Pettarani No. 12" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <label htmlFor="phone" className="text-sm font-medium">Nomor Handphone</label>
              <Input id="phone" name="phone" type="tel" placeholder="0812xxxxxx" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" name="email" type="email" placeholder="nama@email.com" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input id="password" name="password" type="password" required disabled={isPending} />
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" disabled={isPending}>
              {isPending ? 'Signing Up...' : 'Sign Up'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-slate-500">
            Sudah punya akun? <Link href="/login" className="text-yellow-600 font-medium hover:underline">Masuk</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
