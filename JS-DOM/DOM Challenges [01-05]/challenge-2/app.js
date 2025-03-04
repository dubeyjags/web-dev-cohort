/**
 * Write your challenge solution here
 */
const heading = document.getElementById("mainHeading")
const redButton = document.getElementById("redButton")
const greenButton = document.getElementById("greenButton")
const blueButton = document.getElementById("blueButton")
const purpleButton = document.getElementById("purpleButton")
const resetButton = document.getElementById("resetButton")

redButton.addEventListener("click", () =>  heading.style.color = 'red');
greenButton.addEventListener("click", () =>  heading.style.color = 'green');
blueButton.addEventListener("click", () =>  heading.style.color = 'blue');
purpleButton.addEventListener("click", () =>  heading.style.color = 'purple');
resetButton.addEventListener("click", () =>  heading.style.color = '');

