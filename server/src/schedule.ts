import { FindPathDist } from "./shortestPath";
import { makeFloorPlan } from "./baseFloorPlan";
import {
  cloneInputByValue,
  cloneResultByValue,
  convertPatients,
  convertPreferences,
  factorial,
} from "./helpers";
import {
  IInput,
  INurse,
  IPatient,
  IPreference,
  IRoom,
  IScheduleResult,
} from "../../shared/types";
import { getNurseAcuity } from "../../shared/common";

const maxDisparity = 3; // Maximum allowable disparity for a solution
const snipLevel = 7; //Must be greater than max patient acuity

// Multipliers for scoring weights
const preferenceMultiplier = 2;
const disparityMultiplier = 0.25;
const distanceMultiplier = 0.5;

const calculateMaxDisparity = (nurses: INurse[]) => {
  let max = 0;
  let min = Number.MAX_SAFE_INTEGER;

  for (let nurse of nurses) {
    let acuity = getNurseAcuity(nurse);

    if (getNurseAcuity(nurse) > max) {
      max = acuity;
    }
    if (acuity < min) {
      min = acuity;
    }
  }
  return max - min;
};

// Methods that score result sets based on various criteria, multipliers for criteria weight at top of file
const score = (result: INurse[], preferences: IPreference[]): number =>
  scorePreferences(result, preferences) -
  scoreAcuity(result) -
  scoreDistance(result);

const scoreAcuity = (result: INurse[]): number =>
  calculateMaxDisparity(result) * disparityMultiplier;

const scorePreferences = (
  result: INurse[],
  preferences: IPreference[]
): number => {
  let score = 0;
  for (let preference of preferences) {
    if (
      preference.nurse &&
      preference.nurse.patients.length > 0 &&
      preference.patient &&
      preference.nurse.patients.includes(preference.patient)
    ) {
      score += preference.weight;
    }
  }
  return score * preferenceMultiplier;
};

const scoreDistance = (result: INurse[]): number => {
  let totalDistance = 0;
  for (let nurse of result) {
    if (nurse.patients.length > 0) {
      let room1 = nurse.patients[0].room;
      for (let patient of nurse.patients) {
        totalDistance += FindPathDist(room1, patient.room);
      }
    }
  }
  return totalDistance * distanceMultiplier;
};

const calculateBestScore = (
  results: INurse[][],
  preferences: IPreference[]
) => {
  let bestScore = Number.MIN_SAFE_INTEGER;
  let winningResult: INurse[] = [];

  for (let result of results) {
    const resultScore = score(result, preferences);
    if (resultScore > bestScore) {
      bestScore = resultScore;
      winningResult = result;
    }
  }

  console.log("Winning score received", bestScore.toLocaleString(), "points!");
  return winningResult;
};

// The main meat, get all possible permutations of results that fit into a given range of
// expected criteria defined at the top of file
const permute = (input: IInput): IScheduleResult => {
  let result: IScheduleResult = { final: false, solutions: [], totalOps: 1 };
  let disparity = calculateMaxDisparity(input.nurses);

  if (disparity < snipLevel)
    if (input.patients.length === 0) {
      if (disparity < maxDisparity) {
        result = { final: true, solutions: [input.nurses], totalOps: 1 };
      }
    } else {
      for (let i = 0; i < input.nurses.length; i++) {
        let inputCopy = cloneInputByValue(input);

        const nursePatients = inputCopy.nurses[i].patients;
        const patient = inputCopy.patients.pop();
        patient
          ? nursePatients.push(patient)
          : console.warn("Something bad happened");
        result = cloneResultByValue(permute(inputCopy), result);
        /* if (result.solutions.length > 500) {
                  break;
                }*/
      }
    }
  return result;
};

// Adds a couple fields to the front end nurse -> logic side nurse conversion
const convertNurses = (nurses: { name: string }[]): INurse[] => {
  return nurses.map(
    (nurse): INurse => ({
      name: nurse.name,
      patients: [],
    })
  );
};

// converts front-side data to logic-side format and runs permute, then scores returned values and returns the winner
export const assign = (
  nurses: { name: string }[],
  patients: { name: string; acuity: number; room: string }[],
  preferences: { nurse: string; patient: string; weight: number }[]
): INurse[] => {
  const rooms = makeFloorPlan();
  const convertedNurses = convertNurses(nurses);
  const convertedPatients = convertPatients(patients, rooms);
  const convertedPreferences = convertPreferences({
    preferences: preferences,
    nurses: convertNurses(nurses),
    patients: convertPatients(patients, rooms),
  });
  console.log(
    "Permuting Results with roughly",
    factorial(patients.length).toLocaleString(),
    "possible permutations"
  );
  const results = permute({
    nurses: convertedNurses,
    patients: convertedPatients,
    solutions: 0,
  });
  console.log(
    "Moving to scoring with",
    results.solutions.length,
    "solutions found in",
    results.totalOps,
    "operations"
  );
  return calculateBestScore(results.solutions, convertedPreferences);
};
