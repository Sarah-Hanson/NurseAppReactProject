import React from 'react';
import {Text} from 'react-native';
import {Card, Row, TextBig, TextSmall} from '../Common/common';

interface ICardItem {
  name: string;
  acuity?: number;
  room?: string;
}

export const CardItem = ({name, acuity, room}: ICardItem) => {
  return (
    <Card>
      <Row>
        <TextBig>name</TextBig>
        {acuity && <TextSmall>acuity</TextSmall>}
        {room && <TextSmall>room</TextSmall>}
      </Row>
    </Card>
  );
};
