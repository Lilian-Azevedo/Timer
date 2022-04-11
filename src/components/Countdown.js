import React, { Component } from 'react';
import '../styles/buttons.css';
import '../styles/counter.css';
import '../styles/hourglass.css';
import song from './harryPotterTheme.mp3';
export default class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: props.seg,
      min: props.min,
      hour: props.hour,
      stoped: false,
      play: true,
    };

    this.audio = new Audio(song);
    this.audio.addEventListener('ended', function () {
      this.currentTime = 0;
      this.play();
    }, false);
  }
 
  componentDidMount() {
    this.startTimer();
    this.audio.play();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { finishedTime } = this.props;
    if(prevState.seg === 1 && prevState.min === 0 && prevState.hour === 0) {
        clearInterval(this.timer);
        this.togglePlay();
        finishedTime();
    }
  }

  togglePlay = () => {
    this.setState({
      play: !this.state.play,
    });
    this.state.play ? this.audio.play() : this.audio.pause();
  }
  
  startTimer = () => {
    this.setState({ stoped: false });
    this.timer = setInterval(() => {
        this.setState(({seg, min, hour}) => ({
            hour: (seg === 0 && min === 0 && hour > 0 )? hour - 1: hour,
            min:((seg === 0 && min === 0 && hour > 0) ? 59: (seg === 0 && min > 0)? min - 1: min),
            seg: (seg === 0)? 59: seg - 1 ,
        }));
    }, 1000);
    this.togglePlay();
  }

  stopTimer = () => {
    this.setState({ stoped: true });
    clearInterval(this.timer);
    this.togglePlay();
  }

  render() {
    const { cancelTimer } = this.props;
    const { seg, min, hour, stoped } = this.state;
    return (
    <div className='page'>
        <div className='main countdown-main'>
            <div className='countdown'>
                <h3>{hour < 10? '0'+ hour : hour}</h3>
                <span>:</span>
                <h3>{min < 10? '0'+ min : min}</h3>
                <span>:</span>
                <h3>{seg < 10? '0'+ seg : seg }</h3>
            </div>
            <div>
                { stoped ? (
                <button type='button' onClick={this.startTimer} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                    </svg>
                </button>)
                :
                (<button type='button' onClick={this.stopTimer} >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </button>)}

                <button type='button' onClick={cancelTimer} >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8 7a1 1 0 00-1 1v4a1 1 0 001 1h4a1 1 0 001-1V8a1 1 0 00-1-1H8z" clipRule="evenodd" />
                </svg>
                </button>
            </div>
            <div>
              <button type='button' onClick={this.togglePlay}>
                { this.state.play ? 
                (<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" clipRule="evenodd" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                </svg>)
                : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                )}
              </button>
            </div>
        </div>
        <div className='container-hourglass'>
            <div className="hourglass" />
        </div>
    </div>
    )
  }
}
// fazer loop da música: https://stackoverflow.com/questions/54847032/looping-audio-with-react-js
