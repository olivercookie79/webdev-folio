

var renderer = new THREE.WebGLRenderer({canvas: document.querySelector(".diagram canvas"),antialias: true ,alpha:true, premultipliedAlpha: false });
renderer.setClearColor(0x808080);
renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

const  camera = new THREE.PerspectiveCamera(50, 2, 1, 1000);
camera.position.z = 13;
// camera.autoRotate: true;
// mouseControls.enableZoom: false;
const mouseControls = new THREE.OrbitControls(
  camera, renderer.domElement);
    mouseControls.enableDamping = true;
    mouseControls.screenSpacePanning = false;
    mouseControls.minDistance = 0;
    mouseControls.maxDistance = 100;
    mouseControls.autoRotate = 100;
    mouseControls.enableZoom = false;


const scene = new THREE.Scene();



var geometry = new THREE.PlaneGeometry(200,200,200);
   var material = new THREE.ShadowMaterial({
   color: 0x292929, wireframe: false });
   var plane = new THREE.Mesh (geometry, material);

scene.add( plane );
 plane.rotation.x = -0.5 * Math.PI;
 plane.position.set(0, -3.65 ,0 );

 plane.receiveShadow = true;


const light1 = new THREE.SpotLight(0xFFFFFF , 2, 0);
light1.position.set(10, 100, 45);
scene.add(light1);
light1.castShadow = true;
light1.shadow.mapSize.width = 2048;
light1.shadow.mapSize.height = 2048;


var hemiLight = new THREE.HemisphereLight ( 0xffffff, 0xffffff, 0.6);
  hemiLight.color.setHSL( 0.6, 1, 0.6);
    hemiLight.groundColor.setHSL( 0.95, 1, 0.75);
      hemiLight.position.set( 0, 50, 0);
          hemiLight.intensity = 3.2;

  scene.add( hemiLight );


var spotLight = new THREE.SpotLight( 0xFFFFFF );
  spotLight.position.set( 100, 200, 120 );
    spotLight.intensity =4;
      spotLight.castShadow = true;
        spotLight.angle =2.8;
          spotLight.penumbra =0.8;

            spotLight.distance = 200;

//function canvas resize//
function resizeCanvasToDisplaySize() {
  const canvas = renderer.domElement;
  const width = canvas.clientWidth;
  const height = canvas.clientHeight;
  if (canvas.width !== width ||canvas.height !== height) {
    // you must pass false here or three.js sadly fights the browser
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();


    // set render target sizes here
  }
}


//add the model to the scene//
var loader = new THREE.GLTFLoader();
loader.load('/models/Dewey10.glb',function(gltf){

  gltf.scene.traverse (function( child ) {

    if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;


    }
})

scene.add( gltf.scene );
const deweyGeo = ( gltf.scene);

deweyGeo.position.set( 0, -5, 0 );
  deweyGeo.scale.set( 10, 10, 10 );
  deweyGeo.rotation.y += 7;
  deweyGeo.castShadow = true;
  deweyGeo.receiveShadow = true;



  });


function animate(time) {
  time *= 0.001;  // seconds
  mouseControls.update();




  resizeCanvasToDisplaySize();


  // mesh.rotation.y = time * 1;

  renderer.render(scene, camera);
  requestAnimationFrame(animate);
}

requestAnimationFrame(animate);
