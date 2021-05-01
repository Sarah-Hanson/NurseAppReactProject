import {NursePage} from '../Pages/nursePage';
import {ResultsPage} from '../Pages/resultsPage';
import React from 'react';
import {useStateValue} from '../StateProvider';
import {ErrorPage} from '../Pages/ErrorPage';

export enum Pages {
  teams = 'Teams',
  rooms = 'Rooms',
  nurses = 'Nurses',
  settings = 'Settings',
  results = 'Results,',
  error = 'Error',
}

export const Navigator = () => {
  // @ts-ignore
  const [{page}, dispatch] = useStateValue();

  //console.warn('Page:', page);

  switch (page) {
    case Pages.nurses:
      return <NursePage />;
    case Pages.results:
      return <ResultsPage />;
    default:
      return <ErrorPage />;
  }
};
