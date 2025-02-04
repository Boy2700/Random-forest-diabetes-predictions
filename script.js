const questions = [
  { type: "number", label: "Age", id: "age", min: 18, max: 120 },
  {
    type: "select",
    label: "Gender",
    id: "gender",
    options: ["Male", "Female"],
  },
  { type: "number", label: "Height (cm)", id: "height", min: 100, max: 250 },
  { type: "number", label: "Weight (kg)", id: "weight", min: 30, max: 300 },
  {
    type: "number",
    label: "Waist Circumference (cm)",
    id: "waist",
    min: 50,
    max: 200,
  },
  {
    type: "select",
    label: "Do you have a family history of diabetes?",
    id: "familyHistory",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Have you ever been diagnosed with prediabetes?",
    id: "prediabetes",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Do you have high blood pressure?",
    id: "highBP",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Have you had gestational diabetes?",
    id: "gestationalDiabetes",
    options: ["Yes", "No", "Not Applicable"],
  },
  {
    type: "select",
    label: "Do you have a history of high cholesterol?",
    id: "highCholesterol",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "How often do you consume sugary drinks or processed foods?",
    id: "sugarIntake",
    options: ["Daily", "Few times a week", "Rarely", "Never"],
  },
  {
    type: "select",
    label: "How frequently do you exercise per week?",
    id: "exercise",
    options: ["Never", "1-2 times", "3-4 times", "5 or more times"],
  },
  {
    type: "select",
    label: "Do you smoke?",
    id: "smoking",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Do you consume alcohol regularly?",
    id: "alcohol",
    options: ["Yes", "No"],
  },
  {
    type: "number",
    label: "How many hours of sleep do you get per night?",
    id: "sleep",
    min: 0,
    max: 24,
  },
  {
    type: "select",
    label: "Do you experience frequent urination?",
    id: "frequentUrination",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Do you feel excessive thirst or hunger?",
    id: "excessiveThirstHunger",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Have you experienced sudden weight loss?",
    id: "weightLoss",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Do you feel fatigued often?",
    id: "fatigue",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Do you have blurry vision?",
    id: "blurryVision",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Do your wounds heal slowly?",
    id: "slowHealing",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Have you noticed numbness or tingling in your hands or feet?",
    id: "numbness",
    options: ["Yes", "No"],
  },
  {
    type: "select",
    label: "Do you have dark patches on your skin (Acanthosis Nigricans)?",
    id: "skinPatches",
    options: ["Yes", "No"],
  },
  {
    type: "number",
    label: "What was your last fasting blood sugar level? (mg/dL)",
    id: "fastingBloodSugar",
    min: 50,
    max: 500,
  },
  {
    type: "number",
    label: "What was your last HbA1c level? (%)",
    id: "hba1c",
    min: 3,
    max: 15,
    step: 0.1,
  },
  {
    type: "select",
    label: "Have you been diagnosed with insulin resistance?",
    id: "insulinResistance",
    options: ["Yes", "No"],
  },
];

let currentQuestion = 0;

document.addEventListener("DOMContentLoaded", () => {
  const startBtn = document.getElementById("startBtn");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const restartBtn = document.getElementById("restartBtn");
  const form = document.getElementById("diabetesForm");

  startBtn.addEventListener("click", startQuestionnaire);
  prevBtn.addEventListener("click", showPreviousQuestion);
  nextBtn.addEventListener("click", validateAndProceed);
  restartBtn.addEventListener("click", restartQuestionnaire);

  renderQuestion();
});

function startQuestionnaire() {
  document.getElementById("welcome").classList.remove("active");
  document.getElementById("questionnaire").classList.add("active");
  renderQuestion();
}

function renderQuestion() {
  const form = document.getElementById("diabetesForm");
  form.innerHTML = "";

  const question = questions[currentQuestion];
  const formGroup = document.createElement("div");
  formGroup.className = "mb-3";

  const label = document.createElement("label");
  label.className = "form-label fs-5";
  label.textContent = question.label;
  label.setAttribute("for", question.id);
  formGroup.appendChild(label);

  if (question.type === "select") {
    const select = document.createElement("select");
    select.className = "form-select form-select-lg";
    select.id = question.id;
    select.name = question.id;
    select.required = true;
    const defaultOption = document.createElement("option");
    defaultOption.value = "";
    defaultOption.textContent = "Please select an option";
    defaultOption.disabled = true;
    defaultOption.selected = true;
    select.appendChild(defaultOption);
    question.options.forEach((option) => {
      const optionElement = document.createElement("option");
      optionElement.value = option;
      optionElement.textContent = option;
      select.appendChild(optionElement);
    });
    formGroup.appendChild(select);
  } else {
    const input = document.createElement("input");
    input.type = question.type;
    input.className = "form-control form-control-lg";
    input.id = question.id;
    input.name = question.id;
    input.required = true;
    if (question.min !== undefined) input.min = question.min;
    if (question.max !== undefined) input.max = question.max;
    if (question.step !== undefined) input.step = question.step;
    formGroup.appendChild(input);
  }

  form.appendChild(formGroup);
  updateProgressBar();
  updateNavigationButtons();
}

function showPreviousQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderQuestion();
  }
}

function validateAndProceed() {
  const form = document.getElementById("diabetesForm");
  const input = form.querySelector("input, select");

  if (input.checkValidity()) {
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
    } else {
      calculateRisk();
    }
  } else {
    form.classList.add("shake");
    setTimeout(() => form.classList.remove("shake"), 820);
  }
}

function updateProgressBar() {
  const progress = document.getElementById("progress");
  const percentage = ((currentQuestion + 1) / questions.length) * 100;
  progress.style.width = `${percentage}%`;
  progress.setAttribute("aria-valuenow", percentage);
}

function updateNavigationButtons() {
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");

  prevBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";
  nextBtn.textContent =
    currentQuestion === questions.length - 1 ? "Submit" : "Next";
}

function calculateRisk() {
  let riskScore = 0;
  const form = document.getElementById("diabetesForm");
  const formData = new FormData(form);

  // Assign risk points based on answers
  if (parseInt(formData.get("age")) > 45) riskScore += 2;
  if (formData.get("familyHistory") === "Yes") riskScore += 2;
  if (formData.get("prediabetes") === "Yes") riskScore += 3;
  if (formData.get("highBP") === "Yes") riskScore += 2;
  if (formData.get("highCholesterol") === "Yes") riskScore += 2;
  if (formData.get("sugarIntake") === "Daily") riskScore += 2;
  if (formData.get("exercise") === "Never") riskScore += 2;
  if (formData.get("smoking") === "Yes") riskScore += 1;
  if (formData.get("alcohol") === "Yes") riskScore += 1;
  if (formData.get("frequentUrination") === "Yes") riskScore += 2;
  if (formData.get("excessiveThirstHunger") === "Yes") riskScore += 2;
  if (formData.get("weightLoss") === "Yes") riskScore += 2;
  if (formData.get("fatigue") === "Yes") riskScore += 1;
  if (formData.get("blurryVision") === "Yes") riskScore += 1;
  if (formData.get("slowHealing") === "Yes") riskScore += 1;
  if (formData.get("numbness") === "Yes") riskScore += 1;
  if (formData.get("skinPatches") === "Yes") riskScore += 1;

  const fastingBloodSugar = parseFloat(formData.get("fastingBloodSugar"));
  const hba1c = parseFloat(formData.get("hba1c"));

  if (fastingBloodSugar > 100) riskScore += 3;
  if (hba1c > 5.7) riskScore += 3;

  // Calculate BMI
  const height = parseFloat(formData.get("height")) / 100; // convert cm to m
  const weight = parseFloat(formData.get("weight"));
  const bmi = weight / (height * height);
  if (bmi > 25) riskScore += 1;
  if (bmi > 30) riskScore += 2;

  displayResults(riskScore);
}

function displayResults(riskScore) {
  document.getElementById("questionnaire").classList.remove("active");
  document.getElementById("results").classList.add("active");

  const riskLevel = document.getElementById("risk-level");
  const riskDetails = document.getElementById("risk-details");
  const recommendationText = document.getElementById("recommendation-text");

  let riskCategory, riskText, recommendationContent, diabetesType;

  if (riskScore < 10) {
    riskCategory = "alert-success";
    riskText = "Low Risk";
    diabetesType = "You are currently at low risk for diabetes";
    recommendationContent =
      "Maintain your healthy lifestyle with regular exercise and a balanced diet. Continue to monitor your health and have regular check-ups.";
  } else if (riskScore < 20) {
    riskCategory = "alert-warning";
    riskText = "Moderate Risk";
    diabetesType = "You may be at risk for Type 2 Diabetes";
    recommendationContent =
      "Consider lifestyle changes such as improving your diet, increasing physical activity, and managing stress. Consult with a healthcare professional for a thorough evaluation and potential prediabetes screening.";
  } else {
    riskCategory = "alert-danger";
    riskText = "High Risk";
    diabetesType = "You may be at high risk for Type 2 Diabetes";
    recommendationContent =
      "Urgent action is recommended. Schedule an appointment with a healthcare professional immediately for a comprehensive diabetes screening and potential treatment plan. Early intervention can significantly improve outcomes.";
  }

  riskLevel.textContent = riskText;
  riskLevel.className = `alert ${riskCategory}`;

  riskDetails.innerHTML = `
        <p class="fs-4">${diabetesType}</p>
        <p>Based on your responses, you have a ${riskText.toLowerCase()} of developing diabetes.</p>
        <p>Your risk score: ${riskScore} out of 30</p>
    `;

  recommendationText.innerHTML = `
        <p class="mb-3">${recommendationContent}</p>
        <p class="fw-bold">Additional Recommendations:</p>
        <ul>
            <li>Monitor your blood sugar levels regularly</li>
            <li>Maintain a healthy weight through diet and exercise</li>
            <li>Stay hydrated and limit alcohol consumption</li>
            <li>Get adequate sleep and manage stress levels</li>
            <li>Consider joining a diabetes prevention program</li>
        </ul>
        <p class="mt-3 fst-italic">Remember, this assessment is not a diagnosis. Always consult with a healthcare professional for accurate medical advice and a personalized treatment plan.</p>
    `;
}

function restartQuestionnaire() {
  currentQuestion = 0;
  document.getElementById("results").classList.remove("active");
  document.getElementById("welcome").classList.add("active");
}

// Initialize the questionnaire
renderQuestion();
