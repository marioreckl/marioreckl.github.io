import {
  MeshBasicMaterial,
  Mesh,
  PerspectiveCamera,
  sRGBEncoding,
  MeshStandardMaterial,
  Group,
  TextureLoader,
  Scene,
  WebGLRenderer,
  MathUtils,
  BoxGeometry,
  PointLight,
  AmbientLight,
  Color
} from 'https://cdn.skypack.dev/three@0.137.5';
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.112.1/examples/jsm/controls/OrbitControls.js";

let modelObject;
window.modelObject = modelObject;
var colors = [0x04C4D9, 0x037F8C, 0xF29F05, 0xF27405, 0xD95204];

modelObject = new Group();
const renderer = new WebGLRenderer({
  antialias:true,
  canvas: document.querySelector('#background'),
});

renderer.outputEncoding = sRGBEncoding;
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setPixelRatio( window.devicePixelRatio );

document.body.appendChild( renderer.domElement );

const scene = new Scene();

scene.background = new Color(0x000);

const pointLight = new PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

const loader = new TextureLoader();
const cubeMaterials = [
    new MeshBasicMaterial({ map: loader.load('assets/Right.png') }), 
    new MeshBasicMaterial({ map: loader.load('assets/Left.png')}), 
    new MeshBasicMaterial({ map: loader.load('assets/Top.png')}), 
    new MeshBasicMaterial({ map: loader.load('assets/Bottom.png')}), 
    new MeshBasicMaterial({ map: loader.load('assets/Front.png')}), 
    new MeshBasicMaterial({ map: loader.load('assets/Back.png')}), 
];

const mainCubeMesh = new Mesh(new BoxGeometry(3, 3, 3), cubeMaterials);

scene.add(mainCubeMesh);


const camera = new PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.set(-2, 2, 5);
scene.add(camera);


function addStar() {
  const widthAndHeight = MathUtils.randFloat(0.2,1);
  const geometry = new BoxGeometry(widthAndHeight,widthAndHeight, widthAndHeight);
  const randomColour = colors[Math.floor(Math.random() * colors.length)];
  const material = new MeshStandardMaterial({ color: randomColour });
  const star = new Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => {
      var position = MathUtils.randFloatSpread(50)
      if(position < 2 && position > 0){
        position += 2;
      }
      if(position > -2 && position < 0){
        position -= 2;
      }
      return position;
    });

  star.position.set(x, y, z);
  scene.add(star);
}

  
Array(400).fill().forEach(addStar);

const cameraControls = new OrbitControls(camera, renderer.domElement);


camera.add(modelObject);
modelObject.position.z = -30;


const controls = new OrbitControls(modelObject, renderer.domElement);

controls.target.z += 0.001;

renderer.setAnimationLoop(() => {
  renderer.render( scene, camera );
});
