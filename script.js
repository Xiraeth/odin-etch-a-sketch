"use strict";

const container = document.querySelector(".container");
const resetBtn = document.querySelector(".remove");
const buttonsCategory = document.querySelector(".buttons");
const colorOptions = document.querySelectorAll(".colorOption");
const containerDimensions = 700;

const rangeContainer = document.querySelector(".rangerContainer");
const rangeValue = document.querySelector(".rangeValue");
const rangeInput = document.querySelector(".rangeInput");

let mouseDown = false;
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => (mouseDown = false);

let mode = "random rgb";
let color = "";
let smallDivs;
let side = rangeInput.value;

pageLoad();

function randomColorRGB() {
  return Math.floor(Math.random() * 255);
}

function swapActiveButton(btn) {
  if (!btn) return;

  colorOptions.forEach((button) => button.classList.remove("activeButton"));
  if (btn.classList.contains("input")) return;
  if (!btn.classList.contains("no-active")) btn.classList.add("activeButton");
}

function swapMode(btn) {
  if (!btn) return;
  if (btn.classList.contains("input")) {
    mode = "color";
    color = btn.value;
  } else mode = btn.textContent.toLowerCase();
}

function changeRangeText() {
  rangeValue.textContent = rangeInput.value;
}

function createGrid() {
  const side = rangeInput.value;
  container.innerHTML = "";

  for (let i = 0; i < side * side; i++) {
    const square = document.createElement("div");
    square.classList.add("square");
    square.style.width = `${containerDimensions / rangeInput.value}px`;
    square.style.height = `${containerDimensions / rangeInput.value}px`;
    square.addEventListener("mouseover", draw);
    square.addEventListener("mousedown", draw);
    container.appendChild(square);
  }
}

function clearGrid() {
  container.innerHTML = "";
  createGrid();
}

function draw(e) {
  const square = e.target;
  if (e.type == "mouseover" && !mouseDown) return;

  if (!square.classList.contains("square")) return;

  if (mode == "random rgb") {
    square.style.backgroundColor = `rgb(${randomColorRGB()},${randomColorRGB()},${randomColorRGB()})`;
  } else if (mode == "black") {
    square.style.backgroundColor = `black`;
  } else if (mode == "color") square.style.backgroundColor = color;
}

function pageLoad() {
  createGrid();
  changeRangeText();
}

container.addEventListener("mousedown", function (e) {
  draw(e);
});
resetBtn.addEventListener("click", clearGrid);
rangeInput.addEventListener("input", () => {
  changeRangeText();
  createGrid();
});
buttonsCategory.addEventListener("click", (e) => {
  swapActiveButton(e.target.closest(".colorOption"));
  swapMode(e.target.closest(".colorOption"));
});
buttonsCategory.addEventListener("input", (e) => {
  swapMode(e.target.closest(".colorOption"));
});

/*
function applyColor(e) {
  if (e.type == "mouseover" && !mouseDown) return;
  if (mode == "rgb")
    div.style.backgroundColor = `rgb(${randomColorRGB()}, ${randomColorRGB()}, ${randomColorRGB()})`;
  else if (mode == "black") div.style.backgroundColor = `0, 0, 0`;
}

function addEventListeners(divs, btn) {
  divs.forEach((div) =>
    // div.addEventListener("mouseenter", () => {
    //   div.style.backgroundColor = `rgb(${randomColorRGB()}, ${randomColorRGB()}, ${randomColorRGB()})`;
    // })
    div.addEventListener("mouseover", applyColor)
  );

  btn.addEventListener("click", (e) => {
    divs.forEach((div) => (div.style.backgroundColor = "rgba(0,0,0, 0.5)"));
  });
}

function createDiv(divsPerSide, con) {
  for (let i = 0; i < divsPerSide ** 2; i++) {
    let newDiv = document.createElement("div");
    newDiv.classList.add(`smallDiv`);

    newDiv.setAttribute(
      "style",
      `
      width: ${containerDimensions / divsPerSide + "px"}; 
      height: ${containerDimensions / divsPerSide + "px"};
      background-color: rgba(0,0,0, 0.5);
      `
    );
    con.appendChild(newDiv);
  }
  smallDivs = document.querySelectorAll(".smallDiv");
  addEventListeners(smallDivs, resetColorsBtn);
}

createDiv(side, container);
rangeValue.textContent = `Squares per side: ${rangeInput.value}`;

rangeInput.oninput = function () {
  side = this.value;
  document.querySelector(".container").remove();

  const newContainer = document.createElement("div");
  newContainer.classList.add("container");
  rangeContainer.insertAdjacentHTML("afterend", newContainer);

  createDiv(side, newContainer);
  addEventListeners(smallDivs, resetColorsBtn);
  rangeValue.textContent = `Squares per side: ${this.value}`;
};
*/
