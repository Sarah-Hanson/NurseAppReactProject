import {MutableCardList} from './mutableCardList';
import {Tabs} from './Tabs';
import React, {useState} from 'react';
import {CardItem} from './cardItem';
import {Spacer, TextBig, TextSmall} from '../Common/common';
import {AddPatient} from './addPatient';
import {AddNurse} from './addNurse';
import {AddPreference} from './addPreference';

export const AddingPage = ({
  nurses,
  patients,
  preferences,
}: {
  nurses: {name: string; id: string}[];
  patients: {name: string; room: string; acuity: number; id: string}[];
  preferences: {nurse: string; patient: string; weight: number; id: string}[];
}) => {
  const [nurseList, setNurse] = useState(nurses);
  const [patientList, setPatient] = useState(patients);
  const [preferenceList, setPreference] = useState(preferences);

  const rmItem = (list: any, setList: any, index: number) => {
    list.splice(index, 1);
    const newList = [...list]; //force re-render since just mutating doesn't get picked up
    setList(newList);
  };

  return (
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
                  onPress={() => rmItem(nurseList, setNurse, index)}>
                  <TextBig text={preference.nurse} />
                  <TextBig text={preference.patient} />
                  <Spacer />
                  <TextSmall text={'Weight:' + preference.weight} />
                  <Spacer />
                </CardItem>
              ))}
              addComponent={
                <AddPreference list={preferences} setList={setPreference} />
              }
            />
          ),
        },
      ]}
    />
  );
};
