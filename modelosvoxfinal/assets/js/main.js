import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// Scene, camera, renderer
const scene = new THREE.Scene();
scene.background = new THREE.Color(0xffffff);

const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 8);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 1, 0);
controls.update();

// Lights
const hemi = new THREE.HemisphereLight(0xffffff, 0x444444, 0.6);
scene.add(hemi);

const dir = new THREE.DirectionalLight(0xffffff, 0.9);
dir.position.set(5, 10, 7);
dir.castShadow = true;
dir.shadow.camera.top = 10;
dir.shadow.camera.bottom = -10;
dir.shadow.camera.left = -10;
dir.shadow.camera.right = 10;
scene.add(dir);

// Ground
const groundGeo = new THREE.PlaneGeometry(40, 40);
const groundMat = new THREE.MeshStandardMaterial({ color: 0xf0f0f0 });
const ground = new THREE.Mesh(groundGeo, groundMat);
ground.rotation.x = -Math.PI / 2;
ground.position.y = 0;
ground.receiveShadow = true;
scene.add(ground);

// GLTF Loader (load the three models)
const loader = new GLTFLoader();

const models = [
  { file: './assets/models/glb/gallo.glb', name: 'gallo', pos: [-11, 3, 1], scale: 100.0 },
  { file: './assets/models/glb/granjero.glb', name: 'granjero', pos: [-11, 3, -5], scale: 100.0 },
  { file: './assets/models/glb/Granero.glb', name: 'granero', pos: [0, 12, 1], scale: 200.0 }
];

models.forEach(m => {
  loader.load(m.file, (gltf) => {
    const obj = gltf.scene || gltf.scenes[0];
    obj.name = m.name;
    obj.position.set(...m.pos);
    obj.scale.set(m.scale, m.scale, m.scale);
    obj.traverse(n => {
      if (n.isMesh) {
        n.castShadow = true;
        n.receiveShadow = true;
        // Ensure material supports lights (in case model uses basic material)
        if (n.material && n.material.isMeshBasicMaterial) {
          n.material = new THREE.MeshStandardMaterial({ map: n.material.map });
        }
      }
    });
    scene.add(obj);
  }, undefined, (err) => {
    console.error('Error loading', m.file, err);
  });
});

// Handle resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Simple animation loop
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}
animate();
