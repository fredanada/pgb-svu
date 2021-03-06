import React from 'react'
import {Object3D, Mesh} from '../../js/react-threejs/src'

export default class TorusLarge extends Object3D {
    // constructor(props) {
    //     super(props)
    //     this.geometry = new THREE.BoxGeometry(1,1,1)
    //     this.material = new THREE.MeshBasicMaterial({color: 'white'})
    // }
    
    geometry = new THREE.TorusGeometry( 20, 8, 36, 100 );
    material = new THREE.MeshPhongMaterial( { color: 0xdddddd, specular: 0x009900, shininess: 100, shading: THREE.FlatShading } );

    render() { 
        return (
            <Mesh geometry={this.geometry} material={this.material} onMouseDown={this.props.onMouseDown} onDragStart={this.props.onDragStart}>
                {this.props.children}
            </Mesh>
        )
    }
}

// { color: #4b614a, emissive: #1b341a, specular: #2616b3, shininess: 100, wireframe: false, }
