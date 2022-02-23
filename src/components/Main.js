import React, { Component } from 'react'
import '../styles/buttons.css';
import '../styles/counter.css';
import '../styles/hourglass.css';
import Countdown from './Countdown';
import Finished from './Finished';
import Settings from './Settings';
import UpdateTimer from './UpdateTimer';

export default class App extends Component {
  state = {
    min: 0,
    seg: 0,
    hour: 0,
    start: false,
    finished: false,
    settings: false,
  }

  componentDidMount() {
    this.getHistoryOfTimers();
  }

  getHistoryOfTimers = () => {
    const timersStored = JSON.parse(localStorage.getItem('timer-history'));
    if (timersStored) {
      this.setState({
        previousTimers: timersStored,
      });    
    }
  }

  onChangeTimer = ({ target: {id}}) => {
    let [hour,,min,,seg] = id;
    hour = Number(hour);
    min = Number(min);
    seg = Number(seg);
    this.setState({ seg, min, hour });
  }

  updateTimer = ({target: { name, id }}) => {
    if(name === 'hour') {
      this.setState((previous)=> ({
          hour: id === 'hour-increase'? previous.hour + 1 : previous.hour - 1,
      }))
  
    } else if(name === 'min') {
        this.setState((previous)=> ({
            min: id === 'min-increase'
              ? (previous.min === 59 ? 0 : previous.min + 1) 
              : (previous.min === 0 ? 59 : previous.min - 1) 
        }))
    } else {
        this.setState((previous)=> ({
            seg: id === 'seg-increase'
              ? (previous.seg === 55 ? 0 : previous.seg + 5)
              : (previous.seg === 0 ? 55 : previous.seg - 5) 
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
      settings: false,
    });
    this.getHistoryOfTimers();
  }

  finishedTime = () => {
    this.setState({ 
      finished: true,
    });
  }

  resetTimer = () => {
    this.setState({ 
      seg:0, min: 0, hour: 0,
    });
  }

  settingsClick = () => {
    this.setState({ 
      settings: true,
    });
  }

  render() {
    return (
      <div className="page">
        {!this.state.start && !this.state.settings &&<UpdateTimer {...this.state}
          onChangeTimer={this.onChangeTimer}
          update={this.updateTimer}
          settingsClick={this.settingsClick}
          startTimer ={this.startTimer}
          resetTimer={this.resetTimer}
          getHistoryOfTimers={this.getHistoryOfTimers}/>}
        {this.state.start && !this.state.finished && <Countdown {...this.state}
          finishedTime={this.finishedTime}
          cancelTimer={this.cancelTimer}/>}
        {this.state.finished && <Finished 
          cancelTimer={this.cancelTimer}/>}
        {this.state.settings && <Settings 
          cancelTimer={this.cancelTimer}/>}
      </div>
    );
  }
}
