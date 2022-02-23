const getTimerFromLocal = () => JSON.parse(localStorage.getItem('timer-history'));
const setTimerToLocal = (newHistory) => localStorage
  .setItem('timer-history', JSON.stringify(newHistory));

const excludesTimer = (Timer) => {
  if (Timer) {
    const TimersStored = getTimerFromLocal();
    setTimerToLocal(TimersStored.filter(({hour, min, seg}) => (hour !== Timer.hour && min !== Timer.min && seg !== Timer.seg)));
  }
};

export default excludesTimer;