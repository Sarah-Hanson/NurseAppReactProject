import {
  IInput,
  Nurse,
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
  };
};
export const cloneResultByValue = (
  result: IScheduleResult,
  oldResult: IScheduleResult
): IScheduleResult => {
  return {
    final: result.final,
    solutions: [...result.solutions, ...oldResult.solutions],
  };
};

export const convertPatients = (
  patients: { name: string; acuity: number; room: string }[],
  rooms: IRoom[]
): IPatient[] => {
  return patients.map(
    ({ acuity, name, room }): IPatient => ({
      id: name,
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
  nurses: Nurse[];
  patients: IPatient[];
}): IPreference[] => {
  return preferences.map(
    ({ nurse, patient, weight }): IPreference => ({
      nurse: nurses.find((listNurse) => listNurse.name === nurse),
      patient: patients.find((listPatient) => listPatient.id === patient),
      weight,
    })
  );
};

// Adds a couple fields to the front end nurse -> logic side nurse conversion
export const convertNurses = (nurses: { name: string }[]): Nurse[] => {
  return nurses.map((nurse): Nurse => new Nurse(nurse.name, []));
};

export const setImmediatePromise = () => {
  return new Promise<void>((resolve) => {
    setImmediate(() => resolve());
  });
};

export const calculateMaxDisparity = (nurses: Nurse[]) => {
  let max = 0;
  let min = Number.MAX_SAFE_INTEGER;

  for (const nurse of nurses) {
    const acuity = nurse.getAcuity();

    if (nurse.getAcuity() > max) {
      max = acuity;
    }
    if (acuity < min) {
      min = acuity;
    }
  }
  return max - min;
};

export const getHighestAcuity = (patients: IPatient[]) => {
  let maxAcuity = Number.MIN_SAFE_INTEGER;
  for (const patient of patients) {
    if (patient.acuity > maxAcuity) {
      maxAcuity = patient.acuity;
    }
  }
  return maxAcuity;
};

export const chunkArray = (anArray, chunkSize): [][] => {
  const results = [];

  while (anArray.length) {
    results.push(anArray.splice(0, chunkSize));
  }

  return results;
};
