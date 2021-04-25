import { INurse } from "./types";

export const getNurseAcuity = (nurse: INurse) => {
  return nurse.patients.length > 0
    ? nurse.patients
        .map((patient) => patient.acuity)
        .reduce((sum, curr) => sum + curr)
    : 0;
};
