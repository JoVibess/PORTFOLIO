import '/index.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
import GUI from 'lil-gui'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { DRACOLoader } from 'three/examples/jsm/Addons.js'



/**
 * Debug
 */

const gui = new GUI({
    width: 400,
    title: 'Nice debug UI',
    closeFolders: false
})


window.addEventListener('keydown', (event) => {
    if(event.key == 'h')
        gui.show(gui._hidden)
    
})




// Responsive

let cameraFOV = 75

if(window.innerWidth <= 1024){
    cameraFOV = 100
}
if(window.innerWidth <= 700){
    cameraFOV = 70
}


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Lights
const debugObject = {}

// Ambient Light
debugObject.ambientColor = '#707070' // Correction: Format valide pour dat.GUI
const ambientLight = new THREE.AmbientLight(debugObject.ambientColor, 0.305)
scene.add(ambientLight)


// GUI - Ambient Light
const ambientLightFolder = gui.addFolder('Ambient Light')
ambientLightFolder.add(ambientLight, 'intensity').min(0).max(3).step(0.001).name('Intensity')
ambientLightFolder.addColor(debugObject, 'ambientColor').name('Color').onChange(() => {
    ambientLight.color.set(debugObject.ambientColor)
})

// Directional Light
debugObject.directionalColor = '#f7f7f7' // Correction: Format valide pour dat.GUI
const directionalLight = new THREE.DirectionalLight(debugObject.directionalColor, 1)
directionalLight.position.set(-5, -5, 5)
scene.add(directionalLight)

// GUI - Directional Light
const lightFolder = gui.addFolder('Directional Light')
lightFolder.add(directionalLight.position, 'x').min(-5).max(5).step(0.01).name('Position X')
lightFolder.add(directionalLight.position, 'y').min(-5).max(5).step(0.01).name('Position Y')
lightFolder.add(directionalLight.position, 'z').min(-5).max(5).step(0.01).name('Position Z')
lightFolder.add(directionalLight, 'intensity').min(0).max(3).step(0.001).name('Directional Light Intensity')
lightFolder.addColor(debugObject, 'directionalColor').name('Directional Light Color').onChange(() => {
    directionalLight.color.set(debugObject.directionalColor)
})

// // Hemisphere Light
// debugObject.skyColor = '#ff0000'
// debugObject.groundColor = '#0000ff'
// const hemisphereLight = new THREE.HemisphereLight(debugObject.skyColor, debugObject.groundColor, 0.9)
// scene.add(hemisphereLight)

// // GUI - Hemisphere Light
// const hemisphereLightFolder = gui.addFolder('Hemisphere Light')
// hemisphereLightFolder.addColor(debugObject, 'skyColor').name('Sky Color').onChange(() => {
//     hemisphereLight.color.set(debugObject.skyColor)
// })
// hemisphereLightFolder.addColor(debugObject, 'groundColor').name('Ground Color').onChange(() => {
//     hemisphereLight.groundColor.set(debugObject.groundColor)
// })

// Point Light

debugObject.pointLightColor = '#da94ff' // Format hex valide

// Point Light
const pointLight = new THREE.PointLight(debugObject.pointLightColor, 1.52, 2.8, 1.42)
pointLight.position.set(1.65, -0.42, 0.79)
scene.add(pointLight)

// GUI - Point Light
const pointLightFolder = gui.addFolder('Point Light')
pointLightFolder.add(pointLight, 'intensity').min(0).max(5).step(0.01).name('Intensity')
pointLightFolder.addColor(debugObject, 'pointLightColor').name('Color').onChange(() => {
    pointLight.color.set(debugObject.pointLightColor)
})
pointLightFolder.add(pointLight, 'distance').min(0).max(10).step(0.1).name('Distance')
pointLightFolder.add(pointLight, 'decay').min(0).max(5).step(0.01).name('Decay')

const pointLightPositionFolder = pointLightFolder.addFolder('Position')
pointLightPositionFolder.add(pointLight.position, 'x').min(-5).max(5).step(0.01).name('X')
pointLightPositionFolder.add(pointLight.position, 'y').min(-5).max(5).step(0.01).name('Y')
pointLightPositionFolder.add(pointLight.position, 'z').min(-5).max(5).step(0.01).name('Z')

pointLightFolder.open() // Ouvre le folder par défaut

// Rectangle Light

debugObject.rectAreaLightColor = '#583bc4'

const rectAreaLight = new THREE.RectAreaLight(debugObject.rectAreaLightColor, 1.5, 5, 2)
rectAreaLight.position.set(-1, -1.7, 1.7)
rectAreaLight.lookAt(new THREE.Vector3())
scene.add(rectAreaLight)

// GUI - Rect Area Light
const rectAreaLightFolder = gui.addFolder('Rect Area Light')
rectAreaLightFolder.add(rectAreaLight, 'intensity').min(0).max(10).step(0.1).name('Intensity')
rectAreaLightFolder.addColor(debugObject, 'rectAreaLightColor').name('Color').onChange(() => {
    rectAreaLight.color.set(debugObject.rectAreaLightColor)
})
rectAreaLightFolder.add(rectAreaLight, 'width').min(0.1).max(5).step(0.1).name('Width')
rectAreaLightFolder.add(rectAreaLight, 'height').min(0.1).max(5).step(0.1).name('Height')

const rectAreaLightPositionFolder = rectAreaLightFolder.addFolder('Position')
rectAreaLightPositionFolder.add(rectAreaLight.position, 'x').min(-5).max(5).step(0.1).name('X')
rectAreaLightPositionFolder.add(rectAreaLight.position, 'y').min(-5).max(5).step(0.1).name('Y')
rectAreaLightPositionFolder.add(rectAreaLight.position, 'z').min(-5).max(5).step(0.1).name('Z')

rectAreaLightFolder.open() // Ouvre le folder par défaut


// Material

const redMaterial = new THREE.MeshStandardMaterial()
redMaterial.roughness = 0.4



// Object
// const axesHelper = new THREE.AxesHelper(1);
// scene.add(axesHelper);
/**
 * Models
*/

const gltfLoader = new GLTFLoader();
const textureLoader = new THREE.TextureLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("/draco/");
gltfLoader.setDRACOLoader(dracoLoader);

// const textureColor = textureLoader.load('models/travertine2_BaseColor.jpg');
// textureColor.wrapS = THREE.ClampToEdgeWrapping;
// textureColor.wrapT = THREE.ClampToEdgeWrapping;
 
// const textureNormal = textureLoader.load('models/travertine2_Normal.jpg');
// textureNormal.wrapS = THREE.RepeatWrapping;
// textureNormal.wrapT = THREE.RepeatWrapping;
// const textureRoughness = textureLoader.load('models/travertine2_Roughness.png');
// textureRoughness.wrapS = THREE.RepeatWrapping;
// textureRoughness.wrapT = THREE.RepeatWrapping;

// const redMaterial = new THREE.MeshBasicMaterial({
//     map: textureColor,  // Texture de couleur
//     normalMap: textureNormal, // Texture normale
//     roughnessMap: textureRoughness
// });






gltfLoader.load(
   '/models/face.glb',
   (gltf) => {
       console.log(gltf);
       
       const model = gltf.scene.children[0];
        model.material = redMaterial;
      scene.add(model);
      //    model.scale.setScalar(0.5)
      model.position.setScalar(0)
      model.position.y = 0
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
);

// Sizes

const divResize = document.querySelector(".myHead")
let sizess = divResize.getBoundingClientRect();


const sizes = {
    width: sizess.width,
    height: sizess.height
}


window.addEventListener('resize', () =>
    {
        sizess = divResize.getBoundingClientRect();
        

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
    const camera = new THREE.PerspectiveCamera(cameraFOV, sizes.width / sizes.height)
    camera.position.set(0,0,3)
    scene.add(camera)



// // Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

    

    
// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
renderer.setClearColor("#131314")