import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { STLLoader } from "three/addons/loaders/STLLoader.js";

const MODEL_URL = "/e-tongue-hardware-model.stl";
const FLOOR_Y = -0.55;
const GROUND_SINK = 0.035;
const CAMERA_POSITION = [2.8, 1.8, 5];
const CAMERA_TARGET = [0, -0.05, 0];

export default function HardwareViewer() {
  const mountRef = useRef(null);
  const modelRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const autoRotateRef = useRef(true);

  const [autoRotate, setAutoRotate] = useState(true);
  const [status, setStatus] = useState("Loading model...");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let disposed = false;
    let animationFrame = null;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#eaf7f0");

    const camera = new THREE.OrthographicCamera(-2, 2, 2, -2, 0.01, 100);
    cameraRef.current = camera;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.06;
    controls.enablePan = false;
    controls.enableZoom = true;
    controls.minPolarAngle = 0.35;
    controls.maxPolarAngle = Math.PI / 2 - 0.05;
    controls.target.set(...CAMERA_TARGET);
    controlsRef.current = controls;

    const hemisphereLight = new THREE.HemisphereLight("#ffffff", "#9bc7ad", 2.2);
    scene.add(hemisphereLight);

    const keyLight = new THREE.DirectionalLight("#ffffff", 3);
    keyLight.position.set(4, 6, 5);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight("#c4f3d7", 1.8);
    fillLight.position.set(-4, 2, -3);
    scene.add(fillLight);

    const grid = new THREE.GridHelper(5, 16, "#a5d7bc", "#d3ede0");
    grid.position.y = FLOOR_Y;
    grid.material.transparent = true;
    grid.material.opacity = 0.45;
    scene.add(grid);

    const updateCamera = () => {
      if (!mount) return;
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      if (!width || !height) return;

      const aspect = width / height;
      const viewSize = 2.5;

      if (aspect >= 1) {
        camera.left = (-viewSize * aspect) / 2;
        camera.right = (viewSize * aspect) / 2;
        camera.top = viewSize / 2;
        camera.bottom = -viewSize / 2;
      } else {
        camera.left = -viewSize / 2;
        camera.right = viewSize / 2;
        camera.top = (viewSize / aspect) / 2;
        camera.bottom = -(viewSize / aspect) / 2;
      }

      camera.near = 0.01;
      camera.far = 100;
      camera.position.set(...CAMERA_POSITION);
      camera.lookAt(...CAMERA_TARGET);
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
      controls.target.set(...CAMERA_TARGET);
      controls.update();
    };

    const resizeObserver = new ResizeObserver(updateCamera);
    resizeObserver.observe(mount);
    updateCamera();

    const material = new THREE.MeshStandardMaterial({
      color: "#6b9e83",
      metalness: 0.15,
      roughness: 0.4,
    });

    const loadFallbackModel = () => {
      if (disposed) return;

      const group = new THREE.Group();
      const base = new THREE.Mesh(new THREE.BoxGeometry(1.2, 0.4, 0.8), material);

      const armGeo = new THREE.BoxGeometry(0.25, 0.8, 0.3);
      armGeo.translate(-0.35, 0.6, 0);
      const arm = new THREE.Mesh(armGeo, material);

      const chamberGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.3, 32);
      chamberGeo.translate(0.2, 0.45, 0);
      const chamber = new THREE.Mesh(chamberGeo, material);

      group.add(base, arm, chamber);

      const box = new THREE.Box3().setFromObject(group);
      const center = box.getCenter(new THREE.Vector3());
      group.position.sub(center);

      const groundedBox = new THREE.Box3().setFromObject(group);
      group.position.y += FLOOR_Y - groundedBox.min.y - GROUND_SINK;

      scene.add(group);
      modelRef.current = group;

      updateCamera();
      setStatus("Preview model loaded. Drag to rotate.");
    };

    const loader = new STLLoader();

    try {
      loader.load(
        MODEL_URL,
        (geometry) => {
          if (disposed) return;

          geometry.computeBoundingBox();

          const center = new THREE.Vector3();
          geometry.boundingBox.getCenter(center);
          geometry.translate(-center.x, -center.y, -center.z);

          geometry.computeBoundingBox();
          const size = new THREE.Vector3();
          geometry.boundingBox.getSize(size);

          const maxDimension = Math.max(size.x, size.y, size.z);
          if (maxDimension > 0) {
            const scale = 1 / maxDimension;
            geometry.scale(scale, scale, scale);
          }

          geometry.computeVertexNormals();
          geometry.computeBoundingBox();

          const mesh = new THREE.Mesh(geometry, material);
          mesh.position.y = FLOOR_Y - geometry.boundingBox.min.y - GROUND_SINK;
          scene.add(mesh);
          modelRef.current = mesh;

          updateCamera();
          setStatus("Drag to rotate. Scroll to zoom.");
        },
        undefined,
        () => {
          loadFallbackModel();
        }
      );
    } catch (error) {
      console.warn("Failed to load STL model.", error);
      loadFallbackModel();
    }

    const animate = () => {
      if (disposed) return;
      animationFrame = requestAnimationFrame(animate);

      if (autoRotateRef.current && modelRef.current) {
        modelRef.current.rotation.y += 0.002;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    return () => {
      disposed = true;
      if (animationFrame) cancelAnimationFrame(animationFrame);
      resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();

      if (modelRef.current) {
        modelRef.current.traverse?.((child) => {
          if (child.isMesh) {
            child.geometry.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material.dispose();
            }
          }
        });
        if (modelRef.current.geometry) modelRef.current.geometry.dispose();
        if (modelRef.current.material) modelRef.current.material.dispose();
      }

      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }

      modelRef.current = null;
      cameraRef.current = null;
      controlsRef.current = null;
    };
  }, []);

  const resetView = () => {
    if (modelRef.current) {
      modelRef.current.rotation.set(0, 0, 0);
    }
    if (cameraRef.current) {
      cameraRef.current.position.set(...CAMERA_POSITION);
      cameraRef.current.lookAt(...CAMERA_TARGET);
      cameraRef.current.updateProjectionMatrix();
    }
    if (controlsRef.current) {
      controlsRef.current.target.set(...CAMERA_TARGET);
      controlsRef.current.update();
    }
  };

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/60 bg-gradient-to-br from-white/90 via-emerald-50 to-teal-100/70 p-6 shadow-2xl shadow-emerald-900/5">
      <div className="flex items-center justify-between gap-4 border-b border-emerald-100 px-1 pb-4">
        <div>
          <span className="text-[11px] font-black uppercase tracking-[0.2em] text-emerald-700">
            Live 3D model
          </span>
          <p className="mt-1 text-sm font-medium text-slate-500">
            Inspect the chassis and sensor chamber from every angle.
          </p>
        </div>
        <span className="rounded-full border border-emerald-100 bg-white px-4 py-1.5 text-[10px] font-black text-slate-500 shadow-sm">
          STL
        </span>
      </div>

      <div
        ref={mountRef}
        className="mt-5 h-[320px] w-full cursor-grab touch-none rounded-[1.5rem] border border-emerald-100/80 bg-[#eaf7f0] active:cursor-grabbing sm:h-[420px]"
      />

      <div className="mt-5 flex flex-col gap-4 px-1 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-slate-500">{status}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => {
              setAutoRotate((value) => {
                const next = !value;
                autoRotateRef.current = next;
                return next;
              });
            }}
            className="rounded-xl border border-emerald-100 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 shadow-sm transition hover:bg-emerald-50 hover:text-emerald-700"
          >
            {autoRotate ? "Pause spin" : "Auto spin"}
          </button>
          <button
            type="button"
            onClick={resetView}
            className="rounded-xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md transition hover:bg-emerald-700"
          >
            Reset view
          </button>
        </div>
      </div>
    </div>
  );
}

