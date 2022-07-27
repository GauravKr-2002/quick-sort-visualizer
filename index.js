let randomize_array = document.getElementById("randomize_array_btn");
let sort_btn = document.getElementById("sort_btn");
let bars_container = document.getElementById("bars_container");
let speed = document.getElementById("speed");
let sizeSelecter = document.querySelector(".size_selecter");
let minRange = 1;
let maxRange = 10;
let numOfBars = 10;
let heightFactor = 20;
let speedFactor = 500;
let unsorted_array = new Array(numOfBars);
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".close-modal");
const btnOpenModal = document.querySelector(".show-modal");
const btnSubmit = document.querySelector(".btn__submit");
const numEle = document.querySelector(".number_elements");
const arrayEle = document.querySelector(".array_elements");

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

btnOpenModal.addEventListener("click", openModal);
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

sizeSelecter.addEventListener("change", function () {
  numOfBars = sizeSelecter.value;
  maxRange = sizeSelecter.value;
  console.log(numOfBars);
  bars_container.innerHTML = "";
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

speed.addEventListener("change", (e) => {
  speedFactor = parseInt(e.target.value);
});

function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min + 1;
}

function createRandomArray() {
  let array = new Array(numOfBars);
  for (let i = 0; i < numOfBars; i++) {
    array[i] = randomNum(minRange, maxRange);
  }

  return array;
}

document.addEventListener("DOMContentLoaded", function () {
  unsorted_array = createRandomArray();
  renderBars(unsorted_array);
});

function renderBars(array) {
  for (let i = 0; i < numOfBars; i++) {
    let bar = document.createElement("div");
    bar.textContent = array[i];
    bar.classList.add("bar");
    bar.style.height = array[i] * heightFactor + "px";
    bars_container.appendChild(bar);
  }
}

randomize_array.addEventListener("click", function () {
  unsorted_array = createRandomArray();
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
});

btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  numOfBars = Number(numEle.value);
  unsorted_array = arrayEle.value.split(" ").map((ele) => Number(ele));
  bars_container.innerHTML = "";
  renderBars(unsorted_array);
  closeModal();
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function swap(items, leftIndex, rightIndex, bars) {
  var temp = items[leftIndex];
  items[leftIndex] = items[rightIndex];
  items[rightIndex] = temp;
  bars[leftIndex].style.height = items[leftIndex] * heightFactor + "px";
  bars[leftIndex].textContent = items[leftIndex];
  bars[leftIndex].style.borderColor = "yellow";

  bars[rightIndex].style.height = items[rightIndex] * heightFactor + "px";
  bars[rightIndex].textContent = items[rightIndex];
  bars[rightIndex].style.borderColor = "yellow";

  await sleep(speedFactor);
  bars[leftIndex].style.borderColor = "green";
  bars[rightIndex].style.borderColor = "green";
}
async function partition(items, left, right) {
  let bars = document.getElementsByClassName("bar");
  let pivotIndex = Math.floor((right + left) / 2);
  var pivot = items[pivotIndex]; //middle element
  bars[pivotIndex].style.backgroundColor = "red";

  for (let i = 0; i < bars.length; i++) {
    if (i != pivotIndex) {
      bars[i].style.backgroundColor = "black";
    }
  }

  (i = left), //left pointer
    (j = right); //right pointer
  while (i <= j) {
    while (items[i] < pivot) {
      i++;
    }
    while (items[j] > pivot) {
      j--;
    }
    if (i <= j) {
      await swap(items, i, j, bars); //sawpping two elements
      i++;
      j--;
    }
  }
  return i;
}

async function quickSort(items, left, right) {
  var index;
  let bars = document.getElementsByClassName("bar");
  if (items.length > 1) {
    index = await partition(items, left, right); //index returned from partition
    if (left < index - 1) {
      //sort elements on the left side of the pivot
      await quickSort(items, left, index - 1);
    }
    if (index < right) {
      //sort elements on the right side of the pivot
      await quickSort(items, index, right);
    }
  }

  for (let i = 0; i < bars.length; i++) {
    bars[i].style.backgroundColor = "black";
  }
  return items;
}

sort_btn.addEventListener("click", function () {
  let sorted_array = quickSort(unsorted_array, 0, numOfBars - 1);
});
