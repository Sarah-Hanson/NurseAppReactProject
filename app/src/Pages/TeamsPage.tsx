import {PageWrapper} from '../Common/PageWrapper';
import {useStateValue} from '../StateProvider';
import React from 'react';
import {Row, TextBig} from '../Common/common';

export const TeamsPage = () => {
  // @ts-ignore
  const [{nurses}, dispatch] = useStateValue();
  return (
    <PageWrapper>
      <Row>
        <TextBig text={`Nurses: ${nurses.length}`} />
        <TextBig text={`Patients: ${0}`} />
        <TextBig text={`Nights?`} />
      </Row>
    </PageWrapper>
  );
};
