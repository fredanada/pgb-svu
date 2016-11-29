import React, { Component } from 'react'
import {connect} from 'react-redux'
import store from '../store'
import {play, stop, clearTimeline, startEditing, stopEditing} from '../reducers/timelineReducer'

export class Controls extends Component {
	constructor (props) {
		super(props)
		this.state = {
			samples: [],
			eventIds: []
		}

		this.schedule = this.schedule.bind(this)
		this.playTransport = this.playTransport.bind(this)
		this.stopTransport = this.stopTransport.bind(this)
		this.scheduleAll = this.scheduleAll.bind(this)
		this.clearAll = this.clearAll.bind(this)
	};

	players (filePath, time, effect, pitch) {
		this.state.samples.push(
			{
				spl: new Tone.Player(filePath).toMaster(),
				time: time,
				effect: effect || null,
				pitch: pitch
			}
		);
	}

	schedule (sample, playStart, effect, pitch) {
		var event = Tone.Transport.schedule(function(time){
			if(effect) sample.connect(effect);
			// once all effects are hooked up then start
			console.log('scheduling with this pitch', pitch)
			sample.connect(pitch).start();
			
		}, playStart);
		this.state.eventIds.push(event);
	}

	scheduleAll () {
		//e.preventDefault();
		// takes all store events and creates array of players
		this.props.events.map(evt=>{
			

			var pitch = new Tone.PitchShift (Math.floor((evt.position.y)/100)).toMaster();
			this.players(evt.spl, evt.time, evt.effect, pitch)
		})
		// takes locally stored array of players and schedules on timeline
		Tone.Buffer.on('load', ()=>{
		  //all buffers are loaded.   
			this.state.samples.map(evt=>{
				this.schedule(evt.spl, evt.time, evt.effect, evt.pitch)
			})
		})

	}
	playTransport (e) {
		e.preventDefault();
		console.log('samples array', this.state.samples)
		this.scheduleAll();
		this.props.play();
		Tone.Transport.start();

		this.props.stopEditing();
	}
	stopTransport (e) {
		e.preventDefault();
		this.props.stop();
		Tone.Transport.stop();
		this.state.eventIds.map(id=>{
			Tone.Transport.clear(id)
		})
		this.setState({samples:[], eventIds:[]});

		this.props.startEditing();
	}
	clearAll (e) {
		e.preventDefault();
		this.props.clearTimeline();
		this.state.eventIds.map(id=>{
			Tone.Transport.clear(id)
		})
		this.setState({samples:[], eventIds:[]});
	}

	render () {
		return (
			<div>
			<div id='controls'>

				{
					this.props.isPlaying? 
					<button id='stop' value="stop" onClick={this.stopTransport}>stop</button>
					:
					<button id='play' value="play" onClick={this.playTransport}>play</button>
				}
				<button onClick={this.clearAll} value="RESET">reset</button>

  		</div>
  		</div>
		)
	}
}

const mapStateToProps = ({events, edit, isPlaying}) => ({
    events: events,
    edit: edit,
    isPlaying: isPlaying
})
export default connect(
    mapStateToProps,
    {play, stop, clearTimeline, startEditing, stopEditing}
)(Controls)

var reverb = new Tone.JCReverb(0.4).toMaster();
var pingPong = new Tone.PingPongDelay("4n", 0.2).toMaster();
var distortion = new Tone.Distortion(0.3).toMaster();
var lowpass = new Tone.Filter();
var highpass = new Tone.Filter(200, "highpass");
var pitchDown = new Tone.PitchShift (-3).toMaster();
var pitchUp = new Tone.PitchShift (3).toMaster();