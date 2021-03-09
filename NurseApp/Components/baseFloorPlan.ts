import {IRoom} from './shortestPath';

//Hardcoded floor-plan since this app has a single use case at the moment
export const makeFloorPlan = (): IRoom[] => {
  let rooms = new Map();

  const makeAdjacent = (room1: number, room2: number, distance: number) => {
    rooms.get('Room' + room1).adjacency.push({
      room: rooms.get('Room' + room2 + 1),
      distance: distance,
    });
  };
  const crossHallwayLink = (
    sideAStart: number,
    sideBStart: number,
    range: number,
    dist: number,
  ) => {
    const max = sideAStart + range;
    while (sideAStart < max) {
      makeAdjacent(sideAStart++, sideBStart--, dist);
    }
  };

  const makeRangeAdjacent = (start: number, end: number) => {
    for (let i = start; i < end; i++) {
      makeAdjacent(i, i + 1, 2);
    }
  };

  // Making all the rooms
  for (let i = 0; i < 29; i++) {
    rooms.set('Room' + i, {name: 'Room' + i, adjacency: []});
  }
  rooms.set('Room49', {name: 'Room49', adjacency: []});
  rooms.set('Room50', {name: 'Room50', adjacency: []});
  rooms.set('RoomOC', {name: 'RoomOC', adjacency: []});

  //Make all adjacencies
  makeRangeAdjacent(1, 9);
  makeRangeAdjacent(10, 16);
  makeRangeAdjacent(17, 23);
  makeRangeAdjacent(24, 26);
  makeRangeAdjacent(27, 29);
  // The "special" rooms
  makeAdjacent(49, 50, 2);
  makeAdjacent(24, 50, 2);
  // Hallway->Hallway Links
  makeAdjacent(9, 10, 5);
  makeAdjacent(16, 17, 5);
  makeAdjacent(23, 49, 5);
  makeAdjacent(1, 29, 10);
  // Cross hallway links
  crossHallwayLink(1, 8, 4, 3);
  makeAdjacent(29, 49, 3);
  makeAdjacent(28, 50, 3);
  makeAdjacent(27, 24, 3);

  return Array.from(rooms.values());
};
