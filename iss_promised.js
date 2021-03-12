const request = require('request-promise-native');

const fetchMyIP = function() {
  // outputs body
  return request('https://api.ipify.org?format=json'); 
}

const fetchCoordsByIP = function(body) {
  // feeds body into JSON and then freegeoip
  const ip = JSON.parse(body).ip;
  return request(`https://freegeoip.app/json/${ip}`)
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`)
};

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    });
  };


module.exports = { nextISSTimesForMyLocation }