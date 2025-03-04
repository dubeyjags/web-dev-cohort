/**
 * Write your challenge solution here
 */

const body = document.getElementById("body");
const btn = document.getElementById("toggleButton");
const bulb = document.getElementById("bulb");
const switchStatus = document.getElementById("status");

btn.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    bulb.classList.toggle('off');
    if(btn.innerText == 'Turn On'){
        btn.innerText = 'Turn Off';
        switchStatus.innerText = 'Status: On';
    } else {
        btn.innerText = 'Turn On';
        switchStatus.innerText = 'Status: Off';
    }
});