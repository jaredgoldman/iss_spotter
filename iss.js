const request = require('request');

const fetchMyIP = function(callback) {
  request('https://api.ipify.org?format=json', function(error, response, body) {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response}`;
      callback(Error(msg), null);
      return;
    }
    let ip = JSON.parse(body).ip;
    return callback(null, ip);
  });
};

const fetchCoordsByIp = function(ip, callback) {
  request(`https://freegeoip.app/json/${ip}`, function(error, response, body) {
    if (error) {
      return callback(error, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response}`;
      return callback(Error(msg), null);
    }
    const { latitude, longitude } = JSON.parse(body);
    return callback(null, { latitude, longitude });
  });
};

const fetchISSFlyOverTimes = function(coords, callback) {
  const longitude = coords.longitude.toFixed(1);
  const latitude = coords.latitude.toFixed(1);
  request(`http://api.open-notify.org/iss-pass.json?lat=${latitude}&lon=${longitude}`, function(error, response, body) {
    if (error) {
      return callback(error.statusCode, null);
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.statusCode}`;
      return callback(Error(msg), null);
    }
    const passes = JSON.parse(body).response;
    return callback(null, passes);
  });
};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      return;
    }
    fetchCoordsByIp(ip, (error, data) => {
      if (error) {
        return;
      }
      fetchISSFlyOverTimes(data, (error, data) => {
        if (error) {
          return;
        }
        return callback(null, data);
      });
    });
  });
};

//http://api.open-notify.org/iss-pass.json?lat=-793&lon=43
// http://api.open-notify.org/iss-pass.json?lat=LAT&lon=LON

module.exports = { nextISSTimesForMyLocation };