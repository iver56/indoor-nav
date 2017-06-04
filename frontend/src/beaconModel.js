function Beacon(position) {
  this.position = position;
  this.frequency = 2.4e9;
}

Beacon.prototype.getRelativeSignalStrength = function(position) {
  const distanceInPixels = euclideanDistance(this.position, position);
  // assuming that 50 pixels corresponds to 1 meter
  const distanceInMeters = Math.max(distanceInPixels / 50, 0.02);
  // https://en.wikipedia.org/wiki/Free-space_path_loss#Free-space_path_loss_in_decibels
  const freeSpacePathLoss = (
    20 * Math.log10(distanceInMeters) +
    20 * Math.log10(this.frequency) -
    147.55
  );
  let angle = Math.atan2(position.y - this.position.y, position.x - this.position.x);
  let obstacleLoss = 0.0;
  for (let i = 0; i < distanceInPixels; i++) {
    let index1D = to1D(
      0 | Math.round(this.position.x + i * Math.cos(angle)),
      0 | Math.round(this.position.y + i * Math.sin(angle)),
      window.originalMapCanvas.width
    );
    // 2 db obstacle loss per pixel if black. 0 db obstacle loss if white.
    obstacleLoss += 2 * (255 - window.imgData.data[index1D]) / 255;
  }
  return -freeSpacePathLoss - obstacleLoss;  // in decibels, 0 being strong and -80 being really weak
};
