class Questions {
  constructor(question, answers = []) {
    this.question = question;
    this.answers = answers; //[] array of answers 
  }
}
/////////
class Answers {
  constructor(text, Correct = false) { 
    this.text = text; 
    this.Correct = Correct;
  }
}
const qu1 = new Questions(
  "Which one of the following is an ternary operator ?",
  [new Answers("?", true), new Answers(":"), new Answers("_"), new Answers("+")]
); 
//
const qu2 = new Questions(
  "Which HTML element is used to put the JavaScript code?",
  [
    new Answers("JavaScript"),
    new Answers("script", true),
    new Answers("js"),
    new Answers("srcipt"),
  ]
);
//
const qu3 = new Questions("Html stands for ____ .", [
  new Answers("HighText Machine Language"),
  new Answers("HyperText and links Markup Language"),
  new Answers("HyperText Markup Language", true),
  new Answers("None of these"),
]);
///
const qu4 = new Questions(
  "Which of the following HTML attribute is used to define inline styles?",
  [
    new Answers("style", true),
    new Answers("type"),
    new Answers("class"),
    new Answers("None of the above"),
  ]
);
//
const qu5 = new Questions(
  "An HTML program is saved by using the ____ extension.",
  [
    new Answers("htm"),
    new Answers(".html", true),
    new Answers(".hml"),
    new Answers("the first and the second answer are true "),
  ]
);
//to make the array of abject random

var index = 0;
const questions = [qu1, qu2, qu3, qu4, qu5];
const shuffleArrQuestion = questions.sort(() => Math.random() - 0.5); 
// to display the question and answers
// console.log(questions[0].question);

function displayQuestionAndAnswers() { 
  const answerDivs = document.querySelectorAll(".answer"); // Select all divs with the "answer" class
  document.querySelector(".question").textContent = questions[index].question; // display the question
  for (let i = 0; i < questions[index].answers.length; i++) {
    answerDivs[i].textContent = questions[index].answers[i].text; // to display the answers of question
    // Check if the current answer is the selected answer, and set background color accordingly
  }
}
displayQuestionAndAnswers();

//
const btnNext = document.querySelector(".btnNext");
const btnPrev = document.querySelector(".btnPrev");
//
const buttons = document.querySelector(".buttons");
buttons.addEventListener("click", function (e) {
  if (e.target.id === "next") { 
    index++;
    if (index > questions.length - 1) {
      btnNext.disabled = true;
      btnNext.style.background = "gray";
      btnPrev.disabled = false;
    } else {
      btnPrev.disabled = false;
      btnPrev.style.background = "#0e77a0";
    }
    displayQuestionAndAnswers();
    btnPrev.style.display = "inline";
    document.querySelector(".active").innerHTML = index + 1;
  }
  ///
  if (e.target.id === "prev") {
    index--;

    if (index == 0) {
      btnPrev.disabled = true;
      btnPrev.style.background = "gray";
      btnNext.disabled = false;
    } else {
      btnNext.disabled = false;
      btnNext.style.background = "#0e77a0";
    }
    displayQuestionAndAnswers();
    document.querySelector(".active").innerHTML = index + 1;
  }
});
const marked = [];
///
function MarkedQuestion() { 
  const flag = document.querySelector(".flag");
  flag.addEventListener("click", function () {
    // console.log(questions[index].question);

    if (!marked.includes(questions[index].question)) { 
      marked.push(questions[index].question);
      const questionMark = document.createElement("button");
      ////////////
      const removeMark = document.createElement("button");
      removeMark.textContent = "Delete";
      document.querySelector(".div_marks").append(questionMark);
      document.querySelector(".div_marks").append(removeMark);
      removeMark.setAttribute("class", "removeMark");
      removeMark.setAttribute("id", index);

      ////////////////////////////////////
      questionMark.setAttribute("class", "MarkedQuestion");
      questionMark.innerHTML += ` Question ${`<span>${index + 1} </span>`}`; // to write quesion 1|2|3|
      questionMark.setAttribute("id", index); // set attru to id current

      /////////////
      questionMark.addEventListener("click", function () {
        index = parseInt(this.id); // the id that i set it to the equal the current
        displayQuestionAndAnswers(); //call the fuction that display the questions and answers
        document.querySelector(".active").innerHTML = +index + 1; /// set the button current when marked the curren question
        /////////////////////
      });
      removeMark.addEventListener("click", function (e) {
        marked[e.target.id] = ""; 

        questionMark.remove();
        removeMark.remove();
      });
    }
  });
}
MarkedQuestion();

//////////////////////////////////////////countdownTimer
const startingMinutes = 2;
const countdownTimer = document.getElementById("countdown");
let time = startingMinutes * 60;

function updateCountdown() {
  const minutes = Math.floor(time / 60);
  let seconds = time % 60;
  seconds = seconds < 10 ? "0" + seconds : seconds;
  countdownTimer.innerHTML = `${minutes}:${seconds}`;
  time--;
  if (time < 0) {
    clearInterval(timer); 
    const result = calculateResult(questions);
    localStorage.setItem("quizResult", result);
    location.replace("timeout.html");
  }
}

//calculate result
function calculateResult(questions) {
  let correctCount = 0;
  questions.forEach((question) => {
    const selectedAnswer = question.answers[question.selectedAnswer];
    if (selectedAnswer && selectedAnswer.Correct) {
      correctCount++;
    }
  });
  return correctCount;
}

const timer = setInterval(updateCountdown, 1000);
// Function to handle answer selection
function handleAnswerSelection(event) {
  const answersSelect = document.querySelectorAll(".answer");
  answersSelect.forEach((answerDiv) => {
    answerDiv.classList.remove("selected");
    answerDiv.style.backgroundColor = ""; 
  });
  event.target.classList.add("selected");
  event.target.style.backgroundColor = "rgb(241, 170, 5) ";

  // Update the selected answer in the questions array
  const selectedAnswerIndex = Array.from(answersSelect).indexOf(event.target);
  questions[index].selectedAnswer = selectedAnswerIndex;
}
const answersSelect = document.querySelectorAll(".answer");
answersSelect.forEach((answer) => {
  answer.addEventListener("click", handleAnswerSelection);
});

function displayQuestionAndAnswers() {
  const answerDivs = document.querySelectorAll(".answer"); 
  document.querySelector(".question").textContent =
    shuffleArrQuestion[index].question; // display the question
  // Retrieve the selected answer index for the current question
  const selectedAnswerIndex = questions[index].selectedAnswer;
  for (let i = 0; i < questions[index].answers.length; i++) {
    answerDivs[i].textContent = questions[index].answers[i].text; 
    if (i === selectedAnswerIndex) {
      answerDivs[i].classList.add("selected");
      answerDivs[i].style.backgroundColor = "#8ab3b2"; 
    } else {
      answerDivs[i].classList.remove("selected");
      answerDivs[i].style.backgroundColor = ""; 
    }
  }
}
displayQuestionAndAnswers();

//submitAnswers
const submitButton = document.querySelector("button[type='submit']");
submitButton.addEventListener("click", function () {
  const result = calculateResult(questions);
  localStorage.setItem("quizResult", result);
  location.replace("result.html");
});
