document.getElementById('userIDform').addEventListener('submit', function (event) {
  event.preventDefault();
  var userID = document.getElementById('userID').value;
  console.log('User ID:', userID);
});
const corsURL = "https://justcors.com/tl_252ff28/"; 

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
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0],
  ["","", 0, 0, 0]
];

function getStats(data) {
  for (let row = 0; row < playerData.length; row++) {
    for (let col = 0; col < playerData[0].length; col++) {
      if(col == 0) {
        playerData[row][col] = data.elements[(playerIDs[row]-1)].first_name;
      }
      if(col == 1) {
        playerData[row][col] = data.elements[(playerIDs[row]-1)].second_name;
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
    }
  }
  console.log(playerData);
}

function display() { 
  const lineup = document.getElementById("myLineup");
  const table = document.createElement("table");
  for (let i = 0; i < playerData.length; i++) { 
    const row = document.createElement('tr');
    for (let j = 0; j < playerData[0].length; j++) { 
      const cell = document.createElement('td');
      cell.textContent = playerData[i][j];
      row.appendChild(cell);
    }
    table.appendChild(row);
  }
  lineup.appendChild(table);
}

/* Tomorrow */







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