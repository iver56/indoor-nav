function AreaController(beaconController) {
  this.beaconController = beaconController;
  this.vm = {
    areas: [],
    selectedAreaIdx: -1
  };
  let that = this;
  this.$nameInput = $('#new-area-name');
  $('#add-area-button').click(function() {
    that.addArea()
  });
  $('#area-list').on('click', 'li button', function() {
    let $li = $(this).closest('li');
    let areaId = $li.data('id');
    that.vm.selectedAreaIdx = parseInt(areaId);
    Event.fire('render');
  });
  $('#download-dataset').click(function() {
    that.downloadDataset()
  });
}

AreaController.prototype.addArea = function() {
  let name = this.$nameInput.val();
  if (name.length < 2) {
    return alert('Name is too short');
  }
  this.$nameInput.val('');
  this.vm.areas.push(
    new Area(name)
  );
  Event.fire('render');
};

AreaController.prototype.handleClick = function(position) {
  if (this.vm.selectedAreaIdx < 0) {
    return alert('You need to select an area before you can add points to it');
  }
  this.beaconController.calculateSignalStrengths(position);
  let signalStrengths = this.beaconController.vm.beaconSignalStrengths.slice(0);
  this.vm.areas[this.vm.selectedAreaIdx].points.push(
    new Point(position, signalStrengths)
  );

  Event.fire('render');
};

AreaController.prototype.downloadDataset = function() {
  let jsonObj = {x: [], y: []};

  this.vm.areas.forEach((area, i) => {
    area.points.forEach((point, j) => {
      this.beaconController.calculateSignalStrengths(point.position);
      point.signalStrengths = this.beaconController.vm.beaconSignalStrengths.slice(0);
      jsonObj.x.push(point.signalStrengths);
      jsonObj.y.push(i);
    });
  });

  let blob = new Blob([JSON.stringify(jsonObj)], {type: "text/json;charset=utf-8"});
  saveAs(blob, "beacon-dataset.json");
};
