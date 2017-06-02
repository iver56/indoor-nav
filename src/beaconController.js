function BeaconController() {
  this.vm = {
    beacons: []
  };
  this.view = new BeaconView(this.vm);
}

BeaconController.prototype.handleClick = function(position) {
  this.vm.beacons.push(
    new Beacon(position)
  );
  this.view.render();
};
