import {FENurse, FEPreference} from '../../shared/types';
import {IBed, makeFloorPlan, Room} from './floorPlan';
import {Actions, Pages} from './Common/Enums';

interface AppState {
  page: string;
  selectedNurseId?: string;
  nurses: FENurse[];
  rooms: Room[];
  preferences: FEPreference[];
}

export const initialState: AppState = {
  page: Pages.nurses,
  selectedNurseId: undefined,
  nurses: [],
  rooms: makeFloorPlan(),
  preferences: [],
};

export const reducer = (state, action) => {
  switch (action.type) {
    // { :Page }
    case Actions.changePage:
      return {
        ...state,
        page: action.payload,
      };
    // { id: selected nurse id }
    case Actions.selectNurse:
      return {
        ...state,
        selectedNurseId: action.payload?.id,
      };
    case Actions.addNurse:
      return addNurse(state, action.payload);
    case Actions.removeNurse:
      return removeNurse(state, action.payload);
    case Actions.incrementAcuity:
      return incrementAcuity(state, action.payload);
    case Actions.decrementAcuity:
      return decrementAcuity(state, action.payload);
    case Actions.toggleBed:
      return toggleBed(state, action.payload);
    case Actions.addPreference:
      return addPreference(state, action.payload);
    case Actions.removePreference:
      return removePreference(state, action.payload);
    case Actions.setPreference:
      return setPreference(state, action.payload);
    default:
      return state;
  }
};

const addNurse = (state, payload: FENurse) => {
  const newNurses = state.nurses;
  newNurses.push(payload);
  return {
    ...state,
    nurses: newNurses,
  };
};
const removeNurse = (state: AppState, payload: {id: string}) => {
  return {
    ...state,
    nurses: state.nurses.filter((n) => n.id !== payload.id),
  };
};
const incrementAcuity = (
  state: AppState,
  payload: {roomId: string; bedId: string},
) => {
  const {roomId, bedId} = payload;
  const room = state.rooms.find((e) => e.name === roomId);
  const bed = room?.beds.find((e) => e.id === bedId);
  if (bed) {
    bed.acuity++;
  }
  return {
    ...state,
  };
};
const decrementAcuity = (
  state: AppState,
  payload: {roomId: string; bedId: string},
) => {
  const {roomId, bedId} = payload;
  const room = state.rooms.find((e) => e.name === roomId);
  const bed = room?.beds.find((e) => e.id === bedId);
  if (bed) {
    bed.acuity--;
  }
  return {
    ...state,
  };
};
const toggleBed = (
  state: AppState,
  payload: {roomId: string; bedId: string},
) => {
  const {roomId, bedId} = payload;
  const room = state.rooms.find((e) => e.name === roomId);
  const bed: IBed | undefined = room?.beds.find((e) => e.id === bedId);

  if (bed) {
    bed.active = !bed.active;
  } else {
    console.warn('Undefined bed was toggled');
  }
  return {
    ...state,
  };
};
const addPreference = (state: AppState, payload: FEPreference) => {
  const newPref = [...state.preferences];
  newPref.push(payload);
  return {
    ...state,
    preferences: newPref,
  };
};
const removePreference = (state: AppState, payload: FEPreference) => {
  const newPref = state.preferences.filter(
    (e) => !(e.bedId === payload.bedId && e.nurseId === payload.nurseId),
  );
  return {
    ...state,
    preferences: newPref,
  };
};
const setPreference = (
  state: AppState,
  payload: {pref: FEPreference; val: number},
) => {
  const {pref, val} = payload;
  console.warn(pref, val);
  pref.weight = val;
  return {
    ...state,
  };
};
