function generateQuestion() {
    const_max_num = 50;
    const num1 = Math.floor(Math.random() * const_max_num);
    const num2 = Math.floor(Math.random() * const_max_num);
    const correctAnswer = num1 + num2;
  
    const questionText = `${num1} + ${num2}`;
    document.getElementById('question').textContent = `¿Cuál es el resultado de ${questionText}?`;
  
    const options = new Set();
    options.add(correctAnswer);
    while (options.size < 4) {
      const fake = correctAnswer + Math.floor(Math.random() * 10 - 5);
      if (fake !== correctAnswer && fake >= 0) {
        options.add(fake);
      }
    }
  
    const shuffled = Array.from(options).sort(() => Math.random() - 0.5);
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
  
    shuffled.forEach(option => {
      const button = document.createElement('button');
      button.textContent = option;
      button.onclick = () => checkAnswer(option, correctAnswer);
      optionsContainer.appendChild(button);
    });
  
    document.getElementById('feedback').textContent = '';
  }
  
  function checkAnswer(selected, correct) {
    const feedback = document.getElementById('feedback');
    if (selected === correct) {
      feedback.textContent = '¡Correcto!';
      feedback.style.color = 'green';
    } else {
      feedback.textContent = 'Incorrecto.';
      feedback.style.color = 'red';
    }
  
    setTimeout(generateQuestion, 1000);
  }
  
  document.addEventListener('DOMContentLoaded', generateQuestion);
  