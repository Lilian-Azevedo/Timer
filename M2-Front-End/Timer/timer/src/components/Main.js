import React, { Component } from 'react'
import '../styles/buttons.css';
import '../styles/counter.css';
import '../styles/hourglass.css';
import Countdown from './Countdown';
import Finished from './Finished';
import UpdateTimer from './UpdateTimer';

export default class App extends Component {
  state = {
    min: 0,
    seg: 0,
    start: false,
    finished: false,
  }

  updateTimer = ({target: { name, id }}) => {
    if(name === 'min') {
        this.setState((previous)=> ({
            min: id === 'min-increase'? previous.min + 1 : previous.min - 1,
        }))
    } else {
        this.setState((previous)=> ({
            seg: id === 'seg-increase'? previous.seg + 5 : previous.seg - 5,
        }))
    }
  }

  startTimer = () => {
    this.setState({ 
        start: true,
    });
  }

  cancelTimer = () => {
    this.setState({ 
      start: false,
      finished: false,
    });
  }

  finishedTime = () => {
    this.setState({ 
      finished: true,
    });
  }

  render() {
    return (
      <div className="page">
        {!this.state.start && <UpdateTimer {...this.state}
          update={this.updateTimer}
          startTimer ={this.startTimer}/>}
        {this.state.start && !this.state.finished && <Countdown {...this.state}
          finishedTime={this.finishedTime}/>}
        {this.state.finished && <Finished 
          cancelTimer={this.cancelTimer}/>}
      </div>
    );
  }
}
