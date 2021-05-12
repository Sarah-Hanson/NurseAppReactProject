import React from 'react';
import {Nurse} from '../../../shared/types';
import {PageWrapper} from '../Common/PageWrapper';
import {Text} from 'react-native-paper';
import {useStateValue} from '../StateProvider';
import {Card, Row, Spacer, TextBig, TextSmall} from '../Common/common';
import {View} from 'react-native';

const getAcuity = (nurse: Nurse) => {
  return nurse.patients.length > 0
    ? nurse.patients
        .map((patient) => patient.acuity)
        .reduce((sum, curr) => sum + curr)
    : 0;
};

export const ResultsPage = () => {
  // @ts-ignore
  const [{results}, dispatch] = useStateValue();

  return (
    <PageWrapper>
      {results.map((team) => (
        <TeamResults team={team} />
      ))}
    </PageWrapper>
  );
};

const TeamResults = ({team}) => (
  <>
    <TextBig text={'Team'} />
    {team.map((nurse) => (
      <NurseCard nurse={nurse} />
    ))}
  </>
);

const NurseCard = ({nurse}) => (
  <Card>
    <Row>
      <TextBig text={nurse.name} />
      <TextBig text={`Acuity: ${getAcuity(nurse)}`} />
    </Row>
    {nurse.patients.map((patient) => (
      <PatientItem patient={patient} />
    ))}
  </Card>
);

const PatientItem = ({patient}) => (
  <Row>
    <TextSmall text={'Patient: '} />
    <TextSmall text={patient.id} />
    <Spacer />
    <TextSmall text={'Acuity: '} />
    <TextSmall text={patient.acuity} />
  </Row>
);
