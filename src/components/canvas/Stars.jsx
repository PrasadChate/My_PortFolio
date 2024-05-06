import { useState, useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial, Preload } from "@react-three/drei";

// we are not adding any image or goop model to show the starts we are using a lot of maths to print the density of dots and and their motion using motion.div
import * as random from "maath/random/dist/maath-random.esm";
const Stars = (props) => {
  const ref = useRef();
  // 5000= no. of points
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });

  // motion of stars
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 100;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumculled {...props}>
        <PointMaterial
          transparent
          color="#f272c8"
          size={0.002}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};
const StarsCanvas = () => {
  return (
    // z-[-1] represents the stars behind
    <div className="w-full h-AUTO absolute inset-0 z-[-1]">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Stars />
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};
export default StarsCanvas;
