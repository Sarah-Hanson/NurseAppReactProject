import {INurse} from '../../shared/types';
import {IBed, makeFloorPlan, Room} from './floorPlan';
import {Actions, Pages} from './Common/Enums';

interface AppState {
  page: string;
  nurses: INurse[];
  rooms: Room[];
}

export const initialState: AppState = {
  page: Pages.nurses,
  nurses: [],
  rooms: makeFloorPlan(),
};

export const reducer = (state, action) => {
  switch (action.type) {
    // { :Page }
    case Actions.changePage:
      return {
        ...state,
        page: action.payload,
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
    default:
      return state;
  }
};

const addNurse = (state, payload: INurse) => {
  const newNurses = state.nurses;
  newNurses.push(payload);
  return {
    ...state,
    nurses: newNurses,
  };
};
const removeNurse = (state, payload: {id: string}) => {
  return {
    ...state,
    nurses: state.nurses.filter((n) => n.id !== payload.id),
  };
};
const incrementAcuity = (state, payload: {roomId: string; bedId: string}) => {
  const {roomId, bedId} = payload;
  const room = state.rooms.find((e) => e.name === roomId);
  const bed = room.beds.find((e) => e.id === bedId);

  bed.acuity++;
  return {
    ...state,
  };
};
const decrementAcuity = (state, payload: {roomId: string; bedId: string}) => {
  const {roomId, bedId} = payload;
  const room = state.rooms.find((e) => e.name === roomId);
  const bed = room.beds.find((e) => e.id === bedId);

  bed.acuity--;
  return {
    ...state,
  };
};
const toggleBed = (state, payload: {roomId: string; bedId: string}) => {
  const {roomId, bedId} = payload;
  const room = state.rooms.find((e) => e.name === roomId);
  const bed: IBed = room.beds.find((e) => e.id === bedId);

  bed.active = !bed.active;
  return {
    ...state,
  };
};
