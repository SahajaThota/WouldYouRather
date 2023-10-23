document.addEventListener("DOMContentLoaded", function () {
    let currentQuestion; 
    let questionsData; 
  
    
    function fetchQuestions() {
      fetch("questions.json")
        .then((response) => response.json())
        .then((data) => {
          questionsData = data;
          displayRandomQuestion();
        })
        .catch((error) => console.error("Error fetching questions: " + error));
    }
  
    
    function displayRandomQuestion() {
      const questionContainer = document.getElementById("question");
      const option1Button = document.getElementById("option1");
      const option2Button = document.getElementById("option2");
  
      
      currentQuestion = questionsData[Math.floor(Math.random() * questionsData.length)];
  
      
      questionContainer.textContent = currentQuestion.question;
      option1Button.textContent = currentQuestion.option1.text;
      option2Button.textContent = currentQuestion.option2.text;
  
      
      option1Button.disabled = false;
      option2Button.disabled = false;
    }
  
    
    function submitAnswer(option) {
      
      const percentage = currentQuestion[option].percentage;
      const questionContainer = document.getElementById("question");
      questionContainer.textContent = `You chose ${currentQuestion[option].text} (${percentage}%)`;
  
      
      document.getElementById(option).disabled = true;
      document.getElementById(option === "option1" ? "option2" : "option1").disabled = true;
  
      
      setTimeout(displayRandomQuestion, 1500); 
    }
  
    
    fetchQuestions();
  
    
    document.getElementById("option1").addEventListener("click", () => submitAnswer("option1"));
    document.getElementById("option2").addEventListener("click", () => submitAnswer("option2"));
  });
  