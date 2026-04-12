"use client"
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { Lightbulb, TrendingUp, Package, Users, AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { BackButton } from "@/components/ui/BackButton";

const fallbackSalesData = [
  { month: 'Jan', sales: 4000, demand: 4200 },
  { month: 'Feb', sales: 3000, demand: 3100 },
  { month: 'Mar', sales: 5000, demand: 5800 },
  { month: 'Apr', sales: 4500, demand: 4000 },
  { month: 'Mei', sales: 6000, demand: 6500 },
  { month: 'Jun', sales: 5500, demand: 7000 },
];

const productData = [
  { name: 'Pottery Kit', count: 120 },
  { name: 'Basic Tenun', count: 85 },
  { name: 'Rattan Box', count: 65 },
  { name: 'Batik Tulis', count: 40 },
];

interface Insight {
  type: string;
  title: string;
  description: string;
  [key: string]: unknown;
}

export default function AdminDashboard() {
  const [salesData, setSalesData] = useState(fallbackSalesData);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [dsError, setDsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from FastAPI locally
    const fetchPredictDemand = async () => {
      try {
        const res = await fetch("http://127.0.0.1:8000/predict_demand");
        if (!res.ok) throw new Error("API not reachable");
        const json = await res.json();
        if (json.success && json.data) {
          setSalesData(json.data);
          if (json.insights) setInsights(json.insights);
          setDsError(false);
        }
      } catch (err) {
        console.error("Failed fetching Data Science endpoint:", err);
        setDsError(true);
        // Fallback remains if fail
      } finally {
        setLoading(false);
      }
    };

    fetchPredictDemand();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton fallbackPath="/explore" />
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 mb-2">UMKM Analytics</h1>
        <p className="text-slate-500">Overview performa bisnis dan analisis nyata dari engine ML FastAPI.</p>
      </div>

      {dsError && (
        <Alert variant="destructive" className="mb-6 bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertTitle className="text-red-800">Koneksi Machine Learning Terputus</AlertTitle>
          <AlertDescription className="text-red-700">
            Tidak dapat menghubungi FastAPI di <code>http://127.0.0.1:8000</code>. Menampilkan Mock / Fallback Data untuk stabilitas. Pastikan Anda menjalankan <code>uvicorn main:app</code> di folder data_science.
          </AlertDescription>
        </Alert>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="border-0 shadow-sm shadow-slate-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Pendapatan</CardTitle>
            <TrendingUp size={16} className="text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">Rp 12.450.000</div>
            <p className="text-xs text-emerald-500 font-medium mt-1">+14% dari bulan lalu</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm shadow-slate-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Booking Aktif</CardTitle>
            <Users size={16} className="text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">42 Peserta</div>
            <p className="text-xs text-slate-400 mt-1">Untuk 5 workshop mendatang</p>
          </CardContent>
        </Card>
        <Card className="border-0 shadow-sm shadow-slate-100">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">DIY Kit Terjual</CardTitle>
            <Package size={16} className="text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">128 Box</div>
            <p className="text-xs text-emerald-500 font-medium mt-1">+5% demand naik</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Trend Chart */}
        <Card className="lg:col-span-2 border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg text-slate-800">Tren Penjualan & Prediksi Demand</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
               <div className="h-[300px] w-full flex items-center justify-center text-slate-400">Loading neural network data...</div>
            ) : (
              <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={salesData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                  <XAxis dataKey="month" tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <YAxis tick={{fill: '#64748b'}} axisLine={false} tickLine={false} />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" name="Penjualan Aktual" stroke="#0d9488" strokeWidth={3} dot={{r: 4}} />
                  <Line type="monotone" dataKey="demand" name="Prediksi Demand (AI)" stroke="#8b5cf6" strokeWidth={3} strokeDasharray="5 5" />
                </LineChart>
              </ResponsiveContainer>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="space-y-8">
            {/* AI Insights Card */}
            <Card className="border border-purple-100 bg-purple-50/50 shadow-sm">
              <CardHeader className="pb-3">
                <CardTitle className="text-md flex items-center gap-2 text-purple-800">
                  <Lightbulb size={18} className="text-yellow-500"/> AI Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm text-slate-700">
                  {insights.length > 0 ? (
                    insights.map((insight: Insight, i: number) => (
                      <div key={i} className="p-3 bg-white rounded-lg shadow-sm border border-slate-100">
                        <Badge className={`mb-2 border-0 ${insight.type === 'alert' ? 'bg-purple-100 text-purple-700' : 'bg-yellow-100 text-yellow-800'}`}>
                           {insight.title}
                        </Badge>
                        <p>{insight.description}</p>
                      </div>
                    ))
                  ) : (
                    <div className="text-slate-400 text-center py-4">Generating neural insights...</div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Top Product Bar Chart */}
            <Card className="border-0 shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-md text-slate-800">Top Produk</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-[150px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={productData} layout="vertical" margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
                      <XAxis type="number" hide />
                      <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#475569', fontSize: 12}} />
                      <Tooltip cursor={{fill: '#f8fafc'}} />
                      <Bar dataKey="count" fill="#eab308" radius={[0, 4, 4, 0]} barSize={20} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}
