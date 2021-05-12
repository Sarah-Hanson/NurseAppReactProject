import {
  IBed,
  IInput,
  IPatient,
  IPreference,
  IRoom,
  IScheduleResult,
  Nurse,
  PreferencePayload,
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

export const convertPatients = (beds: IBed[], rooms: IRoom[]): IPatient[] => {
  return beds.map(({ id, acuity, room }) => ({
    id,
    acuity,
    room: rooms.find((listRoom) => listRoom.name === room),
  }));
};

export const convertPreferences = (
  preferences: PreferencePayload[],
  patients: IPatient[]
): IPreference[] => {
  return preferences.map(
    ({ nurse, weight, bed }: PreferencePayload): IPreference => ({
      nurse,
      patient: patients.find((listPatient) => listPatient.id === bed),
      weight,
    })
  );
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
