import { combineReducers } from 'redux';
import initialState from './initialState'

const ADD_MY_OBJECT = 'ADD_MY_OBJECT';
const PLAY = 'PLAY'
const SAMPLE_BRUSH = 'CHECKOUT_BRUSH'
const CLEAR_BRUSH = 'CLEAR_BRUSH'

export const addObject = (myObjects) => ({
  type: ADD_MY_OBJECT,
  myObjects
})
export const play = () => ({
	type: PLAY
})
export const setBrush = (data) => ({
    type: SAMPLE_BRUSH,
    data
})

export const clearBrush = (data) => ({
    type: CLEAR_BRUSH,
    data
})
const isPlaying = (state = false, action) => {
    switch(action.type){
        case PLAY:
        	return true;
        default: return state;
    }
}

const events = (state = [], action) => {
    switch(action.type){
        case ADD_MY_OBJECT:
            return state.concat(action.myObjects);
        default: return state;
    }
}

const sampleBrush = (state = null, action) => {
    switch(action.type){
        case SAMPLE_BRUSH: return action.data;
        case CLEAR_BRUSH: 
            return null;
        default: return state
    }
}

export default combineReducers({
	isPlaying,
	events,
    sampleBrush
});


// export default function artists (state = initialArtists, action) {
//   switch (action.type) {
//     case RECEIVE_ARTISTS: return action.artists;
//     default: return state;
//   }
// }