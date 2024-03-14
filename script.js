document.getElementById('userIDform').addEventListener('submit', function (event) {
  event.preventDefault();
  var userID = document.getElementById('userID').value;
  console.log('User ID:', userID);
});
const corsURL = "https://justcors.com/tl_ca369da/"; 

function getTeamInfo() {
  const userID = document.getElementById('userID').value;
  const userTeamURL = `${corsURL}https://draft.premierleague.com/api/draft/entry/${userID}/transactions`;
  if (!userID) {
      alert('Please enter your ID');
      return;
  }
  fetch(`${corsURL}https://draft.premierleague.com/api/bootstrap-static`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Work with the JSON data here
      //const data1 = JSON.parse(data);
      //console.log(data.elements[523].saves); Returns 106 (number of saves by Aereola)
      console.log(data.elements[523].saves);
      getTeam(userID);
      getStats(data);
      getEgi90(data);
      display();
      //displayTeam(data);
      //iterateObject(data);
      

    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });
}
const playerIDs = [];
function getTeam(obj) { 
  const aaaa = JSON.parse(obj);
      for (let i = 0; i < aaaa.picks.length; i++) { 
        playerIDs.push(aaaa.picks[i].element);
      }
  console.log(playerIDs);
}
const playerData = [
  //[playerlastname, minutes, goals, assists],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0],
  ["", "", 0, 0, 0, 0]
];

function getStats(data) {

  for (let row = 0; row < playerData.length; row++) {
    for (let col = 0; col < playerData[0].length; col++) {
      if(col == 0) {
        var teamID = (data.elements[(playerIDs[row]-1)].team)
        playerData[row][col] = data.teams[(teamID - 1)].short_name;
      }
      if(col == 1) {
        playerData[row][col] = (data.elements[(playerIDs[row]-1)].first_name).concat(" ", data.elements[(playerIDs[row]-1)].second_name);
      }
      if(col == 2) {
        playerData[row][col] = data.elements[(playerIDs[row]-1)].minutes;
      }
      if(col == 3) {
        playerData[row][col] = data.elements[(playerIDs[row]-1)].goals_scored;
      }
      if(col == 4) {
        playerData[row][col] = data.elements[(playerIDs[row]-1)].assists;
      }
      if(col == 5) {
        var minutes = (data.elements[(playerIDs[row]-1)].minutes)
        minutes = minutes/90;

        playerData[row][col] = ((data.elements[(playerIDs[row]-1)].expected_goal_involvements) / minutes).toFixed(2);
      }
    }
  }
  console.log(playerData);
}

function display() { 
  const table = document.getElementById("lineupContainer");
  
  const headerRow = document.createElement('tr');
  const headers = ["Team", "Name", "Minutes", "Goals", "Assists", "EGI/90"];
  for (let header of headers) {
    const headerCell = document.createElement('th');
    headerCell.textContent = header;
    headerRow.appendChild(headerCell);
  }
  table.appendChild(headerRow);
  
  for (let i = 0; i < playerData.length; i++) { 
    const row = document.createElement('tr');
    for (let j = 0; j < playerData[0].length; j++) { 
      const cell = document.createElement('td');
      cell.textContent = playerData[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
    if (i === playerData.length - 1) {
      row.style.borderBottom = "1px solid black";
    }
  }
}
const egi90PlayerIDs = [];
const bestEgi90Data = [
  //[player, egi/90],
  ["", 0],
  ["a", 0],
  ["a", 0],
  ["a", 0],
  ["a", 0]
];
function getAllInfo() {
  fetch(`${corsURL}https://draft.premierleague.com/api/bootstrap-static`)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      getStats(data);
      //displayGetEGI90();
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });
}
// right now this is only testing the code and not finding the top 5. Make sure to edit so it iterates through the array and adds it in descending order properly
function getEgi90(data) {
  var topGoal = 0;
  for (let x = 0; x < Object.keys(data.elements).length; x++) {
    var minutes = ((data.elements[x].minutes) / 90);
    var egi = data.elements[x].expected_goal_involvements;
    var egi90 = (egi/minutes).toFixed(2);
  
    if (egi90 > bestEgi90Data[0][1] && minutes >= 5 && (data.elements[x].form) > 0 && data.elements[x].element_type == 3) {
      bestEgi90Data[0][1] = egi90;
      bestEgi90Data[0][0] = (data.elements[x].first_name).concat(" ", data.elements[x].second_name);
    }
  }
  console.log(bestEgi90Data);
}
  
  
  
  /*for (let row = 0; row < bestEgi90Data.length; row++) {
    for (let col = 0; col < bestEgi90Data[0].length; col++) {
      if(col == 0) {
        var teamID = (data.elements[(playerIDs[row]-1)].team)
        bestEgi90Data[row][col] = data.teams[(teamID - 1)].short_name;
      }
      if(col == 1) {
        var minutes = (data.elements[(playerIDs[row]-1)].minutes)
        minutes = minutes/90;

        bestEgi90Data[row][col] = ((data.elements[(playerIDs[row]-1)].expected_goal_involvements) / minutes).toFixed(2);
      }
    }
  }
  console.log(bestEgi90Data);

}
*/

function displayGetEGI90() {
  // same as display() for getEgi90(data) --> bestEgi90Data --> headers: names, egi90
}



/*------------------------------------------------------------------------------------------------------------------------------------------------------*/
/*
function displayTeam(data) { 
  const myLineup = document.getElementById('myLineup');

  for (let i = 0; i < data.length; i++) { 
    const picks = data[i];
    const player = myLineup.appendChild(document.createElement('div'));
    player.textContent = `Position: ${elements.id}`; // Example properties from the JSON object
    console.log(`Position: ${elements[i].id}`);
  }
  console.log(`Position: ${elements.id}`);  
  
}*/

// function isInTeam()? returns boolean --> while iterating through iterateObject, if it is in your team then it adds the form into a new array and then we find the lowest number then display that to be transactioned out?
/* Prints everything
function iterateObject(obj){
  for (var key in obj){
    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterateObject(obj[key]);
    } else {
    console.log(key + ":", obj[key]);
    }
  }
}*/
/*function iterateObject(obj){
  for (var key in obj){
    if (typeof obj[key] === "object" && obj[key] !== null) {
      iterateObject(obj[key]);
    } else {
        if (key == "id" && obj[key] == 1){
          console.log(key + ":", obj[key]);// problem, it will always only print id: 1
        }
    }
  }

}*/

/*
fetch(`${corsURL}https://draft.premierleague.com/api/bootstrap-static`)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data);
   // Log the fetched JSON data to the console
  })
  .catch(error => {
    console.error('There was a problem fetching the data:', error);
  })
*/