from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import joblib
import os

app = FastAPI()

# Allow CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_PATH = "rf_model.joblib"
FEATURES_PATH = "rf_features.joblib"

@app.post("/learn")
def learn(csv_file: UploadFile = File(...)):
    if not csv_file.filename.endswith('.csv'):
        raise HTTPException(status_code=400, detail="File must be a CSV.")
    df = pd.read_csv(csv_file.file)
    if df.shape[1] < 2:
        raise HTTPException(status_code=400, detail="CSV must have at least 2 columns.")
    X = df.iloc[:, :-1]
    y = df.iloc[:, -1]
    model = RandomForestClassifier()
    model.fit(X, y)
    joblib.dump(model, MODEL_PATH)
    joblib.dump(list(X.columns), FEATURES_PATH)
    return {"message": "Model trained successfully."}

@app.get("/ask")
def ask(q: str):
    if not os.path.exists(MODEL_PATH) or not os.path.exists(FEATURES_PATH):
        raise HTTPException(status_code=400, detail="Model not trained yet.")
    model = joblib.load(MODEL_PATH)
    features = joblib.load(FEATURES_PATH)
    try:
        # Expecting comma-separated values for features
        values = [float(x) for x in q.split(",")]
        if len(values) != len(features):
            raise ValueError
    except Exception:
        raise HTTPException(status_code=400, detail=f"Query must be {len(features)} comma-separated numbers.")
    X_pred = pd.DataFrame([values], columns=features)
    pred = model.predict(X_pred)[0]
    return JSONResponse(content={"prediction": str(pred)})
