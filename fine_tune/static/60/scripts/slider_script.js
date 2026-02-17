
// Helper to initialize one slider
function initSlider(container) {
  const radios = [...container.querySelectorAll('input[type="radio"]')];
  let index = radios.findIndex(r => r.checked);

  const prevBtn = container.querySelector('.prev-btn');
  const nextBtn = container.querySelector('.next-btn');

  function update(newIndex) {
    if (newIndex < 0 || newIndex >= radios.length) return;
    radios[newIndex].checked = true;
    radios[newIndex].focus();
    index = newIndex;
  }

  prevBtn.onclick = () => update(index - 1);
  nextBtn.onclick = () => update(index + 1);
}


document.getElementById("download_button").addEventListener("click", (e) => {
  getSliderValues();
  const name = "model_files/model_download/connectors/60"
  // const safeName = name.replace(/[^a-z0-9_-]/gi, "_");
  console.log(file_attributes);
  const link = document.getElementById("download_link");
  const fileName = `/60_${file_attributes[0]}_${file_attributes[1]}_${file_attributes[2]}`;

  link.href = `${name}${fileName}.stl`;
  console.log(link.href);
  link.click();
});

let file_attributes = [ 0 , 0 , 0 ];
function getSliderValues(){
  document.querySelectorAll('.dot-slider').forEach(slider => {
    const index = Number(slider.dataset.group) - 1;
    const checked = slider.querySelector('input[type="radio"]:checked');
    console.log(checked.value);
    console.log(slider.dataset.group)
    file_attributes[index] = checked.value;
  });
}