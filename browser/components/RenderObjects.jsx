import React from 'react';
import { Object3D } from '../../js/react-threejs/src';
import Cube from './Cube';
import TorusSmall from './TorusSmall';
import TorusLarge from './TorusLarge';
import Cylinder from './Cylinder';
import Dodecahedron from './Dodecahedron';
import Sphere from './Sphere'
import Tube from './Tube'
import TorusKnot from './TorusKnot'
import Icosahedron from './Icosahedron'
import Shadows from './Shadows'

export default class RenderObjects extends Object3D {
  constructor (...args) {
    super(...args)
    this.animate = ::this.animate
    this.state = {
      rotation: { x: 0, y: 0 },
      panGesture: null,
      camera: {
        position: {x: 0, y: 0, z: 150}
      },
    }
  }

  componentDidMount (...args) {
    super.componentDidMount(...args)
    this.animate()
  }

  animate () {
    requestAnimationFrame(this.animate)
    const { rotation } = this.state
    this.setState({
      rotation: {
        x: rotation.x + 0.1,
        y: rotation.y + 0.1,
      },
    });
  }

  onMouseDown = (timelineEvt) => (evt, hit) => {
    // alert(
    //   "Key Pressed: " + String.fromCharCode(evt.charCode) + "\n"
    //   + "charCode: " + evt.charCode + "\n"
    //   + "SHIFT key pressed: " + evt.shiftKey + "\n"
    //   + "ALT key pressed: " + evt.altKey + "\n"
    // );
    console.log("TIMELINEEVENT", timelineEvt)
    if (evt.buttons === 1 && this.props.filterBrush) {  
      this.props.addFilter(timelineEvt.id, this.props.filterBrush.type) 
    }           
  
    if (evt.buttons === 2) {
      this.props.deleteObj(timelineEvt.id)
    }
  }

  onDragStart = (timelineEvt) => (evt, hit) => {
    console.log('ONDRAGSTART', timelineEvt)
    if (evt.buttons === 1 && evt.shiftKey) {
      return timelineEvt;
    }
  }
  render () {
    //renders an array of object 
    return (
      <div>
      {
      
        this.props.sampleBrush && this.props.sampleBrush.onGrid ? <Shadows object={this.props.sampleBrush.obj} position={this.props.sampleBrush.position} /> : null
      }

        {
          this.props.events && this.props.events.map((event, idx) => {
            
            if (event.obj === 'cube') {
              return <Cube
              key={event.id} color={0xff0000} 
              onMouseDown={this.onMouseDown(event)}
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'cylinder') {
              return <Cylinder
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x , y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'torus-large') {
              return <TorusLarge
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'dodecahedron') {
              return <Dodecahedron 
              key={event.id} 
              onMouseDown={this.onMouseDown(event)} 
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'torus-small') {
              return <TorusSmall 
              key={event.id} color={0xffff00} 
              onMouseDown={this.onMouseDown(event)} 
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}} />
            } else if (event.obj === 'sphere') {
              return <Sphere 
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
            } else if (event.obj === 'tube') {
              return <Tube 
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
          } else if (event.obj === 'torus-knot') {
              return <TorusKnot 
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              onDragStart={this.onDragStart(event)}
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
          } else if (event.obj === 'icosahedron') {
              return <Icosahedron 
              key={event.id}
              onMouseDown={this.onMouseDown(event)} 
              onDragStart={this.onDragStart(event)} 
              position={{ x: event.position.x, y: event.position.y, z: event.position.z}}/>
          } else {
            return null;
          }
          })
        }
      </div>
    )
  }
}

