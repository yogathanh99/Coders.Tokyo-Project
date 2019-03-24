const secondHandle = document.querySelector('.second-hand')
const minHandle = document.querySelector('.min-hand')
const hourHandle = document.querySelector('.hour-hand')

setInterval(() => {
  const now = new Date();
  const second = now.getSeconds();
  const secondDegrees = (second / 60) * 360 + 90;

  secondHandle.style.transform = `rotate(${secondDegrees}deg)`;

  const min = now.getMinutes();
  const minDegrees = (min / 60) * 360 + 90;

  minHandle.style.transform = `rotate(${minDegrees}deg)`;

  const hour = now.getHours();
  const hourDegrees = (hour / 12) * 360 + 90;

  hourHandle.style.transform = `rotate(${hourDegrees}deg)`;
}, 1000);