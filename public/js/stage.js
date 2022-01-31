var width = 500;
var height = 500;

var inputUser = twitterData[0];
var inputUserProfilePic = twitterData[1];
var numRepliers = twitterData[2];
var sortedRepliers = twitterData[3];
var replierProfilePics = twitterData[4];

var stage = new Konva.Stage({
  container: "konvaContainer",
  width: width,
  height: height,
});

var layer = new Konva.Layer();

//setup
var numResultsInput = document.getElementById("input");
numResultsInput.addEventListener("input", konvaDraw);
window.addEventListener("load", showAndDraw);

var bgInput = document.getElementById("bgInput");
var stairsInput = document.getElementById("stairsInput");
bgInput.addEventListener("input", konvaDraw);
stairsInput.addEventListener("input", konvaDraw);

var maxStairSteps = 8;

function showAndDraw() {
  konvaDraw();
  drawStage();
  document.body.style.visibility = "visible";
}

function drawStage() {
  layer.draw();
  stage.add(layer);
  stage.draw();
}

function drawText() {
  var textHeight = 50;
  var konvaText = new Konva.Text({
    text: "strangestloop.io/reply-spy",
    align: "left",
    verticalAlign: "bottom",
    fill: "black",
    fontSize: 24,
    fontStyle: "bold",
    stroke: "white",
    strokeWidth: 0.25,
    height: textHeight,
    x: 0,
    y: height - textHeight,
    offset: { x: -5, y: 2 },
  });
  layer.add(konvaText);
}

function setDimension() {
  return width / maxStairSteps;
}

function setStairWrap(i) {
  if (i <= maxStairSteps) {
    return 0;
  } else if (i <= maxStairSteps * 2) {
    return width;
  }
  return width * 2;
}

function setStairXAdj(i, input) {
  //i: 0-8, all cases
  if (i <= maxStairSteps) {
    if (input <= maxStairSteps) {
      return input;
    } else return maxStairSteps;
  } else if (i <= 2 * maxStairSteps) {
    if (input <= 2 * maxStairSteps) {
      return input - maxStairSteps;
    } else return maxStairSteps;
  } else if (i <= 3 * maxStairSteps) {
    return input - 2 * maxStairSteps;
  }

  //i: 8-16, all cases
  else if (
    input > maxStairSteps &&
    input <= 2 * maxStairSteps &&
    i <= 2 * maxStairSteps
  ) {
    return input - maxStairSteps;
  } else if (input > 2 * maxStairSteps && i <= 2 * maxStairSteps) {
    return maxStairSteps;
  }
  return input;
}

function konvaDraw() {
  layer.removeChildren();
  var input = numResultsInput.value;

  //draw background
  var konvaBackground = new Konva.Rect({
    x: 0,
    y: 0,
    fill: bgInput.value,
    width: width,
    height: height,
  });
  layer.add(konvaBackground);

  //loop to create and store results
  for (var i = 0; i < input; i++) {
    var dimension = setDimension();
    var radius = dimension / 2;
    var url = replierProfilePics[i];
    var imageObject = new Image();
    imageObject.src = url;
    var xResize = dimension / imageObject.naturalWidth;
    var yResize = dimension / imageObject.naturalHeight;
    //min: top/left, max: bottom/right
    var xLocation =
      width / 2 -
      ((setStairXAdj(i + 1, input) - 1) * dimension) / 2 +
      dimension * i -
      setStairWrap(i + 1);
    var yLocation =
      height * 0.5 -
      0.03 * height * i +
      radius * i -
      0.015 * height * (input - 1);

    // create the object
    var konvaCircle = new Konva.Circle({
      x: xLocation,
      y: yLocation,
      radius: radius,
      fillPatternImage: imageObject,
      fillPatternScale: { x: xResize, y: yResize },
      fillPatternX: -radius,
      fillPatternY: -radius,
      fillPatternRepeat: "no-repeat",
    });

    var konvaRect = new Konva.Rect({
      x: xLocation - radius,
      y: yLocation + radius,
      fill: stairsInput.value,
      stroke: bgInput.value,
      strokeWidth: 1,
      width: dimension,
      height: 1000,
    });

    layer.add(konvaRect);
    layer.add(konvaCircle);
  }

  //create and store user
  var inputDimension = 200 - (75 / 23) * (input - 1);
  var inputRadius = inputDimension / 2;
  var imageObject = new Image();
  imageObject.src = inputUserProfilePic;
  var xResize = inputDimension / imageObject.naturalWidth;
  var yResize = inputDimension / imageObject.naturalHeight;
  var inputKonvaCircle = new Konva.Circle({
    x: width - inputRadius,
    y: inputRadius,
    radius: inputRadius,
    fillPatternImage: imageObject,
    fillPatternScale: { x: xResize, y: yResize },
    fillPatternX: -inputRadius,
    fillPatternY: -inputRadius,
    fillPatternRepeat: "no-repeat",
  });
  layer.add(inputKonvaCircle);

  drawText();
}

konvaDraw();
