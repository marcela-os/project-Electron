import React from 'react';
import { render } from 'react-dom';

const time = 1200;
const restTime = 20;

class App extends React.Component {

  state= {
    status: 'off',
    time: 'time',
    timer: null
  }

  formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds - (min * 60);
    return `${String(min).padStart(2, '0')}:${String(sec).padStart(2, '0')}`;
  }
  step = () => {
    this.setState({
      time: this.state.time - 1,
    })

    if(this.state.time === 0){
      if(this.state.status === 'work'){
        this.setState({
          time: restTime,
          status: 'rest'
        })
        this.playBell();
        }
        else if(this.state.status === 'rest'){
          this.setState({
            time: time,
            status: 'work'
        })
        this.playBell();
      }


  }
}

  startTimer = () => {
    this.setState({
    timer: setInterval(this.step, 1000),
    time: time,
    status: 'work',
  });
  }

  stopTimer = () => {
    window.clearInterval(this.state.timer)
    this.setState({
    time: time,
    status: 'off',
  });
  }

  close = () => window.close()

  playBell = () => {
    const playsound = new Audio('./sounds/bell.wav');
    playsound.play();
  }

  render() {

    const { status } = this.state;

    return (
      <div>
        <h1>Protect your eyes</h1>
        {(status === 'off') && <AppDescription />}
        {(status === 'work') && <img src="./images/work.png" />}
        {(status === 'rest') && <img src="./images/rest.png" />}
        {(status !== 'off') && <div className="timer">{this.formatTime(this.state.time)}</div>}
        {(status === 'off') && <button className="btn" onClick={this.startTimer}>Start</button>}
        {(status !== 'off') && <button className="btn" onClick={this.stopTimer}>Stop</button>}
        <button className="btn btn-close" onClick={this.close}>X</button>
      </div>
    )
  }
};

const AppDescription = () => (
      <div>
        <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
        <p>This app will help you track your time and inform you when it's time to rest.</p>
      </div>
)

render(<App />, document.querySelector('#app'));
