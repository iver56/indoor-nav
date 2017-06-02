function MeasureController() {
  this.yo = 'meh'
}

MeasureController.prototype.handleClick = function(position) {
  console.log('click in measure mode', position)
};

MeasureController.prototype.handleDrag = function(startMousePosition, endMousePosition) {
  console.log('click in measure mode', startMousePosition, endMousePosition)
};
