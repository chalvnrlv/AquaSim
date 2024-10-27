import * as THREE from 'D:/Chalvin/KULIAH/SEM 5/GRAFKOM/FP/AquaSim/node_modules/three/build/three.module.js/';


export function createAquarium(scene) {
    // Create the aquarium (transparent box)
    const aquariumGeometry = new THREE.BoxGeometry(5, 3, 3);
    const aquariumMaterial = new THREE.MeshStandardMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.3,
    });

    const aquarium = new THREE.Mesh(aquariumGeometry, aquariumMaterial);
    aquarium.position.set(0, 1.5, 0);
    scene.add(aquarium);

    // Create the ground plane
    const groundGeometry = new THREE.PlaneGeometry(5, 3);
    const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228b22 });
    const ground = new THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = 0;
    scene.add(ground);
}
