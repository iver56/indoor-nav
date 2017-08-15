function relativeMouseCoords(e, canvas) {
  var currentElement = canvas;
  var totalOffsetX = 0;
  var totalOffsetY = 0;

  do {
    totalOffsetX += currentElement.offsetLeft;
    totalOffsetY += currentElement.offsetTop;
  }
  while (currentElement = currentElement.offsetParent);

  var canvasX = (e.pageX || (e.touches && e.touches[0] && e.touches[0].pageX)) - totalOffsetX;
  var canvasY = (e.pageY || (e.touches && e.touches[0] && e.touches[0].pageY)) - totalOffsetY;

  return {x: canvasX, y: canvasY}
}

function getColorAt(canvas, x, y) {
  var ctx = canvas.getContext("2d");
  var img = ctx.getImageData(x, y, 1, 1);
  return [img.data[0], img.data[1], img.data[2]];
}

function to1D(x, y, width) {
  return (y * width + x) * 4;
}

function to2D(i, width, height) {
  var n = i / 4;
  return {
    x: n % width,
    y: parseInt(n / width)
  };
}

function loadImage(file, callback) {
  if (!file.type.startsWith("image")) {
    return alert("That file is not going to work here...");
  }
  var reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function(event) {
    callback(event.target.result);
  };
  reader.onerror = function(event) {
    alert("Could not read the file");
  };
}

function getDefaultImage() {
    return window.defaultImage;
}

function rgbToGreyValue(rgb) {
  return 0.3 * rgb[0] + 0.59 * rgb[1] + 0.11 * rgb[2];
}

function euclideanDistance(pos1, pos2) {
  return Math.sqrt(Math.pow(pos1.x - pos2.x, 2) + Math.pow(pos1.y - pos2.y, 2));
}

Math.log10 = Math.log10 ||
  function(x) {
    return Math.log(x) * Math.LOG10E;
  };
