function BeaconController() {
  this.vm = {
    beacons: [],
    beaconSignalStrengths: [],
    measurementPosition: {x: 0, y: 0}
  };
}

BeaconController.prototype.handleClick = function(position) {
  const numBeaconsBefore = this.vm.beacons.length;

  // remove any beacons close to the click position
  this.vm.beacons = this.vm.beacons.filter(
    beacon => euclideanDistance(beacon.position, position) > 6
  );
  if (this.vm.beacons.length < numBeaconsBefore) {
    // click action was a remove action
  } else {
    // click action was an add action
    this.vm.beacons.push(
      new Beacon(position)
    );
  }
  this.calculateSignalStrengths(position);

  Event.fire('render');
};

BeaconController.prototype.handleMouseMove = function(position) {
  this.calculateSignalStrengths(position);
  Event.fire('render');
};

BeaconController.prototype.calculateSignalStrengths = function(position) {
  this.vm.beaconSignalStrengths = [];
  this.vm.beacons.forEach((beacon, i) => {
    let signalStrength = beacon.getRelativeSignalStrength(position);

    this.vm.beaconSignalStrengths.push(signalStrength);
  });
  this.vm.measurementPosition = position;
};
