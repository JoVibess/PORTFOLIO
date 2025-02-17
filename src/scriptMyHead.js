import '/index.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const redMaterial = new THREE.MeshBasicMaterial({color:"#306AE8"})
// const axesHelper = new THREE.AxesHelper(1);
// scene.add(axesHelper);
/**
 * Models
*/
const gltfLoader = new GLTFLoader()

gltfLoader.load(
   '/models/face3D.glb',
   (gltf) => {
       console.log('success');
       console.log(gltf);
       
       const model = gltf.scene.children[0];

      scene.add(model);
      model.material = redMaterial;
      //    model.scale.setScalar(0.5)
      model.position.setScalar(0)
      model.position.y = 0.5
    //    camera.lookAt(model.position)

       // Animations
       const tick = () =>
       {
       
        model.rotation.y += 0.003
       
       
           // Render
           renderer.render(scene, camera)
           window.requestAnimationFrame(tick)
       }
       
       tick()
    },
    (progress) => {
        console.log('progress');
        console.log(progress);
    },
    (error) => {
        console.log('error');
        console.log(error);
    }
);

// Sizes

const divResize = document.querySelector(".myHead")
let sizess = divResize.getBoundingClientRect();
console.log(sizess.width, sizess.height);


const sizes = {
    width: sizess.width,
    height: sizess.height
}


window.addEventListener('resize', () =>
    {
        sizess = divResize.getBoundingClientRect();
        console.log(sizess);
        

        // Update sizes
        sizes.width = sizess.width
        sizes.height = sizess.height

        
        // Update camera
        camera.aspect = sizes.width / sizes.height
        camera.updateProjectionMatrix()
        
        // Update renderer
        renderer.setSize(sizes.width, sizes.height)
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    })
    
// Camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
    camera.position.set(0,0,3)
    scene.add(camera)


// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

    

    
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
    
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#131314")