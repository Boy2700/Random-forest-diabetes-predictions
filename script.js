// Questions Array
const questions = [
    {
        question: "Please enter your full name",
        type: "text",
        name: "fullName",
        required: true
    },
    {
        question: "What is your age?",
        type: "number",
        name: "age",
        min: 1,
        max: 120
    },
    {
        question: "What is your gender?",
        type: "radio",
        name: "gender",
        options: ["Male", "Female", "Other"]
    },
    {
        question: "What is your height (in cm)?",
        type: "number",
        name: "height",
        min: 40,
        max: 250
    },
    {
        question: "What is your weight (in kg)?",
        type: "number",
        name: "weight",
        min: 3,
        max: 300
    },
    {
        question: "What is your waist circumference (in cm)?",
        type: "number",
        name: "waist",
        min: 30,
        max: 200
    },
    {
        question: "Do you have a family history of diabetes?",
        type: "radio",
        name: "familyHistory",
        options: ["Yes", "No", "Not Sure"]
    },
    {
        question: "Have you ever been diagnosed with prediabetes?",
        type: "radio",
        name: "prediabetes",
        options: ["Yes", "No", "Not Sure"]
    },
    {
        question: "Do you have high blood pressure?",
        type: "radio",
        name: "highBP",
        options: ["Yes", "No", "Not Sure"]
    },
    {
        question: "What is your fasting blood sugar level (if known)?",
        type: "number",
        name: "bloodSugar",
        min: 50,
        max: 500,
        optional: true
    },
    {
        question: "How many times do you urinate in a day?",
        type: "number",
        name: "urinationFrequency",
        min: 1,
        max: 30
    },
    {
        question: "Do you experience excessive thirst?",
        type: "radio",
        name: "excessiveThirst",
        options: ["Yes", "No", "Sometimes"]
    },
    {
        question: "Have you noticed unexplained weight loss?",
        type: "radio",
        name: "weightLoss",
        options: ["Yes", "No", "Not Sure"]
    },
    {
        question: "Do you feel unusually tired often?",
        type: "radio",
        name: "fatigue",
        options: ["Yes", "No", "Sometimes"]
    },
    {
        question: "Do you have blurred vision?",
        type: "radio",
        name: "blurredVision",
        options: ["Yes", "No", "Sometimes"]
    },
    {
        question: "Do you have slow-healing sores?",
        type: "radio",
        name: "slowHealingSores",
        options: ["Yes", "No", "Sometimes"]
    },
    {
        question: "How many hours do you sleep per night on average?",
        type: "number",
        name: "sleepHours",
        min: 0,
        max: 24
    },
    {
        question: "How many times per week do you exercise?",
        type: "number",
        name: "exerciseFrequency",
        min: 0,
        max: 21
    },
    {
        question: "Do you smoke?",
        type: "radio",
        name: "smoking",
        options: ["Yes", "No", "Former Smoker"]
    },
    {
        question: "How often do you consume alcohol?",
        type: "radio",
        name: "alcohol",
        options: ["Never", "Occasionally", "Regularly", "Daily"]
    },
    {
        question: "How would you rate your stress level?",
        type: "radio",
        name: "stressLevel",
        options: ["Low", "Moderate", "High", "Very High"]
    },
    {
        question: "Do you have numbness or tingling in hands/feet?",
        type: "radio",
        name: "numbness",
        options: ["Yes", "No", "Sometimes"]
    },
    {
        question: "How many meals do you eat per day?",
        type: "number",
        name: "mealsPerDay",
        min: 1,
        max: 10
    },
    {
        question: "Do you consume sugary drinks daily?",
        type: "radio",
        name: "sugaryDrinks",
        options: ["Yes", "No", "Sometimes"]
    },
    {
        question: "Do you have a sedentary lifestyle?",
        type: "radio",
        name: "sedentaryLifestyle",
        options: ["Yes", "No", "Somewhat"]
    },
    {
        question: "Have you been diagnosed with PCOS? (Females only)",
        type: "radio",
        name: "pcos",
        options: ["Yes", "No", "Not Applicable"]
    },
    {
        question: "Do you have dark patches on your skin (Acanthosis Nigricans)?",
        type: "radio",
        name: "darkPatches",
        options: ["Yes", "No", "Not Sure"]
    },
    {
        question: "What is your ethnicity?",
        type: "radio",
        name: "ethnicity",
        options: ["African", "Asian", "Caucasian", "Hispanic", "Other"]
    },
    {
        question: "For women: Did you have gestational diabetes during pregnancy?",
        type: "radio",
        name: "gestationalDiabetes",
        options: ["Yes", "No", "Not Applicable"]
    },
    {
        question: "What is your blood pressure? (if known)",
        type: "radio",
        name: "bloodPressureRange",
        options: ["Normal", "Pre-hypertension", "High", "Not Sure"]
    }
];

let currentQuestion = 0;
let assessmentHistory = JSON.parse(localStorage.getItem('assessmentHistory') || '[]');
let userAnswers = {};

document.addEventListener("DOMContentLoaded", () => {
    initializeButtons();
    renderQuestion();
});

function initializeButtons() {
    document.getElementById("startBtn").addEventListener("click", startQuestionnaire);
    document.getElementById("prevBtn").addEventListener("click", showPreviousQuestion);
    document.getElementById("nextBtn").addEventListener("click", validateAndProceed);
    document.getElementById("restartBtn").addEventListener("click", restartQuestionnaire);
    document.getElementById("printBtn").addEventListener("click", () => window.print());
    document.getElementById("saveBtn").addEventListener("click", saveAssessment);
    document.getElementById("historyBtn").addEventListener("click", toggleHistory);
    document.getElementById("closeHistory").addEventListener("click", toggleHistory);
}

function showToast(message, type = 'info') {
    const toastContainer = document.querySelector('.toast-container');
    const toast = document.createElement('div');
    toast.className = `alert alert-${type} alert-dismissible fade show`;
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    toastContainer.appendChild(toast);
    setTimeout(() => toast.remove(), 5000);
}

function startQuestionnaire() {
    document.getElementById("welcome").classList.remove("active");
    document.getElementById("questionnaire").classList.add("active");
    currentQuestion = 0;
    userAnswers = {};
    renderQuestion();
}

function renderQuestion() {
    const question = questions[currentQuestion];
    let inputHTML = '';

    if (question.type === "radio") {
        inputHTML = question.options.map(option => `
            <div class="form-check mb-2">
                <input class="form-check-input" type="radio" name="${question.name}" 
                       id="${question.name}-${option}" value="${option}" 
                       ${userAnswers[question.name] === option ? 'checked' : ''} required>
                <label class="form-check-label" for="${question.name}-${option}">
                    ${option}
                </label>
            </div>
        `).join('');
    } else if (question.type === "number") {
        inputHTML = `
            <input type="number" class="form-control" id="${question.name}" 
                   name="${question.name}" min="${question.min}" max="${question.max}" 
                   value="${userAnswers[question.name] || ''}"
                   ${question.optional ? '' : 'required'}>
            <div class="form-text">Value must be between ${question.min} and ${question.max}</div>
        `;
    } else if (question.type === "text") {
        inputHTML = `
            <input type="text" class="form-control" id="${question.name}" 
                   name="${question.name}" value="${userAnswers[question.name] || ''}" required>
        `;
    }

    document.getElementById("question-container").innerHTML = `
        <form id="questionForm" class="mb-3">
            <h4 class="mb-3">${question.question}</h4>
            ${inputHTML}
        </form>
    `;

    updateProgress();
    updateNavigationButtons();
}

function updateProgress() {
    const progress = document.getElementById("progress");
    const percentage = ((currentQuestion + 1) / questions.length) * 100;
    progress.style.width = `${percentage}%`;
}

function updateNavigationButtons() {
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    
    prevBtn.style.visibility = currentQuestion === 0 ? "hidden" : "visible";
    nextBtn.innerHTML = currentQuestion === questions.length - 1 ? 
        'Submit <i class="bi bi-check-lg"></i>' : 
        'Next <i class="bi bi-arrow-right"></i>';
}

function validateAndProceed() {
    const form = document.getElementById("questionForm");
    const input = form.querySelector("input");

    if (!form.checkValidity()) {
        showToast("Please answer the question before proceeding", "warning");
        form.classList.add("shake");
        setTimeout(() => form.classList.remove("shake"), 820);
        return;
    }

    // Save the current answer
    if (questions[currentQuestion].type === "radio") {
        const selectedInput = form.querySelector('input:checked');
        if (selectedInput) {
            userAnswers[questions[currentQuestion].name] = selectedInput.value;
        }
    } else {
        userAnswers[questions[currentQuestion].name] = input.value;
    }

    if (input.type === "number" && !questions[currentQuestion].optional) {
        const value = parseFloat(input.value);
        const min = parseFloat(input.min);
        const max = parseFloat(input.max);
        
        if (value < min || value > max) {
            showToast(`Value must be between ${min} and ${max}`, "danger");
            return;
        }
    }

    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        calculateRisk();
    }
}

function showPreviousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
}

function calculateRisk() {
    let riskScore = 0;
    const userName = userAnswers.fullName;

    // Calculate BMI
    const height = parseFloat(userAnswers.height) / 100;
    const weight = parseFloat(userAnswers.weight);
    const bmi = weight / (height * height);

    // Risk factors scoring
    if (parseInt(userAnswers.age) > 45) riskScore += 2;
    if (bmi >= 25) riskScore += 1;
    if (bmi >= 30) riskScore += 2;
    if (userAnswers.familyHistory === "Yes") riskScore += 2;
    if (userAnswers.prediabetes === "Yes") riskScore += 3;
    if (userAnswers.highBP === "Yes") riskScore += 2;
    if (userAnswers.excessiveThirst === "Yes") riskScore += 1;
    if (userAnswers.weightLoss === "Yes") riskScore += 1;
    if (userAnswers.fatigue === "Yes") riskScore += 1;
    if (userAnswers.blurredVision === "Yes") riskScore += 1;
    if (userAnswers.slowHealingSores === "Yes") riskScore += 1;
    if (parseInt(userAnswers.sleepHours) < 6 || parseInt(userAnswers.sleepHours) > 9) riskScore += 1;
    if (parseInt(userAnswers.exerciseFrequency) < 3) riskScore += 1;
    if (userAnswers.smoking === "Yes") riskScore += 1;
    if (userAnswers.alcohol === "Daily") riskScore += 1;
    if (userAnswers.stressLevel === "High" || userAnswers.stressLevel === "Very High") riskScore += 1;
    if (userAnswers.numbness === "Yes") riskScore += 1;
    if (userAnswers.sugaryDrinks === "Yes") riskScore += 1;
    if (userAnswers.sedentaryLifestyle === "Yes") riskScore += 2;
    if (userAnswers.darkPatches === "Yes") riskScore += 1;
    if (userAnswers.ethnicity === "African" || userAnswers.ethnicity === "Asian") riskScore += 1;
    if (userAnswers.gestationalDiabetes === "Yes") riskScore += 2;
    if (userAnswers.bloodPressureRange === "High") riskScore += 1;

    displayResults(riskScore, { bmi, userName, answers: userAnswers });
}

function displayResults(riskScore, metrics) {
    document.getElementById("questionnaire").classList.remove("active");
    document.getElementById("results").classList.add("active");

    const riskLevel = document.getElementById("risk-level");
    const riskDetails = document.getElementById("risk-details");
    const recommendationText = document.getElementById("recommendation-text");

    let riskCategory, riskText, recommendations;

    if (riskScore < 8) {
        riskCategory = "success";
        riskText = "Low Risk";
        recommendations = "Maintain your healthy lifestyle with regular exercise and a balanced diet.";
    } else if (riskScore < 15) {
        riskCategory = "warning";
        riskText = "Moderate Risk";
        recommendations = "Consider lifestyle changes and consult with a healthcare professional.";
    } else {
        riskCategory = "danger";
        riskText = "High Risk";
        recommendations = "Please consult with a healthcare professional as soon as possible.";
    }

    let bmiCategory;
    if (metrics.bmi < 18.5) bmiCategory = "Underweight";
    else if (metrics.bmi < 25) bmiCategory = "Normal weight";
    else if (metrics.bmi < 30) bmiCategory = "Overweight";
    else bmiCategory = "Obese";

    riskLevel.className = `alert alert-${riskCategory}`;
    riskLevel.innerHTML = `
        <h4 class="alert-heading">Prediction Result for ${metrics.userName}</h4>
        <p class="mb-0">Risk Level: ${riskText}</p>
    `;

    riskDetails.innerHTML = `
        <div class="card mb-4">
            <div class="card-body">
                <h5 class="card-title">Patient Information</h5>
                <p class="card-text">Name: ${metrics.userName}</p>
                <p class="card-text">Risk Score: ${riskScore} out of 30</p>
                <p class="card-text">Prediction Date: ${new Date().toLocaleString()}</p>
            </div>
        </div>
        <div class="mt-4">
            <h4>Health Metrics:</h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">BMI: ${metrics.bmi.toFixed(1)} (${bmiCategory})</li>
                <li class="list-group-item">Age: ${metrics.answers.age} years</li>
                <li class="list-group-item">Gender: ${metrics.answers.gender}</li>
                <li class="list-group-item">Waist Circumference: ${metrics.answers.waist} cm</li>
            </ul>
        </div>
    `;

    recommendationText.innerHTML = `
        <p class="mb-3">Dear ${metrics.userName}, ${recommendations}</p>
        <h4>Additional Recommendations:</h4>
        <ul class="list-group list-group-flush">
            <li class="list-group-item">Monitor your blood sugar levels regularly</li>
            <li class="list-group-item">Maintain a healthy weight through diet and exercise</li>
            <li class="list-group-item">Stay hydrated and limit alcohol consumption</li>
            <li class="list-group-item">Get adequate sleep and manage stress levels</li>
            <li class="list-group-item">Consider joining a diabetes prevention program</li>
        </ul>
    `;
}

function saveAssessment() {
    const currentAssessment = {
        name: userAnswers.fullName,
        date: new Date().toLocaleString(),
        riskLevel: document.getElementById("risk-level").textContent,
        details: document.getElementById("risk-details").innerHTML,
        recommendations: document.getElementById("recommendation-text").innerHTML,
        answers: userAnswers
    };

    assessmentHistory.push(currentAssessment);
    localStorage.setItem('assessmentHistory', JSON.stringify(assessmentHistory));
    showToast('Prediction saved successfully!', 'success');
    loadHistory();
}

function loadHistory() {
    const historyList = document.getElementById('historyList');
    historyList.innerHTML = assessmentHistory.length ? 
        assessmentHistory.map((assessment, index) => `
            <div class="card mb-3">
                <div class="card-body">
                    <h5 class="card-title">${assessment.name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${assessment.date}</h6>
                    <p class="card-text">${assessment.riskLevel}</p>
                    <button class="btn btn-sm btn-primary" 
                            onclick="viewHistoricalAssessment(${index})">
                        View Details
                    </button>
                </div>
            </div>
        `).join('') : 
        '<p>No Prediction history available.</p>';
}

function viewHistoricalAssessment(index) {
    const assessment = assessmentHistory[index];
    document.getElementById("results").classList.add("active");
    document.getElementById("questionnaire").classList.remove("active");
    document.getElementById("welcome").classList.remove("active");
    
    document.getElementById("risk-level").innerHTML = `
        <h4 class="alert-heading">Historical Prediction for ${assessment.name}</h4>
        <p class="mb-0">${assessment.riskLevel}</p>
    `;
    document.getElementById("risk-details").innerHTML = assessment.details;
    document.getElementById("recommendation-text").innerHTML = assessment.recommendations;
    
    toggleHistory();
}

function toggleHistory() {
    document.getElementById("historyPanel").classList.toggle("active");
}

function restartQuestionnaire() {
    currentQuestion = 0;
    userAnswers = {};
    document.getElementById("results").classList.remove("active");
    document.getElementById("welcome").classList.add("active");
}