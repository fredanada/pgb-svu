import React, { Component } from 'react'
import store from '../store'
import { connect } from 'react-redux';
import { createSong } from '../reducers/timelineReducer';

export class Save extends Component {
	constructor () {
		super()
		this.state = {
			open: false
		}
		this.handleSubmit = this.handleSubmit.bind(this);
	};

	// for use with some button in controls to re-open splash + instruction
	toggle = () => {
	  this.setState({open: !this.state.open});
	}

	handleSubmit(e) {
    e.preventDefault();
    this.props.createSong(this.props.events, e.target.title.value, e.target.author.value)
  }

	render () {
		return (
			<div id='save-modal'>
				<h1>SAVE FORM</h1>
				<form onSubmit={this.handleSubmit}>
				  <label>
				    title:
				    <input name="title" />
				  </label>
				  <p>by</p>
				  <label>
				    author:
				    <input name="author" />
				  </label>
				  <p></p>
				  <input type="submit" value="Submit" />
				</form>
  		</div>
		)
	}
}

const mapStateToProps = ({events}) => ({events})

export default connect(
    mapStateToProps,
    {createSong},
    )(Save)