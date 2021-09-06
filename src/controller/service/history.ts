import { HistoryLog } from 'src/model';
import History from 'src/model/history';

class HistoryService extends History {
  keep = (rest: Omit<HistoryLog, 'id' | 'time'>) => {
    const history = {
      id: this.id,
      time: new Date(),
      ...rest,
    };
    // return some history
    if (
      history?.node.toString() ===
      this.history[this.history.length - 1]?.node.toString()
    ) {
      return;
    }
    this.history.push(history);
    // clear future history
    this.future = [];
  };

  return = (_id: number) => {
    const index = this.history.findIndex(({ id }) => id === _id);
    if (index !== -1) {
      this.future.unshift(...this.history.slice(index));
      this.history = this.history.slice(0, index);
    }
  };

  recovery = (_id: number) => {
    const index = this.future.findIndex(({ id }) => id === _id);
    if (index !== -1) {
      this.history.push(...this.future.slice(0, index + 1));
      this.future = this.future.slice(index + 1);
    }
  };

  backOff = (step: number = 1) => {
    while (step > 0) {
      const future = this.history.pop();
      if (future) {
        this.future.unshift(future);
      }
      step--;
    }
  };

  forward = (step: number = 1) => {
    while (step > 0) {
      const future = this.future.shift();
      if (future) {
        this.history.push(future);
      }
      step--;
    }
  };

  current = (): HistoryLog => {
    return this.history[this.history.length - 1];
  };
}

export default HistoryService;
