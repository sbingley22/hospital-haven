export const patients = [
  {
    status: {
      diagnosis: "Myocardial Infarction",
      wrongDiagnosis: ["Coronary Heart Failure", "Pneumonia", "Angina"],
      info: "Patient is complaining of chest pain and shortness of breathe",
    },
    tests: {
      "Bloods": "Elevated Troponin Levels",
      "Blood Pressure Machine": "Heart Rate: High  Systolic: High  Diastolic: High",
      "ECG": "Multiple STEMIs observed",
    },
  },
  {
    status: {
      diagnosis: "Angina",
      wrongDiagnosis: ["Coronary Heart Failure", "Pneumonia", "Myocardial Infarction"],
      info: "Patient is complaining of chest pain and shortness of breathe",
    },
    tests: {
      "Blood Pressure Machine": "Heart Rate: High  Systolic: High  Diastolic: High",
      "ECG": "T-wave abnormalities observed",
      "Cardiac Stress Test": "Symptoms reproduced during exercise",
      "Coronary Angiography": "Partial obstruction in coronary arteries",
    },
  },
  {
    status: {
      diagnosis: "Anemia",
      wrongDiagnosis: ["Coronary Heart Failure", "Angina", "Myocardial Infarction"],
      info: "Patient is complaining of tiredness and bounding pulse.",
    },
    tests: {
      "Bloods": "Low hemoglobin, low ferritin, and low iron levels",
      "Blood Pressure Machine": "Heart Rate: High  Systolic: Low  Diastolic: Low",
    },
  },
]