'use strict';

const container = document.querySelector('#container');
const containerDim = 750;
const sides = 16;

function randomColorRGB() {
  return Math.floor(Math.random() * 255);
}

function createDiv() {
  let newDiv = document.createElement('div');
  newDiv.style.width = containerDim + 'px';
  newDiv.style.height = containerDim + 'px';
  newDiv.setAttribute(
    'style', `
    width: ${containerDim/sides + 'px'}; 
    height: ${containerDim/sides + 'px'};
    background-color: rgb(${randomColorRGB()}, ${randomColorRGB()}, ${randomColorRGB()});
    opacity: 0.6;
    `)
  container.appendChild(newDiv);
  console.log(newDiv);
}

for(let i = 0; i < sides ** 2; i++) {
  createDiv();
}