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
      "Chest X-ray": "Enlarged Heart",
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
  {
    status: {
      diagnosis: "Pneumonia",
      wrongDiagnosis: ["Asthma", "Pulmonary Embolism", "COPD"],
      info: "Patient is complaining of fever, productive cough, and chest pain.",
    },
    tests: {
      "Chest X-ray": "Consolidation in the right lower lobe",
      "Bloods": "Elevated white blood cell count",
      "Blood Pressure Machine": "Oxygen saturation: 88%",
    },
  },
  {
    status: {
      diagnosis: "Diabetes Mellitus",
      wrongDiagnosis: ["Thyroid Disorder", "Anemia", "Chronic Fatigue Syndrome"],
      info: "Patient is complaining of excessive thirst, frequent urination, and weight loss.",
    },
    tests: {
      "Bloods": "Fasting glucose: 180 mg/dL, HbA1c: 8.5%",
      "Urinalysis": "Glucose detected in urine",
    },
  },
  {
    status: {
      diagnosis: "Asthma",
      wrongDiagnosis: ["COPD", "Pneumonia", "Allergic Rhinitis"],
      info: "Patient is complaining of wheezing, shortness of breath, and chest tightness.",
    },
    tests: {
      "Spirometry": "FEV1/FVC ratio: <70%",
      "Allergy Test": "Positive for multiple environmental allergens",
    },
  },
  {
    status: {
      diagnosis: "Hyperthyroidism",
      wrongDiagnosis: ["Hypothyroidism", "Diabetes Mellitus", "Anxiety Disorder"],
      info: "Patient is complaining of weight loss, heat intolerance, and palpitations.",
    },
    tests: {
      "Bloods": "Elevated T3 and T4, suppressed TSH",
      "Thyroid Ultrasound": "Diffuse thyroid enlargement",
      "Radioactive Iodine Uptake": "Increased iodine uptake",
    },
  },
  {
    status: {
      diagnosis: "Appendicitis",
      wrongDiagnosis: ["Gastroenteritis", "Kidney Stones", "IBS"],
      info: "Patient is complaining of abdominal pain localized to the right lower quadrant and fever.",
    },
    tests: {
      "Abdominal Ultrasound": "Enlarged, inflamed appendix",
      "CT Scan": "Thickened appendix wall with periappendiceal fluid",
      "Bloods": "Elevated white blood cell count",
    },
  },
  {
    status: {
      diagnosis: "Pulmonary Embolism",
      wrongDiagnosis: ["Pneumonia", "Asthma", "Myocardial Infarction"],
      info: "Patient is complaining of sudden-onset shortness of breath, chest pain, and coughing up blood.",
    },
    tests: {
      "D-dimer Test": "Elevated levels",
      "CT Pulmonary Angiography": "Clot detected in pulmonary arteries",
      "Blood Pressure Machine": "Oxygen saturation: 85%",
    },
  },
  {
    status: {
      diagnosis: "Kidney Stones",
      wrongDiagnosis: ["UTI", "Appendicitis", "Gastroenteritis"],
      info: "Patient is complaining of severe flank pain and blood in the urine.",
    },
    tests: {
      "Urinalysis": "Presence of blood and crystals",
      "Non-contrast CT": "Stone visible in the ureter",
      "Ultrasound": "Hydronephrosis observed",
    },
  },
  {
    status: {
      diagnosis: "Stroke",
      wrongDiagnosis: ["Migraine", "Seizure", "Transient Ischemic Attack"],
      info: "Patient is experiencing sudden weakness on one side and slurred speech.",
    },
    tests: {
      "CT Scan": "Ischemic stroke detected",
      "MRI": "Confirms ischemia in the left cerebral hemisphere",
      "Bloods": "Elevated cholesterol levels",
    },
  },
  {
    status: {
      diagnosis: "Sepsis",
      wrongDiagnosis: ["Pneumonia", "Flu", "Gastroenteritis"],
      info: "Patient is experiencing fever, rapid heartbeat, and confusion.",
    },
    tests: {
      "Bloods": "Elevated white blood cell count and lactate levels",
      "Blood Culture": "Positive for bacterial infection",
      "Blood Pressure Machine": "Low blood pressure",
    },
  },
  {
    status: {
      diagnosis: "Migraine",
      wrongDiagnosis: ["Tension Headache", "Cluster Headache", "Stroke"],
      info: "Patient is complaining of severe, pulsating headache and light sensitivity.",
    },
    tests: {
      "Neurological Exam": "Normal results",
      "CT Scan": "No abnormalities detected",
      "MRI": "No abnormalities detected",
    },
  },
  {
    status: {
      diagnosis: "IBS (Irritable Bowel Syndrome)",
      wrongDiagnosis: ["Crohn's Disease", "Ulcerative Colitis", "Gastroenteritis"],
      info: "Patient is complaining of abdominal pain, bloating, and irregular bowel movements.",
    },
    tests: {
      "Stool Test": "Normal results",
      "Bloods": "No inflammation markers detected",
      "Colonoscopy": "No visible abnormalities",
    },
  },
  {
    status: {
      diagnosis: "Peptic Ulcer Disease",
      wrongDiagnosis: ["Gastritis", "GERD", "Pancreatitis"],
      info: "Patient is experiencing upper abdominal pain and nausea.",
    },
    tests: {
      "Endoscopy": "Ulceration in the stomach lining",
      "Urea Breath Test": "Positive for H. pylori",
      "Bloods": "Low hemoglobin",
    },
  },
  {
    status: {
      diagnosis: "Hypothyroidism",
      wrongDiagnosis: ["Hyperthyroidism", "Chronic Fatigue Syndrome", "Anemia"],
      info: "Patient is complaining of fatigue, weight gain, and cold intolerance.",
    },
    tests: {
      "Bloods": "Low T3 and T4, elevated TSH",
      "Thyroid Ultrasound": "Diffuse thyroid enlargement",
      "Thyroid Antibody Test": "Positive for thyroid peroxidase antibodies",
    },
  },
  {
    status: {
      diagnosis: "COPD (Chronic Obstructive Pulmonary Disease)",
      wrongDiagnosis: ["Asthma", "Pneumonia", "Bronchitis"],
      info: "Patient is complaining of chronic cough and difficulty breathing.",
    },
    tests: {
      "Spirometry": "FEV1/FVC ratio: <70%",
      "Chest X-ray": "Hyperinflated lungs",
      "Bloods": "Normal white blood cell count",
    },
  },
  {
    status: {
      diagnosis: "UTI (Urinary Tract Infection)",
      wrongDiagnosis: ["Kidney Stones", "Interstitial Cystitis", "Prostatitis"],
      info: "Patient is complaining of painful urination and frequent urge to urinate.",
    },
    tests: {
      "Urinalysis": "Presence of white blood cells and bacteria",
      "Urine Culture": "Positive for E. coli",
      "Bloods": "Normal results",
    },
  },
  {
    status: {
      diagnosis: "Pancreatitis",
      wrongDiagnosis: ["Gallstones", "Peptic Ulcer Disease", "Appendicitis"],
      info: "Patient is complaining of severe abdominal pain radiating to the back and nausea.",
    },
    tests: {
      "Bloods": "Elevated lipase and amylase levels",
      "Abdominal Ultrasound": "Enlarged pancreas with inflammation",
      "CT Scan": "Evidence of pancreatic swelling",
    },
  },
  {
    status: {
      diagnosis: "Cholecystitis",
      wrongDiagnosis: ["Gastritis", "Pancreatitis", "Peptic Ulcer Disease"],
      info: "Patient is complaining of severe right upper quadrant pain and fever.",
    },
    tests: {
      "Abdominal Ultrasound": "Thickened gallbladder wall with gallstones",
      "HIDA Scan": "Reduced gallbladder function",
      "Bloods": "Elevated white blood cell count",
    },
  },
];
