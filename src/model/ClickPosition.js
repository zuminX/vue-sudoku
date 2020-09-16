export class ClickPosition {
  _row;
  _column;

  constructor(row = -1, column = -1) {
    this._row = row;
    this._column = column;
  }

  static isInit(clickPosition) {
    return clickPosition.row === -1 || clickPosition.column === -1;
  }

  static isNotInit(clickPosition) {
    return !ClickPosition.isInit(clickPosition);
  }

  get row() {
    return this._row;
  }

  get column() {
    return this._column;
  }
}
