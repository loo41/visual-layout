import { HistoryLog } from '.';

const MAX_HISTORY = 100;

class History {
  private _history: HistoryLog[] = [];
  private _future: HistoryLog[] = [];
  private _id: number = 0;
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

  set id(id: number) {
    this._id = id;
  }

  get id() {
    this._id = ++this._id;
    return this._id;
  }
}

export default History;
