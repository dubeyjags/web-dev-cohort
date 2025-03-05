/**
 * Write your challenge solution here
 */
const clock = document.querySelector('.clock')
const hour = document.querySelector('.hour')
const minute = document.querySelector('.minute')
const second = document.querySelector('.second')
const time = document.querySelector('.digital-clock')
const date = document.querySelector('.date')
let currentDate = new Date();


for (let i = 1; i <= 12; i++) {
    let number = document.createElement("div")
    let span = document.createElement("span")
    number.classList.add('number')
    span.innerText=i; 
    number.appendChild(span) 
    clock.appendChild(number);     
    number.style.setProperty("--rotation", 30*i+"deg");
}

function setClock(){
    let dateNow = new Date();
    hour.style.transform = `rotate(${((dateNow.getHours() + 24) % 12 || 12)*30}deg)`;
    minute.style.transform = `rotate(${dateNow.getMinutes() * 6}deg)`;
    second.style.transform = `rotate(${dateNow.getSeconds() * 6}deg)`;
}
setClock();
function setTime(){
    let dateNow = new Date();
    let hrs = dateNow.getHours() < 10 ? '0'+ dateNow.getHours() : dateNow.getHours();
    let min = dateNow.getMinutes() < 10 ? '0'+ dateNow.getMinutes() : dateNow.getMinutes();
    let sec = dateNow.getSeconds() < 10 ? '0'+ dateNow.getSeconds() : dateNow.getSeconds();
    time.innerText = `${hrs}:${min}:${sec}`
}
setTime();

setInterval(function(){
    setTime();
    setClock();
},1000)

const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const month = ["January","February","March","April","May","June","July","August","September","October","November","December"];
date.innerText = `${weekday[currentDate.getDay()]} ${currentDate.getDate()} ${weekday[currentDate.getMonth()]} ${currentDate.getFullYear()}`
