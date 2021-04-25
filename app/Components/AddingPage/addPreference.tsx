import {
  Card,
  Row,
  Spacer,
  TextBig,
  TextAdd,
  TextSmall,
  colors,
  ICardItem,
} from '../common';
import React, {useState} from 'react';
import {StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import {nanoid} from 'nanoid';

export const AddPreference = ({
  list,
  setList,
}: {
  list: any[];
  setList(list: any[]): void;
}) => {
  const [nurse, onChangeNurse] = useState<string>('Nurse');
  const [patient, onChangePatient] = useState<string>('Patient');
  const [weight, onChangeWeight] = useState<string>('0');

  const addItem = (item: any) => {
    setList(list.concat(item));
  };

  return (
    <Card>
      <TextBig text={'Add Preference'} />
      <Row>
        <TextInput
          value={nurse}
          style={[{marginLeft: '4%'}, sh.input]}
          onChangeText={(nurse) => onChangeNurse(nurse)}
        />
        <Spacer />
        <TextInput
          value={patient}
          style={[{marginLeft: '4%'}, sh.input]}
          onChangeText={(patient) => onChangePatient(patient)}
        />
      </Row>
      <Row>
        <TextInput
          value={weight.toString()}
          style={[{marginLeft: '4%'}, sh.input]}
          onChangeText={(weight) => onChangeWeight(weight)}
        />
        <Spacer />
        <TouchableOpacity
          onPress={() =>
            addItem({
              nurse: nurse,
              patient: patient,
              weight: parseInt(weight),
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
