import {useStateValue} from '../StateProvider';
import {PageWrapper} from '../Common/PageWrapper';
import {Card, colors, Row, Spacer, TextBig, TextSmall} from '../Common/common';
import React from 'react';
import {Room} from '../floorPlan';
import {ScrollView, TextInput, View} from 'react-native';

export const RoomsPage = () => {
  // @ts-ignore
  const [{rooms}, dispatch] = useStateValue();

  return (
    <PageWrapper>
      <ScrollView>
        {rooms.map((r) => (
          <RoomCard room={r} key={r.name} />
        ))}
      </ScrollView>
    </PageWrapper>
  );
};

const RoomCard = ({room}: {room: Room}) => {
  return (
    <Card>
      <TextBig text={room.name} />
      <View style={{marginHorizontal: '5%'}}>
        {room.beds.map((bed) => (
          <Row key={bed.id}>
            <Box />
            <TextSmall text={bed.name} style={{width: '20%'}} />
            <TextInput placeholder={'Acuity'} style={{flex: 1, height: 20}} />
            <Spacer />
          </Row>
        ))}
      </View>
    </Card>
  );
};

const Box = () => (
  <View
    style={{
      height: 15,
      width: 15,
      borderColor: colors.white,
      borderWidth: 2,
      borderRadius: 1,
    }}
  />
);
