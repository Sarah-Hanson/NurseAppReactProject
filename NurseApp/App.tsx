import 'react-native-get-random-values';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {Tabs} from './Components/AddingPage/Tabs';
import {MutableCardList} from './Components/AddingPage/mutableCardList';
import {nanoid} from 'nanoid';
import {AddingPage} from './Components/AddingPage/addingPage';

const App = () => {
  const rand = (x: number, y: number) => Math.floor(Math.random() * x) + y;

  const nurses = [
    {name: 'Nurse1', id: nanoid()},
    {name: 'Nurse2', id: nanoid()},
    {name: 'Nurse3', id: nanoid()},
  ];

  const preferences = [
    {nurse: 'Nurse1', patient: 'patient3', weight: 1, id: nanoid()},
    {nurse: 'Nurse3', patient: 'patient1', weight: 1, id: nanoid()},
  ];

  const generatePatients = (count: number) => {
    let patients = [];
    for (let i = 1; i < count + 1; i++) {
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
      <AddingPage
        nurses={nurses}
        patients={generatePatients(6)}
        preferences={preferences}
      />
    </SafeAreaView>
  );
};

export default App;
