import React, {useState} from 'react';
import {PageWrapper} from '../Common/PageWrapper';
import {Card, colors, Row, Spacer, TextBig, Title} from '../Common/common';
import {useStateValue} from '../StateProvider';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {INurse} from '../../../shared/types';
import {TextInput} from 'react-native-paper';
import {nanoid} from 'nanoid';
import {Actions} from '../ActionHandler';

export const NursePage = () => {
  // @ts-ignore
  const [{nurses}, dispatch] = useStateValue();

  const rmItem = (list: any, setList: any, index: number) => {
    list.splice(index, 1);
    const newList = [...list]; //force re-render since just mutating doesn't get picked up
    setList(newList);
  };

  return (
    <>
      <PageWrapper>
        <AddNurse />
        <ScrollView>
          {nurses.map((nurse) => (
            <NurseCard nurse={nurse} />
          ))}
        </ScrollView>
      </PageWrapper>
    </>
  );
};

const NurseCard = ({nurse}: {nurse: INurse}) => {
  // @ts-ignore
  const [{nurses}, dispatch] = useStateValue();

  return (
    <Card>
      <TouchableOpacity
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          paddingHorizontal: '5%',
        }}
        onPress={() =>
          dispatch({
            type: Actions.removeNurse,
            payload: {id: nurse.id},
          })
        }>
        <TextBig text={nurse.name} />
        <Spacer />
      </TouchableOpacity>
    </Card>
  );
};

const AddNurse = () => {
  // @ts-ignore
  const [state, dispatch] = useStateValue();
  const [name, onChangeName] = useState<string>('');
  const addNurse = () =>
    dispatch({
      type: Actions.addNurse,
      payload: {id: nanoid(), name, patients: []},
    });
  return (
    <View style={{marginVertical: '10%'}}>
      <Row>
        <TextInput
          mode={'flat'}
          label={'Add Nurse'}
          placeholder={'Name'}
          style={{flex: 1}}
          onChangeText={(name) => onChangeName(name)}
        />
        <TouchableOpacity
          onPress={() => addNurse()}
          style={{
            backgroundColor: colors.green,
            borderRadius: 400,
            height: 50,
            width: 50,
            marginLeft: '4%',
            justifyContent: 'center',
          }}>
          <Title text={'+'} />
        </TouchableOpacity>
      </Row>
    </View>
  );
};
