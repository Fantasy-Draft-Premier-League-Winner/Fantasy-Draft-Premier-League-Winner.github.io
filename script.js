/*document.getElementById('userIDform').addEventListener('submit', function (event) {
  event.preventDefault();
  var userID = document.getElementById('userID').value;
  console.log('User ID:', userID);
});*/
function validateCORSHeaders(responseHeaders) {
  // Check if the required CORS headers are present
  if (!responseHeaders.hasOwnProperty('Access-Control-Allow-Origin') ||
      !responseHeaders.hasOwnProperty('Access-Control-Allow-Methods') ||
      !responseHeaders.hasOwnProperty('Access-Control-Allow-Headers') ||
      !responseHeaders.hasOwnProperty('Access-Control-Max-Age')) {
      return false; // If any required header is missing, return false
  }

  // Check if the 'Access-Control-Allow-Origin' header value is valid
  const allowOrigin = responseHeaders['Access-Control-Allow-Origin'];
  if (allowOrigin !== '*' && typeof allowOrigin !== 'string') {
      return false;
  }

  // Check if the 'Access-Control-Allow-Methods' header value is valid
  const allowMethods = responseHeaders['Access-Control-Allow-Methods'];
  if (typeof allowMethods !== 'string') {
      return false;
  }

  // Check if the 'Access-Control-Allow-Headers' header value is valid
  const allowHeaders = responseHeaders['Access-Control-Allow-Headers'];
  if (typeof allowHeaders !== 'string') {
      return false;
  }

  // Check if the 'Access-Control-Max-Age' header value is valid
  const maxAge = responseHeaders['Access-Control-Max-Age'];
  if (isNaN(maxAge)) {
      return false;
  }

  // All checks passed, CORS headers are valid
  return true;
}

// Example usage:
const responseHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Max-Age': '3600'
};

if (validateCORSHeaders(responseHeaders)) {
  console.log('CORS headers are valid');
} else {
  console.error('CORS headers are invalid');
}
function getTeamInfo() {
  const userID = document.getElementById('userID').value;
  //const userTeamURL = `https://draft.premierleague.com/api/draft/entry/${userID}/transactions`;
  const userTeamURL = "https://draft.premierleague.com/api/bootstrap-static";
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
      //displayTeam(data);
      console.log(data);
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);

    });
}

/*
fetch('https://example.com/data.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log(data); // Log the fetched JSON data to the console
  })
  .catch(error => {
    console.error('There was a problem fetching the data:', error);
  });

  */