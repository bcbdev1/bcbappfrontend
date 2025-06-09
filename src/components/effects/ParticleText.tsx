import { useEffect, useRef, useState, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { FontLoader, Font } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler';
import { motion } from 'framer-motion';

const getResponsiveValues = () => {
  const width = window.innerWidth;

  if (width >= 1280) {
    return { size: 1.5, cameraZ: 11, particles: 33000 }; // Large desktop
  } else if (width >= 1024) {
    return { size: 1.3, cameraZ: 10, particles: 100000 }; // Medium desktop / laptop
  } else if (width >= 768) {
    return { size: 1.1, cameraZ: 9, particles: 70000 };   // Tablet landscape
  } else if (width >= 620) {
    return { size: 0.9, cameraZ: 8, particles: 50000 };   // Tablet portrait / phablets
  } else if (width >= 480) {
    return { size: 0.7, cameraZ: 7, particles: 40000 };   // Larger phones
  } else {
    return { size: 0.5, cameraZ: 6, particles: 30000 };   // Small phones
  }
};



const glowingBlues = ['#3b82f6', '#60a5fa', '#93c5fd','#1e3a8a','#0f172a']; 
// dark navy → blue-800 → blue-500 → blue-400 → very light blue

const createGlowingBlue = (index: number, total: number) => {
  const dark = new THREE.Color(glowingBlues[0]);  // Very dark navy
  const mid1 = new THREE.Color(glowingBlues[1]);  // Deep blue
  const mid2 = new THREE.Color(glowingBlues[2]);  // Medium blue
  const bright = new THREE.Color(glowingBlues[3]); // Bright blue
  const neon = new THREE.Color(glowingBlues[4]);   // Extra bright

  const t = index / total;

  if (t < 0.25) return dark.lerp(mid1, t * 4);        // dark to deep blue
  if (t < 0.5) return mid1.lerp(mid2, (t - 0.25) * 4);
  if (t < 0.75) return mid2.lerp(bright, (t - 0.5) * 4);
  return bright.lerp(neon, (t - 0.75) * 4);           // bright to neon
};



const ParticleSystem = ({ onComplete }: { onComplete: () => void }) => {
  const pointsRef = useRef<THREE.Points>(null);
  const [font, setFont] = useState<Font | null>(null);
  const [phase, setPhase] = useState<'assemble' | 'stable' | 'disperse'>('assemble');
  const [responsive, setResponsive] = useState(getResponsiveValues());

  const { size: fontSize, particles: numParticles } = responsive;

  const halfParticles = Math.floor(numParticles / 2);

  const positions = useMemo(() => new Float32Array(numParticles * 3), [numParticles]);
  const targetPositions = useMemo(() => new Float32Array(numParticles * 3), [numParticles]);
  const randomPositions = useMemo(() => new Float32Array(numParticles * 3), [numParticles]);
  const colors = useMemo(() => new Float32Array(numParticles * 3), [numParticles]);

  useEffect(() => {
    const loader = new FontLoader();
    loader.load('/fonts/helvetiker_regular.typeface.json', setFont);
  }, []);

  useEffect(() => {
    const onResize = () => setResponsive(getResponsiveValues());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  useEffect(() => {
    if (!font) return;

  // Calculate viewport size in world units at cameraZ distance
  const cameraZ = responsive.cameraZ;  // get from responsive state
  const fov = 75; // default camera FOV in degrees, adjust if different
  const aspect = window.innerWidth / window.innerHeight;

  // Convert vertical FOV to radians
  const vFOV = (fov * Math.PI) / 180;

  // Calculate visible height and width at cameraZ depth
  const viewHeight = 2 * Math.tan(vFOV / 2) * cameraZ;
  const viewWidth = viewHeight * aspect;

  const spreadX = viewWidth * 1.2;  // Slightly bigger to cover edges
  const spreadY = viewHeight * 1.2;
  const spreadZ = 20;  // depth spread, tweak as you want

  for (let i = 0; i < numParticles; i++) {
    const i3 = i * 3;
    randomPositions.set(
      [
        (Math.random() - 0.5) * spreadX,
        (Math.random() - 0.5) * spreadY,
        (Math.random() - 0.5) * spreadZ,
      ],
      i3
    );
  }
  
    positions.set(randomPositions);
  
    // Create separate text geometries
    const welcomeGeo = new TextGeometry('Welcome to', {
      font,
      size: fontSize,
      height: 0.2 * fontSize,
      curveSegments: 12,
      bevelEnabled: false,
    });
  
    const buzzGeo = new TextGeometry('BCBUZZ', {
      font,
      size: fontSize,
      height: 0.2 * fontSize,
      curveSegments: 12,
      bevelEnabled: false,
    });
  
    // Compute bounding boxes
    welcomeGeo.computeBoundingBox();
    buzzGeo.computeBoundingBox();
  
    const welcomeWidth = welcomeGeo.boundingBox!.max.x - welcomeGeo.boundingBox!.min.x;
    const buzzWidth = buzzGeo.boundingBox!.max.x - buzzGeo.boundingBox!.min.x;
    const welcomeHeight = welcomeGeo.boundingBox!.max.y - welcomeGeo.boundingBox!.min.y;
    const buzzHeight = buzzGeo.boundingBox!.max.y - buzzGeo.boundingBox!.min.y;
  
    const width = window.innerWidth;
  
    if (width <= 680) {
      // Stack vertically, center aligned
      welcomeGeo.translate(-welcomeWidth / 2, buzzHeight / 2, 0);
      buzzGeo.translate(-buzzWidth / 2, -welcomeHeight / 2 - 0.5, 0);
    } else {
      // Side by side horizontally
      const totalWidth = welcomeWidth + buzzWidth + 0.5;
      welcomeGeo.translate(-(totalWidth / 2), 0, 0);
      buzzGeo.translate(-(totalWidth / 2) + welcomeWidth + 0.5, 0, 0);
    }
  
    const welcomeMesh = new THREE.Mesh(welcomeGeo);
    const buzzMesh = new THREE.Mesh(buzzGeo);
  
    const welcomeSampler = new MeshSurfaceSampler(welcomeMesh).build();
    const buzzSampler = new MeshSurfaceSampler(buzzMesh).build();
    const temp = new THREE.Vector3();
  
    // "Welcome to" — white
    for (let i = 0; i < halfParticles; i++) {
      welcomeSampler.sample(temp);
      const i3 = i * 3;
      targetPositions.set([temp.x, temp.y, temp.z], i3);
      colors.set([1, 1, 1], i3);
    }
  
    // "BCBUZZ" — gradient
    for (let i = 0; i < numParticles - halfParticles; i++) {
      buzzSampler.sample(temp);
      const i3 = (i + halfParticles) * 3;
      targetPositions.set([temp.x, temp.y, temp.z], i3);
  
      const grad = createGlowingBlue(i, numParticles - halfParticles);
      colors.set([grad.r, grad.g, grad.b], i3);
    }
  
    if (pointsRef.current) {
      const geo = pointsRef.current.geometry;
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    }
  }, [font, fontSize, numParticles]);
  
  

  useFrame(({ clock }) => {
    if (!pointsRef.current || !font) return;
    const time = clock.getElapsedTime();
    const lerpFactor = 0.07;

    if (phase === 'assemble' && time > 2) setPhase('stable');
    else if (phase === 'stable' && time > 4) setPhase('disperse');
    else if (phase === 'disperse' && time > 6) onComplete();

    for (let i = 0; i < numParticles; i++) {
      const i3 = i * 3;
      const [tx, ty, tz] =
        phase === 'disperse'
          ? [randomPositions[i3], randomPositions[i3 + 1], randomPositions[i3 + 2]]
          : [targetPositions[i3], targetPositions[i3 + 1], targetPositions[i3 + 2]];

      positions[i3] += (tx - positions[i3]) * lerpFactor;
      positions[i3 + 1] += (ty - positions[i3 + 1]) * lerpFactor;
      positions[i3 + 2] += (tz - positions[i3 + 2]) * lerpFactor;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  if (!font) return null;

  return (
    <points ref={pointsRef}>
      <bufferGeometry />
      <pointsMaterial
        size={0.05} // slightly larger
        vertexColors
        transparent
        opacity={1}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false} // prevents depth occlusion, enhances glow
      />
    </points>
  );
  
};

interface ParticleTextProps {
  onComplete: () => void;
}

const ParticleText: React.FC<ParticleTextProps> = ({ onComplete }) => {
  const [cameraZ, setCameraZ] = useState(getResponsiveValues().cameraZ);

  useEffect(() => {
    const onResize = () => setCameraZ(getResponsiveValues().cameraZ);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-50 bg-background-dark"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <Canvas
  camera={{ position: [0, 0, cameraZ] }}
  style={{ background: 'black' }}
  onCreated={({ gl }) => {
    gl.setClearColor(new THREE.Color('black'));
  }}
>
  <ambientLight />
  <ParticleSystem onComplete={onComplete} />
</Canvas>
    

    </motion.div>
  );
};

export default ParticleText;
