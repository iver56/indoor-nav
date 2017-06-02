function BeaconView(vm) {
  this.vm = vm;
  this.$wrapper = $('#beacon-view');

  this.originalMapCanvas = document.getElementById('original-map-canvas');
  this.canvas = document.getElementById('map-canvas');
  this.ctx = this.canvas.getContext('2d');
}

BeaconView.prototype.render = function() {
  this.renderList();
  this.renderOverlay();
};

BeaconView.prototype.renderList = function() {
  var $ul = $('<ul></ul>');
  for (var beacon of this.vm.beacons) {
    $(`<li>${beacon.position.x}, ${beacon.position.y}</li>`).appendTo($ul);
  }
  this.$wrapper.html($ul);
};

BeaconView.prototype.renderOverlay = function() {
  this.canvas.width = this.originalMapCanvas.width;
  this.canvas.height = this.originalMapCanvas.height;
  this.ctx.drawImage(this.originalMapCanvas, 0, 0);
  var that = this;
  this.vm.beacons.forEach((beacon, i) => {
    this.ctx.fillStyle = colorbrewer.Set1[8][i % 8];
    this.ctx.beginPath();
    this.ctx.arc(beacon.position.x, beacon.position.y, 5, 0, 2 * Math.PI);
    this.ctx.fill();
  });
};
