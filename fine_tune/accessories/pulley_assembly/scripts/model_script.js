const modelViewer = document.querySelector("model-viewer#model");
let selected = false;
const baseColor = [.3, .3, .3];
let highlight = [80/255, 200/255, 230/255];
const orbitCycle = [
  '120deg 70deg auto',
  '145deg 70deg auto'
  
];
let activeMaterial, rafId, material;

modelViewer.addEventListener('load', () => {
material = modelViewer.model.materials;
console.log(material)
for (m in material){
    material[m].pbrMetallicRoughness.setBaseColorFactor(baseColor);
}
});

document.querySelectorAll('.model-button').forEach(slider => slider.addEventListener('mouseenter', (e) => {
 
  if (!(e.target.matches('button'))) return;
    const index = Number(e.target.dataset.mat);
    console.log(e.target)
    startPulse(index-1);
    interView(index-1);
}));

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







document.querySelector('#reset').addEventListener('click', stopPulse);
