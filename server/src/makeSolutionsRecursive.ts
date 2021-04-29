// The main meat, get all possible permutations of results that fit into a given range of
// expected criteria defined at the top of file
import { IInput, IScheduleResult } from "../../shared/types";
import {
  calculateMaxDisparity,
  cloneInputByValue,
  cloneResultByValue,
  setImmediatePromise,
} from "./helpers";

export const MakeSolutionsRecursive = async (
  input: IInput,
  settings: { snipLevel: number; maxDisparity: number; cutResults: number }
): Promise<IScheduleResult> => {
  const { snipLevel, maxDisparity, cutResults } = settings;
  let result: IScheduleResult = { final: false, solutions: [] };
  const disparity = calculateMaxDisparity(input.nurses);

  // Frees up the node loop to answer other things
  await setImmediatePromise();

  if (disparity < snipLevel)
    if (input.patients.length === 0) {
      if (disparity <= maxDisparity) {
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
        result = cloneResultByValue(
          await MakeSolutionsRecursive(inputCopy, settings),
          result
        );
        if (result?.solutions?.length >= cutResults) {
          throw result;
        }
      }
    }
  return result;
};
