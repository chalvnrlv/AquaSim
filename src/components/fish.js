import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.module.js';
import { aquariumBounds } from './aquarium.js';  // Import the aquarium boundaries

// Array to track all fish in the scene
const fishList = [];

// Function to create a cube representing a fish with a unique front face color
export function createFishCube(bodyColor, faceColor) {
    const geometry = new THREE.BoxGeometry(0.5, 0.3, 0.2);  // Fish-like rectangular shape

    // Create an array of materials, with a different color for the front face
    const materials = [
        new THREE.MeshBasicMaterial({ color: bodyColor }),  // Left face
        new THREE.MeshBasicMaterial({ color: bodyColor }),  // Right face
        new THREE.MeshBasicMaterial({ color: bodyColor }),  // Top face
        new THREE.MeshBasicMaterial({ color: bodyColor }),  // Bottom face
        new THREE.MeshBasicMaterial({ color: faceColor }),  // Front face (positive Z-axis)
        new THREE.MeshBasicMaterial({ color: bodyColor })   // Back face
    ];

    // Apply different materials to the cube geometry
    const fish = new THREE.Mesh(geometry, materials);

    // Add bodyColor to the fish's userData so we can group them by color
    fish.userData.bodyColor = bodyColor;

    // Start the fish at a random position within the aquarium
    fish.position.set(
        Math.random() * (aquariumBounds.x * 2) - aquariumBounds.x,
        Math.random() * (aquariumBounds.y * 2) - aquariumBounds.y,
        Math.random() * (aquariumBounds.z * 2) - aquariumBounds.z
    );

    // The "forward" direction of the fish is along the positive Z-axis by default
    fish.userData.forward = new THREE.Vector3(0, 0, 1);  // This is the face of the fish

    // Add the fish to the global fish list for group tracking
    fishList.push(fish);

    return fish;
}

// Function to calculate the average direction of fish in the same group (same color)
function calculateGroupDirection(fish) {
    let groupDirection = new THREE.Vector3();
    let groupCount = 0;

    // Loop through all fish in the scene to find fish with the same color
    fishList.forEach((otherFish) => {
        if (otherFish !== fish && otherFish.userData.bodyColor === fish.userData.bodyColor) {
            // Add the direction of the fish in the same group
            groupDirection.add(otherFish.userData.forward);
            groupCount++;
        }
    });

    // If there are other fish in the group, average their direction
    if (groupCount > 0) {
        groupDirection.divideScalar(groupCount).normalize();  // Average direction
    }

    return groupDirection;
}

// Function to make the fish swim in a more natural left-to-right behavior, rarely turning
export function swimBehavior(fish) {
    const speed = 0.007;  // Speed of the fish
    let turnSpeed = 0.02;  // How fast the fish can turn (rotation speed)

    // Bias movement to favor left-to-right (more movement on the X-axis)
    let direction = new THREE.Vector3(
        (Math.random() * 0.8 + 0.2),  // Favor right movement (more bias towards positive X-axis)
        (Math.random() - 0.5) * 0.2,  // Smaller vertical movement (Y-axis)
        (Math.random() - 0.5) * 0.2   // Even smaller depth movement (Z-axis)
    ).normalize();  // Normalize to get a consistent movement direction

    function moveFish() {
        // Move the fish forward in the direction it's facing
        fish.position.addScaledVector(direction, speed);

        // Group logic: adjust the fish's direction based on others in the same color group
        const groupDirection = calculateGroupDirection(fish);
        if (!groupDirection.equals(new THREE.Vector3())) {
            // Blend the current direction with the group's direction
            direction.lerp(groupDirection, 0.05);  // Slow blending for smooth alignment
        }

        // Occasionally change direction randomly (with very low probability to turn)
        if (Math.random() < 0.002) {  // Change direction 0.2% of the time (rare)
            direction = new THREE.Vector3(
                (Math.random() * 0.8 + 0.2),  // Favor right movement
                (Math.random() - 0.5) * 0.2,  // Smaller vertical movement
                (Math.random() - 0.5) * 0.2   // Smaller depth movement
            ).normalize();
        }

        // Use the aquarium boundaries from aquarium.js
        if (fish.position.x > aquariumBounds.x || fish.position.x < -aquariumBounds.x) direction.x = -direction.x;
        if (fish.position.y > aquariumBounds.y || fish.position.y < -aquariumBounds.y) direction.y = -direction.y;
        if (fish.position.z > aquariumBounds.z || fish.position.z < -aquariumBounds.z) direction.z = -direction.z;

        // Calculate the quaternion (rotation) for the fish to face its direction
        let targetQuaternion = new THREE.Quaternion().setFromUnitVectors(
            fish.userData.forward,  // Fish's default forward direction (Z-axis)
            direction.clone().normalize()  // The direction the fish is moving toward
        );

        // Smoothly rotate the fish to face the direction it is moving
        fish.quaternion.slerp(targetQuaternion, turnSpeed);

        requestAnimationFrame(moveFish);  // Continuously update the movement and rotation
    }

    moveFish();  // Start the movement and rotation behavior
}
