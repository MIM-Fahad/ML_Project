# ML_Project

This project contains:

- **Backend**: FastAPI (Python) for machine learning with RandomForest (scikit-learn).
- **Frontend**: Next.js (TypeScript) for uploading CSV files and querying the trained model.

## Setup Instructions

### 1. Clone or Copy the Project
- Download or clone the project files to your local machine.

### 2. Backend Setup (FastAPI)
1. Open a terminal in the project root directory.
2. Create a Python virtual environment (if not already present):
   ```pwsh
   python -m venv backend_env
   ```
3. Activate the virtual environment:
   ```pwsh
   .\backend_env\Scripts\Activate.ps1
   ```
4. Install dependencies:
   ```pwsh
   pip install fastapi[all] scikit-learn pandas joblib
   ```
5. Start the FastAPI server:
   ```pwsh
   uvicorn main:app --reload
   ```
   - The backend will run at `http://localhost:8000`

### 3. Frontend Setup (Next.js)
1. Open a new terminal in the project root directory.
2. Change to the frontend folder:
   ```pwsh
   cd frontend
   ```
3. Install dependencies:
   ```pwsh
   npm install
   ```
4. Start the frontend server:
   ```pwsh
   npm run dev
   ```
   - The frontend will run at `http://localhost:3000`

## Usage
- Go to `http://localhost:3000` in your browser.
- Click **Learn** to upload a CSV and train the model.
- Click **Ask** to query the trained model for predictions.

## Notes
- The backend must be running before using the frontend features.
- The CSV file should have features in columns and the target variable as the last column.
- If you retrain with a new CSV, the model will be overwritten.

**@ about csv data**
Dataset Columns:
Age (in years) – Numerical
Monthly_Income – Numerical

**Notes:**
Younger individuals with lower income are less likely to be interested (No).

Older individuals with higher income are more likely to be interested (Yes).

This pattern introduces a real-life trend often found in market research and can be used to train classification models like logistic regression, decision trees, or random forests.
**Contextual Notes:**
Income range is between 13,000 BDT to 60,000 BDT/month, aligning with lower and upper-middle-class salary ranges in Bangladesh (as of recent years).

As with the original version:

Lower-income younger people tend to say "No".

Higher-income or older professionals tend to say "Yes".

**Assumptions:**
Younger people (20–30): Often more environmentally aware, especially students or young professionals — but low income can reduce their intent to act.

Middle-aged (31–45): Have stable income, often open to adopting green products, especially if family-conscious.

Older individuals (46+): More conservative with spending, less likely to adopt new eco-tech unless it shows clear long-term value.


**Revised Logic for the Dataset:**
High interest (Yes) is seen in:

Educated young adults with moderate income

Middle-aged individuals with higher income

Low interest (No) for:

Low-income youth

Older adults with conservative habits


---

For any issues, check the terminal for error messages or contact the project author.
