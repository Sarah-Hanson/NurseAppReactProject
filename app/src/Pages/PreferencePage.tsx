import {useStateValue} from '../StateProvider';
import {FENurse, FEPreference, IRoom} from '../../../shared/types';
import {TouchableOpacity, View} from 'react-native';
import {
  colors,
  HorizontalRule,
  Row,
  Spacer,
  TextBig,
  TextSmall,
  Title,
} from '../Common/common';
import {IBed, Room} from '../floorPlan';
import {Actions} from '../Common/Enums';
import React from 'react';

export const PreferencePage = () => {
  // @ts-ignore
  const [{nurses, rooms, selectedNurseId}, dispatch] = useStateValue();
  const selectedNurse: FENurse = nurses.find((e) => e.id === selectedNurseId);
  return (
    <View style={{height: '100%', width: '100%'}}>
      <View
        style={{
          height: '100%',
          width: '80%',
          alignSelf: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <Title
            text={`${selectedNurse.name}'s Preferences`}
            style={{alignSelf: 'flex-start'}}
          />
          <Spacer />
        </View>
        <HorizontalRule />
        <LabelRow />
        {rooms.map((room: Room) =>
          room.beds.map(
            (bed: IBed) =>
              bed.active && <BedItem room={room} bed={bed} key={bed.id} />,
          ),
        )}
        <Spacer />
        <TouchableOpacity
          onPress={() =>
            dispatch({
              type: Actions.selectNurse,
              payload: {id: undefined},
            })
          }
          style={{marginBottom: '10%'}}>
          <TextBig text={'Go Back'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const BedItem = ({room, bed}: {room: IRoom; bed: IBed}) => {
  // @ts-ignore
  const [{preferences, selectedNurseId}, dispatch] = useStateValue();
  const bedPref: FEPreference = preferences.find(
    (e) => e.nurseId === selectedNurseId && e.bedId === bed.id,
  );
  // 5, 0, -5
  const setPreference = (val: number) => {
    if (bedPref && val === 0) {
      dispatch({
        type: Actions.removePreference,
        payload: bedPref,
      });
    } else if (bedPref) {
      dispatch({
        type: Actions.setPreference,
        payload: {pref: bedPref, val},
      });
    } else {
      dispatch({
        type: Actions.addPreference,
        payload: {weight: val, nurseId: selectedNurseId, bedId: bed.id},
      });
    }
  };

  return (
    <Row>
      <TextBig
        text={room.name + ' - ' + bed.name.split(' ')[1]}
        style={{width: '50%'}}
      />
      <Spacer />
      <Box
        isSet={bedPref?.weight < 0}
        bed={bed}
        onPress={() => setPreference(-5)}
      />
      <Box isSet={!bedPref} bed={bed} onPress={() => setPreference(0)} />
      <Box
        isSet={bedPref?.weight > 0}
        bed={bed}
        onPress={() => setPreference(5)}
      />
      <Spacer />
    </Row>
  );
};

const Box = ({
  isSet,
  bed,
  onPress,
}: {
  isSet: boolean;
  bed: IBed;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      style={{
        height: 15,
        width: 15,
        borderColor: colors.white,
        borderWidth: 2,
        borderRadius: 1,
        backgroundColor: isSet ? colors.white : colors.black,
        marginHorizontal: '5%',
      }}
      onPress={() => onPress()}
    />
  );
};

const LabelRow = () => {
  return (
    <Row>
      <View
        style={{
          width: '55%',
        }}
      />
      <Spacer />
      <TextBig text={'-'} style={{color: colors.red, marginHorizontal: '5%'}} />
      <TextBig
        text={'='}
        style={{color: colors.white, marginHorizontal: '5%'}}
      />
      <TextBig
        text={'+'}
        style={{color: colors.green, marginHorizontal: '5%'}}
      />
      <Spacer />
    </Row>
  );
};
