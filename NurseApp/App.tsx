import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Tabs} from './Components/AddingPage/Tabs';
import {MutableCardList} from './Components/AddingPage/mutableCardList';
import {nanoid} from 'nanoid';

const App = () => {
  const nurses = [
    {name: 'Nurse1', id: nanoid()},
    {name: 'Nurse2', id: nanoid()},
    {name: 'Nurse3', id: nanoid()},
  ];
  const rand = (x: number, y: number) => Math.floor(Math.random() * x) + y;
  const generatePatients = (count: number) => {
    let patients = [];
    for (let i = 0; i < count; i++) {
      patients.push({
        name: 'patient' + i,
        acuity: rand(5, 1),
        room: 'room' + Math.floor(i / 2),
        id: nanoid(),
      });
    }
    return patients;
  };

  return (
    <SafeAreaView
      style={{
        flexDirection: 'column',
        alignItems: 'center',
      }}>
      <Tabs
        tabs={[
          {
            name: 'Nurses',
            tabComponent: (
              <MutableCardList key={'Nurses'} initialList={nurses} />
            ),
          },
          {
            name: 'Patients',
            tabComponent: (
              <MutableCardList
                key={'Patients'}
                initialList={generatePatients(8)}
              />
            ),
          },
        ]}
      />
    </SafeAreaView>
  );
};

export default App;
