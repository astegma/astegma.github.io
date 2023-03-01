import * as THREE from 'three';
import { STLLoader } from 'STLLoader';
import { OrbitControls } from 'OrbitControls';

let scene, camera, renderer, mesh;
const startHeight = window.innerHeight, startWidth = window.innerWidth;
init();
animate();

function init() {
    
    // камера
    camera = new THREE.PerspectiveCamera(35, 300 / 360, 1, 1000);
    camera.position.set( 300, 0, 0 );
    
    // Создание сцены
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xFFFFFF);
    
    // Загрузка модели и добавление ее на сцену
    const loader = new STLLoader(); 
    loader.load('./resources/models/plato_bust.stl', function(geometry) {
        let material = new THREE.MeshPhongMaterial( { color: 0xFFFFFF } );
        
        if ( geometry.hasColors ) {
            material = new THREE.MeshPhongMaterial( { opacity: geometry.alpha} );
        }
        
        mesh = new THREE.Mesh(geometry, material);
        
        mesh.position.set(0, 0, 0);
        mesh.rotation.x = -1.55;
        mesh.rotation.y = 0;
        mesh.rotation.z = 1.55;
        
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        material.needsUpdate = true
        
        scene.add(mesh);
    });
    
    // рендер
    const canvas = document.querySelector( '#canvas' );
    renderer = new THREE.WebGLRenderer( { canvas, antialias: true } );
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize(300, 360);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.shadowMap.enabled = true;
    
    // освещение сцены
    scene.add( new THREE.HemisphereLight( 0xDDDDDD, 0x111122 ) );
    
    // тени
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    
    // Обновление сцены при изменении размеров окна
    window.addEventListener('resize', function() {
        renderer.setSize(300 * (window.innerWidth / startWidth), 360 * (window.innerHeight / startHeight));
        canvas.width = 300 * (window.innerWidth / startWidth);
        canvas.height = 360 * (window.innerHeight / startHeight);
    });
    
    // контроль камеры
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enabled = false;
    controls.enableDamping = true;
    controls.update();
}

// Анимация сцены
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    mesh.rotation.z += 0.002;
}
