import {MutableCardList} from './mutableCardList';
import {Tabs} from './Tabs';
import React, {useState} from 'react';
import {CardItem} from './cardItem';
import {colors, Spacer, TextBig, TextSmall} from '../common';
import {AddPatient} from './addPatient';
import {AddNurse} from './addNurse';
import {AddPreference} from './addPreference';
import {Alert, TouchableOpacity, View} from 'react-native';
import axios from 'axios';

export const AddingPage = ({
  nurses,
  patients,
  preferences,
  changeResults,
}: {
  nurses?: {name: string; id: string}[];
  patients?: {name: string; room: string; acuity: number; id: string}[];
  preferences?: {nurse: string; patient: string; weight: number; id: string}[];
  changeResults(results: any): any;
}) => {
  const [nurseList, setNurse] = useState(nurses ? nurses : []);
  const [patientList, setPatient] = useState(patients ? patients : []);
  const [preferenceList, setPreference] = useState(
    preferences ? preferences : [],
  );

  const rmItem = (list: any, setList: any, index: number) => {
    list.splice(index, 1);
    const newList = [...list]; //force re-render since just mutating doesn't get picked up
    setList(newList);
  };

  const submitList = () => {
    console.log('**Submit Pressed**');
    axios
      .post('/schedule', {
        nurses: nurseList,
        patients: patientList,
        preferences: preferenceList,
      })
      .then((res) => {
        Alert.alert('Server called, and working on the problem');
        console.warn(res.data);
      })
      .catch((e) => console.log('Error: ' + e.message + ' res ' + e.data));
  };

  const getList = () => {
    axios.get('/schedule').then((res) => {
      let results = res.data;
      if (results?.status !== 'pending') {
        changeResults(results);
      } else {
        Alert.alert('Pending Please try again later');
      }
    });
  };

  return (
    <>
      <Tabs
        tabs={[
          {
            name: 'Nurses',
            tabComponent: (
              <MutableCardList
                key={'Nurses'}
                items={nurseList.map((nurse, index) => (
                  <CardItem
                    key={nurse.id}
                    index={index}
                    onPress={() => rmItem(nurseList, setNurse, index)}>
                    <TextBig text={nurse.name} />
                    <Spacer />
                  </CardItem>
                ))}
                addComponent={<AddNurse list={nurseList} setList={setNurse} />}
              />
            ),
          },
          {
            name: 'Patients',
            tabComponent: (
              <MutableCardList
                key={'Patients'}
                items={patientList.map((patient, index) => (
                  <CardItem
                    key={patient.id}
                    index={index}
                    onPress={() => rmItem(patientList, setPatient, index)}>
                    <TextBig text={patient.name} />
                    <Spacer />
                    <TextSmall text={'Acuity:' + patient.acuity} />
                    <TextSmall text={patient.room} />
                    <Spacer />
                  </CardItem>
                ))}
                addComponent={
                  <AddPatient list={patientList} setList={setPatient} />
                }
              />
            ),
          },
          {
            name: 'Preferences',
            tabComponent: (
              <MutableCardList
                key={'Preferences'}
                items={preferenceList.map((preference, index) => (
                  <CardItem
                    key={preference.id}
                    index={index}
                    onPress={() =>
                      rmItem(preferenceList, setPreference, index)
                    }>
                    <TextBig text={preference.nurse} />
                    <TextBig text={preference.patient} />
                    <Spacer />
                    <TextSmall text={'Weight:' + preference.weight} />
                    <Spacer />
                  </CardItem>
                ))}
                addComponent={
                  <AddPreference
                    list={preferenceList}
                    setList={setPreference}
                  />
                }
              />
            ),
          },
        ]}
      />
      <View
        style={{
          flexDirection: 'row',
          height: '10%',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <TouchableOpacity
          style={{
            height: 30,
            backgroundColor: colors.orange,
            borderRadius: 15,
            justifyContent: 'center',
            marginLeft: '10%',
          }}
          onPress={() => submitList()}>
          <TextBig text={'Calculate!'} />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 30,
            backgroundColor: colors.orange,
            borderRadius: 15,
            justifyContent: 'center',
            marginRight: '10%',
          }}
          onPress={() => getList()}>
          <TextBig text={'Get Results!'} />
        </TouchableOpacity>
      </View>
    </>
  );
};
