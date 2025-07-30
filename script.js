let score = 0;
let currentQuestion = 0;
let userResponses = {};

const questions = [
  {
    text: "Select your symptoms:",
    type: "multi",
    options: [
      { label: "Chest pain or cold sweat", points: 3 },
      { label: "Fatigue or anxiety", points: 1 },
      { label: "Sudden confusion or weakness", points: 3 }
    ]
  },
  {
    text: "What is your age range?",
    type: "single",
    options: [
      { label: "< 45", points: 0 },
      { label: "45 – 59", points: 1 },
      { label: "60+", points: 2 }
    ]
  },
  {
    text: "Do you have high blood pressure (>140/90)?",
    type: "single",
    options: [
      { label: "Yes", points: 1 },
      { label: "No", points: 0 }
    ]
  },
  {
    text: "Are you diabetic?",
    type: "single",
    options: [
      { label: "Yes", points: 1 },
      { label: "No", points: 0 }
    ]
  },
  {
    text: "What is your cholesterol level?",
    type: "single",
    options: [
      { label: "< 200", points: 0 },
      { label: "200 – 239", points: 1 },
      { label: "> 240", points: 2 }
    ]
  },
  {
    text: "Do you smoke or drink?",
    type: "multi",
    options: [
      { label: "Smoker", points: 1 },
      { label: "Drinker", points: 1 }
    ]
  },
  {
    text: "Do you have congenital illness (HIV, COPD, etc.)?",
    type: "single",
    options: [
      { label: "Yes", points: 2 },
      { label: "No", points: 0 }
    ]
  },
  {
    text: "Are you on cardiac or steroid medications?",
    type: "single",
    options: [
      { label: "Yes", points: 1 },
      { label: "No", points: 0 }
    ]
  }
];

function startChat() {
  score = 0;
  currentQuestion = 0;
  userResponses = {};
  showQuestion();
}

function showQuestion() {
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = "";

  if (currentQuestion >= questions.length) {
    showResult();
    return;
  }

  const q = questions[currentQuestion];
  const questionElem = document.createElement("p");
  questionElem.textContent = q.text;
  chatbox.appendChild(questionElem);

  q.options.forEach((opt, index) => {
    const btn = document.createElement("button");
    btn.textContent = opt.label;
    btn.onclick = () => {
      score += opt.points;
      userResponses[q.text] = opt.label;

      if (q.type === "multi") {
        btn.disabled = true;
        btn.style.opacity = "0.6";
      } else {
        currentQuestion++;
        showQuestion();
      }
    };
    chatbox.appendChild(btn);
  });

  if (q.type === "multi") {
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => {
      currentQuestion++;
      showQuestion();
    };
    chatbox.appendChild(document.createElement("br"));
    chatbox.appendChild(nextBtn);
  }
}

function showResult() {
  const chatbox = document.getElementById("chatbox");
  chatbox.innerHTML = `<h3>Final Score: ${score}/10</h3>`;

  let risk = "";
  let advice = "";

  if (score <= 3) {
    risk = "LOW RISK";
    advice = "Recommended: Home rest. Monitor symptoms.";
  } else if (score <= 6) {
    risk = "MEDIUM RISK";
    advice = "Recommended: OPD visit to consult a physician.";
  } else {
    risk = "HIGH RISK";
    advice = "Recommended: Immediate ER visit. Suggest tests – ECG, Troponin, Echo, MRI.";
  }

  const resultElem = document.createElement("p");
  resultElem.innerHTML = `<strong>Risk Level:</strong> ${risk}<br><strong>${advice}</strong>`;
  chatbox.appendChild(resultElem);
}