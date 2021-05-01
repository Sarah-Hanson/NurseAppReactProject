import {INurse} from '../../shared/types';
import {Pages} from './Navigation/Navigator';

interface AppState {
  page: string;
  nurses: INurse[];
}

export const initialState: AppState = {
  page: Pages.nurses,
  nurses: [],
};

export enum Actions {
  changePage = 'changePage',
  addNurse = 'addNurse',
  removeNurse = 'removeNurse',
}

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
