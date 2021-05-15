console.log("Project start !");

//variables

let timerEle = document.getElementById("timer");

console.log(timerEle);

let seconds = 180;

let tower1 = ["1", "2", "3"];

let tower2 = [];

let tower3 = [];

//start game

function startGame() {
  // start timer on scroll to game

  setInterval(function () {
    seconds--;

    timerEle.innerText = seconds;

    if (seconds === 0) {
      alert("Times up !!");

      console.log("Games up");

      seconds = 180;
    }
  }, 1000);
}

//drag and drop to different tower

function allowDrop(ev) {
  ev.preventDefault();
}

function drag(ev) {
  ev.dataTransfer.setData("text", ev.target.id);

  console.log(ev.dataTransfer.setData("text", ev.target.id));
}

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

  var data = ev.dataTransfer.getData("text");

  if (ev.srcElement.childNodes && ev.srcElement.childNodes.length > 0) {
    if (ev.srcElement.childNodes[0].id < data) {
      return;
    }
  }

  if(!checkAllPreviOuvsValues(ev.srcElement.id )){
    return;
  }

  if (!checkIfIsvalidMove(data)) {
    return;
  }

  removeAndAdd(data, ev.srcElement.id);

  ev.target.appendChild(document.getElementById(data));

  if (tower3.length === 3) {
    alert("you won the game");
  }

  console.log(data);
}

function removeItemOnce(arr, value) {
  var index = arr.indexOf(value);

  if (index > -1) {
    arr.splice(index, 1);
  }

  return arr;
}

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

function checkAllPreviOuvsValues(srcId){
  if (srcId == "tower3") {
    return checkMaxValue(tower3, srcId);
  }

  if (srcId == "tower2") {
    return checkMaxValue(tower3, srcId);
  }

  if (srcId == "tower1") {
    return checkMaxValue(tower3, srcId);
  }
}

function checkMaxValue(tower, srcId){
  var retVal = true;

  tower.forEach((element) => {
    if (parseInt(element) > parseInt(srcId)) {
      retVal = false;
    }
  });

  return retVal;
}

function minVlaueCheck(tower, targetId) {
  var retVal = true;

  tower.forEach((element) => {
    if (parseInt(element) < parseInt(targetId)) {
      retVal = false;
    }
  });

  return retVal;
}
