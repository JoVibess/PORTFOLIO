import * as THREE from "three";
import { gsap, Expo } from "gsap";

var hoverEffect = function (opts) {
  function firstDefined(...args) {
    return args.find((arg) => arg !== undefined);
  }

  var parent = opts.parent;
  var dispImage = opts.displacementImage;
  var image1 = opts.image1;
  var image2 = opts.image2;
  var intensity1 = firstDefined(opts.intensity1, opts.intensity, 1);
  var intensity2 = firstDefined(opts.intensity2, opts.intensity, 1);
  var commonAngle = firstDefined(opts.angle, Math.PI / 4);
  var angle1 = firstDefined(opts.angle1, commonAngle);
  var angle2 = firstDefined(opts.angle2, -commonAngle * 3);
  var speedIn = firstDefined(opts.speedIn, opts.speed, 1.6);
  var speedOut = firstDefined(opts.speedOut, opts.speed, 1.2);
  var userHover = firstDefined(opts.hover, true);
  var easing = firstDefined(opts.easing, Expo.easeOut);

  if (!(parent instanceof HTMLElement)) {
    console.warn("Parent is not a valid HTML element");
    return;
  }

  if (!(image1 && image2 && dispImage)) {
    console.warn("One or more images are missing");
    return;
  }

  var scene = new THREE.Scene();
  var camera = new THREE.OrthographicCamera(
    parent.offsetWidth / -2,
    parent.offsetWidth / 2,
    parent.offsetHeight / 2,
    parent.offsetHeight / -2,
    1,
    1000
  );
  camera.position.z = 1;

  var renderer = new THREE.WebGLRenderer({ antialias: false });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setClearColor(0xffffff, 0.0);
  renderer.setSize(parent.offsetWidth, parent.offsetHeight);
  parent.appendChild(renderer.domElement);

  var render = () => renderer.render(scene, camera);

  var loader = new THREE.TextureLoader();
  var texture1 = loader.load(image1, render);
  var texture2 = loader.load(image2, render);
  var disp = loader.load(dispImage, render);
  disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

  texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
  texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

  var mat = new THREE.ShaderMaterial({
    uniforms: {
      intensity1: { value: intensity1 },
      intensity2: { value: intensity2 },
      dispFactor: { value: 0.0 },
      angle1: { value: angle1 },
      angle2: { value: angle2 },
      texture1: { value: texture1 },
      texture2: { value: texture2 },
      disp: { value: disp },
    },
    vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec2 vUv;
      uniform float dispFactor;
      uniform sampler2D disp;
      uniform sampler2D texture1;
      uniform sampler2D texture2;
      uniform float angle1;
      uniform float angle2;
      uniform float intensity1;
      uniform float intensity2;

      mat2 getRotM(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }

      void main() {
        vec4 disp = texture2D(disp, vUv);
        vec2 dispVec = vec2(disp.r, disp.g);
        vec2 distortedPosition1 = vUv + getRotM(angle1) * dispVec * intensity1 * dispFactor;
        vec2 distortedPosition2 = vUv + getRotM(angle2) * dispVec * intensity2 * (1.0 - dispFactor);
        vec4 _texture1 = texture2D(texture1, distortedPosition1);
        vec4 _texture2 = texture2D(texture2, distortedPosition2);
        gl_FragColor = mix(_texture1, _texture2, dispFactor);
      }
    `,
    transparent: true,
    opacity: 1.0,
  });

  var geometry = new THREE.PlaneGeometry(
    parent.offsetWidth,
    parent.offsetHeight,
    1
  );
  var object = new THREE.Mesh(geometry, mat);
  scene.add(object);

  function transitionIn() {
    gsap.to(mat.uniforms.dispFactor, {
      duration: speedIn,
      value: 1,
      ease: easing,
      onUpdate: render,
    });
  }

  function transitionOut() {
    gsap.to(mat.uniforms.dispFactor, {
      duration: speedOut,
      value: 0,
      ease: easing,
      onUpdate: render,
    });
  }

  if (userHover) {
    parent.addEventListener("mouseenter", transitionIn);
    parent.addEventListener("mouseleave", transitionOut);
  }

  window.addEventListener("resize", function () {
    renderer.setSize(parent.offsetWidth, parent.offsetHeight);
    camera.updateProjectionMatrix();
    render();
  });

  this.next = transitionIn;
  this.previous = transitionOut;
};

export default hoverEffect;
