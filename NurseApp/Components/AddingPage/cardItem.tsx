import React from 'react';
import {
  Card,
  ICardItem,
  Row,
  Spacer,
  TextBig,
  TextDel,
  TextSmall,
} from '../Common/common';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

export const CardItem = ({
  item,
  index,
  onPress,
}: {
  item: ICardItem;
  index: number;
  onPress(index: number): void;
}) => {
  return (
    <Card>
      <Row>
        <TextBig text={item.name} />
        {item.acuity ? <Spacer /> : null}
        {item.acuity ? <TextSmall text={'Acuity:' + item.acuity} /> : null}
        {item.room ? <TextSmall text={item.room} /> : null}
        {item.acuity ? null : <Spacer />}
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
