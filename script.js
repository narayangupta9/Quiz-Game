let currentQuestion = 0; let score = 0;

const questionEl = document.getElementById("question"); const optionsEl = document.getElementById("options"); const nextBtn = document.getElementById("nextBtn"); const scoreBox = document.getElementById("scoreBox");

function loadQuestion() { optionsEl.innerHTML = ""; let q = questions[currentQuestion]; questionEl.innerText = q.question;

q.options.forEach(option => {
    let btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => checkAnswer(btn, q.answer);
    optionsEl.appendChild(btn);
});

}

function checkAnswer(button, correctAnswer) { let buttons = optionsEl.querySelectorAll("button"); buttons.forEach(btn => { btn.disabled = true; if (btn.innerText === correctAnswer) { btn.classList.add("correct"); } });

if (button.innerText === correctAnswer) {
    score++;
} else {
    button.classList.add("wrong");
}

}

nextBtn.onclick = () => { currentQuestion++; if (currentQuestion < questions.length) { loadQuestion(); } else { showScore(); } };

function showScore() { document.getElementById("quiz-box").classList.add("hide"); scoreBox.classList.remove("hide"); scoreBox.innerText = "Your Score: " + score + " / " + questions.length; }

loadQuestion();
