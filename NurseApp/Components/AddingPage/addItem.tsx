import {
  Card,
  Row,
  Spacer,
  TextBig,
  TextAdd,
  TextSmall,
  colors,
} from '../Common/common';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';

class onPress {}

export const AddItem = ({
  isPatient,
  onPress,
}: {
  isPatient: boolean;
  onPress(): void;
}) => {
  const [name, onChangeName] = useState('Name');
  const [acuity, onChangeAcuity] = useState(isPatient ? 'Acuity' : undefined);
  const [room, onChangeRoom] = useState(isPatient ? 'Room' : undefined);

  return (
    <Card>
      <TextBig text={'Add '.concat(isPatient ? 'Nurse' : 'Patient')} />
      <Row>
        <TextInput
          style={[{marginLeft: '4%'}, sh.input]}
          placeholder={name}
          onChangeText={(name) => onChangeName(name)}
        />

        {isPatient ? (
          <>
            <Spacer />
            <TextInput
              style={[{marginRight: '2%'}, sh.input]}
              placeholder={acuity}
              onChangeText={(acuity) => onChangeAcuity(acuity)}
            />
          </>
        ) : null}
      </Row>
      <Row>
        {isPatient ? (
          <TextInput
            style={[{marginLeft: '4%'}, sh.input]}
            placeholder={room}
            onChangeText={(room) => onChangeRoom(room)}
          />
        ) : null}
        <Spacer />
        <TouchableOpacity onPress={() => onPress()}>
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
