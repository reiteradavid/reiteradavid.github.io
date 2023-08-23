let debug = true;
let permutation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
class CoordinatePair {
  constructor(y, x) {
    this.y = y;
    this.x = x;
  }
}
function generateVariableSetup() {

  nextSquare = 1;
  nextSquareLocation = 0;
  forbiddenCoordsAP = [];
  let currentRowOrColumnReady = false;
  ReadyToCompleteLeft = -1;
  currentStage = -1;
  BL = 4;
  lengthH = BL;
  startIncluding = new CoordinatePair(0, -1);
  stage7TopRight = false;
  stage7LeftBottom = false;
  S7trStep = 0;
  S7lbStep = 0;
  firstTimeStage7 = true;
  S7EmptyInTheRightSpotOrWas = false;
  emptyGettingPutInPosition = false;
  S7Step = 0;
  firstTimeStage5 = true;
  stage5TopRight = false;
  stage5LeftBottom = false;
  S5EmptyInTheRightSpotOrWas = false;
  S5Step = 0;
  completeCoordsForbidden = [];
  tempSet = false;
  solveTheOtherWay = false;
}
function swapWithEmpty(c) {
  debug || console.log("swapping:" + "(" + c.x + "," + c.y + ")");
  let empty = new CoordinatePair(-99, -99);
  if (c.x > 0 && permutation[4 * c.y + c.x - 1] === 0) {
    empty.y = c.y;
    empty.x = c.x - 1;
  } else if (c.x < 3 && permutation[4 * c.y + c.x + 1] === 0) {
    empty.y = c.y;
    empty.x = c.x + 1;
  } else if (c.y > 0 && permutation[4 * c.y + c.x - 4] === 0) {
    empty.y = c.y - 1;
    empty.x = c.x;

  } else if (c.y < 3 && permutation[4 * c.y + c.x + 4] === 0) {
    empty.y = c.y + 1;
    empty.x = c.x;
  } else {
    console.log("Error:Not near empty!");
    debugger;
  }
  permutation[empty.y * 4 + empty.x] = permutation[c.y * 4 + c.x];
  permutation[c.y * 4 + c.x] = 0;
}
let nextSquare = 1;
let nextSquareLocation = 0;
let forbiddenCoordsAP = [];
let order = [
  [2, 1, 3, 4],
  [9, 5, 13],
  [6, 8, 7],
  [14, 10]
];
let orderLocation = [
  [new CoordinatePair(0, 0), new CoordinatePair(1, 0), new CoordinatePair(0, 1), new CoordinatePair(0, 2)],
  [new CoordinatePair(1, 0), new CoordinatePair(1, 1), new CoordinatePair(2, 0)],
  [new CoordinatePair(1, 1), new CoordinatePair(3, 3), new CoordinatePair(2, 2)],
  [new CoordinatePair(2, 1), new CoordinatePair(2, 2)]
];
let emptyLocationForReadyToCompleteTransferForEachStage = [new CoordinatePair(0, 3), new CoordinatePair(3, 0), new CoordinatePair(1, 3), new CoordinatePair(3, 1)];
let currentRowOrColumnReady = false;
let ReadyToCompleteLeft = -1;
let currentStage = -1;
let BL = 4;
let lengthH = BL;
let startIncluding = new CoordinatePair(0, -1);
let stage7TopRight = false;
let stage7LeftBottom = false;
const S7TopRightSwapWithCP = [
  new CoordinatePair(3, 3),
  new CoordinatePair(2, 3),
  new CoordinatePair(2, 2),
  new CoordinatePair(2, 1),
  new CoordinatePair(3, 1),
  new CoordinatePair(3, 2),
  new CoordinatePair(3, 3),
  new CoordinatePair(2, 3),
  new CoordinatePair(2, 2),
  new CoordinatePair(2, 1),
  new CoordinatePair(3, 1),
  new CoordinatePair(3, 2)
];
const S7LeftBottomSwapWithCP = [//MAKE EMPTY AT 2,3
  new CoordinatePair(3, 3), new CoordinatePair(3, 2),
  new CoordinatePair(2, 2),
  new CoordinatePair(2, 3), new CoordinatePair(3, 3),
  new CoordinatePair(3, 2),
  new CoordinatePair(2, 2),
  new CoordinatePair(2, 1),
  new CoordinatePair(3, 1),
  new CoordinatePair(3, 2),
  new CoordinatePair(2, 2),
  new CoordinatePair(2, 3),
  new CoordinatePair(3, 3), new CoordinatePair(3, 2),
  new CoordinatePair(2, 2),
  new CoordinatePair(2, 1),
  new CoordinatePair(3, 1),
  new CoordinatePair(3, 2)];
let S7trStep = 0;
let S7lbStep = 0;
let firstTimeStage7 = true;
let S7EmptyInTheRightSpotOrWas = false;
let emptyGettingPutInPosition = false;
let S7Step = 0;
let firstTimeStage5 = true;
let stage5TopRight = false;
let stage5LeftBottom = false;
let S5EmptyInTheRightSpotOrWas = false;
let S5Step = 0;
let S5TopRightSwapWithCP = [//MAKE EMPTY AT 1,2
  new CoordinatePair(1, 1), new CoordinatePair(2, 1), new CoordinatePair(3, 1), new CoordinatePair(3, 2), new CoordinatePair(2, 2), new CoordinatePair(1, 2),//6,7,8 in position for spinning
  new CoordinatePair(1, 3), new CoordinatePair(2, 3),//6,7,8,0 in position for spinning
  new CoordinatePair(3, 3), new CoordinatePair(3, 2), new CoordinatePair(2, 2),//spin 1 complete
  new CoordinatePair(2, 3), new CoordinatePair(3, 3), new CoordinatePair(3, 2),//spin 2 complete
  new CoordinatePair(3, 1), new CoordinatePair(2, 1),//snake 1 ready
  new CoordinatePair(2, 2), new CoordinatePair(2, 3), new CoordinatePair(1, 3), new CoordinatePair(1, 2), new CoordinatePair(1, 1), new CoordinatePair(2, 1), new CoordinatePair(2, 2), new CoordinatePair(2, 3), new CoordinatePair(3, 3), new CoordinatePair(3, 2), new CoordinatePair(2, 2), new CoordinatePair(2, 3), new CoordinatePair(1, 3), new CoordinatePair(1, 2), new CoordinatePair(1, 1), new CoordinatePair(2, 1), new CoordinatePair(2, 2), new CoordinatePair(2, 3), new CoordinatePair(1, 3), new CoordinatePair(1, 2), new CoordinatePair(1, 1), new CoordinatePair(2, 1)
];
let S5LeftBottomSwapWithCP = [//MAKE EMPTY AT 3,2
  new CoordinatePair(3, 3), new CoordinatePair(2, 3), new CoordinatePair(1, 3), new CoordinatePair(1, 2), new CoordinatePair(2, 2), new CoordinatePair(3, 2),//6,7,8 ready for rotation
  new CoordinatePair(3, 1), new CoordinatePair(2, 1),//6,7,8,0 ready for spin
  new CoordinatePair(1, 1), new CoordinatePair(1, 2), new CoordinatePair(2, 2),//spin 1
  new CoordinatePair(2, 3), new CoordinatePair(1, 3), new CoordinatePair(1, 2), new CoordinatePair(1, 1), new CoordinatePair(2, 1)];
let completeCoordsForbidden = [];
function pe(a, b) {//permutation equals; starts at 1, ends 16.
  if (permutation[a - 1] === b) return true;
  else return false;
}
let tempSet = false;

let solveTheOtherWay = false;
function printArrayArray(a) {
  let str = "";
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      str += a[i][j];
    }
    console.log(str);
  }
  console.log("_-_-_-_-_-");
}
function generateWithCheck(array) {
  permutation = generate(array);
  let inversions = 0;
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      if (permutation[i] !== 0 && permutation[j] != 0)
        if (permutation[j] < permutation[i]) { ++inversions; }
    }
  }
  for (let i = 0; i < 16; i++) {
    if (permutation[i] === 0) {
      inversions += Math.floor(i / 4);
      break;
    }
  }
  if (inversions % 2 === 0) {
    solveTheOtherWay = true;
    console.log("INVERTED!");
  } else {
    console.log("NOT INVERTED!");
  }
  display();
}
function moveTo(start, end, forbiddenCoordsAAA) {
  let str = "moveTo log:"
  str += "(" + start.y + "," + start.x + ") TO ";
  str += "(" + end.y + "," + end.x + "), with banned:";
  for (let i = 0; i < forbiddenCoordsAAA.length; i++) {
    str += "(" + forbiddenCoordsAAA[i].y + "," + forbiddenCoordsAAA[i].x + ") "
  }
  debug || console.log(str);
  forbiddenCoords = [];
  for (let i = 0; i < forbiddenCoordsAAA.length; i++) {
    forbiddenCoords.push(forbiddenCoordsAAA[i]);
  }
  for (let i = 0; i < completeCoordsForbidden.length; i++) {
    forbiddenCoords.push(completeCoordsForbidden[i]);
  }
  let route = [];
  let movestoEmpty = [[99, 99, 99, 99], [99, 99, 99, 99], [99, 99, 99, 99], [99, 99, 99, 99]];
  movestoEmpty[start.y][start.x] = 0;

  for (let i = 0; i < forbiddenCoords.length; i++) {
    movestoEmpty[forbiddenCoords[i].y][forbiddenCoords[i].x] = -1;
  }
  for (let distanceFromStart = 0; movestoEmpty[end.y][end.x] === 99; distanceFromStart++) {
    let didSomething = false;
    for (let y = 0; y < 4; y++)
      for (let x = 0; x < 4; x++) {

        if (movestoEmpty[y][x] === distanceFromStart) {

          if (y > 0 && movestoEmpty[y - 1][x] > movestoEmpty[y][x] + 1) {
            movestoEmpty[y - 1][x] = movestoEmpty[y][x] + 1;
            didSomething = true;
          }
          if (x > 0 && movestoEmpty[y][x - 1] > movestoEmpty[y][x] + 1) {
            movestoEmpty[y][x - 1] = movestoEmpty[y][x] + 1;
            didSomething = true;
          }
          if (y < 3 && movestoEmpty[y + 1][x] > movestoEmpty[y][x] + 1) {
            movestoEmpty[y + 1][x] = movestoEmpty[y][x] + 1;
            didSomething = true;
          }
          if (x < 3 && movestoEmpty[y][x + 1] > movestoEmpty[y][x] + 1) {
            movestoEmpty[y][x + 1] = movestoEmpty[y][x] + 1;
            didSomething = true;
          }
        }
      }
    if (!didSomething)
      console.log("ERROR CANNOT REACH");
  }

  let y = end.y;
  let x = end.x;
  route.push(new CoordinatePair(y, x));
  let internalError = false;
  while ((y !== start.y || x !== start.x) && !internalError) {
    if (y > 0 && movestoEmpty[y - 1][x] + 1 === movestoEmpty[y][x]) {
      y--;
    } else if (x > 0 && movestoEmpty[y][x - 1] + 1 === movestoEmpty[y][x]) {
      x--;
    } else if (y < 3 && movestoEmpty[y + 1][x] + 1 === movestoEmpty[y][x]) {
      y++;
    } else if (x < 3 && movestoEmpty[y][x + 1] + 1 === movestoEmpty[y][x]) {
      x++;
    } else {
      console.log("Internal Error");
      internalError = true;
    }
    route.push(new CoordinatePair(y, x));
  }

  route.reverse();
  str = "moveTo log. Route: "
  for (let i = 0; i < route.length; i++) {
    str += "(" + route[i].y + "," + route[i].x + ") "
  }
  debug || console.log(str);
  return route;

}


function swap(y1, x1, y2, x2) {
  let el1Location = y1 * 4 + x1;
  let el1 = document.getElementById(el1Location);
  let el2Location = y2 * 4 + x2;
  let el2 = document.getElementById(el2Location);
  let elTempinnerHTML = el2.innerHTML;
  let elTempstyleborder = el2.style.border;
  el2.innerHTML = el1.innerHTML;
  el2.style.border = el1.style.border;
  el1.innerHTML = elTempinnerHTML;
  el1.style.border = elTempstyleborder;
}
function generate(array) {
  permutation = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 0];
  generateVariableSetup();
  let currentIndex = array.length, randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
}
function display() {
  let cell;
  for (let i = 0; i < 16; i++) {
    cell = document.getElementById(i);
    if (permutation[i] === 0) {
      cell.innerHTML = " ";
      cell.className = 'empty';
    } else {
      cell.innerHTML = permutation[i];
      cell.className = ''
    }
  }
  let inversions = 0;
  for (let i = 0; i < 16; i++) {
    for (let j = i + 1; j < 16; j++) {
      if (permutation[i] !== 0 && permutation[j] != 0)
        if (permutation[j] < permutation[i]) { ++inversions; }
    }
  }
  for (let i = 0; i < 16; i++) {
    if (permutation[i] === 0) {
      inversions += Math.floor(i / 4);
      break;
    }
  }
  if (inversions % 2 === 0) {
    solveTheOtherWay = true;
  } else {
    solveTheOtherWay = false;
  }
  if (solveTheOtherWay) {
    for (let i = 0; i < 8; i++) {
      let temp = permutation[i];
      permutation[i] = permutation[15 - i];
      permutation[15 - i] = temp;
    }
    for (let i = 0; i < 16; i++) {
      permutation[i] = (16 - permutation[i]) % 16;
    }
  }
  disableSolve = true;
  for (let i = 0; i < permutation.length; i++) {
    if ((i + 1) % 16 !== permutation[i]) {
      disableSolve = false;
      break;
    }
  }
  document.getElementById('solve').disabled = disableSolve;
  if (solveTheOtherWay) {
    for (let i = 0; i < 8; i++) {
      let temp = permutation[i];
      permutation[i] = permutation[15 - i];
      permutation[15 - i] = temp;
    }
    for (let i = 0; i < 16; i++) {
      permutation[i] = (16 - permutation[i]) % 16;
    }
  }
}
var waittime = 500;
async function solveAll() {
  while (solveOneStep() !== -1 && solving) {
    await new Promise(r => setTimeout(r, waittime));

  }
  document.getElementById("solve").innerHTML = "SOLVE";
  solving = false;
  generateVariableSetup();
}
function solveOneStep() {
  debug || console.log("-_-_-_-_-_-");
  if (solveTheOtherWay) {//start
    //rotate 180 degrees
    for (let i = 0; i < 8; i++) {
      let temp = permutation[i];
      permutation[i] = permutation[15 - i];
      permutation[15 - i] = temp;
    }
    for (let i = 0; i < 16; i++) {
      permutation[i] = (16 - permutation[i]) % 16;
    }
  }
  let stage = -1;
  if (currentRowOrColumnReady) {
    stage = currentStage;
  } else {
    if (pe(1, 2) && pe(2, 3) && pe(3, 4) && pe(5, 1)) {//if firstRowReady
      stage = 1;
    } else if (!(pe(1, 1) && pe(2, 2) && pe(3, 3) && pe(4, 4))) {//if firstRow NOT Complete
      stage = 0;
    } else if (pe(9, 13) && pe(5, 9) && pe(6, 5)) {// (first row is complete) AND firstColumnReady
      stage = 3;
    } else if (!(pe(5, 5) && pe(9, 9) && pe(13, 13))) {//(first row is complete) AND (firstColumn NOT Ready) AND firstColumn NOT Complete
      stage = 2;
    } else if (pe(6, 6) && pe(16, 8) && pe(11, 7)) {//(first row is complete) AND (first column is complete) AND secondRowReady
      stage = 5;
    } else if (!(pe(6, 6) && pe(7, 7) && pe(8, 8))) {//(first row is complete) AND (first column is complete) AND secondRow NOT Complete
      stage = 4;
    } else if (pe(16, 10) && (pe(15, 14) || pe(12, 14))) {//(first row is complete) AND (first column is complete) AND (secondRowComplete) AND second column ready
      stage = 7;           //and 14 is next to 10 in the corner.
    } else if (!(pe(10, 10) && pe(14, 14))) {//(first row is complete) AND (first column is complete) AND (secondRowComplete) AND second column NOT complete
      stage = 6;
    } else if (!(pe(11, 11) && pe(12, 12) && pe(15, 15) && pe(16, 0))) { //(first row complete, first column complete, second row complete, second column complete, but rest not complete
      stage = 8;
    } else {
      stage = 9;//all complete
      if (solveTheOtherWay) {
        for (let i = 0; i < 8; i++) {
          let temp = permutation[i];
          permutation[i] = permutation[15 - i];
          permutation[15 - i] = temp;
        }
        for (let i = 0; i < 16; i++) {
          permutation[i] = (16 - permutation[i]) % 16;
        }
      }
      return -1;
    }
    if (stage === -1) {
      console.log("ERROR");
      return;
    }
  }
  completeCoordsForbidden = [];
  startIncluding.y = 0; startIncluding.x = -1;
  lengthH = BL;//4
  for (let stageCopy = 0; stageCopy < Math.floor(stage / 2); stageCopy++) {
    //if stageCopy == even = row
    //if stageCopy == odd = column
    if (stageCopy % 2 === 1) {
      lengthH -= 1;
      startIncluding.y++;
    } else {
      startIncluding.x++;
    }
    let j = new CoordinatePair(startIncluding.y, startIncluding.x);
    for (let i = lengthH; i > 0; i--) {
      completeCoordsForbidden.push(new CoordinatePair(j.y, j.x));
      if (stageCopy % 2 === 1) {
        j.y++;
      } else {
        j.x++;
      }
    }
  }
  debug || console.log("STAGE: " + stage);
  let locationOfEmpty = 0;
  for (let i = 0; i < 16; i++) {
    if (permutation[i] === 0) {
      locationOfEmpty = i;
      break;
    }
  }
  let locationEmpty = new CoordinatePair(Math.floor(locationOfEmpty / 4), locationOfEmpty % 4);
  let forbidden = [];
  if (stage === 9) {
  } else if (stage === 8) {//clockwise
    currentRowOrColumnReady = true;
    currentStage = 8;
    if (locationEmpty.y === 2 && locationEmpty.x === 2) {
      swapWithEmpty(new CoordinatePair(2, 2 + 1));
    } else if (locationEmpty.y === 2 && locationEmpty.x === 3) {
      swapWithEmpty(new CoordinatePair(2 + 1, 3));
    } else if (locationEmpty.y === 3 && locationEmpty.x === 3) {
      swapWithEmpty(new CoordinatePair(3, 3 - 1));
    } else if (locationEmpty.y === 3 && locationEmpty.x === 2) {
      swapWithEmpty(new CoordinatePair(3 - 1, 2));
    }
    if (pe(11, 11) && pe(12, 12) && pe(15, 15) && pe(16, 0)) {
      currentRowOrColumnReady = false;
      currentStage = -1;
    }
  } else if (stage === 7) {
    if (firstTimeStage7) {
      if (permutation[11] === 14) stage7TopRight = true;
      else if (permutation[14] === 14) stage7LeftBottom = true;
      else console.log("ERROR");
      firstTimeStage7 = false;
      currentRowOrColumnReady = true;
      currentStage = 7;
      //need to put emptyInPosition
    }
    if (!S7EmptyInTheRightSpotOrWas) {
      if (stage7TopRight) {//14 on top,right
        if (permutation[14] === 0) S7EmptyInTheRightSpotOrWas = true;
        if (!S7EmptyInTheRightSpotOrWas) {//3,2
          let next = 0; // find the next number to put in its place
          let nextEndLocationCP = new CoordinatePair(3, 2);
          forbidden.push(new CoordinatePair(3, 3));
          forbidden.push(new CoordinatePair(2, 3));
          let locationNext = locationEmpty;
          let EMPTYroute = moveTo(locationNext, nextEndLocationCP, forbidden);
          swapWithEmpty(EMPTYroute[1]);
        }
      } else {//if (stage7LeftBottom) // 14 on left, bottom
        if (permutation[11] === 0) S7EmptyInTheRightSpotOrWas = true;
        if (!S7EmptyInTheRightSpotOrWas) {//2,3
          let next = 0; // find the next number to put in its place
          let nextEndLocationCP = new CoordinatePair(2, 3);
          forbidden.push(new CoordinatePair(3, 3));
          forbidden.push(new CoordinatePair(3, 2));
          let locationNext = locationEmpty;
          let EMPTYroute = moveTo(locationNext, nextEndLocationCP, forbidden);
          swapWithEmpty(EMPTYroute[1]);
        }
      }
    }
    if (S7EmptyInTheRightSpotOrWas) {
      if (stage7TopRight) {
        swapWithEmpty(S7TopRightSwapWithCP[S7Step++]);
        if (S7TopRightSwapWithCP.length === S7Step) {
          currentRowOrColumnReady = false;
          currentStage = -1;//8
        }
      } else {//if (stage7LeftBottom)
        swapWithEmpty(S7LeftBottomSwapWithCP[S7Step++]);
        if (S7LeftBottomSwapWithCP.length === S7Step) {
          currentRowOrColumnReady = false;
          currentStage = -1;//8a
        }
      }
    }
  } else if (stage === 6) {//need to get 10 and 14 into ready position
    let next = -1;
    let nextEndLocationCP = null;
    if (pe(16, 10)) {//if 10 is in the bottom right corner, ie in place
      forbidden.push(new CoordinatePair(3, 3));
      next = 14;
      nextEndLocationCP = new CoordinatePair(3, 2);//UNLESS 14 IS AT (2,2), IN WHICH CASE IT IS MOVED TO WHICHEVER IS CLOSEST, (2,3) OR (3,2).
    } else {//10 is not in place
      next = 10;
      nextEndLocationCP = new CoordinatePair(3, 3);
    }
    let locationNext = null;
    for (let i = 0; i < 16; i++) {
      if (permutation[i] === next) {
        locationNext = new CoordinatePair(Math.floor(i / 4), i % 4);
        break;
      }
    }
    if (permutation[15] === 10 && permutation[10] === 14 && //if 10 in the corner and 14 one diagonal upleft
      (permutation[11] === 0 || permutation[14] === 0)) {//and empty is next to both
      swapWithEmpty(new CoordinatePair(2, 2));//top left
    } else {
      let route = moveTo(locationNext, nextEndLocationCP, forbidden);
      if (route[1].y === locationEmpty.y && route[1].x === locationEmpty.x) {
        swapWithEmpty(locationNext);
      } else {
        forbidden.push(locationNext);
        let emptyRoute = moveTo(locationEmpty, route[1], forbidden);
        swapWithEmpty(emptyRoute[1]);
      }
    }
  } else if (stage === 5) {
    if (firstTimeStage5) {
      if (permutation[9] === 0 ||
        permutation[13] === 0 ||
        permutation[14] === 0) { stage5LeftBottom = true; }
      else if (permutation[6] === 0 ||
        permutation[7] === 0 ||
        permutation[11] === 0) { stage5TopRight = true; }
      else console.log("ERROR");
      firstTimeStage5 = false;
      currentRowOrColumnReady = true;
      currentStage = 5;
    }

    if (!S5EmptyInTheRightSpotOrWas) {
      if (stage5TopRight) {
        if (permutation[6] === 0) S5EmptyInTheRightSpotOrWas = true;
        if (!S5EmptyInTheRightSpotOrWas) {//1,2
          let next = 0; // find the next number to put in its place
          let nextEndLocationCP = new CoordinatePair(1, 2);
          forbidden.push(new CoordinatePair(1, 1));
          forbidden.push(new CoordinatePair(2, 2));
          forbidden.push(new CoordinatePair(3, 3));
          let locationNext = locationEmpty;
          let EMPTYroute = moveTo(locationNext, nextEndLocationCP, forbidden);
          swapWithEmpty(EMPTYroute[1]);
        }
      } else {//if (stage5LeftBottom)//"vertical"
        if (permutation[14] === 0) S5EmptyInTheRightSpotOrWas = true;
        if (!S5EmptyInTheRightSpotOrWas) {//3,2
          let next = 0; // find the next number to put in its place
          let nextEndLocationCP = new CoordinatePair(3, 2);
          forbidden.push(new CoordinatePair(1, 1));
          forbidden.push(new CoordinatePair(2, 2));
          forbidden.push(new CoordinatePair(3, 3));
          let locationNext = locationEmpty;
          let EMPTYroute = moveTo(locationNext, nextEndLocationCP, forbidden);
          swapWithEmpty(EMPTYroute[1]);
        }
      }
    }
    if (S5EmptyInTheRightSpotOrWas) {
      if (stage5TopRight) {
        swapWithEmpty(S5TopRightSwapWithCP[S5Step++]);
        if (S5TopRightSwapWithCP.length === S5Step) {
          currentRowOrColumnReady = false;
          currentStage = -1;//6
        }
      } else {//if (stage7LeftBottom)
        swapWithEmpty(S5LeftBottomSwapWithCP[S5Step++]);
        if (S5LeftBottomSwapWithCP.length === S5Step) {
          currentRowOrColumnReady = false;
          currentStage = -1;//6
        }
      }
    }//

  } else if (stage % 2 === 0) {//turning random into ready.
    stage = Math.floor(stage / 2);
    let next = -1; // find the next number to put in its place
    let nextEndLocationCP = null;
    for (let i = 0; i < order[stage].length; i++) { // use the int[] order to find which number is next.
      if (order[stage][i] === permutation[orderLocation[stage][i].y * 4 + orderLocation[stage][i].x]) { // if the next number to put in its place is not already in its place
        forbidden.push(orderLocation[stage][i]);
      } else {
        next = order[stage][i]; // set it as the next number.
        nextEndLocationCP = orderLocation[stage][i];
        break;
      }
    }
    let strb = "NEXT: ";
    strb += next;
    debug || console.log(strb);
    strb = "NextEndLocationCP:";
    strb += "(" + nextEndLocationCP.y + "," + nextEndLocationCP.x + ") ";
    debug || console.log(strb);
    if (next === -1) debug || console.log("NEXT IS -1!");
    let locationNext = null;
    // find the location of that number
    for (let i = 0; i < 16; i++) {
      if (permutation[i] === next) {
        locationNext = new CoordinatePair(Math.floor(i / 4), i % 4);
        debug || console.log("LocationNext: (" + locationNext.y + "," + locationNext.x + ")");//. and i = " + i);
        break;
      }
    }
    let route = moveTo(locationNext, nextEndLocationCP, forbidden);
    if (route[1].y === locationEmpty.y && route[1].x === locationEmpty.x) {
      swapWithEmpty(locationNext);
    } else {
      let str = "Moving Empty. Current route:";
      for (let i = 0; i < route.length; i++) {
        str += "(" + route[i].y + "," + route[i].x + ") ";
      }
      debug || console.log(str);
      forbidden.push(locationNext);
      let emptyRoute = moveTo(locationEmpty, route[1], forbidden);
      str = "Empty route:";
      for (let i = 0; i < emptyRoute.length; i++) {
        str += "(" + emptyRoute[i].y + "," + emptyRoute[i].x + ") ";
      }
      debug || console.log(str);
      swapWithEmpty(emptyRoute[1]);
    }
  } else {//stage % 2 == 1; turning ready into complete
    --stage;
    stage = Math.floor(stage / 2);
    if ((permutation[emptyLocationForReadyToCompleteTransferForEachStage[stage].y * 4 + emptyLocationForReadyToCompleteTransferForEachStage[stage].x]) === 0) {
      currentRowOrColumnReady = true;
      ReadyToCompleteLeft = order[stage].length;
      currentStage = (stage * 2) + 1;
    }
    if (!currentRowOrColumnReady) {// get empty to needed location
      for (let i = 0; i < orderLocation[stage].length; i++) {
        forbidden.push(orderLocation[stage][i]);
      }
      let emptyRoute = moveTo(locationEmpty, emptyLocationForReadyToCompleteTransferForEachStage[stage], forbidden);
      debug || console.log("LOCATIONEMPTY: " + locationEmpty.y + " " + locationEmpty.x);
      swapWithEmpty(emptyRoute[1]);
    } else {
      --ReadyToCompleteLeft;
      let emptyLocationOrder = [[new CoordinatePair(1, 0), new CoordinatePair(0, 0), new CoordinatePair(0, 1), new CoordinatePair(0, 2)],
      [new CoordinatePair(1, 1), new CoordinatePair(1, 0), new CoordinatePair(2, 0)],
      [new CoordinatePair(2, 1), new CoordinatePair(1, 1), new CoordinatePair(1, 2)],
      [new CoordinatePair(2, 2), new CoordinatePair(2, 1)]];
      swapWithEmpty(emptyLocationOrder[stage][ReadyToCompleteLeft]);
      if (ReadyToCompleteLeft === 0) {
        //if stage == even = row
        //if stage == odd = column
        if (stage % 2 === 1) {
          lengthH -= 1;
          startIncluding.y++;
        } else {
          startIncluding.x++;
        }
        let j = new CoordinatePair(startIncluding.y, startIncluding.x);
        for (let i = lengthH; i > 0; i--) {
          completeCoordsForbidden.push(new CoordinatePair(j.y, j.x));
          if (stage % 2 === 1) {
            j.y++;
          } else {
            j.x++;
          }
        }

        ReadyToCompleteLeft = -1;//just in case
        currentRowOrColumnReady = false;
        currentStage = -1;
      }
    }
  }
  if (solveTheOtherWay) {//end
    for (let i = 0; i < 8; i++) {
      let temp = permutation[i];
      permutation[i] = permutation[15 - i];
      permutation[15 - i] = temp;
    }
    for (let i = 0; i < 16; i++) {
      permutation[i] = (16 - permutation[i]) % 16;
    }
  }
  display();
}
function ifNextToEmptySwap(id) {
  if (solving) {
    debug || console.log("Cannot Move, solving.");
    return;
  }
  let c = new CoordinatePair(Math.floor(id / 4), id % 4);
  let empty = new CoordinatePair(-99, -99);
  if (c.x > 0 && permutation[4 * c.y + c.x - 1] === 0) {
    empty.y = c.y;
    empty.x = c.x - 1;
  } else if (c.x < 3 && permutation[4 * c.y + c.x + 1] === 0) {
    empty.y = c.y;
    empty.x = c.x + 1;
  } else if (c.y > 0 && permutation[4 * c.y + c.x - 4] === 0) {
    empty.y = c.y - 1;
    empty.x = c.x;
  } else if (c.y < 3 && permutation[4 * c.y + c.x + 4] === 0) {
    empty.y = c.y + 1;
    empty.x = c.x;
  } else {
    debug || console.log("Tile Click Error:Not near empty!");
    return;
  }
  permutation[empty.y * 4 + empty.x] = permutation[c.y * 4 + c.x];
  permutation[c.y * 4 + c.x] = 0;
  display();
}
let solving = false;
function solveButton() {
  if (!solving) {//SOLVE
    document.getElementById('solve').innerHTML = "STOP";
    solving = true;
    solveAll();
  } else {//STOP
    solving = false;
  }
}
