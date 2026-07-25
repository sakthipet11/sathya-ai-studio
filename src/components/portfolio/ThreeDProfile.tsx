import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function ThreeDProfile() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlSupported, setWebGlSupported] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Check WebGL availability
    const canvasTest = document.createElement("canvas");
    const gl = canvasTest.getContext("webgl") || canvasTest.getContext("experimental-webgl");
    if (!gl) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    const width = container.clientWidth || 320;
    const height = container.clientHeight || 400;

    // 1. Scene, Camera, Renderer Setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 1000);
    camera.position.z = 180;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Helpers: Circular textures for particles
    const createOuterParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(56, 189, 248, 1)"); // Cyan #38BDF8
        gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.5)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    const createInnerParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(168, 85, 247, 1)"); // Purple #A855F7
        gradient.addColorStop(0.3, "rgba(168, 85, 247, 0.4)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    // 2. Objects: Neural Net Sphere Group
    const neuralNetGroup = new THREE.Group();
    scene.add(neuralNetGroup);

    // Node details
    const radius = 55;
    const nodeCount = 80;
    const nodeGeometry = new THREE.BufferGeometry();
    const nodePositions = new Float32Array(nodeCount * 3);

    // Distribute nodes randomly on sphere surface
    for (let i = 0; i < nodeCount; i++) {
      const phi = Math.acos(-1 + (2 * i) / nodeCount);
      const theta = Math.sqrt(nodeCount * Math.PI) * phi;

      nodePositions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      nodePositions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      nodePositions[i * 3 + 2] = radius * Math.cos(phi);
    }
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));

    const nodeMaterial = new THREE.PointsMaterial({
      size: 5.5,
      map: createOuterParticleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.85,
    });

    const outerNodes = new THREE.Points(nodeGeometry, nodeMaterial);
    neuralNetGroup.add(outerNodes);

    // Inner Glowing Core (representing processing power)
    const coreCount = 45;
    const coreGeometry = new THREE.BufferGeometry();
    const corePositions = new Float32Array(coreCount * 3);
    const coreRadius = 24;

    for (let i = 0; i < coreCount; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = coreRadius * Math.cbrt(Math.random());

      corePositions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      corePositions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      corePositions[i * 3 + 2] = r * Math.cos(phi);
    }
    coreGeometry.setAttribute("position", new THREE.BufferAttribute(corePositions, 3));

    const coreMaterial = new THREE.PointsMaterial({
      size: 7,
      map: createInnerParticleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.9,
    });

    const innerCore = new THREE.Points(coreGeometry, coreMaterial);
    neuralNetGroup.add(innerCore);

    // 3. Connect Outer Nodes with Lines
    const linePositions: number[] = [];
    const lineColors: number[] = [];
    const maxLinkDist = 32;

    for (let i = 0; i < nodeCount; i++) {
      const x1 = nodePositions[i * 3];
      const y1 = nodePositions[i * 3 + 1];
      const z1 = nodePositions[i * 3 + 2];

      for (let j = i + 1; j < nodeCount; j++) {
        const x2 = nodePositions[j * 3];
        const y2 = nodePositions[j * 3 + 1];
        const z2 = nodePositions[j * 3 + 2];

        const dx = x1 - x2;
        const dy = y1 - y2;
        const dz = z1 - z2;
        const d = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (d < maxLinkDist) {
          linePositions.push(x1, y1, z1);
          linePositions.push(x2, y2, z2);

          // Stained cyan/purple lines
          const r = 56 / 255;
          const g = 189 / 255;
          const b = 248 / 255;

          const ratio = (x1 + radius) / (radius * 2); // Gradient ratio based on x pos
          lineColors.push(r, g, b);
          lineColors.push(r + ratio * 0.3, g - ratio * 0.2, b + ratio * 0.1);
        }
      }
    }

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.Float32BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.Float32BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.3,
    });

    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    neuralNetGroup.add(networkLines);

    // 4. Interactive logic
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0, isHovering: false };
    const rect = container.getBoundingClientRect();

    const onMouseMove = (e: MouseEvent) => {
      const containerRect = container.getBoundingClientRect();
      const x = e.clientX - containerRect.left;
      const y = e.clientY - containerRect.top;

      // Check if mouse is hovering container
      if (x >= 0 && x <= containerRect.width && y >= 0 && y <= containerRect.height) {
        mouse.targetX = (x / containerRect.width) * 2 - 1;
        mouse.targetY = -(y / containerRect.height) * 2 + 1;
        mouse.isHovering = true;
      } else {
        mouse.isHovering = false;
        mouse.targetX = 0;
        mouse.targetY = 0;
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    // Resize Handler
    const onResize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // 5. Animation Loop
    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Slow drift rotation
      neuralNetGroup.rotation.y = elapsedTime * 0.12;
      neuralNetGroup.rotation.z = elapsedTime * 0.05;

      // Mouse interactive tilt (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      neuralNetGroup.rotation.x = -mouse.y * 0.4;
      neuralNetGroup.rotation.y += mouse.x * 0.4;

      // Core pulsation
      const scaleVal = 1 + Math.sin(elapsedTime * 2.5) * 0.06;
      innerCore.scale.set(scaleVal, scaleVal, scaleVal);

      // Sphere breathe
      const sphereScale = mouse.isHovering ? 1.08 : 1.0;
      neuralNetGroup.scale.x += (sphereScale - neuralNetGroup.scale.x) * 0.1;
      neuralNetGroup.scale.y += (sphereScale - neuralNetGroup.scale.y) * 0.1;
      neuralNetGroup.scale.z += (sphereScale - neuralNetGroup.scale.z) * 0.1;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animId);

      renderer.dispose();
      nodeGeometry.dispose();
      nodeMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  if (!webGlSupported) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-black/10 backdrop-blur-sm">
        {/* Beautiful animated SVG Neural Net fallback if WebGL fails */}
        <svg
          viewBox="0 0 100 100"
          className="size-48 text-primary/40 animate-pulse animate-spin [animation-duration:15s]"
        >
          <circle cx="50" cy="50" r="4" className="fill-primary" />
          <circle cx="20" cy="30" r="3" className="fill-accent" />
          <circle cx="80" cy="30" r="3" className="fill-primary" />
          <circle cx="30" cy="80" r="3" className="fill-accent" />
          <circle cx="70" cy="80" r="3" className="fill-primary" />
          <line x1="50" y1="50" x2="20" y2="30" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="50" x2="80" y2="30" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="50" x2="30" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <line x1="50" y1="50" x2="70" y2="80" stroke="currentColor" strokeWidth="0.5" />
          <line
            x1="20"
            y1="30"
            x2="80"
            y2="30"
            stroke="currentColor"
            strokeWidth="0.25"
            strokeDasharray="2"
          />
          <line
            x1="30"
            y1="80"
            x2="70"
            y2="80"
            stroke="currentColor"
            strokeWidth="0.25"
            strokeDasharray="2"
          />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 size-full cursor-grab active:cursor-grabbing"
    />
  );
}
