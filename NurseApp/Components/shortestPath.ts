export interface IRoom {
  name: string;
  adjacency: IRoom[];
}
interface IResult {
  final: Boolean;
  distance: number;
}

export const FindPathDist = (start: IRoom, target: IRoom): number => {
  const o = PathDistance({current: start, target: target, visited: []});
  if (o.final) return o.distance;
  else return Number.MIN_SAFE_INTEGER;
};

const PathDistance = (input: {
  current: IRoom;
  target: IRoom;
  visited: IRoom[];
}): IResult => {
  // Exit case, if the target is the current node you made it!
  if (input.current === input.target) {
    return {final: true, distance: 0};
  } else {
    let shortestDistance = Number.MAX_SAFE_INTEGER; // Any path found "should" have a distance that is shorter than then overflow of an int
    let nodeDistance = -1;
    let success = false;
    // Check each adjacent room for a path
    for (let room of input.current.adjacency) {
      let newInput = input; // TODO make new object method
      newInput.current = room;
      newInput.visited.push(input.current);
      let o = PathDistance(newInput);
      // If the path is found and is shorter than current path it is the new path
      if (o.final && o.distance < shortestDistance) {
        shortestDistance = o.distance;
        success = true;
      }
    }
    return {final: success, distance: shortestDistance + nodeDistance};
  }
};
