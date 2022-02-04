var sortedRepliers = twitterData[3];

var numResultsInput = document.getElementById("input");
numResultsInput.addEventListener("input", changeHandles);

var handlesContainer = document.getElementById("handlesContainer");

function createHandleDiv(handle) {
  var newDiv = document.createElement("div");
  var link = document.createElement("a");
  link.innerHTML = "@" + handle;
  link.setAttribute("href", "https://twitter.com/" + handle);
  newDiv.append(link);
  return newDiv;
}

function createAndAppendStaircase(num) {
  var newDiv = document.createElement("div");
  newDiv.classList.add(`staircase${num}`);
  handlesContainer.append(newDiv);
}

function changeHandles() {
  var staircase1 = document.getElementsByClassName("staircase1")[0];
  var staircase2 = document.getElementsByClassName("staircase2")[0];
  var staircase3 = document.getElementsByClassName("staircase3")[0];
  if (staircase1) {
    staircase1.remove();
  }
  if (staircase2) {
    staircase2.remove();
  }
  if (staircase3) {
    staircase3.remove();
  }
  updateHandles();
}

function updateHandles() {
  var input = numResultsInput.value;
  createAndAppendStaircase(1);
  var staircase1 = document.getElementsByClassName("staircase1")[0];
  for (var i = 1; i <= Math.min(8, input); i++) {
    staircase1.append(createHandleDiv(sortedRepliers[i - 1]));
  }
  if (input > 8) {
    createAndAppendStaircase(2);
    var staircase2 = document.getElementsByClassName("staircase2")[0];
    for (var i = 9; i <= Math.min(16, input); i++) {
      staircase2.append(createHandleDiv(sortedRepliers[i - 1]));
    }
  }
  if (input > 16) {
    createAndAppendStaircase(3);
    var staircase3 = document.getElementsByClassName("staircase3")[0];
    for (var i = 17; i <= Math.min(24, input); i++) {
      staircase3.append(createHandleDiv(sortedRepliers[i - 1]));
    }
  }
}

updateHandles();
