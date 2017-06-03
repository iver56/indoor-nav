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
  return -freeSpacePathLoss;  // in decibels, 0 being strong and -80 being really weak
};
