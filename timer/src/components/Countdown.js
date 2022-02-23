import React, { Component } from 'react';
import '../styles/buttons.css';
import '../styles/counter.css';
import '../styles/hourglass.css';

export default class Countdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seg: props.seg,
      min: props.min,
      hour: props.hour,
      stoped: false,
    };
  }

  componentDidMount() {
      this.startTimer();
  }

  componentDidUpdate(_prevProps, prevState) {
    const { finishedTime } = this.props;
    if(prevState.seg === 1 && prevState.min === 0 && prevState.hour === 0) {
        clearInterval(this.timer);
        finishedTime(); 
    }
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
  }

  stopTimer = () => {
    this.setState({ stoped: true });
    clearInterval(this.timer);
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

        </div>
        <div className='container-hourglass'>
            <div className="hourglass" />
        </div>
    </div>
    )
  }
}
