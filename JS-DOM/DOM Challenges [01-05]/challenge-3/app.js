/**
 * Write your challenge solution here
 */
const nameInput = document.getElementById('nameInput');
const jobInput = document.getElementById('jobInput');
const ageInput = document.getElementById('ageInput');
const bioInput = document.getElementById('bioInput');
const nameDisplay = document.getElementById('nameDisplay');
const jobDisplay = document.getElementById('jobDisplay');
const ageDisplay = document.getElementById('ageDisplay');
const bioDisplay = document.getElementById('bioDisplay');

const updateDisplay = (input, display) => input.addEventListener('input', e => display.innerText = e.target.value || "Not provided");

updateDisplay(nameInput, nameDisplay);
updateDisplay(jobInput, jobDisplay);
updateDisplay(ageInput, ageDisplay);
updateDisplay(bioInput, bioDisplay);