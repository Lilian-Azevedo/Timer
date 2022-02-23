import React, { Component } from 'react';
import excludesTimer from '../services/setting';
import '../styles/buttons.css';


export default class Settings extends Component {
  state = {
      previousTimers: '',
  }

  componentDidMount() {
    this.getFromLocal();
  }

  getFromLocal = () => {
    const timersFromLocal = JSON.parse(localStorage.getItem('timer-history'));
    this.setState({ previousTimers: timersFromLocal });
  }

  exclude = (id) => {
    excludesTimer(id);
    this.getFromLocal();
  }
  render() {
    const { previousTimers } = this.state;
    const { cancelTimer} = this.props;
    return (
      <div className='buttons-update settings'>
        <h3>Clique em um timer para apagar</h3>
        <div className='history'>
            { previousTimers
            && previousTimers.map(({ hour, min, seg }) => (
            <div key={ Math.random() } className='buttons-update'>
                <button type='button' onClick={() => this.exclude({hour, min, seg})} id={[hour, min, seg]}>
                    {hour < 10? '0'+ hour : hour}:{min < 10? '0'+ min : min}:{seg < 10? '0'+ seg : seg }
                </button>
            </div>))}
        </div>
        <button type='button' onClick={ cancelTimer}>Voltar</button>
      </div>
    )
  }
}
