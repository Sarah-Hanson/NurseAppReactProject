import React from 'react';
import {Text} from 'react-native';
import {Card, ICardItem, Row, TextBig, TextSmall} from '../Common/common';
import Icon from 'react-native-vector-icons/FontAwesome';

export const CardItem = (contents: any) => {
  return (
    <Card>
      <Row>
        <TextBig>{contents.name}</TextBig>
        {contents.acuity && <TextSmall>{contents.acuity}</TextSmall>}
        {contents.room && <TextSmall>{contents.room}</TextSmall>}
      </Row>
    </Card>
  );
};

const GarbageIcon = ({onPress}: {onPress(): void}) => (
  <Icon name="rocket" size={30} color="#900" />
);
