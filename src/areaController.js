function AreaController() {
  this.vm = {
    areas: []
  };
}

AreaController.prototype.addArea = function(name) {
  this.vm.areas.push(
    new Area(name)
  );
};

AreaController.prototype.handleClick = function(position) {
  // TODO: Add point for selected area
};
