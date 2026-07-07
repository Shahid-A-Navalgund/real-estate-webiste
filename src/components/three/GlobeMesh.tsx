import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";
import { properties } from "../../data/properties";
import { latLngToVector3 } from "../../lib/geo";
import { useGlobeStore } from "../../lib/globeStore";

const RADIUS = 2.1;

function Marker({
  position,
  active,
}: {
  position: THREE.Vector3;
  active: boolean;
}) {
  const coreRef = useRef<THREE.Mesh>(null);
  const haloRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const pulse = 1 + Math.sin(t * 2.4 + position.x * 3) * 0.25;
    if (haloRef.current) {
      const target = active ? 1.9 : 1.3;
      haloRef.current.scale.setScalar(pulse * target);
    }
    if (coreRef.current) {
      const mat = coreRef.current.material as THREE.MeshBasicMaterial;
      mat.color.set(active ? "#f3d98a" : "#c9a24b");
    }
  });

  return (
    <group position={position}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[0.018, 12, 12]} />
        <meshBasicMaterial color="#c9a24b" />
      </mesh>
      <mesh ref={haloRef}>
        <sphereGeometry args={[0.028, 12, 12]} />
        <meshBasicMaterial
          color="#e6c878"
          transparent
          opacity={0.35}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function FlightPaths({ points }: { points: THREE.Vector3[] }) {
  const arcs = useMemo(() => {
    const result: THREE.Vector3[][] = [];
    for (let i = 0; i < points.length; i++) {
      const a = points[i];
      const b = points[(i + 1) % points.length];
      const mid = a.clone().add(b).multiplyScalar(0.5).normalize().multiplyScalar(RADIUS * 1.35);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      result.push(curve.getPoints(32));
    }
    return result;
  }, [points]);

  return (
    <>
      {arcs.map((pts, i) => (
        <Line
          key={i}
          points={pts}
          color="#c9a24b"
          transparent
          opacity={0.18}
          lineWidth={1}
        />
      ))}
    </>
  );
}

export function GlobeMesh({ lowDetail = false }: { lowDetail?: boolean }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.Mesh>(null);
  const { reachVisible, activeMarkerIndex } = useGlobeStore();
  const { pointer } = useThree();

  const markerPositions = useMemo(
    () => properties.map((p) => latLngToVector3(p.lat, p.lng, RADIUS)),
    []
  );

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    if (reachVisible) {
      const target = properties[activeMarkerIndex];
      if (target) {
        const targetPhi = (90 - target.lat) * (Math.PI / 180);
        const targetTheta = (target.lng + 180) * (Math.PI / 180);
        const targetRotY = -(targetTheta + Math.PI / 2);
        const targetRotX = targetPhi - Math.PI / 2;

        groupRef.current.rotation.y = THREE.MathUtils.damp(
          groupRef.current.rotation.y,
          targetRotY,
          3,
          delta
        );
        groupRef.current.rotation.x = THREE.MathUtils.damp(
          groupRef.current.rotation.x,
          targetRotX * 0.4,
          3,
          delta
        );
      }
    } else {
      groupRef.current.rotation.y += delta * 0.045;
      groupRef.current.rotation.x = THREE.MathUtils.damp(
        groupRef.current.rotation.x,
        pointer.y * 0.12,
        2,
        delta
      );
    }

    if (wireRef.current) {
      wireRef.current.rotation.y -= delta * 0.012;
    }
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <sphereGeometry args={[RADIUS, lowDetail ? 32 : 64, lowDetail ? 32 : 64]} />
        <meshStandardMaterial
          color="#0e0e13"
          roughness={0.85}
          metalness={0.2}
          emissive="#1a140a"
          emissiveIntensity={0.3}
        />
      </mesh>

      <mesh ref={wireRef} scale={1.006}>
        <sphereGeometry args={[RADIUS, lowDetail ? 18 : 28, lowDetail ? 12 : 18]} />
        <meshBasicMaterial
          color="#e6c878"
          wireframe
          transparent
          opacity={0.28}
        />
      </mesh>

      <mesh scale={1.05}>
        <sphereGeometry args={[RADIUS, 48, 48]} />
        <meshBasicMaterial
          color="#e6c878"
          transparent
          opacity={0.12}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <FlightPaths points={markerPositions} />

      {properties.map((p, i) => (
        <Marker
          key={p.id}
          position={markerPositions[i]}
          active={reachVisible && i === activeMarkerIndex}
        />
      ))}
    </group>
  );
}
