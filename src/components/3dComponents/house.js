// House3D.jsx
import React, { useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'

const HouseSketch = () => {
  return (
    <group>
      {/* Ground plane */}
      {/* <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshBasicMaterial wireframe color="#555" />
      </mesh> */}

      {/* Main house box */}
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[4, 3, 4]} />
        <meshBasicMaterial wireframe color="#fff" />
      </mesh>

      {/* Roof */}
      <mesh position={[0, 2.5, 0]}>
        <coneGeometry args={[3.2, 2, 4]} />
        <meshBasicMaterial wireframe color="#fff" />
      </mesh>

      {/* Door */}
      <mesh position={[0, -1.5, 2.01]}>
        <boxGeometry args={[1, 2, 0.1]} />
        <meshBasicMaterial wireframe color="#fff" />
      </mesh>

      {/* Windows - front */}
      <mesh position={[-1.5, 0.5, 2.01]}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshBasicMaterial wireframe color="#fff" />
      </mesh>
      <mesh position={[1.5, 0.5, 2.01]}>
        <boxGeometry args={[0.8, 0.8, 0.1]} />
        <meshBasicMaterial wireframe color="#fff" />
      </mesh>

      {/* Windows - sides */}
      <mesh position={[-2.01, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshBasicMaterial wireframe color="#fff" />
      </mesh>
      <mesh position={[2.01, 0.5, 0]}>
        <boxGeometry args={[0.1, 0.8, 0.8]} />
        <meshBasicMaterial wireframe color="#fff" />
      </mesh>

      {/* Chimney */}
      <group position={[1, 3, -1]}>
        <mesh>
          <boxGeometry args={[0.5, 1, 0.5]} />
          <meshBasicMaterial wireframe color="#fff" />
        </mesh>
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.6, 0.1, 0.6]} />
          <meshBasicMaterial wireframe color="#fff" />
        </mesh>
      </group>
    </group>
  )
}


const RotatingHouse = () => {
  const groupRef = useRef()

  // This will run every frame (about 60 times per second)
  useFrame((state, delta) => {
    if (groupRef.current) {
      // Rotate slowly (0.5 radians per second)
      groupRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <group ref={groupRef}>
      <HouseSketch />
    </group>
  )
}

export const House3D = () => {
  const isMobileScreen = window.innerWidth <= 950 ? true : false;
  return (
    <div style={{ height: isMobileScreen ? '60vh' : '100vh' }}>
      <Canvas
        camera={{ position: [8, 5, 8], fov: 50 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={0.5} />
        <RotatingHouse />
        {/* Keep OrbitControls but disable auto-rotate */}
        <OrbitControls
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          autoRotate={false} // Ensure our manual rotation isn't conflicted
          minDistance={5}
          maxDistance={20}
        />
      </Canvas>
    </div>
  )
}