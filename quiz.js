const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText = document.getElementById("questionCounter");
const scoreText = document.getElementById("score");

let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: "What does HTML stand for?",
        choice1: "Hyper Text Markup Language",
        choice2: "Hyper Tension Markup Language",
        choice3: "Hyper Text Makes Language",
        choice4: "None of the above",
        answer: 1,
    },
    {
        question: "What tag do you use to make a paragraph section in HTML?",
        choice1: "<div></div>",
        choice2: "<p></p>",
        choice3: "<section></section>",
        choice4: "None of the above",
        answer: 2,
    },
    {
        question: "What is the proper way to use git?",
        choice1: "Git push, Git commmit, Git pull, Git add, Git status",
        choice2: "Git commit, Git push, Git pull, Git add, Git status",
        choice3: "Git pull, Git status, Git add, Git commit, Git push",
        choice4: "None of the above",
        answer: 3,
    },
]

/* constans */

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 3;

startGame = () => {
    questionCounter = 0;
    score = 0;
    availableQuestions = [... questions];
    getNewQuestion();
}

getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter >= MAX_QUESTIONS) {
        localStorage.setItem("mostRecentScore", score);
        //go to the end page
        return window.location.assign("finish.html");
    };
    questionCounter++;
    questionCounterText.innerText = questionCounter + "/" + MAX_QUESTIONS;
    const questionIndex = Math.floor(Math.random() *availableQuestions.length);
    currentQuestion = availableQuestions[questionIndex];
    question.innerText = currentQuestion.question;

    choices.forEach( choice => {
        const number = choice.dataset["number"];
        choice.innerText = currentQuestion["choice" + number];
    })
    
    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers = true; 
};

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if(!acceptingAnswers) return;

        acceptingAnswers = false;
        const selectedChoice = e.target;
        const selectedAnswer = selectedChoice.dataset["number"];
        const classToApply = 
          selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

          if(classToApply === "correct") {
              incrementScore(CORRECT_BONUS);
          }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout( () => {
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        }, 1000)

    });
});

incrementScore = num => {
    score +=num;
    scoreText.innerText = score;
}

startGame();