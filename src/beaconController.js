function BeaconController() {
  this.vm = {
    beacons: []
  };
  this.view = new BeaconView(this.vm);
}

BeaconController.prototype.handleClick = function(position) {
  var numBeaconsBefore = this.vm.beacons.length;

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

  this.view.render();
};
