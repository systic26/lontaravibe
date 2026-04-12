import { Loader2 } from "lucide-react"

export default function GlobalLoading() {
  return (
    <div className="flex h-[80vh] w-full flex-col items-center justify-center space-y-4">
      <Loader2 className="h-10 w-10 animate-spin text-teal-600" />
      <p className="text-sm font-medium text-slate-500">Memuat LontaraVibe...</p>
    </div>
  )
}
