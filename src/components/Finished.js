import React, { Component } from 'react';
import '../styles/finished.css';
import '../styles/counter.css';
import song from './ringingBell.mp3'; 

const audio = new Audio(song);

export default class Finished extends Component {
  componentDidMount() {
    audio.play();
  }

  finishedTimer = () => {
    const { cancelTimer } = this.props;
    audio.pause();
    cancelTimer();
  }
  render() {
    return (
    <div className='main'>
        <div className='finished'>
            <h1>Que pena, seu tempo acabou!</h1>
            <button type='button' onClick={this.finishedTimer}>Voltar</button>
        </div>
    </div>
    )
  }
}
