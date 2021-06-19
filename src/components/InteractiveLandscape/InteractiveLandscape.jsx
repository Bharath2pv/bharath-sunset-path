import React from "react";
import * as THREE from "three";
import {
  vertexShaderValue,
  fragmentShaderValue,
  skyfragmentShaderValue,
  skyvertexShaderValue,
} from "./jsfiles/Shader";
import palleteimage from "./img/pallete.png";
import "./InteractiveLandscape.css";
import { animateTitles } from "./jsfiles/TitleAnimate";

class InteractiveLandscape extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    this.sky = null;
    this.scene = null;
    this.renderer = null;
    this.camera = null;
    this.terrain = null;
    this.xDamped = 0;
    this.yDamped = 0;
    this.mousepointX = 0;
    this.mousepointY = 0;
  }

  componentDidMount() {
    this.initializeComponent();
  }

  componentDidUpdate(prevProps) {
    if (this.props.mouseXY !== prevProps.mouseXY) {
      this.onMouseMove(this.props.mouseXY);
    }
    if (this.props.cameraXY !== prevProps.cameraXY) {
      if (this.props.cameraXY.x < 1 && this.props.cameraXY.y < 1) {
        let ConvertedCamX = this.props.cameraXY.x * this.state.width;
        let ConvertedCamY = this.props.cameraXY.y * this.state.height;
        let cameraCoordinates = {
          x: ConvertedCamX,
          y: ConvertedCamY,
        };
        this.onMouseMove(cameraCoordinates);
      }
    }
  }

  initializeComponent = () => {
    this.sceneSetup();
    this.sceneElements();
    this.sceneTextures();
    this.renderit();

    window.addEventListener("resize", this.resize);

    this.resize();
    animateTitles();
  };

  sceneSetup = () => {
    this.scene = new THREE.Scene();
    var fogColor = new THREE.Color(0x333333);
    this.scene.background = fogColor;
    this.scene.fog = new THREE.Fog(fogColor, 0, 400);

    this.initSky();

    this.camera = new THREE.PerspectiveCamera(
      60,
      this.state.width / this.state.height,
      0.1,
      10000
    );
    this.camera.position.y = 8;
    this.camera.position.z = 4;

    let ambientLight = new THREE.AmbientLight(0xffffff, 1);
    this.scene.add(ambientLight);

    this.renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("landscape"),
      antialias: true,
    });
    this.renderer.setPixelRatio = devicePixelRatio;
    this.renderer.setSize(this.state.width, this.state.height);
  };

  sceneElements = () => {
    var geometry = new THREE.PlaneBufferGeometry(100, 400, 400, 400);

    var uniforms = {
      time: { type: "f", value: 0.0 },
      scroll: { type: "f", value: 0.0 },
      distortCenter: { type: "f", value: 0.1 },
      roadWidth: { type: "f", value: 0.5 },
      pallete: { type: "t", value: null },
      speed: { type: "f", value: this.props.speed ? this.props.speed : 3 },
      maxHeight: {
        type: "f",
        value: this.props.doomHeight ? this.props.doomHeight : 10.0,
      },
      color: new THREE.Color(1, 1, 1),
    };

    var material = new THREE.ShaderMaterial({
      uniforms: THREE.UniformsUtils.merge([
        THREE.ShaderLib.basic.uniforms,
        uniforms,
      ]),
      vertexShader: vertexShaderValue,
      fragmentShader: fragmentShaderValue,
      wireframe: false,
      fog: true,
    });

    this.terrain = new THREE.Mesh(geometry, material);
    this.terrain.position.z = -180;
    this.terrain.rotation.x = -Math.PI / 2;

    this.scene.add(this.terrain);
  };

  sceneTextures = () => {
    // pallete
    let self = this;
    const loader = new THREE.TextureLoader();
    loader.load(palleteimage, function (texture) {
      self.terrain.material.uniforms.pallete.value = texture;
      self.terrain.material.needsUpdate = true;
    });
  };

  initSky = () => {
    var skygeometry = new THREE.BoxBufferGeometry(1, 1, 1);

    var skyuniforms = {
      luminance: { value: 1 },
      turbidity: { value: 2 },
      rayleigh: { value: 1 },
      mieCoefficient: { value: 0.005 },
      mieDirectionalG: { value: 0.8 },
      sunPosition: { value: new THREE.Vector3() },
    };

    var skymaterial = new THREE.ShaderMaterial({
      vertexShader: skyvertexShaderValue,
      fragmentShader: skyfragmentShaderValue,
      uniforms: THREE.UniformsUtils.clone(skyuniforms),
      side: THREE.BackSide,
    });

    this.sky = new THREE.Mesh(skygeometry, skymaterial);
    this.sky.scale.setScalar(450000);
    this.sky.material.uniforms.turbidity.value = 13;
    this.sky.material.uniforms.rayleigh.value = 1.2;
    this.sky.material.uniforms.luminance.value = 1;
    this.sky.material.uniforms.mieCoefficient.value = 0.1;
    this.sky.material.uniforms.mieDirectionalG.value = 0.58;

    this.scene.add(this.sky);

    let sunSphere = new THREE.Mesh(
      new THREE.SphereBufferGeometry(20000, 16, 8),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    sunSphere.visible = false;
    this.scene.add(sunSphere);

    var theta = Math.PI * -0.002;
    var phi = 2 * Math.PI * -0.25;

    sunSphere.position.x = 400000 * Math.cos(phi);
    sunSphere.position.y = 400000 * Math.sin(phi) * Math.sin(theta);
    sunSphere.position.z = 400000 * Math.sin(phi) * Math.cos(theta);

    this.sky.material.uniforms.sunPosition.value.copy(sunSphere.position);
  };

  resize = () => {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
    this.camera.aspect = this.state.width / this.state.height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.state.width, this.state.height);
  };

  onMouseMove = (coordinates) => {
    if (coordinates) {
      this.mousepointX = coordinates.x;
      this.mousepointY = coordinates.y;
    }
  };

  renderit = () => {
    requestAnimationFrame(this.renderit);

    if (this.terrain) {
      this.xDamped = this.lerp(
        this.xDamped,
        this.mousepointX,
        this.props.dampingFactor ? this.props.dampingFactor : 0.1
      );
      this.yDamped = this.lerp(
        this.yDamped,
        this.mousepointY,
        this.props.dampingFactor ? this.props.dampingFactor : 0.1
      );

      var time = performance.now() * 0.001;
      this.terrain.material.uniforms.time.value = time;
      this.terrain.material.uniforms.scroll.value =
        time + this.map(this.yDamped, 0, this.state.height, 0, 4);
      this.terrain.material.uniforms.distortCenter.value = Math.sin(time) * 0.1;
      this.terrain.material.uniforms.roadWidth.value = this.map(
        this.xDamped,
        0,
        this.state.width,
        1,
        4.5
      );

      this.camera.position.y = this.map(
        this.yDamped,
        0,
        this.state.height,
        4,
        11
      );

      this.renderer.render(this.scene, this.camera);
    }
  };

  map = (value, start1, stop1, start2, stop2) => {
    return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
  };

  lerp = (start, end, amt) => {
    return (1 - amt) * start + amt * end;
  };

  render() {
    return (
      <div>
        <div className="content">
          <canvas id="landscape"></canvas>
          <h2 className="contentTitle">
            {this.props.title ? this.props.title : "Mirror"}
          </h2>
        </div>
        <div className="overlay"></div>
      </div>
    );
  }
}

export default InteractiveLandscape;
