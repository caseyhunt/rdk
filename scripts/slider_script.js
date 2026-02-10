
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


