import React, {useEffect, useRef} from 'react'

export default function index() {

    const threeWrapper = useRef();

    useEffect(()=>{
        initThree();
    }, [])

    const initThree = ()=> {

    }

    return (
        <div className="three-wrapper" ref={threeWrapper}>
            
        </div>
    )
}
