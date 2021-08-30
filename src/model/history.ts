import { HistorySet } from '.';

const MAX_HISTORY = 100;

class History {
  private _history: HistorySet[] = [];
  private _future: HistorySet[] = [];
  set history(history: HistorySet[]) {
    this._history = history;
    while (this.history.length > MAX_HISTORY) {
      this._history.shift();
    }
  }
  get history() {
    return this._history;
  }
  set future(future: HistorySet[]) {
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
