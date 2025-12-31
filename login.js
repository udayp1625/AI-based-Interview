const hrBtn = document.getElementById("hrBtn");
const candidateBtn = document.getElementById("candidateBtn");
const hrForm = document.getElementById("hrForm");
const candidateForm = document.getElementById("candidateForm");

hrBtn.addEventListener("click", () => {
  hrBtn.classList.add("active");
  candidateBtn.classList.remove("active");
  hrForm.classList.add("active");
  candidateForm.classList.remove("active");
});

candidateBtn.addEventListener("click", () => {
  candidateBtn.classList.add("active");
  hrBtn.classList.remove("active");
  candidateForm.classList.add("active");
  hrForm.classList.remove("active");
});
