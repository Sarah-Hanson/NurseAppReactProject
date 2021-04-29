import { IPatient, Nurse } from "../../shared/types";
import { calculateMaxDisparity, setImmediatePromise } from "./helpers";
import { cloneDeep } from "lodash";

export async function makeSolutions(
  nurses: Nurse[],
  patients: IPatient[],
  settings: { snipLevel: number; maxDisparity: number; cutResults: number }
): Promise<{ solutions: Nurse[]; totalOps: number }> {
  const { snipLevel, maxDisparity, cutResults } = settings;
  const solutions = [];

  const state = new Iterations(nurses, patients);

  let totalOps = 0;

  while (solutions.length < cutResults) {
    totalOps++;
    if (state.validSolution(maxDisparity)) {
      solutions.push(state.currentNurses());
    }

    if (state.noPatients() || state.getDisparity() >= snipLevel) {
      // breaks loop on if on last state
      if (!state.pop()) {
        break;
      }
    } else {
      if (!state.patientIncrementExhausted()) {
        state.currentIteration().patientIncrement++;
      } else if (!state.nurseIncrementExhausted()) {
        state.currentIteration().patientIncrement = 0;
        state.currentIteration().nurseIncrement++;
      } else {
        // breaks loop on if on last state
        if (!state.pop()) {
          break;
        }
      }
      state.push(state.currentNurses(), state.getPatients());
      state.addPatientToNurse();
    }
    await setImmediatePromise();
  }
  return { solutions, totalOps };
}

class Iterations {
  constructor(nurses: Nurse[], patients: IPatient[]) {
    this.internalStack = [
      { nurses, patients, nurseIncrement: 0, patientIncrement: 0 },
    ];
  }
  readonly internalStack: IIteration[];

  public currentIteration = (): IIteration =>
    this.internalStack[this.internalStack.length - 1];
  public currentNurses = (): Nurse[] => this.currentIteration().nurses;
  public getPatients = (): IPatient[] => this.currentIteration().patients;
  public getNurseIncrement = () => this.currentIteration().nurseIncrement;
  public getPatientIncrement = () => this.currentIteration().patientIncrement;
  public getDisparity = () => calculateMaxDisparity(this.currentNurses());

  public getNurseAtIncrement = (): Nurse =>
    this.currentNurses()[this.getNurseIncrement()];
  public getPatientAtIncrement = (): IPatient =>
    this.getPatients()[this.getPatientIncrement()];

  public addPatientToNurse = () =>
    this.getNurseAtIncrement().patients.push(this.pullPatient());

  public patientIncrementExhausted = () =>
    this.currentIteration().patientIncrement >=
    this.currentIteration().patients.length;
  public nurseIncrementExhausted = () =>
    this.currentIteration().nurseIncrement >=
    this.currentIteration().nurses.length;

  public noPatients = () => this.currentIteration()?.patients.length === 0;
  public validSolution = (maxDisparity) =>
    this.noPatients() && this.getDisparity <= maxDisparity;

  private pullPatient = (): IPatient =>
    this.getPatients().splice(this.getPatientIncrement(), 1)[0];

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
