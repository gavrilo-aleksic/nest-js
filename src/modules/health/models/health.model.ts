export enum HEALTH_MODEL_STATUS {
  OK,
  DEAD,
}

export class HealthModel {
  private status?: HEALTH_MODEL_STATUS;

  constructor(status?: HEALTH_MODEL_STATUS) {
    this.status = status;
  }

  setModelStatus(status: HEALTH_MODEL_STATUS) {
    this.status = status;
  }
  getModelStatus() {
    return this.status;
  }
}
