var userInput = document.getElementById("userInput");
var inputGroup = document.getElementsByClassName("inputGroup")[0];

var invalidMessage = document.createElement("div");
invalidMessage.classList.add("invalidMessage");
invalidMessage.innerHTML = "Usernames can only have letters, numbers, and _";

function checkForInvalidMessage() {
  var invalidMessageCheck =
    document.getElementsByClassName("invalidMessage")[0];
  if (invalidMessageCheck) {
    return true;
  } else {
    return false;
  }
}

setInterval(function () {
  if (/[^A-Za-z0-9_]/.test(document.getElementById("userInput").value)) {
    //show 'invalid input' display
    userInput.classList.add("invalid");
    if (!checkForInvalidMessage()) {
      inputGroup.append(invalidMessage);
    }
  } else {
    //show normal display
    userInput.classList.remove("invalid");
    if (checkForInvalidMessage()) {
      document.getElementsByClassName("invalidMessage")[0].remove();
    }
  }
}, 100);
