var downloadButton = document.getElementById("downloadButton");
downloadButton.addEventListener("click", saveImage);

var homeButton = document.getElementById("homeButton");
homeButton.addEventListener("click", goToHomepage);

var inputUser = twitterData[0];

function goToHomepage() {
  window.location.href = "/";
}

function saveImage() {
  console.log(stage);
  var canvasImage = stage.toDataURL();

  console.log(canvasImage);
  //  canvasImage.crossorigin = "anonymous";
  var tmpLink = document.createElement("a");
  tmpLink.download = `reply-spy-${inputUser}.png`; // set the name of the download file
  tmpLink.href = canvasImage;

  // temporarily add link to body and initiate the download
  document.body.appendChild(tmpLink);
  tmpLink.click();
  document.body.removeChild(tmpLink);
}
