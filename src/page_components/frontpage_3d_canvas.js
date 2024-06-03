import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import  {useEffect, useRef} from "react";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

export default function THREE_scene () {


    const sizes ={
        width:window.innerWidth,
        height:700,
    }
    const canvas = useRef(null);
    const scene= new THREE.Scene();
    const loader = new GLTFLoader();
    const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height);
    var renderer
    var controls
    camera.position.set( 35.6, 37.8, -24.5)
    camera.lookAt(-2.28,0.75,2.47)
   
    const light = new THREE.PointLight("#FFFFFF",1000,100)
    light.position.set(20,28,-10)
    scene.add(light);
    scene.add(camera);
    scene.background= new THREE.Color("#000000")
 
 
    function init(){
        renderer = new THREE.WebGLRenderer({canvas:canvas.current})
        controls =  new OrbitControls(camera,renderer.domElement)
        renderer.setSize(sizes.width,sizes.height);
        camera.updateProjectionMatrix();
        camera.aspect= sizes.width/sizes.height
    }

    
    loader.load('./Globe+wireframev1.0.glb', (gtlf)=>{
        scene.add(gtlf.scene)
        renderer.setAnimationLoop(animate)
    })
    
    function animate(timestamp) {
        controls.update()
        renderer.render(scene,camera);
        scene.children[2].children[0].rotation.y=timestamp/10000
    }
    
    
    window.addEventListener("resize", ()=>{
       sizes.width=window.innerWidth;
       camera.aspect= sizes.width/sizes.height
       camera.updateProjectionMatrix();
       renderer.setSize(sizes.width,sizes.height);

    })

   useEffect(()=>{

    init()
    
   },[])
    return (<div >
         <canvas   id = "webgl" ref={canvas} >
        </canvas>
        
        </div>
    
       )

}

