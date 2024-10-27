import * as THREE from 'D:/Chalvin/KULIAH/SEM 5/GRAFKOM/FP/AquaSim/node_modules/three/build/three.module.js/';

// Function to create a cube that represents a fish
export function createFishCube(fishType, color, name) {
    console.log('Creating Fish:', fishType, color, name);  // Debugging log

    // Create a cube geometry to represent the fish
    const fishGeometry = new THREE.BoxGeometry(0.5, 0.3, 0.2);  // Size of the fish
    const fishMaterial = new THREE.MeshStandardMaterial({ color });
    const fish = new THREE.Mesh(fishGeometry, fishMaterial);

    // Position the fish randomly within the aquarium
    fish.position.set(Math.random() * 4 - 2, Math.random() * 2 + 0.5, Math.random() * 2 - 1);

    console.log('Fish position:', fish.position);  // Debugging log

    // Store the fish name as metadata
    fish.userData.name = name;

    // Create a DOM element for displaying the fish name above the fish
    const labelDiv = document.createElement('div');
    labelDiv.className = 'fish-label';
    labelDiv.style.position = 'absolute';
    labelDiv.style.color = 'white';
    labelDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    labelDiv.style.padding = '2px';
    labelDiv.style.borderRadius = '3px';
    labelDiv.innerText = name;
    document.body.appendChild(labelDiv);

    // Function to update label position (name follows the fish)
    function updateLabelPosition() {
        const vector = new THREE.Vector3();
        fish.getWorldPosition(vector);
        vector.project(camera);

        const x = (vector.x * 0.5 + 0.5) * window.innerWidth;
        const y = -(vector.y * 0.5 - 0.5) * window.innerHeight;

        labelDiv.style.left = `${x}px`;
        labelDiv.style.top = `${y}px`;

        requestAnimationFrame(updateLabelPosition);
    }
    updateLabelPosition();

    return fish;
}

// Function to make the fish swim (move randomly)
export function swimBehavior(fish) {
    const speed = 0.01 + Math.random() * 0.02;  // Random swim speed
    function moveFish() {
        fish.position.x += (Math.random() - 0.5) * speed;
        fish.position.y += (Math.random() - 0.5) * speed;
        fish.position.z += (Math.random() - 0.5) * speed;

        // Keep the fish inside the aquarium bounds
        fish.position.x = Math.max(Math.min(fish.position.x, 2.5), -2.5);
        fish.position.y = Math.max(Math.min(fish.position.y, 2.5), 0.5);
        fish.position.z = Math.max(Math.min(fish.position.z, 1.5), -1.5);

        requestAnimationFrame(moveFish);
    }
    moveFish();
}
