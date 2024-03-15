document.getElementById('userIDform').addEventListener('submit', function (event) {
  event.preventDefault();
  var userID = document.getElementById('userID').value;
  console.log('User ID:', userID);
});
const corsURL = "https://justcors.com/tl_ab0e627/"; 

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
      if (col == 1) {
        var fullname = (data.elements[(playerIDs[row] - 1)].first_name).concat(" ", data.elements[(playerIDs[row] - 1)].second_name)
        var position;
        if (data.elements[(playerIDs[row]-1)].element_type == 1) {
          position = "GK";
        } else if (data.elements[(playerIDs[row]-1)].element_type == 2) {
          position = "DEF";
        } else if (data.elements[(playerIDs[row]-1)].element_type == 3) {
          position = "MID";
        } else {
          position = "FWD";
        }
        playerData[row][col] = fullname.concat(" ", `(${position})`);
      }
      if(col == 2) {
        playerData[row][col] = data.elements[(playerIDs[row]-1)].minutes;
      }
      if(col == 3) {
        playerData[row][col] = data.elements[(playerIDs[row] - 1)].goals_scored;
      }
      if(col == 4) {
        playerData[row][col] = data.elements[(playerIDs[row] - 1)].assists;
      }
      if(col == 5) {
        var minutes = (data.elements[(playerIDs[row]-1)].minutes)
        minutes = minutes/90;

        playerData[row][col] = ((data.elements[(playerIDs[row] - 1)].expected_goal_involvements) / minutes).toFixed(2);
      }
    }
  }
  console.log(playerData);
}

function display() { 
  const table = document.getElementById("theLineup");
  
  const headerRow = document.createElement('tr');
  const headers = ["Team", "Name (Position)", "Minutes", "Goals", "Assists", "EGI/90"];
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
var bestEgi90 = [];
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
// working, can change element type in the if statement to an input so we can sort for def mid and fwd
function getEgi90(data) {

  for (let x = 0; x < Object.keys(data.elements).length; x++) {
    var minutes = ((data.elements[x].minutes) / 90);
    var egi = data.elements[x].expected_goal_involvements;
    var egi90 = (egi/minutes).toFixed(2);
    if (minutes >= 5 && (data.elements[x].form) > 0 && data.elements[x].element_type == 3) {
      bestEgi90.push({ name: `${data.elements[x].first_name} ${data.elements[x].second_name}`, egi90 });

    }
    
  }
  bestEgi90.sort((a, b) => b.egi90 - a.egi90);

  bestEgi90 = bestEgi90.slice(0, 10);
  //we can change the second number in the slice function to accomodate how many players we want to show (top 5 instead of top 10 for example)

  
  console.log(bestEgi90);
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