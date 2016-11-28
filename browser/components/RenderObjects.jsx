import React from 'react'
import { Object3D } from '../../js/react-threejs/src'
import Cube from './Cube'
import TorusSmall from './TorusSmall'
import TorusLarge from './TorusLarge'
import Cylinder from './Cylinder'
import Dodecahedron from './Dodecahedron';
import Sphere from './Sphere'
import Tube from './Tube'


// extened threejs cube-rotating example
// http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene
export default class RenderObjects extends Object3D {

  constructor (...args) {
    super(...args)
    this.animate = ::this.animate

    this.state = {
      rotation: { x: 0, y: 0 },
    }
  }

  componentDidMount (...args) {
    super.componentDidMount(...args)
    this.animate()
  }

  // custom/example animation
  // rotating the cube
  animate () {
    requestAnimationFrame(this.animate)
    const { rotation } = this.state
    this.setState({
      rotation: {
        x: rotation.x + 0.1,
        y: rotation.y + 0.1,
      },
    })
  }

  render () {
    const { rotation } = this.state
    //should render an array of object 
    return (
      <div>

        <Tube position={{x: 0, y: -5, z: 0}} />
        <TorusLarge position={{x: -50, y: 10, z: 0}} />
      {
        this.props.events && this.props.events.map((event, idx) => {
            if(event.obj === 'cube') {
              return <Cube key={idx} color={0xff0000} position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'cylinder') {
              return <Cylinder key={idx} color={0xffff00} position={{ x: event.position.x , y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'torus-large') {
              return <TorusLarge key={idx} color={0xffff00} position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'dodecahedron') {
              return <Dodecahedron key={idx} color={0xffff00} position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'torus-small') {
              return <TorusSmall key={idx} color={0xffff00} position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
            } else {
              return <Sphere key={idx} color={'white'} position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
            }
        })
      }
    </div>)
  }
}