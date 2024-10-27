import * as THREE from '../node_modules/three/build/three.module.js/';
import { OrbitControls } from '../node_modules/three/examples/jsm/controls/OrbitControls.js/';

// Create scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// OrbitControls
const controls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 2, 5);
controls.update();

// Add ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

// Aquarium setup (simple glass box)
import { createAquarium } from './components/aquarium.js';
createAquarium(scene);

// Fish deployment behavior
import { createFishCube, swimBehavior } from './components/fish.js';

// Handle UI interactions
const fishSelector = document.getElementById('fishSelector');
const colorPicker = document.getElementById('colorPicker');
const fishNameInput = document.getElementById('fishName');
const deployButton = document.getElementById('deployFishButton');

// Event listener for deploying the fish
deployButton.addEventListener('click', () => {
    const selectedFish = fishSelector.value;  // Get selected fish type
    const selectedColor = colorPicker.value;  // Get selected color
    const fishName = fishNameInput.value;     // Get fish name

    console.log('Deploy Fish Button Clicked');  // Debugging log

    if (!fishName.trim()) {
        alert("Please enter a name for your fish!");
        return;
    }

    console.log('Selected Fish:', selectedFish, 'Color:', selectedColor, 'Name:', fishName);

    // Deploy the fish (use cubes as placeholders)
    const fish = createFishCube(selectedFish, selectedColor, fishName);
    scene.add(fish);

    console.log('Fish added to the scene');  // Debugging log

    // Make the fish swim with random movement
    swimBehavior(fish);
});

// Render loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}
animate();
