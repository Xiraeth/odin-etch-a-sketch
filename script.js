'use strict';

const container = document.querySelector('#container');
const containerDim = 750;
const side = 16;
const smallDivModifier = 0.8;
let count = 0;

function randomColorRGB() {
  return Math.floor(Math.random() * 255);
}

function createDiv() {
  let newDiv = document.createElement('div');
  newDiv.classList.add(`smallDiv`);

  newDiv.setAttribute(
    'style', `
    width: ${containerDim/side + 'px'}; 
    height: ${containerDim/side + 'px'};
    background-color: rgba(0,0,0, 0.5);
    `)
  count++;
  container.appendChild(newDiv);
}

for(let i = 0; i < side ** 2; i++) {
  createDiv();
}

const smallDivs = document.querySelectorAll('.smallDiv');

smallDivs.forEach(div => div.addEventListener('mouseenter', () => {
  div.style.backgroundColor = `rgb(${randomColorRGB()}, ${randomColorRGB()}, ${randomColorRGB()})`;
}))
