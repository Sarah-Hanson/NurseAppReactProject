import { IPatient, Nurse } from "../../shared/types";
import { calculateMaxDisparity, setImmediatePromise } from "./helpers";
import { cloneDeep } from "lodash";

export async function makeSolutions(
  nurses: Nurse[],
  patients: IPatient[],
  settings: { snipLevel: number; maxDisparity: number; cutResults: number }
): Promise<Nurse[]> {
  const { snipLevel, maxDisparity, cutResults } = settings;
  let solutions = [];

  const state = new Iterations(nurses, patients);

  while (solutions.length < cutResults) {
    if (state.validSolution(maxDisparity)) {
      solutions.push(state.currentNurses());
    }

    if (state.noPatients() || state.currentDisparity() >= snipLevel) {
      state.pop();
    } else {
      if (!state.patientIncrementExhausted()) {
        state.currentIteration().patientIncrement++;
      } else if (!state.nurseIncrementExhausted()) {
        state.currentIteration().patientIncrement = 0;
        state.currentIteration().nurseIncrement++;
      } else {
        state.pop();
      }
      state.push(state.currentNurses(), state.currentPatients());
      state.addPatientToNurse();
    }
  }
  await setImmediatePromise();
  return solutions;
}

class Iterations {
  constructor(nurses: Nurse[], patients: IPatient[]) {
    this.internalStack = [
      { nurses, patients, nurseIncrement: 0, patientIncrement: 0 },
    ];
  }
  private internalStack: IIteration[];

  public currentIteration = () => this[this.internalStack.length - 1];
  public currentNurses = () => this.currentIteration().nurses;
  public currentPatients = () => this.currentIteration().patients;
  public currentNurseIncrement = () => this.currentIteration().nurseIncrement;
  public currentPatientIncrement = () =>
    this.currentIteration().patientIncrement;
  public currentDisparity = () => calculateMaxDisparity(this.currentNurses());

  public getCurrentNurseAtIncrement = () =>
    this.currentNurses()[this.currentNurseIncrement];
  public getCurrentPatientAtIncrement = () =>
    this.currentPatients()[this.currentPatientIncrement()];

  public addPatientToNurse = () =>
    this.getCurrentNurseAtIncrement().patients.push(
      this.getCurrentPatientAtIncrement()
    );

  public patientIncrementExhausted = () =>
    this.currentIteration().patientIncrement >=
    this.currentIteration().patients.length;
  public nurseIncrementExhausted = () =>
    this.currentIteration().nurseIncrement >=
    this.currentIteration().nurses.length;

  public noPatients = () => this.currentIteration()?.patients.length === 0;
  public validSolution = (maxDisparity) =>
    this.noPatients() && this.currentDisparity <= maxDisparity;

  public pop = () => this.internalStack.pop();
  public push = (nurses: Nurse[], patients: IPatient[]) =>
    this.internalStack.push({
      nurses: cloneDeep(nurses),
      patients: cloneDeep(patients),
      nurseIncrement: 0,
      patientIncrement: 0,
    });
}

interface IIteration {
  nurses: Nurse[];
  patients: IPatient[];
  nurseIncrement: number;
  patientIncrement: number;
}
