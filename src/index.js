import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { createFishCube, swimBehavior } from './components/fish.js';  // Import fish functions

// Set up the scene, camera, and renderer
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Position the camera (static position for aquarium view)
camera.position.z = 5;

// Handle UI elements
const bodyColorPicker = document.getElementById('bodyColorPicker');
const faceColorPicker = document.getElementById('faceColorPicker');
const deployFishButton = document.getElementById('deployFishButton');

// Event listener for deploying a new fish
deployFishButton.addEventListener('click', () => {
    // Get the selected colors from the pickers
    const bodyColor = bodyColorPicker.value;
    const faceColor = faceColorPicker.value;

    // Convert hex color values to THREE.js color format
    const bodyColorHex = new THREE.Color(bodyColor);
    const faceColorHex = new THREE.Color(faceColor);

    // Create a new fish with the selected colors
    const fish = createFishCube(bodyColorHex, faceColorHex);
    scene.add(fish);  // Add the fish to the scene

    // Start the fish's swimming behavior
    swimBehavior(fish);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();
