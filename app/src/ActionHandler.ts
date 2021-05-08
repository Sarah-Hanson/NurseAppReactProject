import {FENurse, FEPreference, Team} from '../../shared/types';
import {IBed, makeFloorPlan, Room, selectTeamForRoom} from './floorPlan';
import {Actions, Pages} from './Common/Enums';

interface AppState {
  page: string;
  selectedNurseId?: string;
  nurses: FENurse[];
  rooms: Room[];
  preferences: FEPreference[];
  nights: boolean;
  teams: Team[];
}

const makeTeams = () => {
  let names = ['Team A', 'Team B', 'Team C', 'Team D'];
  let teams: Team[] = [];
  for (const name of names) {
    teams.push({name, nurses: [], beds: []});
  }
  return teams;
};

export const initialState: AppState = {
  page: Pages.nurses,
  selectedNurseId: undefined,
  nurses: [],
  rooms: makeFloorPlan(),
  preferences: [],
  nights: false,
  teams: makeTeams(),
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
    case Actions.toggleNights:
      return toggleNights(state, action.payload);
    case Actions.switchTeamBed:
      return switchTeamBed(state, action.payload);
    case Actions.switchTeamNurse:
      return switchTeamNurse(state, action.payload);
    default:
      return state;
  }
};

const addNurse = (state, payload: FENurse) => {
  const newNurses = state.nurses;
  newNurses.push(payload);

  state.teams[0]?.nurses.push(payload);

  return {
    ...state,
    nurses: newNurses,
  };
};

const removeNurse = (state: AppState, payload: {id: string}) => {
  const nurse = state.nurses.find((e) => e.id === payload.id);
  if (nurse) {
    state.teams.forEach((e) => {
      const i = e.nurses.indexOf(nurse);
      if (i !== -1) {
        e.nurses.splice(i, 1);
      }
    });
  } else {
    console.warn('removing a non-existent nurse');
  }
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
    if (bed.active) {
      const room =
        state.rooms.find((e) => e.beds.includes(bed)) || state.rooms[0];
      state.teams[selectTeamForRoom(room, state.nights)].beds.push(bed);
    }
    if (!bed.active) {
      state.teams.forEach((e) => {
        const i = e.beds.indexOf(bed);
        if (i !== -1) {
          e.beds.splice(i, 1);
        }
      });
    }
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

const toggleNights = (state: AppState, payload: undefined) => {
  return {
    ...state,
    nights: !state.nights,
  };
};

const switchTeamBed = (state: AppState, payload: {team: Team; bed: IBed}) => {
  const {team, bed} = payload;

  state.teams.forEach((e) => {
    const i = e.beds.indexOf(bed);
    e.beds.splice(i, 1);
  });

  team.beds.push(bed);
  return {
    ...state,
  };
};

const switchTeamNurse = (
  state: AppState,
  payload: {team: Team; nurse: FENurse},
) => {
  const {team, nurse} = payload;

  state.teams.forEach((e) => {
    const i = e.nurses.indexOf(nurse);
    e.nurses.splice(i, 1);
  });

  team.nurses.push(nurse);
  return {
    ...state,
  };
};
