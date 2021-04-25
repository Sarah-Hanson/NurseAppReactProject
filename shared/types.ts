export interface INurse {
  name: string;
  patients: IPatient[];
}
export interface IPatient {
  name: string;
  acuity: number;
  room: IRoom | undefined;
}
export interface IPreference {
  nurse: INurse | undefined;
  patient: IPatient | undefined;
  weight: number;
}

export interface IScheduleResult {
  final: boolean;
  solutions: INurse[][];
  totalOps: number;
}
export interface IInput {
  nurses: INurse[];
  patients: IPatient[];
  solutions: number;
}

export interface IRoom {
  name: string;
  adjacency: IAdjacency[];
}
export interface IAdjacency {
  room: IRoom;
  distance: number;
}
export interface IPathResult {
  final: boolean;
  distance: number;
}
