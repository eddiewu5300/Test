function dialog_interaction() {
  if (!science_dia.showModal) {
    dialogPolyfill.registerDialog(science_dia);
  }
  science_but.addEventListener('click', function () {
    science_dia.showModal();
  });
  science_dia.querySelector('.close').addEventListener('click', function () {
    science_dia.close();
  });
  if (!history_dia.showModal) {
    dialogPolyfill.registerDialog(history_dia);
  }
  history_but.addEventListener('click', function () {
    console.log("history");
    history_dia.showModal();
  });
  history_dia.querySelector('.close').addEventListener('click', function () {
    history_dia.close();
  });
  if (!scientist_dia.showModal) {
    dialogPolyfill.registerDialog(scientist_dia);
  }
  scientist_but.addEventListener('click', function () {
    console.log("scientist");
    scientist_dia.showModal();
  });
  scientist_dia.querySelector('.close').addEventListener('click', function () {
    scientist_dia.close();
  });
}

