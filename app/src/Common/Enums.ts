export enum Pages {
  teams = 'Teams',
  rooms = 'Rooms',
  nurses = 'Nurses',
  settings = 'Settings',
  results = 'Results,',
  error = 'Error',
}

export enum Actions {
  changePage = 'changePage',
  addNurse = 'addNurse',
  removeNurse = 'removeNurse',
  incrementAcuity = 'incrementAcuity',
  decrementAcuity = 'decrementAcuity',
  toggleBed = 'toggleRoom',
  selectNurse = 'selectNurse',
  addPreference = 'addPreference',
  removePreference = 'removePreference',
  setPreference = 'setPreference',
  toggleNights = 'toggleNights',
  switchTeamBed = 'switchTeamBed',
  switchTeamNurse = 'switchTeamNurse',
  setResults = 'setResults',
}
