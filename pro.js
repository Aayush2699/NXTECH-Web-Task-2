const questions = [
    {
        question: "Which is the largest contry in the world?",
        answers: [
            { text: "India", correct: false},
            { text: "USA", correct: false},
            { text: "Russia", correct: true},
            { text: "China", correct: false},
        ]
    },
    {
        question: "Which is the largest animal in the world?",
        answers: [
            { text: "Lion", correct: false},
            { text: "Blue whale", correct: true},
            { text: "Elephant", correct: false},
            { text: "Camel", correct: false},
        ]
    },
    {
        question: "Who invented java programming?",
        answers: [
            { text: "James Gosling", correct: true},
            { text: "dennis Ritchie", correct: false},
            { text: "Bjarne Stroustrup", correct: false},
            { text: "Guido Van Rossum", correct: false},
        ]
    },
    {
        question: "What does the abbreviation HTML stand for?",
        answers: [
            { text: "High Text Markup Language", correct: false},
            { text: "Hyper Text Markup Language", correct: true},
            { text: "Hyper Text Markdown Language", correct: false},
            { text: "None of the above", correct: false},
        ]
    },
    {
        question: " Which one of the following is not a Java feature?",
        answers: [
            { text: "Object-oriented", correct: false},
            { text: "Portable", correct: false},
            { text: "Dynamic and Extensible", correct: false},
            { text: "Use of pointers", correct: true},
        ]
    },
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer =>{
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    } else {
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    } else {
        startQuiz();
    }
});

startQuiz();

