$(function() {
  let originalMapCanvas = document.getElementById('original-map-canvas');
  let canvas = document.getElementById('map-canvas');
  let originalMapCtx = originalMapCanvas.getContext('2d');
  let img = document.getElementById("original-image");
  let imgData = null;
  let isDragging = false;
  let startMouseDownPos = null;
  let beaconController = new BeaconController();
  let areaController = new AreaController();
  let controllers = {
    "beacons": beaconController,
    "areas": areaController
  };
  let view = new View(beaconController.vm, areaController.vm);
  let selectedMode = $('input[name="modes"]:checked').val();
  let controller = controllers[selectedMode];

  $('input[name="modes"]').change(function() {
    selectedMode = this.value;
    controller = controllers[selectedMode];
    $('.sidebar').hide();
    $(`#${selectedMode}-sidebar`).show();
  });

  img.addEventListener("load", function(e) {
    originalMapCanvas.width = img.width;
    originalMapCanvas.height = img.height;
    originalMapCtx.drawImage(img, 0, 0);
    imgData = originalMapCtx.getImageData(0, 0, originalMapCanvas.width, originalMapCanvas.height);
    Event.fire('render');
  });

  document.getElementById("file1").addEventListener("change", function(event) {
    let file = event.target.files[0];
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
    if (controller.handleMouseMove) {
      let position = relativeMouseCoords(e, canvas);
      controller.handleMouseMove(position);
    }
  }.throttle(16), false);
  canvas.addEventListener("mouseup", function(e) {
    let position = relativeMouseCoords(e, canvas);

    if (isDragging) { // drag
      let distance = euclideanDistance(startMouseDownPos, position);
      if (distance < 3) {
        // interpret as click
        controller.handleClick && controller.handleClick(position);
      } else {
        // drag
        controller.handleDrag && controller.handleDrag(startMouseDownPos, position);
      }
    } else { // click
      controller.handleClick && controller.handleClick(position);
    }
  }, false);

});
