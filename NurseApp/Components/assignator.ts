import {ImagePickerIOS, InputAccessoryView} from 'react-native';
import {FindPathDist, IRoom} from './shortestPath';

const maxDisparity = 3; // Maximum allowable disparity for a solution
const snipLevel = 7; //Must be greater than max patient acuity
// Multipliers for scoring weights
const preferenceMultiplier = 3;
const disparityMultiplier = 2;
const distanceMultiplier = 1;

interface INurse {
  name: string;
  patients: IPatient[];
  acuity: number;
}
interface IPatient {
  name: string;
  acuity: number;
  room: IRoom;
}
interface IPreference {
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

const calculateMaxDisparity = (nurses: INurse[]) => {
  let max = 0;
  let min = Number.MAX_SAFE_INTEGER;
  for (let nurse of nurses) {
    if (nurse.acuity > max) {
      max = nurse.acuity;
    }
    if (nurse.acuity < min) {
      min = nurse.acuity;
    }
  }
  return max - min;
};

const score = (result: INurse[]): number =>
  scorePreferences(result, []) * preferenceMultiplier -
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

const calculateBestScore = (results: INurse[][]) => {
  for (let result of results) {
    score(result);
  }
};

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

const permute = (input: IInput): IResult => {
  let result: IResult = {final: false, solutions: [], totalOps: 0};
  let disparity = calculateMaxDisparity(input.nurses);

  if (disparity < Math.min(snipLevel, maxDisparity))
    if (input.patients.length > 0) {
      if (disparity < maxDisparity) {
        result = {final: true, solutions: [input.nurses], totalOps: 1};
      }
    } else {
      for (let i = 0; i < input.nurses.length; i++) {
        let inputCopy = newInput(input);
        inputCopy.nurses[i].patients.push(<IPatient>inputCopy.patients.pop());
        result = newResult(permute(inputCopy), result);
      }
    }
  return result;
};

export const assign = ({
  nurses,
  patients,
}: {
  nurses: {name: string}[];
  patients: IPatient[];
}): INurse[] | undefined => {
  // Make launching call
  // score all results
  // select best score
  return undefined; // TODO:Make real return
};
