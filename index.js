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