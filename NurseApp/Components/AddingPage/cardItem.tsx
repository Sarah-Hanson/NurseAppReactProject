import React from 'react';
import {Card, ICardItem, Row, TextBig, TextSmall} from '../Common/common';
//import Icon from 'react-native-vector-icons/FontAwesome';
import {TouchableOpacity} from 'react-native';

export const CardItem = ({
  item,
  onPress,
}: {
  item: ICardItem;
  onPress(): void;
}) => {
  return (
    <Card>
      <Row>
        <TextBig>{item.name}</TextBig>
        {item.acuity && <TextSmall>{item.acuity}</TextSmall>}
        {item.room && <TextSmall>{item.room}</TextSmall>}
        <GarbageIcon onPress={() => onPress}></GarbageIcon>
      </Row>
    </Card>
  );
};

const GarbageIcon = (onPress: {onPress(): void}) => (
  <TouchableOpacity onPress={() => onPress}>
    <TextSmall>DEL</TextSmall>
  </TouchableOpacity>
);
{
  /*<Icon name="rocket" size={30} color="#900" />}*/
}
