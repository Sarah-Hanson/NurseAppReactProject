import {
  Card,
  Row,
  Spacer,
  TextBig,
  TextAdd,
  TextSmall,
  colors,
  ICardItem,
} from '../Common/common';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {nanoid} from 'nanoid';

export const AddItem = ({
  isPatient,
  onPress,
}: {
  isPatient: boolean;
  onPress(item: ICardItem): void;
}) => {
  const [name, onChangeName] = useState('Name');
  const [acuity, onChangeAcuity] = useState(isPatient ? 'Acuity' : undefined);
  const [room, onChangeRoom] = useState(isPatient ? 'Room' : undefined);

  return (
    <Card>
      <TextBig text={'Add '.concat(isPatient ? 'Patient' : 'Nurse')} />
      <Row>
        <TextInput
          style={[{marginLeft: '4%'}, sh.input]}
          onChangeText={(name) => onChangeName(name)}
        />

        {isPatient ? (
          <>
            <Spacer />
            <TextInput
              style={[{marginRight: '2%'}, sh.input]}
              onChangeText={(acuity) => onChangeAcuity(acuity)}
            />
          </>
        ) : null}
      </Row>
      <Row>
        {isPatient ? (
          <TextInput
            style={[{marginLeft: '4%'}, sh.input]}
            onChangeText={(room) => onChangeRoom(room)}
          />
        ) : null}
        <Spacer />
        <TouchableOpacity
          onPress={() =>
            onPress({
              name: name,
              room: room,
              acuity: acuity ? parseInt(acuity) : undefined,
              id: nanoid(),
            })
          }>
          <TextAdd text={'Add'} />
        </TouchableOpacity>
      </Row>
    </Card>
  );
};

const sh = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderBottomColor: colors.darker,

    width: '30%',
    marginBottom: '3%',
  },
});
