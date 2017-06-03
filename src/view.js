function View(beaconVm, areaVm) {
  this.beaconVm = beaconVm;
  this.areaVm = areaVm;
  this.$beaconListWrapper = $('#beacons-sidebar');
  this.$areaListWrapper = $('#areas-sidebar');

  this.originalMapCanvas = document.getElementById('original-map-canvas');
  this.canvas = document.getElementById('map-canvas');
  this.ctx = this.canvas.getContext('2d');

  Event.on('render', () => this.render());
}

View.prototype.render = function() {
  this.resetCanvas();
  this.renderBeaconList();
  this.renderBeaconDots();
  this.renderSignal();
};

View.prototype.resetCanvas = function() {
  this.canvas.width = this.originalMapCanvas.width;
  this.canvas.height = this.originalMapCanvas.height;
  this.ctx.drawImage(this.originalMapCanvas, 0, 0);
};

View.prototype.renderBeaconList = function() {
  let $ul = $('<ul></ul>');
  this.beaconVm.beacons.forEach((beacon, i) => {
    $(
      `<li>${i}:&nbsp;${beacon.position.x},&nbsp;${beacon.position.y}</li>`
    ).appendTo($ul);
  });
  this.$beaconListWrapper.empty().append(
    $('<p>Beacons:</p>')
  ).append($ul);
};

View.prototype.renderBeaconDots = function() {
  let that = this;
  this.beaconVm.beacons.forEach((beacon, i) => {
    this.ctx.fillStyle = colorbrewer.Set1[8][i % 8];
    this.ctx.beginPath();
    this.ctx.arc(beacon.position.x, beacon.position.y, 5, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();
  });
};

View.prototype.renderSignal = function() {
  this.ctx.save();
  this.ctx.globalAlpha = 0.4;

  const numBeacons = this.beaconVm.beaconSignalStrengths.length;
  this.beaconVm.beaconSignalStrengths.forEach((signalStrength, i) => {
    let radius = Math.min(
      9001 * Math.pow(10, signalStrength / 20),
      100
    );

    this.ctx.strokeStyle = colorbrewer.Set1[8][i % 8];
    this.ctx.lineWidth = radius;
    this.ctx.beginPath();
    this.ctx.arc(
      this.beaconVm.measurementPosition.x,
      this.beaconVm.measurementPosition.y,
      radius / 2,
      i * 2 * Math.PI / numBeacons,
      (i + 1) * 2 * Math.PI / numBeacons
    );
    this.ctx.stroke();
  });

  this.ctx.restore();
};
