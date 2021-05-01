import {NursePage} from '../Pages/nursePage';
import {ResultsPage} from '../Pages/resultsPage';
import React from 'react';
import {useStateValue} from '../StateProvider';
import {ErrorPage} from '../Pages/ErrorPage';
import {TeamsPage} from '../Pages/TeamsPage';
import {RoomsPage} from '../Pages/RoomsPage';
import {Pages} from '../Common/Enums';

export const Navigator = () => {
  // @ts-ignore
  const [{page}, dispatch] = useStateValue();

  //console.warn('Page:', page);
  switch (page) {
    case Pages.nurses:
      return <NursePage />;
    case Pages.results:
      return <ResultsPage />;
    case Pages.teams:
      return <TeamsPage />;
    case Pages.rooms:
      return <RoomsPage />;
    default:
      return <ErrorPage />;
  }
};
