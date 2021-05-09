import { FindPathDist } from "./shortestPath";
import { makeFloorPlan } from "./baseFloorPlan";
import {
  calculateMaxDisparity,
  chunkArray,
  convertNurses,
  convertPatients,
  convertPreferences,
  factorial,
  getHighestAcuity,
} from "./helpers";
import {
  FEPreference,
  IPatient,
  IPreference,
  Nurse,
  PreferencePayload,
  Team,
  TeamPayload,
} from "../../shared/types";
import { MakeSolutionsRecursive } from "./makeSolutionsRecursive";
import convert from "lodash/fp/convert";

const maxDisparity = 2; // Maximum allowable disparity for a solution
let snipLevel; // dont go down a branch if the acuity is higher than this to prevent trying to stack every patient on one nurse
const cutResults = 5000; // We don't need more solutions that this, so stop getting them

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

// converts front-side data to logic-side format and runs permute, then scores returned values and returns the winner
export const assign = async (
  teams: TeamPayload[],
  preferences: PreferencePayload[]
): Promise<Nurse[]> => {
  let results;
  const rooms = makeFloorPlan();

  for (const team of teams) {
    const convertedNurses = team.nurses;
    const convertedPatients = convertPatients(team.beds, rooms);
    const convertedPreferences = convertPreferences(
      preferences,
      convertedPatients
    );
    snipLevel = getHighestAcuity(convertedPatients) + 1;

    console.log(
      "Permuting Results with roughly",
      factorial(team.beds.length).toLocaleString(),
      "possible permutations"
    );

    // New recursive sub-problem solution, break into smaller solvable blocks and then run those blocks one after another
    // convertedPatients.sort((a, b) =>
    //   a.acuity === b.acuity ? 0 : a.acuity < b.acuity ? -1 : 1
    // );

    // const chunkSize = Math.floor(patients.length / 2);
    const chunkSize = 10;
    const subProblems: IPatient[][] = chunkArray(convertedPatients, chunkSize);
    if (subProblems[subProblems.length - 1].length < chunkSize) {
      let j = 0;
      for (const patient of subProblems[subProblems.length - 1]) {
        if (j >= convertedNurses.length) {
          j = 0;
        }
        convertedNurses[j].patients.push(patient);
        j++;
      }
    }
    for (const nurse of convertedNurses) {
      console.log(nurse.name, nurse.getAcuity());
      console.log(nurse.patients.map((p) => p.acuity));
    }
    let i = 1;
    let bestSolution = convertedNurses;
    for (const subProblem of subProblems) {
      if (bestSolution.length === 0) {
        console.warn("An error has occurred and no solutions were found");
        break;
      }
      console.log(`beginning sub problem ${i++}/${subProblems.length}`);
      console.log(subProblem.map((p) => p.acuity));
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
  }

  return bestSolution;
};
