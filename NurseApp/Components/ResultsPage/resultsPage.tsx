import {ScrollView} from 'react-native';
import React from 'react';
import {INurse} from '../assignator';
import {Card, Row, Spacer, TextBig} from '../common';

export const resultsPage = ({list}: {list: INurse[]}) => {
  return (
    <ScrollView>
      {list.map((result) => (
        <Card>
          <Row>
            <TextBig text={result.name} />
            <Spacer />
            <TextBig text={'Acuity'} />
          </Row>

          <Row>
            <TextBig text={''} />
          </Row>
        </Card>
      ))}
    </ScrollView>
  );
};
