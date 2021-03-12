// const { fetchMyIP, fetchCoordsByIp, fetchISSFlyOverTimes } = require('./iss');

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   return ip;
//   // console.log('It worked! Returned IP:' , ip);
// });

// fetchCoordsByIp('198.84.226.130', (error, data) => {
//   if (error) {
//     // console.log("It didn't work!", error);
//     return;
//   }
//   // console.log('It worked! Returned coords' , data);
//   return data;
// });

// let coords = { latitude: 43.6547, longitude: -79.3623 };

// fetchISSFlyOverTimes(coords, (error, data) => {
//   if (error) {
//     // console.log("It didn't work!", error);
//     return;
//   }
//   // console.log('It worked! Returned coords' , data);
//   return data;
// });

const { nextISSTimesForMyLocation } = require('./iss');

nextISSTimesForMyLocation((error, passings) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  // success, print out the deets!
  printSightings(passings);
});

const printSightings = function(passings) {
  for (const pass of passings) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
};