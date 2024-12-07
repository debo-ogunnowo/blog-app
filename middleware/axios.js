const axios = require('axios');

function fetchUserData (token) {
  axios.get('http://localhost:3000/api/', {
    header: {
      'Authorization': `Bearer ${token}`
    }
  })
  .then(response => console.log(response.data)
  .catch(error => console.log('Error', error))
  );
}