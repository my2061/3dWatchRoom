import React, { Component } from 'react'
import WatchRoom3D from "./components/3DWacthRoom"
import ThreeIntroduce from "./components/Three-Introduce"
export default class componentName extends Component {

  render() {
    return (
      <div className='app-wrapper'>
        <ThreeIntroduce/>
        <WatchRoom3D/>
      </div>
    )
  }
}