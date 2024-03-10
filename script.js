document.getElementById('userIDform').addEventListner('submit', function (event) {
  event.preventDefault();
  var userID = document.getElementById('userID').value;
  console.log(userID);
});