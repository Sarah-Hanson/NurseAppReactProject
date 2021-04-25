import {nanoid} from 'nanoid';

const rand = (x: number, y: number) => Math.floor(Math.random() * x) + y;

export const nurses = [
  {name: 'Nurse1', id: nanoid()},
  {name: 'Nurse2', id: nanoid()},
  {name: 'Nurse3', id: nanoid()},
];

export const preferences = [
  {nurse: 'Nurse1', patient: 'patient13', weight: 5, id: nanoid()},
  {nurse: 'Nurse1', patient: 'patient10', weight: 5, id: nanoid()},
  {nurse: 'Nurse1', patient: 'patient7', weight: 5, id: nanoid()},
  {nurse: 'Nurse1', patient: 'patient5', weight: 5, id: nanoid()},
  {nurse: 'Nurse1', patient: 'patient3', weight: 5, id: nanoid()},
  {nurse: 'Nurse3', patient: 'patient14', weight: 5, id: nanoid()},
  {nurse: 'Nurse3', patient: 'patient12', weight: 5, id: nanoid()},
];

export const generatePatients = (count: number, startingIndex = 0) => {
  let patients = [];
  for (let i = startingIndex; i < count + startingIndex + 1; i++) {
    patients.push({
      name: 'patient' + i,
      acuity: rand(3, 3),
      room: 'Room' + Math.floor((i + 1) / 2),
      id: nanoid(),
    });
  }
  return patients;
};

export const generateIPatients = (count: number, startingIndex = 0) => {
  let patients = [];
  for (let i = startingIndex; i < count + startingIndex + 1; i++) {
    patients.push({
      name: 'patient' + i,
      acuity: rand(5, 1),
      room: {name: 'room' + Math.floor(i / 2)},
      id: nanoid(),
    });
  }
  return patients;
};

export const generateResults = (count: number) => {
  let results = [];
  for (let i = 1; i < count + 1; i++) {
    results.push({
      name: 'nurse' + i,
      patients: generateIPatients(rand(5, 2)),
      id: nanoid(),
    });
  }
  return results;
};
