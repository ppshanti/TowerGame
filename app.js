console.log("Project start !");

//variables
let timerEle = document.getElementById("timer");
console.log(timerEle);

let seconds = 180;
let tower1 = ["1", "2", "3"]; // array to check win condition
let tower2 = [];
let tower3 = [];



//start game timer
function startGame() {
  // start timer on scroll to game
 let myTime= setInterval(function () {
    seconds--;
    timerEle.innerText = seconds;
    if (seconds === 0) {
      alert("Times up !!");

      console.log("Games up");

      seconds = 180;
    }
    if (tower3.length === 3) {
      alert("you won the game");
      clearInterval(myTime);
      }
  }, 1000);

}

//drag and drop to different tower
function allowDrop(ev) {
  ev.preventDefault(); //stops refresh
}
//drag
function drag(ev) {
  //set disk id
  ev.dataTransfer.setData("text", ev.target.id);
  console.log(ev.dataTransfer.setData("text", ev.target.id));
}
//drop
function drop(ev) {
  ev.preventDefault();
  if (
    !(
      ev.srcElement.id === "tower1" ||
      ev.srcElement.id === "tower2" ||
      ev.srcElement.id === "tower3"
    )
  ) {
    return;
  }
  console.log(ev.srcElement);
  //get the disk id
  var data = ev.dataTransfer.getData("text");
//if disk in tower is smaller than one dragging --srcElement -td element
  if (ev.srcElement.childNodes && ev.srcElement.childNodes.length > 0) {
    //do not allow small disk to avoid more than 1 element drop
    if (ev.srcElement.childNodes[0].id < data) {
      return;
    }
  }
//prevent drag of middle disk
  if(!checkAllPreviOuvsValues(ev.srcElement.id )){
    return;
  }
//check if smaller disk in tower dont drop
  if (!checkIfIsvalidMove(data)) {
    return;
  }
  //remove and add array (not html element)
  removeAndAdd(data, ev.srcElement.id);
  ev.target.appendChild(document.getElementById(data));
     //check win if has 3 disk
    //  if (tower3.length === 3) {
    //   alert("you won the game");
    //   }
}
//removes specific element from array
function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);
  if (index > -1) {
    //remove specific element
    arr.splice(index, 1);
  }
  return arr;
}
// remove current tower and add to target tower
function removeAndAdd(tragetId, srcId) {
  if (document.getElementById(tragetId).parentNode.id == "tower3") {
    removeItemOnce(tower3, tragetId);
  }
  if (document.getElementById(tragetId).parentNode.id == "tower1") {
    removeItemOnce(tower1, tragetId);
  }
  if (document.getElementById(tragetId).parentNode.id == "tower2") {
    removeItemOnce(tower2, tragetId);
  }
  if (srcId == "tower3") {
    tower3.push(tragetId);
  }
  if (srcId == "tower2") {
    tower2.push(tragetId);
  }
  if (srcId == "tower1") {
    tower1.push(tragetId);
  }
}
//checks if disk can be placed in the tower
function checkIfIsvalidMove(tragetId) {
  if (document.getElementById(tragetId).parentNode.id == "tower3") {
    return minVlaueCheck(tower3, tragetId);
  }
  if (document.getElementById(tragetId).parentNode.id == "tower1") {
    return minVlaueCheck(tower1, tragetId);
  }

  if (document.getElementById(tragetId).parentNode.id == "tower2") {
    return minVlaueCheck(tower2, tragetId);
  }
}
//checks if tower has small or large disks
function checkAllPreviOuvsValues(srcId){
  if (srcId == "tower3") {
    return checkMaxValue(tower3, srcId);
  }

  if (srcId == "tower2") {
    return checkMaxValue(tower2, srcId);
  }

  if (srcId == "tower1") {
    return checkMaxValue(tower1, srcId);
  }
}
//
function checkMaxValue(tower, srcId){
  var retVal = true;
  tower.forEach((element) => {
    if (parseInt(element) > parseInt(srcId)) {
      retVal = false;
    }
  });
  return retVal;
}

//drop in tower only if disk is the smallest
function minVlaueCheck(tower, targetId) {
  var retVal = true;
  tower.forEach((element) => {
    //get id and convert to int to compare
    if (parseInt(element) < parseInt(targetId)) {
      retVal = false;
    }
  });

  return retVal;
}
