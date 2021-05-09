export class Nurse {
  constructor(public name: string, public patients: IPatient[]) {}

  static fromJSON(json: { name: string; patients: IPatient[] }) {
    return new Nurse(json.name, json.patients);
  }

  public getAcuity() {
    return this.patients.length > 0
      ? this.patients
          .map((patient) => patient.acuity)
          .reduce((sum, curr) => sum + curr)
      : 0;
  }
}
export interface FENurse {
  id: string;
  name: string;
}
export interface FEPreference {
  nurseId: string;
  bedId: string;
  weight: number;
}
export interface IPatient {
  id: string;
  acuity: number;
  room?: IRoom;
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
export interface Team {
  name: string;
  nurses: FENurse[];
  beds: IBed[];
}
export interface IBed {
  name: string;
  active: boolean;
  acuity: number;
  id: string;
  room?: string;
}

export interface ServerPayload {
  teams: TeamPayload[];
  preferences: IPreference[];
}

export interface TeamPayload {
  name: string;
  nurses: Nurse[];
  beds: IBed[];
}

export interface PreferencePayload {
  nurse: Nurse;
  bed: string;
  weight: number;
}
