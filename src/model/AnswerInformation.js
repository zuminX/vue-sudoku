/**
 * 提交数独后的信息
 */
export class AnswerInformation {

  constructor(situation = 2, spendTime = -1) {
    this._situation = situation;
    this._spendTime = spendTime;
  }

  get situation() {
    return this._situation;
  }

  get spendTime() {
    return this._spendTime;
  }
}