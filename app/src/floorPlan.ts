import {nanoid} from 'nanoid';

export interface Room {
  name: string;
  beds: IBed[];
}
export interface IBed {
  name: string;
  active: boolean;
  acuity: number;
  id: string;
}

export const makeFloorPlan = (): Room[] => {
  const rooms = new Map();

  const setRoomBeds = (roomIndex: string, beds: number): void => {
    const room = rooms.get('Room' + roomIndex);
    for (let i = 0; i < beds; i++) {
      room.beds.push({
        name: `Bed ${i + 1}`,
        active: false,
        id: nanoid(),
        acuity: 0,
      });
    }
  };
  // Making all the rooms
  for (let i = 1; i < 30; i++) {
    rooms.set('Room' + i, {name: 'Room' + i, beds: []});
  }
  rooms.set('Room49', {name: 'Room49', beds: []});
  rooms.set('Room50', {name: 'Room50', beds: []});
  rooms.set('RoomOC', {name: 'RoomOC', beds: []});

  const oneBedRooms = [
    '5',
    '7',
    '8',
    '11',
    '12',
    '13',
    '14',
    '15',
    '16',
    '18',
    '19',
    '20',
    '21',
    '22',
    '23',
    '26',
    '27',
    '49',
    '50',
    'OC',
  ];
  const twoBedRooms = ['1', '2', '3', '4', '6', '9', '10', '24', '25', '28'];
  const threeBedRooms = ['17', '29'];
  for (const room of oneBedRooms) {
    setRoomBeds(room, 1);
  }
  for (const room of twoBedRooms) {
    setRoomBeds(room, 2);
  }
  for (const room of threeBedRooms) {
    setRoomBeds(room, 3);
  }

  return Array.from(rooms.values());
};

export const selectTeamForRoom = (room: Room, nights): number => {
  if (room.name === 'RoomOC') {
    return 0;
  }
  // @ts-ignore
  const roomNumber = parseInt(room.name.match(/\d+$/)[0], 10);
  if (!nights) {
    if (roomNumber <= 6) {
      return 0;
    } else if (roomNumber <= 16) {
      return 1;
    } else if (roomNumber <= 22) {
      return 2;
    } else if (roomNumber <= 50) {
      return 3;
    }
  } else {
    if (roomNumber <= 9) {
      return 0;
    } else if (roomNumber <= 22) {
      return 1;
    } else if (roomNumber <= 50) {
      return 2;
    }
  }
  return 0;
};
