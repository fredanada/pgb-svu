import React from 'react'
import THREE from 'three'
import * as firebase from 'firebase'

import { Renderer, Camera, Scene, Mesh } from '../../js/react-threejs/src'
import RenderObjectsContainer from '../container/RenderObjectsContainer'
import Sphere from '../components/Sphere'
import Grid from '../components/Grid'

import Navigation from '../components/Navigation'
import Controls from '../components/Controls'

import {connect} from 'react-redux'

import store from '../store'



export class AppContainer extends React.Component {
    constructor() {
        super()
        this.state = {
           panGesture: null,
           camera: {
                position: {x: 0, y: 0, z: 100}
            },
            windowSize: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        }
    }
    componentDidMount() {
        const setSize = () =>
            this.setState({
                size: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            })
        window.addEventListener('resize', setSize)
        setSize()
    }

    componentWillMount(){
        const config = {
            apiKey: "AIzaSyB0DO82ptZcRYz55xYKw0wHfvXBluo5XoY",
            authDomain: "pgb-vsu.firebaseapp.com",
            databaseURL: "https://pgb-vsu.firebaseio.com",
            storageBucket: "pgb-vsu.appspot.com",
            messagingSenderId: "130166279152"
        };
        firebase.initializeApp(config);
    }
    // geometry = new THREE.BoxGeometry(1,1,1)
    // material = new THREE.MeshBasicMaterial({
    //     color: 'red',
    //     side: THREE.DoubleSide,
    // })
    // onMouseDown = evt => {
    //     const {pageX: x, pageY: y} = evt
    //     console.log('did begin pan at', x, y)
    //     this.setState({
    //         panGesture: {
    //             start: {x, y},
    //             cameraStart: this.state.camera.position,
    //         }
    //     })
    // }
    // onMouseMove = evt => {
    //     const {pageX: x, pageY: y} = evt
    //     const {panGesture} = this.state
    //     if (!panGesture) return
    //     const newPos = {
    //                     x: x - panGesture.start.x + panGesture.cameraStart.x,
    //                     z: y - panGesture.start.y + panGesture.cameraStart.z,
    //                 }
    //     console.log('panned to', newPos)
    //     this.setState({
    //         camera: {
    //             position: newPos
    //         }
    //     })
    // }
    // onMouseUp = () => this.setState({panGesture: null})
    onWheel = evt => {
        evt.preventDefault()
        const {deltaX: x, deltaY: y, ctrlKey} = evt
        const yAxis = ctrlKey ? 'z' : 'y'
        const otherAxis = ctrlKey ? 'y' : 'z'
        const yMultiplier = ctrlKey ? 1 : -1
        const sensitivity = 0.2
        const newPos = {
                        x: this.state.camera.position.x + sensitivity * x,
                        [yAxis]: this.state.camera.position[yAxis] + yMultiplier * sensitivity * y,
                        [otherAxis]: this.state.camera.position[otherAxis]
                    }
        //console.log('panned to', newPos)
        this.setState({
            camera: {
                position: newPos
            }
        })
   
    }

    addObjectHandler = (evt) => {
        console.log('add object handler this', this)
        evt.preventDefault()
        const brushData = store.getState().sampleBrush;
        console.log("brushData", brushData);
        console.log("EVT", evt)
        if (brushData) {
            console.log("IN IF STATEMENT", evt.pageX, evt.pageY)
            const data = {
                position: {x: evt.pageX, y: evt.pageY},
                spl: brushData.spl,
                obj: brushData.obj,
                color: brushData.color
            }
            this.props.addObject(data);

        }
    }

    // handleSelection = () = {
    //     //get some data
    // }

    render() {
        return (
            <div>
                <Navigation />
                <Controls />
                <div onWheel={this.onWheel}>
                    <Renderer
                        size={{width: window.innerWidth, height: window.innerHeight}}>
                        <Scene>
                            <Camera position={this.state.camera.position} />
                            <Grid onClick={this.addObjectHandler} position={{x: 0, y: -5, z: 0}} />
                            <RenderObjectsContainer />
                        </Scene>
                    </Renderer>
                    
                </div>
            </div>
        )
    }
}


const mapStateToProps = ({edit}) => ({
    edit
})
export default connect(
    mapStateToProps,
    null
)(AppContainer)

    //{play, clearTimeline, startEditing, stopEditing}


// const {x, y, z} = evt;

//threejs 

//  <Mesh onClick={this.addObjectHandler} geometry={this.geometry} material={this.material} />

//buttons
    // <button onClick={this.props.play} value="PLAY" style={{position: 'fixed', top:0, right:0}}>play</button>
  


