const modelViewer = document.querySelector("model-viewer#model");
let selected = false;
const baseColor = [1, 1, 1];
let highlight = [80/255, 200/255, 230/255];
const orbitCycle = [
  '0deg 20deg 9m',
  '0deg 70deg 9m',
  '5deg 85deg 9m'
  
];
let activeMaterial, rafId, material;

modelViewer.addEventListener('load', () => {
material = modelViewer.model.materials;
//material = [material[0], material[3], material[2], material[1]];
console.log(material)
for (m in material){
    material[m].pbrMetallicRoughness.setBaseColorFactor(baseColor);
}
});

function startPulse(materialIndex) {
stopPulse(); // stop any existing animation

activeMaterial = material[materialIndex];
if (!activeMaterial) return;

const startTime = performance.now();

function pulse(t) {
  const k = 0.5 + 0.5 * Math.sin(t * 0.0035);

  activeMaterial.pbrMetallicRoughness.setBaseColorFactor([
    baseColor[0] * (1 - k) + highlight[0] * k,
    baseColor[1] * (1 - k) + highlight[1] * k,
    baseColor[2] * (1 - k) + highlight[2] * k
  ]);

  rafId = requestAnimationFrame(pulse);
}

rafId = requestAnimationFrame(pulse);
}

function stopPulse() {
if (rafId) {
  cancelAnimationFrame(rafId);
  rafId = null;
}

if (activeMaterial) {
  activeMaterial.pbrMetallicRoughness.setBaseColorFactor(baseColor);
  activeMaterial = null;
}
}

function interView(materialIndex){
  modelViewer.cameraOrbit =
        orbitCycle[(materialIndex)];
        modelViewer.fieldOfView = '30deg';
}

// Initialize all sliders
document.querySelectorAll('.dot-slider').forEach(slider => initSlider(slider));

document.querySelectorAll('.dot-slider').forEach(slider => slider.addEventListener('click', (e) => {
  if (!(e.target.matches('input[type="radio"]') || e.target.matches('button'))) return;
    const index = Number(e.target.dataset.mat);
    startPulse(index);
    interView(index-1);
}));





document.querySelector('#reset').addEventListener('click', stopPulse);
