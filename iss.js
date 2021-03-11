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
    let geoLocObject = returnGeoLocObject(body);
    return callback(null, geoLocObject);
  });
};

const returnGeoLocObject = function(json) {
  const responseObj = JSON.parse(json);
  const latitude = responseObj.latitude;
  const longitude = responseObj.longitude;
  const returnObj = {};
  returnObj.latitude = latitude;
  returnObj.longitude = longitude;
  return returnObj;
};

module.exports = { fetchMyIP, fetchCoordsByIp };