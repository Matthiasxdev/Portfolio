
import * as THREE from 'three'
// import { useEffect } from 'react'
import { Suspense, useState } from 'react'
// import { useSprings, a } from '@react-spring/three'
import Pyramids from './components/Pyramids'
import Skills from './components/Skills'
import Projects from './components/Projects'
import { Canvas} from '@react-three/fiber'
import { Scroll, Preload, ScrollControls } from '@react-three/drei'
// https://github.com/vanruesc/postprocessing
// import Cubes from './components/Cubes'
// import { EffectComposer, DepthOfField } from '@react-three/postprocessing'

import './App.css'
import { GithubIcon } from './svg/github'
import { LinkedinIcon } from './svg/linkedin'


function Scene({ speed = 1, count = 200, depth = 350, easing = (x) => Math.sqrt(1 - Math.pow(x - 1, 2)) }) {
  return(

    <Suspense fallback={null}>
     {/* No need for antialias (faster), dpr clamps the resolution to 1.5 (also faster than full resolution) */}
    <Canvas 
    gl={{ antialias: true, toneMapping: THREE.NoToneMapping }} 
    dpr={[1, 1.5]} 
    camera={{
       position: [0, 0, 10], 
       fov: 20, near: 0.01, 
       far: depth + 15 
    }}>
    <ScrollControls damping={0.2} pages={3} distance={0.5}>
    <Scroll>
      {/* <color attach="background" args={['#ffbf40']} /> */}
      {/* <spotLight position={[10, 20, 10]} penumbra={1} intensity={3} color="orange" /> */}
      
      <pointLight intensity={0.5} />
      <ambientLight intensity={0.5} />
      <spotLight castShadow intensity={0.2} angle={Math.PI / 7} position={[150, 150, 250]} penumbra={1} shadow-mapSize={2048} />
      {/* Using cubic easing here to spread out objects a little more interestingly, i wanted a sole big object up front ... */}
      
      <Pyramids speed={speed}/>
      
    {/** This is a helper that pre-emptively makes threejs aware of all geometries, textures etc
        By default threejs will only process objects if they are "seen" by the camera leading 
        to jank as you scroll down. With <Preload> that's solved.  */}
    </Scroll>

    <Scroll html>
      <div className="panel">
        <div className="layout title">
          <span className="gradient-text">
            <h2><em>Hi,</em></h2>
            <h4>I'm-</h4>
          </span>
          <h1 className='animate-translate delay-0_5 gradient-text'>Matthias Vernette</h1>
          <p>
            <b className='animate-opacity delay-1 orange'>a Software Engineer. </b>
            <small className='animate-opacity delay-1_5 '>I have been working for 3 years on desktop softwares, 
            now self-taught for a year in web development. </small> 
          </p>
          <span className='animate-opacity delay-1_5'>
            <button className='buttons'><GithubIcon/>Github</button>
            <button className='buttons'><LinkedinIcon/>Linkedin</button>
          </span>
        </div>
      </div>
      <div className="panel">
        <div className="layout">
            <Skills />
            <Projects />
        </div>
      </div>
    </Scroll>
    <Preload />
    </ScrollControls>
    </Canvas>
    </Suspense>
  )

}

function App () {
  const [offset, setOffset] = useState(0);
  const [speed, setSpeed] = useState(1);

  // useEffect(() => {
  //     const onScroll = () => {
  //       offset < window.pageYOffset ?
  //       setSpeed(1)
  //       :
  //       setSpeed(-1)
  //       setOffset(window.pageYOffset);
  //     } 
  //     // clean up code
  //     window.removeEventListener('scroll', onScroll);
  //     window.addEventListener('scroll', onScroll, { passive: true });
  //     // setSpeed(1)
  //     return () => window.removeEventListener('scroll', onScroll);
  // }, []);

  // console.log(offset); 

  return (
    <main>
      {/* <div className="page">
        <div className="content">
          <div className='title'>
            <h2><em>Hi,</em> <span>I'm-</span></h2>
            <h1 className="gradient-text">Matthias Vernette</h1>
            <p>a Software Engineer</p>
          </div>
          <div className='section'>
            <h2>Skills</h2>
            <div className='skills'>
              <span>
                <h3>Front-end</h3>
                <p>React</p>
                <p>TypeScript</p>
              </span>
              
              <span>
                <h3>Back-end</h3>
                <p>Prisma</p>
                <p>PostgreSQL</p>
                <p>Express</p>
              </span>
              
              <span>
                <h3>Other</h3>
                <p>NextJS</p>
                <p>Git&Github</p>
              </span>
            </div>
          </div>
        </div>
      </div> */}
      <div className='scene'>
        <Scene speed= {speed}/>
      </div>
    </main>
    )
}


export default App