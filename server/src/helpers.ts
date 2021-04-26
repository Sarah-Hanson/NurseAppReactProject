import {
  IInput,
  INurse,
  IPatient,
  IPreference,
  IRoom,
  IScheduleResult,
} from "../../shared/types";
import { cloneDeep } from "lodash";

export const factorial = (n: number): number => {
  if (n < 2) {
    return 1;
  } else {
    return n * factorial(n - 1);
  }
};

export const cloneInputByValue = (input: IInput): IInput => {
  return {
    nurses: cloneDeep(input.nurses),
    patients: [...input.patients],
    solutions: input.solutions,
  };
};
export const cloneResultByValue = (
  result: IScheduleResult,
  oldResult: IScheduleResult
): IScheduleResult => {
  return {
    final: result.final,
    solutions: [...result.solutions, ...oldResult.solutions],
    totalOps: result.totalOps + oldResult.totalOps,
  };
};

export const convertPatients = (
  patients: { name: string; acuity: number; room: string }[],
  rooms: IRoom[]
): IPatient[] => {
  return patients.map(
    ({ acuity, name, room }): IPatient => ({
      name,
      acuity,
      room: rooms.find((listRoom) => listRoom.name === room),
    })
  );
};

export const convertPreferences = ({
  preferences,
  nurses,
  patients,
}: {
  preferences: { nurse: string; patient: string; weight: number }[];
  nurses: INurse[];
  patients: IPatient[];
}): IPreference[] => {
  return preferences.map(
    ({ nurse, patient, weight }): IPreference => ({
      nurse: nurses.find((listNurse) => listNurse.name === nurse),
      patient: patients.find((listPatient) => listPatient.name === patient),
      weight,
    })
  );
};

// Adds a couple fields to the front end nurse -> logic side nurse conversion
export const convertNurses = (nurses: { name: string }[]): INurse[] => {
  return nurses.map(
    (nurse): INurse => ({
      name: nurse.name,
      patients: [],
    })
  );
};

export const setImmediatePromise = () => {
  return new Promise<void>((resolve) => {
    setImmediate(() => resolve());
  });
};
