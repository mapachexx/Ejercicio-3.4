const questions = [
    {
      question: "¿Cuál es el resultado correcto de la operación 5 + 3?",
      options: ["6", "7", "8", "10"],
      correct: "8"
    },
    {
      question: "¿Cuál es el resultado correcto de la operación 10 - 6?",
      options: ["3", "5", "4", "2"],
      correct: "4"
    },
    {
      question: "¿Cuál es el resultado correcto de la operación 7 * 2?",
      options: ["12", "15", "14", "10"],
      correct: "14"
    },
    {
      question: "¿Cuál es el resultado correcto de la operación 12 / 4?",
      options: ["2", "3", "4", "5"],
      correct: "3"
    }
  ];
  
  let currentIndex = 0;
  let log = [];
  
  function showQuestion() {
    const questionContainer = document.getElementById("question-container");
    const optionsContainer = document.getElementById("options-container");
    const current = questions[currentIndex];
  
    questionContainer.textContent = current.question;
    optionsContainer.innerHTML = "";
  
    current.options.forEach(option => {
      const btn = document.createElement("button");
      btn.className = "option";
      btn.textContent = option;
      btn.onclick = () => submitAnswer(option);
      optionsContainer.appendChild(btn);
    });
  }
  
  function submitAnswer(selected) {
    const feedback = document.getElementById("feedback");
    const current = questions[currentIndex];
  
    log.push({
      question: current.question,
      selected,
      correct: current.correct
    });
  
    if (selected === current.correct) {
      feedback.textContent = "¡Correcto!";
      feedback.style.color = "green";
      currentIndex++;
      if (currentIndex < questions.length) {
        setTimeout(() => {
          feedback.textContent = "";
          showQuestion();
        }, 1000);
      } else {
        feedback.textContent = "¡Test completado!";
        localStorage.setItem("calcTestLog", JSON.stringify(log));
      }
    } else {
      feedback.textContent = "Incorrecto, intentá de nuevo.";
      feedback.style.color = "red";
    }
  }
  
  document.addEventListener("DOMContentLoaded", showQuestion);
  