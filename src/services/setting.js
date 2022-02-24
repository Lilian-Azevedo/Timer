const getTimerFromLocal = () => JSON.parse(localStorage.getItem('timer-history'));
const setTimerToLocal = (newHistory) => localStorage
  .setItem('timer-history', JSON.stringify(newHistory));

const excludesTimer = (timerId) => {
  if (timerId) {
    const TimersStored = getTimerFromLocal();
    setTimerToLocal(TimersStored.filter(({ id }) => id !== Number(timerId)));
  }
};

export default excludesTimer;