//Threejs variables
var scene,
    camera,
    controls,
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane,
    shadowLight,
    backLight,
    light,
    renderer,
    container;

//SCREEN VARIABLES
var HEIGHT,
    WIDTH,
    windowHalfX,
    windowHalfY,
    mousePos = {x:0,y:0},
    dist = 0;

export default class Animation {
  constructor() {
    //THREEJS RELATED VARIABLES

    this.x = 0;
    this.y = 0;
    this.z = 0;
    this.figure = null;

    this.init();
    this.createLights();
    //createFloor();
    this.createReactangle();
    this.loop();


  }

    //INIT THREE JS, SCREEN AND MOUSE EVENTS
    init(){
      scene = new THREE.Scene();
      HEIGHT = window.innerHeight;
      WIDTH = window.innerWidth;
      aspectRatio = WIDTH / HEIGHT;
      fieldOfView = 60;
      nearPlane = 1;
      farPlane = 2000;
      camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane);
      camera.position.z = 800;
      camera.position.y = 0;
      camera.lookAt(new THREE.Vector3(0,0,0));
      renderer = new THREE.WebGLRenderer({alpha: true, antialias: true });
      renderer.setPixelRatio( window.devicePixelRatio );
      renderer.setSize(WIDTH, HEIGHT);
      renderer.shadowMapEnabled = true;
      container = document.getElementById('world').appendChild(renderer.domElement);
      windowHalfX = WIDTH / 2;
      windowHalfY = HEIGHT / 2;

      /*
      controls = new THREE.OrbitControls( camera, renderer.domElement);
      //*/
    }

     onWindowResize() {
      HEIGHT = window.innerHeight;
      WIDTH = window.innerWidth;
      windowHalfX = WIDTH / 2;
      windowHalfY = HEIGHT / 2;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    }

    createLights() {
      light = new THREE.HemisphereLight(0xffffff, 0xffffff, .5)

      shadowLight = new THREE.DirectionalLight(0xffffff, .8);
      shadowLight.position.set(200, 200, 200);
      shadowLight.castShadow = true;
      shadowLight.shadowDarkness = .2;

      backLight = new THREE.DirectionalLight(0xffffff, .4);
      backLight.position.set(-100, 200, 50);
      backLight.shadowDarkness = .1;
      backLight.castShadow = true;

      scene.add(backLight);
      scene.add(light);
      scene.add(shadowLight);
    }

    createFloor(){
      floor = new THREE.Mesh(new THREE.PlaneBufferGeometry(1000,500), new THREE.MeshBasicMaterial({color: 0xebe5e7}));
      floor.rotation.x = -Math.PI/2;
      floor.position.y = -100;
      floor.receiveShadow = true;
      scene.add(floor);
    }

    createReactangle() {
      let rectGeom = new THREE.BoxGeometry(300,120,50);
      let yellowMat = new THREE.MeshLambertMaterial ({
        color: 0xfdd276,
        shading:THREE.FlatShading
      });
      this.figure = new THREE.Mesh(rectGeom, yellowMat);
      this.figure.position.z = 135;
      this.figure.position.y = -50;
      this.figure.position.x = -Math.PI/2;

      scene.add(this.figure);
    }

    loop() {
      this.render();

      this.figure.rotation.x = this.x;
      this.figure.rotation.y = this.y;
      this.figure.rotation.z = this.z;

      requestAnimationFrame(() => this.loop());
    }

    render() {
      if (controls) controls.update();
      renderer.render(scene, camera);
    }

/*
  loadModel(name) {
    // instantiate a loader
    const loader = new THREE.OBJLoader();

    // load a resource
    loader.load('models/'+name, object => {

        //let rectGeom = new THREE.BoxGeometry(300,120,50);
        let yellowMat = new THREE.MeshLambertMaterial ({
          color: 0xfdd276,
          shading:THREE.FlatShading
        });
        figure = new THREE.Mesh(object, yellowMat);
        figure.position.z = 135;
        figure.position.y = -50;
        figure.position.x = -Math.PI/2;
        scene.add(figure);
    },
    	// called when loading is in progresses
    	xhr => {
    		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded');
    	},
    	// called when loading has errors
    	error => {
    		console.log( 'An error happened');
    	}
    );
  }
*/

  setMotionEventValues(alpha, beta, gamma) {
    document.getElementById("alpha").innerHTML=alpha;
    document.getElementById("beta").innerHTML=beta;
    document.getElementById("gamma").innerHTML =gamma;
    let deviceOrientationData = { alpha:alpha, beta:beta, gamma:gamma};
    console.log(this.rotatePointViaGyroEulars(deviceOrientationData));
  }

  rotatePointViaGyroEulars(deviceOrientationData) {
    let ra = [...new Array(5)];
  	var oldX=ra[0];
  	var oldY=ra[1];
  	var oldZ=ra[2];

  	//order here is important – it must match the processing order of the device

  	//rotate about z axis
  	var newX = oldX * Math.cos(-this.degToRad(deviceOrientationData.alpha)) - oldY * Math.sin(-this.degToRad(deviceOrientationData.alpha));
  	var newY = oldY * Math.cos(-this.degToRad(deviceOrientationData.alpha)) + oldX * Math.sin(-this.degToRad(deviceOrientationData.alpha));

  	//rotate about x axis
  	oldY=newY;
  	newY = oldY * Math.cos(-this.degToRad(deviceOrientationData.beta)) - oldZ * Math.sin(-this.degToRad(deviceOrientationData.beta));
  	var newZ = oldZ * Math.cos(-this.degToRad(deviceOrientationData.beta)) + oldY * Math.sin(-this.degToRad(deviceOrientationData.beta));


  	//rotate about y axis
  	oldZ=newZ;
  	oldX=newX;

  	newZ = oldZ * Math.cos(-this.degToRad(deviceOrientationData.gamma)) - oldX * Math.sin(-this.degToRad(deviceOrientationData.gamma));
  	newX = oldX * Math.cos(-this.degToRad(deviceOrientationData.gamma)) + oldZ * Math.sin(-this.degToRad(deviceOrientationData.gamma));


  	return [newX,newY,newZ];
  }

  degToRad(deg) {
    return deg * Math.PI / 180;
  }

}

while(!(num % divider)) {
  num = num - 100;
}
