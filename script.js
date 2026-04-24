/**
 * script.js — DevQuiz game logic
 *
 * Depends on:
 *   questions  (array)  — loaded from questions.js
 *   DOM IDs              — defined in index.html
 */

/* ── Constants ── */
const LETTERS   = ['A', 'B', 'C', 'D'];
const TAG_FILES = { js: 'closures.js', dsa: 'algorithms.py', da: 'analysis.sql' };

/* ── State ── */
let current  = 0;
let score    = 0;
let answered = false;

/* ── DOM references ── */
const qBody      = document.getElementById('q-body');
const qTag       = document.getElementById('q-tag');
const qText      = document.getElementById('q-text');
const qCode      = document.getElementById('q-code');
const optionsEl  = document.getElementById('options');
const expEl      = document.getElementById('explanation');
const nextBtn    = document.getElementById('next-btn');
const liveScore  = document.getElementById('live-score');
const liveTotal  = document.getElementById('live-total');
const progFill   = document.getElementById('progress-fill');
const progLabel  = document.getElementById('prog-label');
const progPct    = document.getElementById('prog-pct');
const qCounter   = document.getElementById('q-counter');
const tabFile    = document.getElementById('tab-file');
const cardFoot   = document.getElementById('card-foot');
const resultEl   = document.getElementById('result-screen');
const restartBtn = document.getElementById('restart-btn');

/* ── Init ── */
liveTotal.textContent = questions.length;

/* ================================================================
   renderQuestion
   Populates the card with the current question's content.
   ================================================================ */
function renderQuestion() {
  answered = false;
  nextBtn.classList.remove('visible');
  expEl.classList.remove('show');
  expEl.style.display = 'none';

  const q = questions[current];

  /* Progress */
  const pct = Math.round((current / questions.length) * 100);
  progFill.style.width    = pct + '%';
  progLabel.textContent   = `Question ${current + 1} of ${questions.length}`;
  progPct.textContent     = pct + '%';
  qCounter.textContent    =
    String(current + 1).padStart(2, '0') + ' / ' +
    String(questions.length).padStart(2, '0');
  tabFile.textContent     = TAG_FILES[q.category] || 'quiz.js';

  /* Category tag */
  qTag.className         = 'q-tag q-tag-' + q.category;
  qTag.innerHTML         = `<span>${q.label}</span>`;

  /* Question text */
  qText.textContent      = q.text;

  /* Optional code snippet */
  if (q.code) {
    qCode.style.display  = 'block';
    qCode.innerHTML      = q.code;
  } else {
    qCode.style.display  = 'none';
  }

  /* Build option buttons */
  optionsEl.innerHTML = '';
  q.options.forEach((optText, i) => {
    const btn             = document.createElement('button');
    btn.className         = 'opt-btn';
    btn.innerHTML         =
      `<span class="opt-letter">${LETTERS[i]}</span><span>${optText}</span>`;
    btn.addEventListener('click', () => handleSelect(btn, i));
    optionsEl.appendChild(btn);
  });
}

/* ================================================================
   handleSelect
   Called when the user clicks an option button.
   ================================================================ */
function handleSelect(clickedBtn, selectedIndex) {
  if (answered) return;
  answered = true;

  const q    = questions[current];
  const btns = optionsEl.querySelectorAll('.opt-btn');

  /* Disable all buttons */
  btns.forEach(b => (b.disabled = true));

  /* Always highlight the correct answer */
  btns[q.answer].classList.add('show-correct');

  if (selectedIndex === q.answer) {
    /* Correct — override show-correct with the stronger correct style */
    clickedBtn.classList.remove('show-correct');
    clickedBtn.classList.add('correct');
    score++;
  } else {
    /* Wrong — mark the clicked button red */
    clickedBtn.classList.add('wrong');
  }

  /* Update live score */
  liveScore.textContent = score;

  /* Show explanation */
  expEl.innerHTML     = `<strong>Explanation:</strong> ${q.explanation}`;
  expEl.style.display = 'block';
  expEl.classList.add('show');

  /* Reveal Next button */
  nextBtn.classList.add('visible');
}

/* ================================================================
   Event: Next button
   ================================================================ */
nextBtn.addEventListener('click', () => {
  current++;
  if (current < questions.length) {
    /* Re-trigger fade-in animation */
    qBody.style.animation = 'none';
    void qBody.offsetWidth;          // force reflow
    qBody.style.animation = '';
    renderQuestion();
  } else {
    showResult();
  }
});

/* ================================================================
   showResult
   Displays the final score screen.
   ================================================================ */
function showResult() {
  /* Hide question UI */
  qBody.style.display     = 'none';
  cardFoot.style.display  = 'none';

  /* Complete the progress bar */
  progFill.style.width   = '100%';
  progLabel.textContent  = 'Quiz complete!';
  progPct.textContent    = '100%';

  /* Reveal result panel */
  resultEl.classList.add('show');

  const total = questions.length;
  const pct   = Math.round((score / total) * 100);

  document.getElementById('res-score').textContent = `${score} / ${total}`;
  document.getElementById('res-pct').textContent   = pct + '%';

  /* Grade + message */
  let grade, title, sub, verdict;

  if (pct >= 90) {
    grade   = 'S';
    title   = '🏆 Outstanding!';
    sub     = "You're a genuine dev expert";
    verdict = `<em>S-tier score.</em> You clearly know your data structures, async JavaScript, and analytics fundamentals cold. Ship it.`;
  } else if (pct >= 75) {
    grade   = 'A';
    title   = '🎉 Solid work!';
    sub     = 'Strong fundamentals across all topics';
    verdict = `<em>A-tier.</em> Great result. A few gaps, but your foundation is solid. Review the questions you missed and you'll be unstoppable.`;
  } else if (pct >= 55) {
    grade   = 'B';
    title   = '💡 Good effort!';
    sub     = 'Decent grasp — room to level up';
    verdict = `<em>B-tier.</em> You have a working knowledge but some concepts need reinforcing. Focus on the explanations above — especially event-loop order and Big O analysis.`;
  } else if (pct >= 40) {
    grade   = 'C';
    title   = '📚 Keep going!';
    sub     = 'The fundamentals need more practice';
    verdict = `<em>C-tier.</em> This quiz covers tricky edge cases. Review closures, hash tables, SQL aggregations, and statistical fundamentals — re-quiz in a day or two.`;
  } else {
    grade   = 'D';
    title   = '🌱 Just starting out';
    sub     = 'Great that you tried — now dig in!';
    verdict = `<em>D-tier — no worries.</em> Everyone starts somewhere. Read up on JS closures, Big O notation, and basic SQL GROUP BY, then come back and crush it.`;
  }

  document.getElementById('result-title').textContent = title;
  document.getElementById('result-sub').textContent   = sub;
  document.getElementById('res-grade').textContent    = grade;
  document.getElementById('verdict').innerHTML        = verdict;
}

/* ================================================================
   Event: Restart button
   ================================================================ */
restartBtn.addEventListener('click', () => {
  /* Reset state */
  current  = 0;
  score    = 0;
  answered = false;

  /* Reset live score display */
  liveScore.textContent = 0;

  /* Show question UI */
  qBody.style.display    = '';
  cardFoot.style.display = '';
  resultEl.classList.remove('show');

  renderQuestion();
});

/* ── Kick off ── */
renderQuestion();
 
