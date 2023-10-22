document.addEventListener("DOMContentLoaded", function () {
    let currentQuestion; // Store the current question data
    let questionsData; // Store all questions data
  
    // Function to fetch questions from questions.json
    function fetchQuestions() {
      fetch("questions.json")
        .then((response) => response.json())
        .then((data) => {
          questionsData = data;
          displayRandomQuestion();
        })
        .catch((error) => console.error("Error fetching questions: " + error));
    }
  
    // Function to display a random question and options
    function displayRandomQuestion() {
      const questionContainer = document.getElementById("question");
      const option1Button = document.getElementById("option1");
      const option2Button = document.getElementById("option2");
  
      // Randomly select a question from the JSON data
      currentQuestion = questionsData[Math.floor(Math.random() * questionsData.length)];
  
      // Display the question and options on the page
      questionContainer.textContent = currentQuestion.question;
      option1Button.textContent = currentQuestion.option1.text;
      option2Button.textContent = currentQuestion.option2.text;
  
      // Enable the buttons in case they were disabled
      option1Button.disabled = false;
      option2Button.disabled = false;
    }
  
    // Function to handle option selection
    function submitAnswer(option) {
      // Get the selected option's percentage and display it
      const percentage = currentQuestion[option].percentage;
      const questionContainer = document.getElementById("question");
      questionContainer.textContent = `You chose ${currentQuestion[option].text} (${percentage}%)`;
  
      // Disable the buttons after the answer is submitted
      document.getElementById(option).disabled = true;
      document.getElementById(option === "option1" ? "option2" : "option1").disabled = true;
  
      // After a brief delay, load the next question
      setTimeout(displayRandomQuestion, 8500); // 1500 milliseconds (1.5 seconds) delay
    }
  
    // Call the fetchQuestions function to load a random question on page load
    fetchQuestions();
  
    // Add event listeners to the option buttons to handle option selection
    document.getElementById("option1").addEventListener("click", () => submitAnswer("option1"));
    document.getElementById("option2").addEventListener("click", () => submitAnswer("option2"));
  });
  