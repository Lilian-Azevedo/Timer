import React, { Component } from 'react';
import '../styles/buttons.css';
import '../styles/counter.css';

export default class HistoryTimer extends Component {
  render() {
    const { previousTimers, onChangeTimer }= this.props;
    return (
      <div className='history'>
        { previousTimers
        && previousTimers.map(({ hour, min, seg, id }) => (
          <div key={ Math.random() } className='buttons-update'>
            <button type='button' onClick={onChangeTimer} id={id} name={`hour:${hour}-min:${min}-seg:${seg}`}>
                {hour < 10? '0'+ hour : hour}:{min < 10? '0'+ min : min}:{seg < 10? '0'+ seg : seg }
            </button>
          </div>))}
     </div>
    )
  }
}
