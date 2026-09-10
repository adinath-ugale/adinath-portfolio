/**
 * 3D Interactive Hero Canvas
 * Theme: Neural Network, Connected Data Nodes, Synaptic Pulses, and Geometric Intelligence Core
 * Integrated into the right column of the Hero Section.
 */

export function initThreeHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) {
    console.warn('[ThreeHeroScene] #hero-canvas element not found in DOM.');
    return;
  }

  if (typeof THREE === 'undefined') {
    console.error('[ThreeHeroScene] THREE library is not loaded. Please ensure three.min.js is included.');
    return;
  }

  // Check if user prefers reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    console.info('[ThreeHeroScene] prefers-reduced-motion enabled. Scene paused.');
    return;
  }

  const container = canvas.parentElement || document.querySelector('.hero-3d-canvas-container') || document.getElementById('hero');
  
  function getDimensions() {
    const w = container.clientWidth || 550;
    const h = container.clientHeight || 550;
    return { width: Math.max(w, 320), height: Math.max(h, 340) };
  }

  let { width, height } = getDimensions();

  // Scene, Camera & WebGL Renderer
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(50, width / height, 1, 1200);
  camera.position.set(0, 0, 260);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (err) {
    console.error('[ThreeHeroScene] WebGL initialization failed:', err);
    return;
  }

  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Subtle Lights
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
  scene.add(ambientLight);

  const orangePointLight = new THREE.PointLight(0xff5500, 2.5, 300);
  orangePointLight.position.set(40, 50, 60);
  scene.add(orangePointLight);

  const cyanPointLight = new THREE.PointLight(0x00f0ff, 2.0, 300);
  cyanPointLight.position.set(-50, -40, 60);
  scene.add(cyanPointLight);

  // Group for all rotating elements
  const mainGroup = new THREE.Group();
  scene.add(mainGroup);

  // 1. Central Intelligence Core (Geometric Polyhedra & Orbital Rings)
  const coreGroup = new THREE.Group();
  mainGroup.add(coreGroup);

  // Inner Icosahedron
  const icoGeom = new THREE.IcosahedronGeometry(28, 1);
  const icoWireMat = new THREE.MeshBasicMaterial({
    color: 0xff5500,
    wireframe: true,
    transparent: true,
    opacity: 0.55
  });
  const icoMesh = new THREE.Mesh(icoGeom, icoWireMat);
  coreGroup.add(icoMesh);

  // Inner Core Sphere (Pulsing glowing center)
  const innerSphereGeom = new THREE.SphereGeometry(10, 24, 24);
  const innerSphereMat = new THREE.MeshBasicMaterial({
    color: 0xff6b00,
    transparent: true,
    opacity: 0.85
  });
  const innerSphere = new THREE.Mesh(innerSphereGeom, innerSphereMat);
  coreGroup.add(innerSphere);

  // Orbital Ring 1 (Cyan)
  const ring1Geom = new THREE.TorusGeometry(46, 0.5, 8, 90);
  const ring1Mat = new THREE.MeshBasicMaterial({
    color: 0x00f0ff,
    transparent: true,
    opacity: 0.75
  });
  const ring1 = new THREE.Mesh(ring1Geom, ring1Mat);
  coreGroup.add(ring1);

  // Orbital Ring 2 (Orange)
  const ring2Geom = new THREE.TorusGeometry(58, 0.6, 8, 90);
  const ring2Mat = new THREE.MeshBasicMaterial({
    color: 0xff5500,
    transparent: true,
    opacity: 0.65
  });
  const ring2 = new THREE.Mesh(ring2Geom, ring2Mat);
  ring2.rotation.x = Math.PI / 3.2;
  coreGroup.add(ring2);

  // Orbital Ring 3 (Violet/Cyan)
  const ring3Geom = new THREE.TorusGeometry(70, 0.45, 8, 90);
  const ring3Mat = new THREE.MeshBasicMaterial({
    color: 0x8b5cf6,
    transparent: true,
    opacity: 0.5
  });
  const ring3 = new THREE.Mesh(ring3Geom, ring3Mat);
  ring3.rotation.y = Math.PI / 2.5;
  coreGroup.add(ring3);

  // 2. Neural Network Nodes
  const nodeCount = 85;
  const nodePositions = new Float32Array(nodeCount * 3);
  const nodeVelocities = [];
  const spread = 200;

  for (let i = 0; i < nodeCount; i++) {
    const x = (Math.random() - 0.5) * spread;
    const y = (Math.random() - 0.5) * (spread * 0.9);
    const z = (Math.random() - 0.5) * (spread * 0.85);

    nodePositions[i * 3] = x;
    nodePositions[i * 3 + 1] = y;
    nodePositions[i * 3 + 2] = z;

    nodeVelocities.push({
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      vz: (Math.random() - 0.5) * 0.25
    });
  }

  const nodeGeometry = new THREE.BufferGeometry();
  nodeGeometry.setAttribute('position', new THREE.BufferAttribute(nodePositions, 3));

  const nodeTexture = createGlowPointTexture();
  const nodeMaterial = new THREE.PointsMaterial({
    color: 0x00f0ff,
    size: 7,
    map: nodeTexture,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });

  const nodePoints = new THREE.Points(nodeGeometry, nodeMaterial);
  mainGroup.add(nodePoints);

  // 3. Dynamic Synaptic Connection Lines
  const maxLineConnections = nodeCount * nodeCount;
  const linePositions = new Float32Array(maxLineConnections * 3);
  const lineColors = new Float32Array(maxLineConnections * 3);

  const lineGeometry = new THREE.BufferGeometry();
  lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3).setUsage(THREE.DynamicDrawUsage));
  lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3).setUsage(THREE.DynamicDrawUsage));

  const lineMaterial = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    blending: THREE.AdditiveBlending,
    depthWrite: false,
    opacity: 0.85
  });

  const lineMesh = new THREE.LineSegments(lineGeometry, lineMaterial);
  mainGroup.add(lineMesh);

  // 4. Floating Ambient Starfield/Data Particles
  const particleCount = 180;
  const particleGeom = new THREE.BufferGeometry();
  const particlePos = new Float32Array(particleCount * 3);

  for (let i = 0; i < particleCount; i++) {
    particlePos[i * 3] = (Math.random() - 0.5) * 450;
    particlePos[i * 3 + 1] = (Math.random() - 0.5) * 450;
    particlePos[i * 3 + 2] = (Math.random() - 0.5) * 350;
  }
  particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePos, 3));

  const particleMat = new THREE.PointsMaterial({
    color: 0xffaa00,
    size: 2.2,
    transparent: true,
    opacity: 0.45,
    blending: THREE.AdditiveBlending
  });

  const ambientParticles = new THREE.Points(particleGeom, particleMat);
  mainGroup.add(ambientParticles);

  // Mouse & Parallax Tracking
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  const heroSection = document.getElementById('hero') || document.body;

  function onMouseMove(event) {
    const rect = heroSection.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    mouse.targetX = (event.clientX - centerX) * 0.0012;
    mouse.targetY = (event.clientY - centerY) * 0.0012;
  }
  window.addEventListener('mousemove', onMouseMove, { passive: true });

  function onTouchMove(event) {
    if (event.touches.length > 0) {
      const rect = heroSection.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouse.targetX = (event.touches[0].clientX - centerX) * 0.0015;
      mouse.targetY = (event.touches[0].clientY - centerY) * 0.0015;
    }
  }
  window.addEventListener('touchmove', onTouchMove, { passive: true });

  // Resize Handler
  function onWindowResize() {
    const dims = getDimensions();
    width = dims.width;
    height = dims.height;

    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    if (window.innerWidth < 768) {
      camera.position.z = 290;
      mainGroup.scale.set(0.85, 0.85, 0.85);
    } else {
      camera.position.z = 260;
      mainGroup.scale.set(1, 1, 1);
    }
  }
  window.addEventListener('resize', onWindowResize);
  onWindowResize();

  // Visibility Check with IntersectionObserver
  let isHeroVisible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isHeroVisible = entry.isIntersecting;
    });
  }, { threshold: 0.05 });
  observer.observe(document.getElementById('hero') || canvas);

  // Animation Loop
  let clock = new THREE.Clock();
  const connectionDistance = 58;

  function animate() {
    requestAnimationFrame(animate);

    if (!isHeroVisible) return;

    const delta = clock.getDelta();
    const time = clock.getElapsedTime();

    // Mouse smoothing
    mouse.x += (mouse.targetX - mouse.x) * 0.05;
    mouse.y += (mouse.targetY - mouse.y) * 0.05;

    // Gentle 3D tilt with mouse + ambient drift
    mainGroup.rotation.y = mouse.x * 0.9 + time * 0.04;
    mainGroup.rotation.x = mouse.y * 0.9 + Math.sin(time * 0.5) * 0.05;

    // Rotate core geometry
    coreGroup.rotation.y += 0.01;
    coreGroup.rotation.x += 0.006;
    ring1.rotation.z += 0.015;
    ring2.rotation.y -= 0.012;
    ring3.rotation.x += 0.008;

    // Pulse the inner core sphere
    const pulse = 1 + Math.sin(time * 3) * 0.12;
    innerSphere.scale.set(pulse, pulse, pulse);

    // Update node positions and compute synaptic lines
    const pos = nodeGeometry.attributes.position.array;
    let lineVertexIndex = 0;
    let colorVertexIndex = 0;

    const bound = 110;
    for (let i = 0; i < nodeCount; i++) {
      pos[i * 3] += nodeVelocities[i].vx;
      pos[i * 3 + 1] += nodeVelocities[i].vy;
      pos[i * 3 + 2] += nodeVelocities[i].vz;

      if (pos[i * 3] < -bound || pos[i * 3] > bound) nodeVelocities[i].vx *= -1;
      if (pos[i * 3 + 1] < -bound * 0.8 || pos[i * 3 + 1] > bound * 0.8) nodeVelocities[i].vy *= -1;
      if (pos[i * 3 + 2] < -bound * 0.8 || pos[i * 3 + 2] > bound * 0.8) nodeVelocities[i].vz *= -1;

      for (let j = i + 1; j < nodeCount; j++) {
        const dx = pos[i * 3] - pos[j * 3];
        const dy = pos[i * 3 + 1] - pos[j * 3 + 1];
        const dz = pos[i * 3 + 2] - pos[j * 3 + 2];
        const dist = Math.sqrt(dx * dx + dy * dy + dz * dz);

        if (dist < connectionDistance) {
          const alpha = 1.0 - dist / connectionDistance;

          linePositions[lineVertexIndex++] = pos[i * 3];
          linePositions[lineVertexIndex++] = pos[i * 3 + 1];
          linePositions[lineVertexIndex++] = pos[i * 3 + 2];

          linePositions[lineVertexIndex++] = pos[j * 3];
          linePositions[lineVertexIndex++] = pos[j * 3 + 1];
          linePositions[lineVertexIndex++] = pos[j * 3 + 2];

          // Gradient color: Cyan to Orange
          // Vertex 1: Cyan
          lineColors[colorVertexIndex++] = 0.0;
          lineColors[colorVertexIndex++] = 0.85 * alpha + 0.15;
          lineColors[colorVertexIndex++] = 1.0 * alpha;

          // Vertex 2: Orange / Amber
          lineColors[colorVertexIndex++] = 1.0 * alpha;
          lineColors[colorVertexIndex++] = 0.42 * alpha;
          lineColors[colorVertexIndex++] = 0.0;
        }
      }
    }

    nodeGeometry.attributes.position.needsUpdate = true;

    lineGeometry.setDrawRange(0, lineVertexIndex / 3);
    lineGeometry.attributes.position.needsUpdate = true;
    lineGeometry.attributes.color.needsUpdate = true;

    // Ambient particle drift
    ambientParticles.rotation.y = time * 0.02;

    renderer.render(scene, camera);
  }

  animate();
  console.log('[ThreeHeroScene] Initialized successfully with WebGL renderer.');
}

/**
 * Creates soft radial glow sprite texture for point particles
 */
function createGlowPointTexture() {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  const gradient = ctx.createRadialGradient(
    size / 2, size / 2, 0,
    size / 2, size / 2, size / 2
  );
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
  gradient.addColorStop(0.25, 'rgba(0, 240, 255, 0.95)');
  gradient.addColorStop(0.55, 'rgba(255, 85, 0, 0.4)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  return new THREE.CanvasTexture(canvas);
}
