"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/BackButton"
import { useState } from "react"
import { supabase } from "@/lib/supabase"

export default function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    
    // Using Supabase to send reset password email
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      setStatus("error");
      setMessage(error.message);
    } else {
      setStatus("success");
      setMessage("Link reset password telah dikirim ke email Anda! Silakan periksa kotak masuk Anda.");
    }
  };

  return (
    <div className="container flex flex-col items-center justify-center min-h-[70vh] py-12">
      <div className="w-full max-w-md mb-4">
        <BackButton fallbackPath="/" />
      </div>
      <Card className="w-full max-w-md shadow-xl border-slate-100">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-slate-800">Reset Password</CardTitle>
          <CardDescription>Lupa kata sandi? Masukkan email Anda untuk menerima link pembaruan password.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleReset} className="space-y-4">
            {status === "error" && (
              <div className="bg-red-50 text-red-600 p-3 rounded-md text-sm border border-red-200">
                {message}
              </div>
            )}
            {status === "success" && (
              <div className="bg-emerald-50 text-emerald-700 p-4 rounded-md text-sm border border-emerald-200">
                {message}
              </div>
            )}
            
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">Alamat Email Terdaftar</label>
              <Input 
                 id="email" 
                 type="email" 
                 placeholder="nama@email.com" 
                 required 
                 disabled={status === "loading" || status === "success"} 
                 value={email}
                 onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            
            <Button 
               type="submit" 
               className="w-full bg-yellow-500 hover:bg-yellow-600 text-white" 
               disabled={status === "loading" || status === "success"}
            >
              {status === "loading" ? 'Mengirim...' : 'Kirim Link Reset'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
