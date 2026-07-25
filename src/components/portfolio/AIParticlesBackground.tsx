import { useEffect, useRef } from "react";
import * as THREE from "three";

export function AIParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // 1. Setup Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1000);
    camera.position.z = 250;

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);

    // Helper: Create a glowing circle texture for particles
    const createParticleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, "rgba(56, 189, 248, 1)"); // Primary cyan
        gradient.addColorStop(0.3, "rgba(56, 189, 248, 0.4)");
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      return new THREE.CanvasTexture(canvas);
    };

    // 2. Generate Particles data
    const particleCount = window.innerWidth < 768 ? 60 : 130;
    const maxDistance = 75; // Distance to connect with lines
    const areaSize = 350; // Size of particle boundary cube

    const positions = new Float32Array(particleCount * 3);
    const velocities: { x: number; y: number; z: number }[] = [];

    for (let i = 0; i < particleCount; i++) {
      // Random coordinates in space
      positions[i * 3] = (Math.random() - 0.5) * areaSize;
      positions[i * 3 + 1] = (Math.random() - 0.5) * areaSize;
      positions[i * 3 + 2] = (Math.random() - 0.5) * areaSize;

      // Random velocities
      velocities.push({
        x: (Math.random() - 0.5) * 0.25,
        y: (Math.random() - 0.5) * 0.25,
        z: (Math.random() - 0.5) * 0.25,
      });
    }

    // 3. Create Points Mesh
    const pointsGeometry = new THREE.BufferGeometry();
    pointsGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const pointsMaterial = new THREE.PointsMaterial({
      size: 6,
      map: createParticleTexture(),
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      transparent: true,
      opacity: 0.7,
    });

    const pointCloud = new THREE.Points(pointsGeometry, pointsMaterial);
    scene.add(pointCloud);

    // 4. Create Dynamic Lines Buffer Mesh
    const maxLineSegments = (particleCount * (particleCount - 1)) / 2;
    const linePositions = new Float32Array(maxLineSegments * 2 * 3);
    const lineColors = new Float32Array(maxLineSegments * 2 * 3);

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));

    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.25,
    });

    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    scene.add(lines);

    // 5. Interaction variables
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (e: MouseEvent) => {
      // Normalize to -1 to 1 range
      mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener("mousemove", onMouseMove);

    // 6. Resizing handler
    const onResize = () => {
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", onResize);

    // 7. Animation Loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse interpolation (lerp)
      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      // Parallax effect on camera or pointCloud rotation
      scene.rotation.y = mouse.x * 0.06;
      scene.rotation.x = -mouse.y * 0.06;

      const posAttr = pointsGeometry.attributes.position as THREE.BufferAttribute;
      const posArray = posAttr.array as Float32Array;

      let lineIndex = 0;

      // Mouse position in 3D coordinate space approximation
      const mouse3D = new THREE.Vector3(mouse.x * (areaSize / 2), mouse.y * (areaSize / 2), 0);

      // Update positions and velocities
      for (let i = 0; i < particleCount; i++) {
        let x = posArray[i * 3];
        let y = posArray[i * 3 + 1];
        let z = posArray[i * 3 + 2];

        // Apply velocity
        const v = velocities[i];
        x += v.x;
        y += v.y;
        z += v.z;

        // Interactive mouse push away
        const pVec = new THREE.Vector3(x, y, z);
        const distToMouse = pVec.distanceTo(mouse3D);
        if (distToMouse < 60) {
          const force = (60 - distToMouse) / 60;
          const dir = pVec
            .clone()
            .sub(mouse3D)
            .normalize()
            .multiplyScalar(force * 0.8);
          x += dir.x;
          y += dir.y;
          z += dir.z;
        }

        // Boundary bounce check
        const halfSize = areaSize / 2;
        if (Math.abs(x) > halfSize) {
          v.x *= -1;
          x = Math.sign(x) * halfSize;
        }
        if (Math.abs(y) > halfSize) {
          v.y *= -1;
          y = Math.sign(y) * halfSize;
        }
        if (Math.abs(z) > halfSize) {
          v.z *= -1;
          z = Math.sign(z) * halfSize;
        }

        posArray[i * 3] = x;
        posArray[i * 3 + 1] = y;
        posArray[i * 3 + 2] = z;
      }

      posAttr.needsUpdate = true;

      // Build lines dynamically
      const linePosAttr = lineGeometry.attributes.position as THREE.BufferAttribute;
      const linePosArray = linePosAttr.array as Float32Array;

      const lineColAttr = lineGeometry.attributes.color as THREE.BufferAttribute;
      const lineColArray = lineColAttr.array as Float32Array;

      for (let i = 0; i < particleCount; i++) {
        const x1 = posArray[i * 3];
        const y1 = posArray[i * 3 + 1];
        const z1 = posArray[i * 3 + 2];

        for (let j = i + 1; j < particleCount; j++) {
          const x2 = posArray[j * 3];
          const y2 = posArray[j * 3 + 1];
          const z2 = posArray[j * 3 + 2];

          // Compute Euclidean distance squared (faster)
          const dx = x1 - x2;
          const dy = y1 - y2;
          const dz = z1 - z2;
          const distSq = dx * dx + dy * dy + dz * dz;

          if (distSq < maxDistance * maxDistance) {
            const dist = Math.sqrt(distSq);
            const alpha = 1.0 - dist / maxDistance;

            // Segment start
            linePosArray[lineIndex * 6] = x1;
            linePosArray[lineIndex * 6 + 1] = y1;
            linePosArray[lineIndex * 6 + 2] = z1;

            // Segment end
            linePosArray[lineIndex * 6 + 3] = x2;
            linePosArray[lineIndex * 6 + 4] = y2;
            linePosArray[lineIndex * 6 + 5] = z2;

            // Base color is primary cyan (OKLCH 0.78, 0.14, 225 = roughly RGB 56, 189, 248)
            // Stained purple towards the outer bounds
            const r = 56 / 255;
            const g = 189 / 255;
            const b = 248 / 255;

            // Vertices colors with opacity/brightness scaling as dynamic line alpha (simulated with line segments coloring)
            lineColArray[lineIndex * 6] = r * alpha;
            lineColArray[lineIndex * 6 + 1] = g * alpha;
            lineColArray[lineIndex * 6 + 2] = b * alpha;

            lineColArray[lineIndex * 6 + 3] = r * alpha;
            lineColArray[lineIndex * 6 + 4] = g * alpha;
            lineColArray[lineIndex * 6 + 5] = b * alpha;

            lineIndex++;
          }
        }
      }

      lineGeometry.setDrawRange(0, lineIndex * 2);
      linePosAttr.needsUpdate = true;
      lineColAttr.needsUpdate = true;

      renderer.render(scene, camera);
    };

    animate();

    // 8. Clean up
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", onResize);
      cancelAnimationFrame(animationFrameId);

      renderer.dispose();
      pointsGeometry.dispose();
      pointsMaterial.dispose();
      lineGeometry.dispose();
      lineMaterial.dispose();

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-5 pointer-events-none opacity-40 mix-blend-screen"
      style={{ minHeight: "100%" }}
    />
  );
}
