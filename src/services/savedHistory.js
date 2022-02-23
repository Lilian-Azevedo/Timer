const getTimerFromLocal = () => JSON.parse(localStorage.getItem('timer-history'));
const setTimerToLocal = (newHistory) => localStorage
  .setItem('timer-history', JSON.stringify(newHistory));

const addTimer = (Timer) => {
  if (!JSON.parse(localStorage.getItem('timer-history'))) {
    localStorage.setItem('timer-history', JSON.stringify([]));
  }
  if (Timer) {
    const TimersStored = getTimerFromLocal();
    setTimerToLocal([...TimersStored, Timer]);
  }
};

export default addTimer;