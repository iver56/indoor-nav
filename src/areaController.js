function AreaController() {
  this.vm = {
    areas: []
  };
  let that = this;
  $('#add-area-button').click(function() {
    that.addArea()
  });
  this.$nameInput = $('#new-area-name');
}

AreaController.prototype.addArea = function() {
  let name = this.$nameInput.val();
  this.$nameInput.val('');
  this.vm.areas.push(
    new Area(name)
  );
  Event.fire('render');
};

AreaController.prototype.handleClick = function(position) {
  // TODO: Add point for selected area
};
