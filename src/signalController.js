function SignalController() {
  this.vm = {
    beaconSignalStrengths: [],
    measurementPosition: {x: 0, y: 0}
  };
  this.beaconVm = null;
}

SignalController.prototype.handleMouseMove = function(position) {
  if (!this.beaconVm) {
    return;
  }
  this.vm.beaconSignalStrengths = [];
  this.beaconVm.beacons.forEach((beacon, i) => {
    let signalStrength = beacon.getRelativeSignalStrength(position);

    this.vm.beaconSignalStrengths.push(signalStrength);
  });
  this.vm.measurementPosition = position;

  Event.fire('render');
};
