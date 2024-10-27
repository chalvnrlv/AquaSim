import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';

export function createAquarium(scene) {
    // Create the aquarium as a transparent box
    const aquariumGeometry = new THREE.BoxGeometry(16, 10, 5);  // Larger aquarium: X=16, Y=10, Z=5
    const aquariumMaterial = new THREE.MeshStandardMaterial({
        color: 0x00aaff,
        transparent: true,
        opacity: 0.2,
        side: THREE.DoubleSide  // Ensure the aquarium walls are visible from inside
    });

    const aquarium = new THREE.Mesh(aquariumGeometry, aquariumMaterial);
    aquarium.position.set(0, 0, 0);  // Center the aquarium in the scene
    scene.add(aquarium);
}

// Export larger boundary limits for the fish
export const aquariumBounds = {
    x: 8,  // Half the width of the aquarium (X-axis range: -8 to 8)
    y: 5,  // Half the height of the aquarium (Y-axis range: -5 to 5)
    z: 2.5 // Half the depth of the aquarium (Z-axis range: -2.5 to 2.5)
};
