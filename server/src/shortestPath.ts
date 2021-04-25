import { IPathResult, IRoom } from "../../shared/types";

const copyInput = (input: {
  current: IRoom;
  target: IRoom;
  visited: IRoom[];
}) => {
  return {
    current: input.current,
    target: input.target,
    visited: [...input.visited],
  };
};

export const FindPathDist = (
  start: IRoom | undefined,
  target: IRoom | undefined
): number => {
  if (start === undefined || target === undefined) {
    return Number.MIN_SAFE_INTEGER;
  }
  const o = PathDistance({ current: start, target: target, visited: [] });
  if (o.final) return o.distance;
  else return Number.MIN_SAFE_INTEGER;
};

const PathDistance = (input: {
  current: IRoom;
  target: IRoom;
  visited: IRoom[];
}): IPathResult => {
  // Exit case, if the target is the current node you made it!
  if (input.current === input.target) {
    return { final: true, distance: 0 };
  } else {
    let shortestDistance = Number.MAX_SAFE_INTEGER; // Any path found "should" have a distance that is shorter than then overflow of an int
    let nodeDistance = -1;
    let success = false;
    // Check each adjacent room for a path
    if (input.current.adjacency.length > 0) {
      for (let adjacency of input.current.adjacency) {
        let newInput = copyInput(input);
        newInput.current = adjacency.room;
        newInput.visited.push(input.current);
        let o = PathDistance(newInput);
        // If the path is found and is shorter than current path it is the way
        if (o.final && o.distance < shortestDistance) {
          shortestDistance = o.distance;
          nodeDistance = adjacency.distance;
          success = true;
        }
      }
    }
    //else {
    //   console.log('undefined adjacency');
    // }
    return { final: success, distance: shortestDistance + nodeDistance };
  }
};
