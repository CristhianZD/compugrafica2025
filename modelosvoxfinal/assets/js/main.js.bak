import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x54AAFF); // Light blue background

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);

//Standard Material
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    roughness: 0.5,
    metalness: 0.5
});
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Basic Material
const materialBasic = new THREE.MeshBasicMaterial({
    color: 0x00ff00,
    transparent: true,
    opacity: 0.3
});
const cube2 = new THREE.Mesh(geometry, materialBasic);
scene.add(cube2);
cube2.position.x = -2;

// Lambert Material
const materialLambert = new THREE.MeshLambertMaterial({
    color: 0x00ff00,
    emissive: 0xFFFFFF,
    emissiveIntensity: 0.1
});
const cube3 = new THREE.Mesh(geometry, materialLambert);
scene.add(cube3);
cube3.position.x = 2;

// Normal Material
const materialNormal = new THREE.MeshNormalMaterial({ color: 0x00ff00 });
const cube4 = new THREE.Mesh(geometry, materialNormal);
scene.add(cube4);
cube4.position.x = 4;

// Load image
const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./assets/images/ajedrez.png');

texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(16, 16);



const materialTxt = new THREE.MeshStandardMaterial({ map: texture, side: THREE.DoubleSide });

const cube5 = new THREE.Mesh(geometry, materialTxt);
scene.add(cube5);
cube5.position.y = -2;

const textureRain = textureLoader.load('./assets/images/water.png');
const materialRain = new THREE.MeshStandardMaterial({ map: textureRain, side: THREE.DoubleSide, transparent:true });

const cube7 = new THREE.Mesh(geometry, materialRain);
scene.add(cube7);
cube7.position.x = -2;
cube7.position.y = -2;

// Load Multiple images
const materialCube = [new THREE.MeshBasicMaterial({ map: textureLoader.load('./assets/images/face1.jpg'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial({ map: textureLoader.load('./assets/images/face2.png'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial({ map: textureLoader.load('./assets/images/face3.jpg'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial({ map: textureLoader.load('./assets/images/face4.jpg'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial({ map: textureLoader.load('./assets/images/face5.png'), side: THREE.DoubleSide }),
new THREE.MeshBasicMaterial({ map: textureLoader.load('./assets/images/face6.jpg'), side: THREE.DoubleSide }),
];

const cube6 = new THREE.Mesh(geometry, materialCube);
scene.add(cube6);
cube6.position.set(2, -2, 0);

camera.position.z = 5;
controls.update();

function animate() {
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    cube2.rotation.x += 0.01;
    cube2.rotation.y += 0.01;

    cube3.rotation.x += 0.01;
    cube3.rotation.y += 0.01;

    cube4.rotation.x += 0.01;
    cube4.rotation.y += 0.01;

    cube5.rotation.x += 0.01;
    cube5.rotation.y += 0.01;

    cube6.rotation.x += 0.01;
    cube6.rotation.y += 0.01;

    cube7.rotation.x += 0.01;
    cube7.rotation.y += 0.01;


    controls.update();
    renderer.render(scene, camera);
}

// Create Ground
function createGround() {
    // 1. Create the PlaneGeometry
    const groundGeometry = new THREE.PlaneGeometry(100, 100); // Width and height of the ground

    // 2. Create a Material (e.g., MeshStandardMaterial for PBR materials)
    var groundMaterial = new THREE.MeshStandardMaterial();
    // Optional: Add a texture to the ground
    const textureLoader = new THREE.TextureLoader();
    const groundTexture = textureLoader.load('./assets/images/ground.jpg');
    groundMaterial.map = groundTexture;
    groundMaterial.wrapS = groundMaterial.wrapT = THREE.RepeatWrapping;
    // groundTexture.repeat.set(10, 10); // Adjust repetition as needed

    

    // 3. Create the Mesh
    const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);

    // 4. Rotate the ground to lie flat on the XZ plane
    groundMesh.rotation.x = -Math.PI / 2;


    groundMesh.position.y = -4;
    // 5. Add the ground to your scene
    scene.add(groundMesh); // Assuming you have a 'scene' object defined
}

createGround();
// Function to handle window resizing
function onWindowResize() {
    // Update camera aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;
    // Update the camera's projection matrix to reflect the aspect ratio change
    camera.updateProjectionMatrix();

    // Update renderer size
    renderer.setSize(window.innerWidth, window.innerHeight);
}

// Add the event listener for window resize
window.addEventListener('resize', onWindowResize, false);

renderer.setAnimationLoop(animate);

//LUCES
// Function Create Light AmbientLight
const light = new THREE.AmbientLight(0x404040, 5); // soft white light
scene.add(light);

// DirectionalLight
// White directional light at half intensity shining from the top.
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
scene.add(directionalLight);

// PointLight
const pointLight = new THREE.PointLight(0xffffff, 1, 100);
pointLight.position.set(2, -1, -2);
scene.add(pointLight);

const sphereSize = 1;
const pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
// scene.add( pointLightHelper );