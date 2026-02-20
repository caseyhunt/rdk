const modelViewer = document.querySelector("model-viewer#model");
let selected = false;
const baseColor = [.3, .3, .3];
let highlight = [80/255, 200/255, 230/255];
const orbitCycle = [
  '10deg 120deg 6m',
  '30deg 150deg 9m',
  '175deg 85deg 9m'
  
];
let activeMaterial, rafId, material;

modelViewer.addEventListener('load', () => {
material = modelViewer.model.materials;
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
  if(materialIndex == 0){
    modelViewer.cameraTarget = "0m 1.5m 0m";
    console.log("hello")
  }else{
    modelViewer.cameraTarget = "0m 0m 0m";
  }
}

// Initialize all sliders
document.querySelectorAll('.dot-slider').forEach(slider => initSlider(slider));

document.querySelectorAll('.dot-slider').forEach(slider => slider.addEventListener('click', (e) => {
  if (!(e.target.matches('input[type="radio"]') || e.target.matches('button'))) return;
    const index = Number(e.target.dataset.mat);
    if(index == 1){
      startPulse(0);
    }else if (index == 2){
      startPulse(2);
    }
    // startPulse(index);
    interView(index-1);
}));





document.querySelector('#reset').addEventListener('click', stopPulse);
