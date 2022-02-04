var sortedRepliers = twitterData[3];

var numResultsInput = document.getElementById("input");
numResultsInput.addEventListener("input", updateHandles);

var handlesContainer = document.getElementById("handlesContainer");
var staircase1 = document.getElementsByClassName("staircase1")[0];

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

function updateHandles() {
  var staircase2 = document.getElementsByClassName("staircase2")[0];
  var staircase3 = document.getElementsByClassName("staircase3")[0];
  //get the value
  var input = numResultsInput.value;
  //input is 1-8: show staircase1
  if (input <= 8) {
    //remove s2 and s3
    if (staircase2) {
      staircase2.remove();
    }
    if (staircase3) {
      staircase3.remove();
    }
    //set s1 - add or remove handles
    var s1NumHandles = staircase1.childElementCount;
    if (s1NumHandles < input) {
      for (var i = s1NumHandles; i < input; i++) {
        staircase1.append(createHandleDiv(sortedRepliers[i]));
      }
    } else if (s1NumHandles > input) {
      for (var i = s1NumHandles; i > input; i--) {
        staircase1.removeChild(staircase1.children[i - 1]);
      }
    }
  } else if (input <= 16) {
    //remove s3, add s2
    if (staircase3) {
      staircase3.remove();
    }
    if (!staircase2) {
      createAndAppendStaircase(2);
      var staircase2 = document.getElementsByClassName("staircase2")[0];
    }
    //set s2 - add or remove handles
    var s2NumHandles = staircase2.childElementCount;
    if (s2NumHandles + 8 < input) {
      for (var i = s2NumHandles + 8; i < input; i++) {
        staircase2.append(createHandleDiv(sortedRepliers[i]));
      }
    } else if (s2NumHandles + 8 > input) {
      for (var i = s2NumHandles; i > input - 8; i--) {
        staircase2.removeChild(staircase2.children[i - 1]);
      }
    }
  } else if (input <= 24) {
    //add s3
    if (!staircase3) {
      createAndAppendStaircase(3);
      var staircase3 = document.getElementsByClassName("staircase3")[0];
    }
    //set s3 - add or remove handles
    var s3NumHandles = staircase3.childElementCount;
    if (s3NumHandles + 16 < input) {
      for (var i = s3NumHandles + 16; i < input; i++) {
        staircase3.append(createHandleDiv(sortedRepliers[i]));
      }
    } else if (s3NumHandles + 16 > input) {
      for (var i = s3NumHandles; i > input - 16; i--) {
        staircase3.removeChild(staircase3.children[i - 1]);
      }
    }
  }
}

function showInitialHandles() {
  var input = numResultsInput.value;
  for (var i = 1; i <= Math.min(8, input); i++) {
    staircase1.append(createHandleDiv(sortedRepliers[i - 1]));
  }
  if (i > 8 && i <= 16) {
    createAndAppendStaircase(2);
    var staircase2 = document.getElementsByClassName("staircase2")[0];
    for (var i = 9; i <= Math.min(16, input); i++) {
      staircase2.append(createHandleDiv(sortedRepliers[i - 1]));
    }
  }
  if (i > 16 && i <= 24) {
    createAndAppendStaircase(3);
    var staircase3 = document.getElementsByClassName("staircase3")[0];
    for (var i = 17; i <= Math.min(24, input); i++) {
      staircase3.append(createHandleDiv(sortedRepliers[i - 1]));
    }
  }
}

showInitialHandles();
