import { FindPathDist } from "./shortestPath";
import { makeFloorPlan } from "./baseFloorPlan";
import {
  calculateMaxDisparity,
  chunkArray,
  cloneInputByValue,
  cloneResultByValue,
  convertNurses,
  convertPatients,
  convertPreferences,
  factorial,
  getHighestAcuity,
  setImmediatePromise,
} from "./helpers";
import {
  IInput,
  IPreference,
  IScheduleResult,
  Nurse,
} from "../../shared/types";
import { MakeSolutionsRecursive } from "./makeSolutionsRecursive";

const maxDisparity = 3; // Maximum allowable disparity for a solution
let snipLevel; // dont go down a branch if the acuity is higher than this to prevent trying to stack every patient on one nurse
const cutResults = 5000; // We don't need more solutions that this, so stop getting them

const chunkSize = 6;

// Multipliers for scoring weights
const preferenceMultiplier = 2;
const disparityMultiplier = 0.25;
const distanceMultiplier = 0.5;

const scoreResults = (result: Nurse[], preferences: IPreference[]): number =>
  scorePreferences(result, preferences) -
  scoreAcuity(result) -
  scoreDistance(result);

const scoreAcuity = (result: Nurse[]): number =>
  calculateMaxDisparity(result) * disparityMultiplier;

const scorePreferences = (
  result: Nurse[],
  preferences: IPreference[]
): number => {
  let score = 0;
  for (const preference of preferences) {
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

const scoreDistance = (result: Nurse[]): number => {
  let totalDistance = 0;
  for (const nurse of result) {
    if (nurse.patients.length > 0) {
      const room1 = nurse.patients[0].room;
      for (const patient of nurse.patients) {
        totalDistance += FindPathDist(room1, patient.room);
      }
    }
  }
  return totalDistance * distanceMultiplier;
};

const calculateBestScore = (
  results: Nurse[][],
  preferences: IPreference[]
): Nurse[] => {
  let bestScore = Number.MIN_SAFE_INTEGER;
  let winningResult: Nurse[] = [];

  for (const result of results) {
    const resultScore = scoreResults(result, preferences);
    if (resultScore > bestScore) {
      bestScore = resultScore;
      winningResult = result;
    }
  }
  console.log(
    "Winning score received",
    bestScore.toLocaleString(),
    "points!\n winning solution acuities"
  );
  for (const nurse of winningResult) {
    console.log(nurse.name, nurse.getAcuity());
    console.log(nurse.patients.map((p) => p.acuity));
  }
  return winningResult;
};

// The main meat, get all possible permutations of results that fit into a given range of
// expected criteria defined at the top of file
const permute = async (input: IInput): Promise<IScheduleResult> => {
  let result: IScheduleResult = { final: false, solutions: [] };
  const disparity = calculateMaxDisparity(input.nurses);

  // Frees up the node loop to answer other things
  await setImmediatePromise();

  if (disparity < snipLevel)
    if (input.patients.length === 0) {
      if (disparity < maxDisparity) {
        result = { final: true, solutions: [input.nurses] };
      }
    } else {
      for (let i = 0; i < input.nurses.length; i++) {
        const inputCopy = cloneInputByValue(input);

        const nursePatients = inputCopy.nurses[i].patients;
        const patient = inputCopy.patients.pop();
        patient
          ? nursePatients.push(patient)
          : console.warn("Something bad happened");
        result = cloneResultByValue(await permute(inputCopy), result);
        if (result?.solutions?.length >= cutResults) {
          throw result;
        }
      }
    }
  return result;
};

// converts front-side data to logic-side format and runs permute, then scores returned values and returns the winner
export const assign = async (
  nurses: { name: string }[],
  patients: { name: string; acuity: number; room: string }[],
  preferences: { nurse: string; patient: string; weight: number }[]
): Promise<Nurse[]> => {
  let results;
  const rooms = makeFloorPlan();
  const convertedNurses = convertNurses(nurses);
  const convertedPatients = convertPatients(patients, rooms);
  const convertedPreferences = convertPreferences({
    preferences,
    nurses: convertNurses(nurses),
    patients: convertPatients(patients, rooms),
  });
  snipLevel = getHighestAcuity(convertedPatients) + 1;

  console.log(
    "Permuting Results with roughly",
    factorial(patients.length).toLocaleString(),
    "possible permutations"
  );

  // New sub-problem recursive solution, break into smaller solvable blocks and then run those blocks one after another
  convertedPatients.sort((a, b) =>
    a.acuity === b.acuity ? 0 : a.acuity < b.acuity ? 1 : -1
  );
  console.warn(convertedPatients.map((p) => p.acuity));
  const subProblems = chunkArray(convertedPatients, chunkSize);
  let bestSolution = convertedNurses;
  let i = 1;
  for (const subProblem of subProblems) {
    if (bestSolution.length === 0) {
      console.warn("An error has occurred and no solutions were found");
      break;
    }
    console.log(`beginning sub problem ${i++}/${subProblems.length}`);
    try {
      results = await MakeSolutionsRecursive(
        {
          nurses: bestSolution,
          patients: subProblem,
        },
        {
          snipLevel,
          maxDisparity,
          cutResults,
        }
      );
    } catch (tossedResult) {
      if (tossedResult.message) {
        console.warn(tossedResult.message);
      } else {
        results = tossedResult;
      }
    } finally {
      console.log(
        "Moving to scoring with",
        results?.solutions.length || "unknown",
        "solutions found."
      );
      bestSolution = calculateBestScore(
        results.solutions,
        convertedPreferences
      );
    }
  }
  for (const nurse of bestSolution) {
    for (const patient of nurse.patients) {
      delete patient.room.adjacency;
    }
  }

  return bestSolution;
};
