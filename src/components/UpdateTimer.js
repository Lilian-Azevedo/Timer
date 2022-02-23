import React, { Component } from 'react';
import { number, func } from 'prop-types';
import '../styles/buttons.css';
import '../styles/counter.css';

export default class UpdateTimer extends Component {
  render() {
    const { min, seg, hour, update, startTimer } = this.props;
    return (
      <div className='main'>
        <div className='timer'>
            <h3>{hour < 10? '0'+ hour : hour}</h3>
            <span>:</span>
            <h3>{min < 10? '0'+ min : min}</h3>
            <span>:</span>
            <h3>{seg < 10? '0'+ seg : seg }</h3>
        </div>

        <div className='container-hour'>
            <div className='buttons-update'>
                <button type='button' onClick={update} id='hour-increase' name='hour'>+ 1h</button>
                <button type='button' onClick={update} id='hou-decrease' name='hour' disabled={ hour === 0}>- 1h</button>
            </div>
        </div>
        <div className='container-min'>
            <div className='buttons-update'>
                <button type='button' onClick={update} id='min-increase' name='min'>+ 1min</button>
                <button type='button' onClick={update} id='min-decrease' name='min' disabled={ min === 0}>- 1min</button>
            </div>
        </div>
        <div className='container-seg'>
            <div className='buttons-update'>
                <button type='button' onClick={update} id='seg-increase' name='seg'>+ 5seg</button>
                <button type='button' onClick={update} id='seg-decrease' name='seg' disabled={ seg === 0}>- 5seg</button>
            </div>
        </div>

        <button type='button' onClick={ startTimer } disabled={ min === 0 && seg === 0  && hour === 0}>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
            </svg>
        </button>
      </div>
    )
  }
}

UpdateTimer.propTypes = {
  min: number.isRequired,
  seg: number.isRequired,
  update: func.isRequired,
  startTimer: func.isRequired,
}