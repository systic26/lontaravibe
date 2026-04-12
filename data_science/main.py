from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import pandas as pd
from typing import List
import random

app = FastAPI(title="LontaraVibe Data Science API", version="1.0")

# Setup CORS agar bisa diakses oleh Next.js frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Untuk production, batasi ke URL frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class WorkshopPredictReq(BaseModel):
    workshop_id: str
    month: int
    
@app.get("/")
def read_root():
    return {"message": "Welcome to LontaraVibe Data Science API"}

@app.get("/predict_demand")
def get_prediction_trends():
    """
    Endpoint baru untuk grafik Dashboard: Data trend Penjualan VS Demand.
    Secara nyata, ini bisa melakukan komputasi pandas. Di sini, kita simulasikan output yang mirip dengan Mock sebelumnya, namun dimanipulasi dengan Randomizer ringan untuk tes Live API.
    """
    base_data = [
        {"month": "Jan", "sales": 4000, "demand": 4200},
        {"month": "Feb", "sales": 3000, "demand": 3100},
        {"month": "Mar", "sales": 5000, "demand": 5800},
        {"month": "Apr", "sales": 4500, "demand": 4020},
        {"month": "Mei", "sales": 6000, "demand": 6500},
        {"month": "Jun", "sales": 5500, "demand": 7100},
    ]
    # Inject variabilitas
    growth_rate = ((base_data[-1]['demand'] - base_data[-2]['demand']) / base_data[-2]['demand']) * 100
    
    insights = [
        {
            "type": "alert",
            "title": "Analisis Pertumbuhan Demand",
            "description": f"Tren historis mencatat growth demand sebesar {growth_rate:.1f}% dalam bulan terakhir. Jika momentum dipertahankan pada lini 'Keramik' dan 'DIY Kit', stok inventaris ekstra diperlukan untuk menyerap peningkatan volume Q3."
        },
        {
            "type": "recommendation",
            "title": "Optimasi Revenue Aktual",
            "description": "Saran Aksi: Berdasarkan margin penjualan terbanyak di Q2, komoditas 'Pottery Kit' lebih laku dibandingkan kategori fashion. Pertimbangkan bundling 'Pottery Kit' dengan kelas interaktif untuk meningkatkan margin per transaksi."
        }
    ]
        
    return {"success": True, "data": base_data, "insights": insights}

@app.post("/predict_demand_by_id")
def predict_demand(req: WorkshopPredictReq):
    base_demand = 50
    seasonal_factor = 1.2 if req.month in [6, 7, 12] else 1.0
    predicted = int(base_demand * seasonal_factor)
    return {"workshop_id": req.workshop_id, "predicted_demand": predicted}

@app.get("/recommend_workshop/{user_id}")
def recommend_workshop(user_id: str):
    recommendations = [
        {"workshop_id": "1", "name": "Basic Pottery Making", "score": 0.95},
        {"workshop_id": "2", "name": "Tenun Sutera Bugis", "score": 0.88}
    ]
    return {"user_id": user_id, "recommendations": recommendations}
