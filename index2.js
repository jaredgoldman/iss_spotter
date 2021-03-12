const { nextISSTimesForMyLocation } = require('./iss_promised')

nextISSTimesForMyLocation()
  .then((passTimes) => {
    printSightings(passTimes)
  })
  .catch((error) => {
    console.log("There was an error: ", error.message)
  });

  const printSightings = function(passings) {
    for (const pass of passings) {
      const datetime = new Date(0);
      datetime.setUTCSeconds(pass.risetime);
      const duration = pass.duration;
      console.log(`Next pass at ${datetime} for ${duration} seconds!`);
    }
  }
 