import React, { useEffect } from 'react'
import * as THREE from "three"
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import Stats from "stats.js"

export default function Index() {

    useEffect(() => {
        initThree();
    }, [])

    const initThree = () => {
        // code
        
        
    }

    return (
        <div className="three-wrapper" ref={threeWrapper}>

        </div>
    )
}
