import React from 'react';
import {Nurse} from '../../../shared/types';
import {PageWrapper} from '../Common/PageWrapper';
import {Text} from 'react-native-paper';

export const ResultsPage = () => {
  const getAcuity = (nurse: Nurse) => {
    return nurse.patients.length > 0
      ? nurse.patients
          .map((patient) => patient.acuity)
          .reduce((sum, curr) => sum + curr)
      : 0;
  };
  return (
    <PageWrapper>
      <Text>Results Page</Text>
    </PageWrapper>
  );
};
