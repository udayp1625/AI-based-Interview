let stream;
let audioContext;
let analyser;
let micSource;

async function initDevices() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true
    });

    document.getElementById("videoPreview").srcObject = stream;
    document.getElementById("systemVideo").srcObject = stream;

    setupMicLevel(stream);
    loadDevices();

  } catch (err) {
    alert("Camera and microphone permission is required to continue.");
  }
}

function setupMicLevel(stream) {
  audioContext = new AudioContext();
  analyser = audioContext.createAnalyser();
  micSource = audioContext.createMediaStreamSource(stream);

  micSource.connect(analyser);
  analyser.fftSize = 256;

  const dataArray = new Uint8Array(analyser.frequencyBinCount);

  function updateLevel() {
    analyser.getByteFrequencyData(dataArray);

    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }

    let volume = sum / dataArray.length;
    let percent = Math.min((volume / 128) * 100, 100);

    document.getElementById("micBar").style.width = percent + "%";
    requestAnimationFrame(updateLevel);
  }

  updateLevel();
}

async function loadDevices() {
  const devices = await navigator.mediaDevices.enumerateDevices();

  const micSelect = document.getElementById("micSelect");
  const speakerSelect = document.getElementById("speakerSelect");

  micSelect.innerHTML = "";
  speakerSelect.innerHTML = "";

  devices.forEach(device => {
    const option = document.createElement("option");
    option.value = device.deviceId;

    if (device.kind === "audioinput") {
      option.textContent = device.label || "Microphone";
      micSelect.appendChild(option);
    }

    if (device.kind === "audiooutput") {
      option.textContent = device.label || "Speaker";
      speakerSelect.appendChild(option);
    }
  });
}

function testSpeaker() {
  const audio = new Audio(
    "https://www.soundjay.com/buttons/sounds/button-3.mp3"
  );
  audio.play();
}

function showSystemTest() {
  document.getElementById("mediaCheckContent").classList.add("hidden");
  document.getElementById("systemTestContent").classList.remove("hidden");
}

function startDemoRecord() {
  alert("Demo recording started");
  // window.location.href = "interview.html";
}

initDevices();
