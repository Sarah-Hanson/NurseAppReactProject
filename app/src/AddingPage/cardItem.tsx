import React from 'react';
import {Card, Row, TextDel} from '../Common/common';
import {TouchableOpacity} from 'react-native';

export const CardItem = ({
  index,
  onPress,
  children,
}: {
  index: number;
  onPress(index: number): void;
  children: any;
}) => {
  return (
    <Card>
      <Row>
        {children}
        <GarbageIcon index={index} onPress={onPress} />
      </Row>
    </Card>
  );
};

const GarbageIcon = ({
  onPress,
  index,
}: {
  onPress(index: number): void;
  index: number;
}) => (
  <TouchableOpacity onPress={() => onPress(index)}>
    <TextDel text={'DEL'} />
  </TouchableOpacity>
);
