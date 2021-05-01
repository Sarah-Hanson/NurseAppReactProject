import {INurse} from '../../shared/types';
import {makeFloorPlan, Room} from './floorPlan';
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
    case Actions.changePage:
      return {
        ...state,
        page: action.payload,
      };
    case Actions.addNurse:
      const newNurses = state.nurses;
      newNurses.push(action.payload);
      return {
        ...state,
        nurses: newNurses,
      };
    case Actions.removeNurse:
      return {
        ...state,
        nurses: state.nurses.filter((n) => n.id !== action.payload.id),
      };
    default:
      return state;
  }
};
