import { HistoryLog } from '.';

const MAX_HISTORY = 100;

class History {
  private _history: HistoryLog[] = [];
  private _future: HistoryLog[] = [];
  set history(history: HistoryLog[]) {
    this._history = history;
    while (this.history.length > MAX_HISTORY) {
      this._history.shift();
    }
  }
  get history() {
    return this._history;
  }
  set future(future: HistoryLog[]) {
    this._future = future;
    while (this._future.length > MAX_HISTORY) {
      this._future.shift();
    }
  }
  get future() {
    return this._future;
  }
}

export default History;
