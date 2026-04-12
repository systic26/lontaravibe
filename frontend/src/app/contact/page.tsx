import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { BackButton } from "@/components/ui/BackButton"
import { Mail, Phone, MapPin } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12 flex justify-center">
      <div className="w-full max-w-4xl">
        <BackButton fallbackPath="/" />
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Hubungi Kami</h1>
          <p className="text-slate-500">Punya pertanyaan seputar LontaraVibe? Kirimkan pesan kepada kami.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="md:col-span-1 space-y-6">
            <Card className="border-0 shadow-lg shadow-slate-100 h-full bg-teal-50">
              <CardContent className="pt-6 space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-teal-600 shadow-sm"><MapPin size={24} /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Kantor Pusat</h3>
                    <p className="text-sm text-slate-600">Jl. Bawakaraeng No. 102<br/>Makassar, Sulawesi Selatan<br/>90111</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-teal-600 shadow-sm"><Mail size={24} /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Email</h3>
                    <p className="text-sm text-slate-600">halo@lontaravibe.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="bg-white p-3 rounded-full text-teal-600 shadow-sm"><Phone size={24} /></div>
                  <div>
                    <h3 className="font-semibold text-slate-800 mb-1">Telepon (WA)</h3>
                    <p className="text-sm text-slate-600">+62 811 4122 345</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="border-0 shadow-xl border-slate-100">
              <CardHeader>
                <CardTitle className="text-xl">Kirim Pesan</CardTitle>
                <CardDescription>Tim dukungan kami akan merespons dalam 1x24 jam.</CardDescription>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Nama Lengkap</label>
                      <Input placeholder="Tuliskan nama Anda..." />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input type="email" placeholder="nama@email.com" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Judul Pesan</label>
                    <Input placeholder="Topik yang ingin ditanyakan..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Isi Pesan</label>
                    <textarea 
                      className="flex min-h-[120px] w-full rounded-md border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Jelaskan pertanyaan atau masalah Anda secara detail..."
                    />
                  </div>
                  <Button type="button" className="w-full bg-slate-900 hover:bg-slate-800 text-white">
                    Kirim Pesan Sekarang
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
