'use strict';

const container = document.querySelector('.container');
const resetColorsBtn = document.querySelector('.remove');
const changeSizeBtn = document.querySelector('.prompt');
const containerDimensions = 750;
let smallDivs;
let side = 5;

function randomColorRGB() {
  return Math.floor(Math.random() * 255);
}

function addEventListeners(divs, btn) {
  divs.forEach(div => div.addEventListener('mouseenter', () => {
    div.style.backgroundColor = `rgb(${randomColorRGB()}, ${randomColorRGB()}, ${randomColorRGB()})`;
  }))
  
  btn.addEventListener('click', e => {
    divs.forEach(div => div.style.backgroundColor = 'rgba(0,0,0, 0.5)');
  })
}

function createDiv(divsPerSide, con) {
  for(let i = 0; i < divsPerSide ** 2; i++) {
    let newDiv = document.createElement('div');
    newDiv.classList.add(`smallDiv`);

    newDiv.setAttribute(
      'style', `
      width: ${containerDimensions / divsPerSide + 'px'}; 
      height: ${containerDimensions / divsPerSide + 'px'};
      background-color: rgba(0,0,0, 0.5);
      `)
    con.appendChild(newDiv);
  }
  smallDivs = document.querySelectorAll('.smallDiv');
  addEventListeners(smallDivs, resetColorsBtn);
}

createDiv(side, container);

changeSizeBtn.addEventListener('click', () => {
  do {
    side = Number(prompt(`How many squares per side do you want your box to have? (it has to be fewer than 100) `));
  } while(side > 100 || side <= 0 || Number(side) !== side);
  container.remove();

  const newContainer = document.createElement('div');
  newContainer.classList.add('container');
  document.body.insertAdjacentElement('afterbegin', newContainer);

  createDiv(side, newContainer);
  addEventListeners(smallDivs, resetColorsBtn);
})