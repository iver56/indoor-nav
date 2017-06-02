function Beacon(position) {
  this.position = position;
  this.frequency = 2.4e9;
}

Beacon.prototype.getSignalStrength = function(position) {
  var distanceInPixels = euclideanDistance(this.position, position);
  // assuming that 50 pixels corresponds to 1 meter
  var distanceInMeters = distanceInPixels / 50;
  // https://en.wikipedia.org/wiki/Free-space_path_loss#Free-space_path_loss_in_decibels
  var freeSpacePathLoss = (
    20 * Math.log10(distanceInMeters) +
    20 * Math.log10(this.frequency) -
    147.55
  );
  console.log('FSPL', freeSpacePathLoss);
};
