import {Card, Row, Spacer, TextBig, TextSmall} from '../Common/common';
import React, {useState} from 'react';
import {TextInput} from 'react-native';

export const CardItem = ({isPatient}: {isPatient: boolean}) => {
  const [name, onChangeName] = useState('Name');
  const [acuity, onChangeAcuity] = useState(isPatient ? 'Acuity' : undefined);
  const [room, onChangeRoom] = useState(isPatient ? 'Room' : undefined);

  return (
    <Card>
      <TextBig>Add {isPatient ? 'Nurse' : 'Patient'}</TextBig>
      <Row>
        <TextInput
          placeholder={name}
          onChangeText={(name) => onChangeName(name)}
        />
        {isPatient && (
          <TextInput
            placeholder={acuity}
            onChangeText={(acuity) => onChangeAcuity(acuity)}
          />
        )}
        <Spacer />
      </Row>
      <Row>
        {isPatient && (
          <TextInput
            placeholder={room}
            onChangeText={(room) => onChangeRoom(room)}
          />
        )}
      </Row>
    </Card>
  );
};
