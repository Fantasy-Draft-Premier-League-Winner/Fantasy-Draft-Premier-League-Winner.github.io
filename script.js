/*document.getElementById('userIDform').addEventListener('submit', function (event) {
  event.preventDefault();
  var userID = document.getElementById('userID').value;
  console.log('User ID:', userID);
});*/
function getTeamInfo() {
  const userID = document.getElementById('userID').value;
  const userTeamURL = `https://draft.premierleague.com/api/draft/entry/${userID}/transactions`;
  if (!userID) {
      alert('Please enter your ID');
      return;
  }
  fetch(userTeamURL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
    // Work with the JSON data here
      displayTeam(data);
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });
}
function displayTeam(data) { 
  const myLineup = document.getElementById('myLineup');

  data.forEach(picks => {
    console.log(`Position: ${picks.position}`);
    /*const player = document.createElement('p');
    player.textContent = `Position: ${picks.position}`; // Example properties from the JSON object
    myLineup.appendChild(player);*/
  });
}