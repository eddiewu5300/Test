
var mc = new Hammer(cylinder);

mc.get('pinch').set({ enable: true });
mc.on("pinch", function (ev) {
  console.log(ev.scale)
  cylinder.textContent = ev.type + " gesture detected.";
});
