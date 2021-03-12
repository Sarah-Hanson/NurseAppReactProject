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

export const AddNurse = ({
  list,
  setList,
}: {
  list: any[];
  setList(list: any[]): void;
}) => {
  const [name, onChangeName] = useState('Nurse');

  const addItem = (item: any) => {
    setList(list.concat(item));
  };

  return (
    <Card>
      <TextBig text={'Add Nurse'} />
      <Row>
        <TextInput
          value={name}
          style={[{marginLeft: '4%'}, sh.input]}
          onChangeText={(name) => onChangeName(name)}
        />
        <Spacer />
        <TouchableOpacity
          onPress={() =>
            addItem({
              name: name,
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
