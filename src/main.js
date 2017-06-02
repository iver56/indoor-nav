$(function() {
  var originalMapCanvas = document.getElementById('original-map-canvas');
  var canvas = document.getElementById('map-canvas');
  var originalMapCtx = originalMapCanvas.getContext('2d');
  var img = document.getElementById("original-image");
  //var imgData = null;
  var isDragging = false;
  var startMouseDownPos = null;
  var beaconController = new BeaconController();
  var measureController = new MeasureController();
  var modeSelect = document.getElementById('mode-select');
  var controllers = {
    "manage-beacons": beaconController,
    "measure-signal": measureController
  };

  img.addEventListener("load", function(e) {
    originalMapCanvas.width = img.width;
    originalMapCanvas.height = img.height;
    originalMapCtx.drawImage(img, 0, 0);
    //imgData = ctx.getImageData(0, 0, originalMapCanvas.width, originalMapCanvas.height);
    beaconController.view.render();
  });

  document.getElementById("file1").addEventListener("change", function(event) {
    var file = event.target.files[0];
    if (file) {
      loadImage(file, function(result) {
        img.src = result;
      });
    }
  });

  canvas.addEventListener("mousedown", function(e) {
    startMouseDownPos = relativeMouseCoords(e, canvas);
    isDragging = false;
  }, false);
  canvas.addEventListener("mousemove", function(e) {
    e.preventDefault();
    isDragging = true;
  }, false);
  canvas.addEventListener("mouseup", function(e) {
    var controller = controllers[modeSelect.value];
    var currentPos = relativeMouseCoords(e, canvas);

    if (isDragging) { // drag
      var distance = euclideanDistance(startMouseDownPos, currentPos);
      if (distance < 3) {
        // interpret as click
        controller.handleClick && controller.handleClick(currentPos);
      } else {
        // drag
        controller.handleDrag && controller.handleDrag(startMouseDownPos, currentPos);
      }
    } else { // click
      controller.handleClick && controller.handleClick(currentPos);
    }
  }, false);

});
