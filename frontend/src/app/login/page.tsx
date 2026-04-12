"use client"
import { useActionState } from 'react'
import { login } from '@/app/auth/actions'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { BackButton } from "@/components/ui/BackButton"

export default function LoginPage() {
  const [state, formAction, isPending] = useActionState(login, null)

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12">
      <div className="w-full max-w-md mb-4">
        <BackButton fallbackPath="/" />
      </div>
      <Card className="w-full max-w-md shadow-xl border-slate-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">Masuk ke LontaraVibe</CardTitle>
          <CardDescription>Akses dashboard UMKM dan tiket workshop Anda</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction} className="space-y-4">
            {state?.error && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                {state.error}
              </div>
            )}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Email</label>
              <Input id="email" name="email" type="email" placeholder="nama@email.com" required disabled={isPending} />
            </div>
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">Password</label>
              <Input id="password" name="password" type="password" required disabled={isPending} />
            </div>
            <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-white" disabled={isPending}>
              {isPending ? 'Logging In...' : 'Log In'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-slate-500">
            Belum punya akun? <Link href="/register" className="text-teal-600 font-medium hover:underline">Daftar sekarang</Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
