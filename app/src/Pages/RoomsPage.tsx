import {useStateValue} from '../StateProvider';
import {PageWrapper} from '../Common/PageWrapper';
import {
  Box,
  Card,
  colors,
  Row,
  Spacer,
  TextBig,
  TextSmall,
} from '../Common/common';
import React from 'react';
import {Room} from '../floorPlan';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Actions} from '../Common/Enums';
import {IBed} from '../../../shared/types';

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
          <BedLine roomId={room.name} bed={bed} key={bed.id} />
        ))}
      </View>
    </Card>
  );
};

const BedLine = ({roomId, bed}: {roomId: string; bed: IBed}) => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();

  return (
    <Row key={bed.id}>
      <Box
        isSet={bed.active}
        onPress={() =>
          dispatch({
            type: Actions.toggleBed,
            payload: {roomId, bedId: bed.id},
          })
        }
      />
      <TextSmall text={bed.name} style={{width: '20%'}} />
      <TextSmall text={'Acuity:'} style={{width: '20%'}} />
      <TouchableOpacity
        onPress={() =>
          dispatch({
            type: Actions.decrementAcuity,
            payload: {roomId, bedId: bed.id},
          })
        }>
        <TextSmall text={'-'} style={{color: colors.red}} />
      </TouchableOpacity>
      <TextSmall text={bed.acuity.toString()} />
      <TouchableOpacity
        onPress={() =>
          dispatch({
            type: Actions.incrementAcuity,
            payload: {roomId, bedId: bed.id},
          })
        }>
        <TextSmall text={'+'} style={{color: colors.green}} />
      </TouchableOpacity>
      <Spacer />
    </Row>
  );
};
