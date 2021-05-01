export class Nurse {
  constructor(public name: string, public patients: IPatient[]) {}

  public getAcuity() {
    return this.patients.length > 0
      ? this.patients
          .map((patient) => patient.acuity)
          .reduce((sum, curr) => sum + curr)
      : 0;
  }
}
export interface INurse {
  id: string;
  name: string;
  patients: IPatient[];
}

export interface IPatient {
  id: string;
  acuity: number;
  room: IRoom | undefined;
}
export interface IPreference {
  nurse?: Nurse;
  patient?: IPatient;
  weight: number;
}
export interface IScheduleResult {
  final: boolean;
  solutions: Nurse[][];
}
export interface IInput {
  nurses: Nurse[];
  patients: IPatient[];
}
export interface IRoom {
  name: string;
  adjacency?: IAdjacency[];
}
export interface IAdjacency {
  room: IRoom;
  distance: number;
}
export interface IPathResult {
  final: boolean;
  distance: number;
}
