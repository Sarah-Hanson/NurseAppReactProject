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

export const CardItem = ({item, onRm}: {item: ICardItem; onRm(): void}) => {
  return (
    <Card>
      <Row>
        <TextBig text={item.name} />
        {item.acuity ? <Spacer /> : null}
        {item.acuity ? <TextSmall text={'Acuity:' + item.acuity} /> : null}
        {item.room ? <TextSmall text={item.room} /> : null}
        {item.acuity ? null : <Spacer />}
        <GarbageIcon onRm={() => onRm} />
      </Row>
    </Card>
  );
};

const GarbageIcon = ({onRm}: {onRm(): void}) => (
  <TouchableOpacity onPress={() => onRm}>
    <TextDel text={'DEL'} />
  </TouchableOpacity>
);
