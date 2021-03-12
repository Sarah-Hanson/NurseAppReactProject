import {FindPathDist, IRoom} from './shortestPath';

const maxDisparity = 3; // Maximum allowable disparity for a solution
const snipLevel = 7; //Must be greater than max patient acuity
// Multipliers for scoring weights
const preferenceMultiplier = 3;
const disparityMultiplier = 2;
const distanceMultiplier = 1;

export interface INurse {
  name: string;
  patients: IPatient[];
}
export interface IPatient {
  name: string;
  acuity: number;
  room: IRoom;
}
export interface IPreference {
  nurse: INurse;
  patient: IPatient;
  value: number;
}

interface IResult {
  final: boolean;
  solutions: INurse[][];
  totalOps: number;
}
interface IInput {
  nurses: INurse[];
  patients: IPatient[];
}
// Adds a couple fields to the front end nurse -> logic side nurse conversion
const convertNurses = (nurses: {name: string}[]): INurse[] => {
  return nurses.map(
    (nurse): INurse => {
      return {
        name: nurse.name,
        patients: [],
      };
    },
  );
};

const getNurseAcuity = (nurse: INurse) =>
  nurse.patients
    .map((patient) => patient.acuity)
    .reduce((sum, curr) => sum + curr);
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
  scorePreferences(result, preferences) * preferenceMultiplier -
  scoreAcuity(result) * disparityMultiplier -
  scoreDistance(result) * distanceMultiplier;
const scoreAcuity = (result: INurse[]): number => calculateMaxDisparity(result);
const scorePreferences = (
  result: INurse[],
  preferences: IPreference[],
): number => {
  let score = 0;
  // @ts-ignore
  for (let preference of preferences) {
    if (preference.nurse.patients.includes(preference.patient)) {
      score += preference.value;
    }
  }
  return score;
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
  return totalDistance;
};

const calculateBestScore = (
  results: INurse[][],
  preferences: IPreference[],
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
  return winningResult;
};

// Copy Methods to get pass by value instead of pass by reference
const newInput = (input: IInput): IInput => {
  return {nurses: [...input.nurses], patients: [...input.patients]};
};
const newResult = (result: IResult, oldResult: IResult): IResult => {
  return {
    final: result.final,
    solutions: [...result.solutions, ...oldResult.solutions],
    totalOps: result.totalOps + 1,
  };
};

// The main meat, get all possible permutations of results that fit into a given range of
// expected criteria defined at the top of file
const permute = (input: IInput): IResult => {
  let result: IResult = {final: false, solutions: [], totalOps: 0};
  let disparity = calculateMaxDisparity(input.nurses);

  if (disparity < Math.min(snipLevel, maxDisparity))
    if (input.patients.length === 0) {
      result = {final: true, solutions: [input.nurses], totalOps: 1};
    } else {
      for (let i = 0; i < input.nurses.length; i++) {
        let inputCopy = newInput(input);
        inputCopy.nurses[i].patients.push(<IPatient>inputCopy.patients.pop());
        result = newResult(permute(inputCopy), result);
      }
    }
  return result;
};

// converts front-side data to logic-side format and runs permute, then scores returned values and returns the winner
export const assign = ({
  nurses,
  patients,
  preferences,
}: {
  nurses: {name: string}[];
  patients: IPatient[];
  preferences: IPreference[];
}): INurse[] => {
  let results = permute({nurses: convertNurses(nurses), patients: patients});
  return calculateBestScore(results.solutions, preferences);
};
