/**
 * 3D Agricultural + AI Environment Visualization for KisanMitra AI
 * Elements: Digital Farmland Matrix, Procedural Agri Nodes, Sensor Data Streams, and Pathology Telemetry
 */

export function initKisanMitraVisual() {
  const canvas = document.getElementById('kisanmitra-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const container = canvas.parentElement;
  let width = container.clientWidth || 500;
  let height = container.clientHeight || 480;

  const scene = new THREE.Scene();
  scene.fog = new THREE.FogExp2(0x020408, 0.003);

  const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
  camera.position.set(0, 35, 95);
  camera.lookAt(0, 10, 0);

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance'
    });
  } catch (err) {
    console.error('[KisanMitraVisual] WebGL initialization failed:', err);
    return;
  }
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  const pointLight1 = new THREE.PointLight(0x10b981, 2.5, 200);
  pointLight1.position.set(20, 50, 40);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x00f0ff, 2.0, 200);
  pointLight2.position.set(-30, 20, 30);
  scene.add(pointLight2);

  // Group for whole agri scene
  const agriGroup = new THREE.Group();
  scene.add(agriGroup);

  // 1. Digital Farmland Grid Matrix
  const gridHelper = new THREE.GridHelper(120, 24, 0x10b981, 0x074431);
  gridHelper.position.y = -5;
  agriGroup.add(gridHelper);

  // 2. Central 3D Digital Crop / Plant Geometry
  const plantGroup = new THREE.Group();
  agriGroup.add(plantGroup);

  // Main Stalk
  const stemCurve = new THREE.CatmullRomCurve3([
    new THREE.Vector3(0, -5, 0),
    new THREE.Vector3(1, 10, 1),
    new THREE.Vector3(-1.5, 25, 0.5),
    new THREE.Vector3(0, 40, 0)
  ]);
  const stemGeom = new THREE.TubeGeometry(stemCurve, 20, 0.9, 8, false);
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    roughness: 0.3,
    metalness: 0.2,
    wireframe: true
  });
  const stemMesh = new THREE.Mesh(stemGeom, stemMat);
  plantGroup.add(stemMesh);

  // Procedural Leaves (Elliptical Digital Meshes)
  const leafShape = new THREE.Shape();
  leafShape.moveTo(0, 0);
  leafShape.quadraticCurveTo(8, 10, 0, 20);
  leafShape.quadraticCurveTo(-8, 10, 0, 0);

  const leafGeom = new THREE.ShapeGeometry(leafShape);
  const leafMat = new THREE.MeshBasicMaterial({
    color: 0x34d399,
    wireframe: true,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.75
  });

  const leafSolidMat = new THREE.MeshStandardMaterial({
    color: 0x059669,
    roughness: 0.4,
    transparent: true,
    opacity: 0.45,
    side: THREE.DoubleSide
  });

  // Attach 6 stylized leaves at varying heights and angles
  const leafHeights = [8, 14, 20, 26, 32, 36];
  const leafRotations = [0.4, 2.2, 4.1, 1.2, 3.3, 5.2];
  const leafScales = [0.85, 1.0, 1.1, 0.95, 0.75, 0.55];

  leafHeights.forEach((h, idx) => {
    const leafMeshWire = new THREE.Mesh(leafGeom, leafMat);
    const leafMeshSolid = new THREE.Mesh(leafGeom, leafSolidMat);

    const leafNode = new THREE.Group();
    leafNode.add(leafMeshWire);
    leafNode.add(leafMeshSolid);

    const s = leafScales[idx];
    leafNode.scale.set(s, s, s);
    leafNode.position.set(0, h, 0);
    leafNode.rotation.y = leafRotations[idx];
    leafNode.rotation.x = 0.55;
    plantGroup.add(leafNode);
  });

  // 3. Floating IoT Data Nodes & Agricultural Telemetry Points
  const sensors = [
    { label: 'SOIL_N_P_K', x: -24, y: 3, z: 15, color: 0x00f0ff },
    { label: 'LEAF_PATHOLOGY', x: 18, y: 28, z: 8, color: 0xf43f5e },
    { label: 'WEATHER_HYGRO', x: -20, y: 38, z: -10, color: 0x38bdf8 },
    { label: 'SOIL_TEMP', x: 22, y: -2, z: -18, color: 0xa855f7 }
  ];

  const sensorGroup = new THREE.Group();
  agriGroup.add(sensorGroup);

  const sensorMeshList = [];

  sensors.forEach((s) => {
    const nodeObj = new THREE.Group();

    // Node Sphere
    const sphereGeom = new THREE.SphereGeometry(1.8, 16, 16);
    const sphereMat = new THREE.MeshBasicMaterial({ color: s.color });
    const sphereMesh = new THREE.Mesh(sphereGeom, sphereMat);
    nodeObj.add(sphereMesh);

    // Glowing Ring
    const ringGeom = new THREE.TorusGeometry(3.2, 0.2, 8, 32);
    const ringMat = new THREE.MeshBasicMaterial({ color: s.color, transparent: true, opacity: 0.7 });
    const ringMesh = new THREE.Mesh(ringGeom, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    nodeObj.add(ringMesh);

    // Connecting line to plant/center
    const lineGeom = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(-s.x * 0.7, 15 - s.y, -s.z * 0.7)
    ]);
    const lineMat = new THREE.LineDashedMaterial({
      color: s.color,
      dashSize: 1.5,
      gapSize: 1,
      transparent: true,
      opacity: 0.5
    });
    const line = new THREE.Line(lineGeom, lineMat);
    line.computeLineDistances();
    nodeObj.add(line);

    nodeObj.position.set(s.x, s.y, s.z);
    sensorGroup.add(nodeObj);
    sensorMeshList.push({ obj: nodeObj, basePos: { ...s }, ring: ringMesh });
  });

  // 4. Data Stream Particle Swarm
  const streamCount = 75;
  const streamGeom = new THREE.BufferGeometry();
  const streamPos = new Float32Array(streamCount * 3);

  for (let i = 0; i < streamCount; i++) {
    streamPos[i * 3] = (Math.random() - 0.5) * 60;
    streamPos[i * 3 + 1] = Math.random() * 50;
    streamPos[i * 3 + 2] = (Math.random() - 0.5) * 60;
  }
  streamGeom.setAttribute('position', new THREE.BufferAttribute(streamPos, 3));

  const streamMat = new THREE.PointsMaterial({
    color: 0x10b981,
    size: 2.2,
    transparent: true,
    opacity: 0.8
  });
  const streamParticles = new THREE.Points(streamGeom, streamMat);
  agriGroup.add(streamParticles);

  // Mouse tilt tracking over container
  const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
  container.addEventListener('mousemove', (e) => {
    const rect = container.getBoundingClientRect();
    mouse.targetX = ((e.clientX - rect.left) / width - 0.5) * 0.8;
    mouse.targetY = ((e.clientY - rect.top) / height - 0.5) * 0.8;
  });

  container.addEventListener('mouseleave', () => {
    mouse.targetX = 0;
    mouse.targetY = 0;
  });

  // Resize
  function handleResize() {
    if (!container) return;
    width = container.clientWidth;
    height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  }
  window.addEventListener('resize', handleResize);

  // Visibility Check
  let isVisible = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      isVisible = entry.isIntersecting;
    });
  }, { threshold: 0.1 });
  observer.observe(container);

  // Animation
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    if (!isVisible) return;

    const time = clock.getElapsedTime();

    // Mouse smoothing
    mouse.x += (mouse.targetX - mouse.x) * 0.06;
    mouse.y += (mouse.targetY - mouse.y) * 0.06;

    // Slow ambient rotation + mouse response
    agriGroup.rotation.y = time * 0.18 + mouse.x * 0.8;
    agriGroup.rotation.x = mouse.y * 0.4;

    // Sensor pulsing & ring spin
    sensorMeshList.forEach((item, idx) => {
      item.obj.position.y = item.basePos.y + Math.sin(time * 2 + idx) * 1.5;
      item.ring.rotation.z += 0.02;
    });

    // Animate stream particles upwards
    const pArr = streamGeom.attributes.position.array;
    for (let i = 0; i < streamCount; i++) {
      pArr[i * 3 + 1] += 0.15;
      if (pArr[i * 3 + 1] > 50) {
        pArr[i * 3 + 1] = 0;
      }
    }
    streamGeom.attributes.position.needsUpdate = true;

    renderer.render(scene, camera);
  }

  animate();
  console.log('[KisanMitraVisual] Initialized successfully with WebGL renderer.');
}
