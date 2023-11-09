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
  } else if (btn.classList.contains("delete")) {
    mode = "eraser";
  } else mode = btn.textContent.toLowerCase();
  console.log(mode);
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
  } else if (mode == "color") square.style.backgroundColor = color;
  else if (mode == "black") {
    square.style.backgroundColor = `black`;
  } else if (mode == "eraser") {
    square.style.backgroundColor = "";
  }
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
