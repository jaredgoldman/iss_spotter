const { fetchMyIP, fetchCoordsByIp } = require('./iss');

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!", error);
    return;
  }
  return ip;
  // console.log('It worked! Returned IP:' , ip);
});

fetchCoordsByIp('198.84.226.130', (error, data) => {
  if (error) {
    // console.log("It didn't work!", error);
    return;
  }
  // console.log('It worked! Returned coords' , data);
  return data;
});


