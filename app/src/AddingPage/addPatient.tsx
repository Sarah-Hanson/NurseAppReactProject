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

export const AddPatient = ({
  list,
  setList,
}: {
  list: any[];
  setList(list: any[]): void;
}) => {
  const [name, onChangeName] = useState('Name');
  const [acuity, onChangeAcuity] = useState('Acuity');
  const [room, onChangeRoom] = useState('Room');

  const addItem = (item: any) => {
    setList(list.concat(item));
  };

  return (
    <Card>
      <TextBig text={'Add Patient'} />
      <Row>
        <TextInput
          value={name}
          style={[{marginLeft: '4%'}, sh.input]}
          onChangeText={(name) => onChangeName(name)}
          placeholder={'name'}
        />
        <Spacer />
        <TextInput
          value={acuity}
          style={[{marginRight: '2%'}, sh.input]}
          onChangeText={(acuity) => onChangeAcuity(acuity)}
          placeholder={'acuity'}
        />
      </Row>
      <Row>
        <TextInput
          value={room}
          style={[{marginLeft: '4%'}, sh.input]}
          onChangeText={(room) => onChangeRoom(room)}
          placeholder={'room'}
        />
        <Spacer />
        <TouchableOpacity
          onPress={() =>
            addItem({
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
