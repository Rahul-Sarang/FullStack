// Variables
let scene, camera, renderer, player, obstacles = [];
let score = 0;

// Initialize the scene
function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById('gameContainer').appendChild(renderer.domElement);

    // Create player (a simple box)
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    player = new THREE.Mesh(geometry, material);
    player.position.set(0, 0.5, 0);
    scene.add(player);

    // Setup camera
    camera.position.z = 5;

    // Add event listeners for keyboard controls
    document.addEventListener('keydown', onKeyDown);
    
    // Start the animation loop
    animate();
}

// Handle keyboard controls
function onKeyDown(event) {
    switch (event.key) {
        case 'ArrowLeft':
            player.position.x -= 0.1;
            break;
        case 'ArrowRight':
            player.position.x += 0.1;
            break;
        case 'ArrowUp':
            player.position.y += 0.1; // Jump effect (simple)
            break;
    }
}

// Animate the scene
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Create obstacles at random intervals
function createObstacle() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const obstacle = new THREE.Mesh(geometry, material);
    obstacle.position.set(5, 0.5, Math.random() * 5 - 2.5); // Random position
    obstacles.push(obstacle);
    scene.add(obstacle);
}

// Check for collisions (basic)
function checkCollisions() {
    obstacles.forEach(obstacle => {
        if (player.position.distanceTo(obstacle.position) < 1) {
            alert('Game Over! Your score: ' + score);
            document.location.reload(); // Restart the game
        }
    });
}

// Update the game loop
setInterval(() => {
    createObstacle();
    score++;
    checkCollisions();
}, 2000);

// Start the game
init();
