let questions = [
  "Introduce yourself.",
  "What is HTML?",
  "Explain CSS.",
  "What is JavaScript?",
  "What is frontend development?"
];

let current = 0;
let score = 0;

document.getElementById("question").innerText = questions[current];

navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    document.getElementById("camera").srcObject = stream;
  });

const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = "en-IN";

function startRecording() {
  document.getElementById("status").innerText = "Listening...";
  recognition.start();
}

recognition.onresult = (event) => {
  document.getElementById("answer").value =
    event.results[0][0].transcript;
  document.getElementById("status").innerText = "Answer captured ✔";
};

function submitAnswer() {
  let ans = document.getElementById("answer").value.trim();

  if (ans === "") {
    alert("Please answer the question");
    return;
  }

  if (ans.length > 15) score++;

  current++;

  if (current < questions.length) {
    document.getElementById("question").innerText = questions[current];
    document.getElementById("answer").value = "";
  } else {
    window.location.href = "result.html?score=" + score;
  }
}

function closeInterview() {
  const confirmExit = confirm(
    "Are you sure you want to close the interview?\nYour progress will be submitted."
  );

  if (confirmExit) {
    document.body.innerHTML = `
      <div style="
        height:100vh;
        display:flex;
        align-items:center;
        justify-content:center;
        background:linear-gradient(180deg,#f9fffe,#f1fdfb);
        font-family:Inter,Segoe UI,sans-serif;
      ">
        <div style="
          background:#ffffff;
          padding:40px 50px;
          border-radius:20px;
          text-align:center;
          box-shadow:0 20px 40px rgba(20,184,166,0.25);
          max-width:420px;
        ">
          <h2 style="color:#0f766e; margin-bottom:12px;">
            ✅ Interview Completed
          </h2>
          <p style="color:#374151; font-size:16px;">
            Your interview has been completed successfully.
          </p>
          <p style="color:#374151; font-size:15px; margin-top:6px;">
            📩 The result will be sent to your email shortly.
          </p>
        </div>
      </div>
    `;
  }
}
setTimeout(() => {
  window.location.href = "login.html";
}, 15000);


/* 🔊 LISTEN QUESTION (TEXT TO SPEECH) */

window.speechSynthesis.onvoiceschanged = () => {
  window.speechSynthesis.getVoices();
};

function listenQuestion() {
  const text = document.getElementById("question").innerText;

  if (!text || text.toLowerCase().includes("loading")) {
    alert("Question is not ready yet");
    return;
  }

  window.speechSynthesis.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-IN";
  utterance.rate = 1;
  utterance.pitch = 1;

  const voices = window.speechSynthesis.getVoices();
  if (voices.length > 0) {
    utterance.voice = voices.find(v => v.lang === "en-IN") || voices[0];
  }

  window.speechSynthesis.speak(utterance);
}
let time = 30 * 60; // 30 minutes

setInterval(() => {
  let min = Math.floor(time / 60);
  let sec = time % 60;

  document.getElementById("timer").innerText =
    `${min}:${sec < 10 ? "0" : ""}${sec}`;

  if (time <= 0) {
    window.location.href = "result.html?score=" + score;
  }

  time--;
}, 1000);
