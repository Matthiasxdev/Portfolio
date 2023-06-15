
import {  useFrame, useThree } from '@react-three/fiber'
import { useScroll } from '@react-three/drei'
import { useState } from 'react'
import "./Skills.css"

export default function Skills() {
    // const group = useRef()
    const data = useScroll()
    const [display, setDisplay] = useState(false)
    const { width,  height } = useThree((state) => state.viewport)
    console.log("width from skills", width)
    useFrame(() => {
        
        if (display === false && data.range(1/2.5, 1 / 3) > 0){
            setDisplay(true)
        }
    })
    return (
        <>
            {display ?
            <div className='skills animate-translate'>
                <h3>Skills</h3>
                <div className='tabs'>
                    <div>
                        <h4>Front-end</h4>
                        <p>react</p>
                        <p>typeScript</p>
                        <p>three.js</p>
                    </div>
                    <div>
                        <h4>Back-end</h4>
                        <p>postgreSQL</p>
                        <p>prisma</p>
                    </div>
                    <div>
                        <h4>Others</h4>
                        <p>git&github</p>
                        <p>next.js</p>
                    </div>
                </div>
            </div>
            :
            false
            }
        </>
    )
  }