
import * as THREE from 'three'
import { useState, useRef } from 'react'
import { Canvas, useThree, useFrame } from '@react-three/fiber'


function Cube({ index, z, speed }) { 
    const ref = useRef()
    // Hold state for hovered and clicked events
    // const [hovered, hover] = useState(false)
    // const [clicked, click] = useState(false)

    // useThree gives you access to the R3F state model
    const { viewport, camera } = useThree()
    // getCurrentViewport is a helper that calculates the size of the viewport
    const { width, height } = viewport.getCurrentViewport(camera, [0, 0, -z])
    // useGLTF is an abstraction around R3F's useLoader(GLTFLoader, url)
    // It can automatically handle draco and meshopt-compressed assets without you having to
    // worry about binaries and such ...
    // const { nodes, materials } = useGLTF('/banana-v1-transformed.glb')
    // By the time we're here the model is loaded, this is possible through React suspense
  
    const draw = THREE.MathUtils.randFloatSpread(1)
    let xValue = width/2;
    draw >= 0 ? 
    xValue = (width*0.5) - THREE.MathUtils.randFloat(0,1) * width * 0.15
    : 
    xValue = -(width*0.5) + THREE.MathUtils.randFloat(0,1) * width * 0.15
    
    // Local component state, it is safe to mutate because it's fixed data
    const [data] = useState({
      // Randomly distributing the objects along the vertical
      y: THREE.MathUtils.randFloatSpread(height * 2),
      // This gives us a random value between -1 and 1, we will multiply it with the viewport width
      // x: THREE.MathUtils.randFloatSpread(2),
      x : xValue,
      // How fast objects spin, randFlost gives us a value between min and max, in this case 8 and 12
      spin: THREE.MathUtils.randFloat(8, 12),
      // Some random rotations, Math.PI represents 360 degrees in radian
      rX: Math.random() * Math.PI,
      rZ: Math.random() * Math.PI
    })
  
    // useFrame executes 60 times per second
    useFrame((state, dt) => {
      // Make the X position responsive, slowly scroll objects up at the Y, distribute it along the Z
      // dt is the delta, the time between this frame and the previous, we can use it to be independent of the screens refresh rate
      // We cap dt at 0.1 because now it can't accumulate while the user changes the tab, it will simply stop
      if (dt < 0.1) ref.current.position.set(index === 0 ? 0 : data.x , (data.y += dt * speed), -z)
      // Rotate the object around
      ref.current.rotation.set((data.rX += dt / data.spin), Math.sin(index * 1000 + state.clock.elapsedTime / 10) * Math.PI, (data.rZ += dt / data.spin))
      // If they're too far up, set them back to the bottom
      if (data.y > height * (index === 0 ? 4 : 1)) data.y = -(height * (index === 0 ? 4 : 1))
    })
  
    // Using drei's detailed is a nice trick to reduce the vertex count because
    // we don't need high resolution for objects in the distance. The model contains 3 decimated meshes ...
    
      {/* <Detailed ref={ref} distances={[0, 65, 80]}>
        <mesh geometry={nodes.banana_high.geometry} material={materials.skin} material-emissive="#ff9f00" />
        <mesh geometry={nodes.banana_mid.geometry} material={materials.skin} material-emissive="#ff9f00" />
        <mesh geometry={nodes.banana_low.geometry} material={materials.skin} material-emissive="#ff9f00" />
      </Detailed> */}
    
    return (
      <mesh ref={ref}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial color={'orange'} />
      </mesh> 
      // <mesh
      //   ref={ref}
      //   scale={clicked ? 1.5 : 1}
      //   onClick={(event) => click(!clicked)}
      //   onPointerOver={(event) => hover(true)}
      //   onPointerOut={(event) => hover(false)}>
      //   <boxGeometry args={[1, 1, 1]} />
      //   <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      //   <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
      // </mesh> 
    )
  }
  
  export default function Cubes({ speed = 1, count = 200, depth = 350, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
    return (
      // No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution)
      <Canvas 
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }} 
      dpr={[1, 1.5]} 
      camera={{ position: [0, 0, 10], fov: 20, near: 0.01, far: depth + 15 }}>
        {/* <color attach="background" args={['#ffbf40']} /> */}
        {/* <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="orange" /> */}
        
        <pointLight intensity={0.5} />
        <ambientLight intensity={0.5} />
        <spotLight castShadow intensity={0.2} angle={Math.PI / 7} position={[150, 150, 250]} penumbra={1} shadow-mapSize={2048} />
        {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
        {Array.from({ length: count }, (_, i) => <Cube key={i} index={i} z={Math.round(easing(i / count) * depth) + 20} speed={speed} /> /* prettier-ignore */)}
        {/* <EffectComposer multisampling={0}>
          <DepthOfField target={[0, 0, 50]} focalLength={10} bokehScale={80} height={700} />
        </EffectComposer> */}
      </Canvas>
    )
  }

  
//   <Environment preset="sunset" />
//         <EffectComposer multisampling={0}>
//           <DepthOfField target={[0, 0, 60]} focalLength={0.4} bokehScale={14} height={700} />
//         </EffectComposer> 
  