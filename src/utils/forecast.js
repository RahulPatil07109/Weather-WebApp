const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=742cb964e212dcf9d83a0c6894d8b7c4&query=" +
    encodeURIComponent(latitude) +
    "," +
    encodeURIComponent(longitude) +
    "&units=m";
  //   console.log(url);
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback({ Error: "Unable to connect to weather service" }, undefined);
    } else if (body.error) {
      callback({ Error: "Unable to find location" }, undefined);
    } else {
      callback(undefined, {
        description: body.current.weather_descriptions[0],
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
      });
    }
  });
};

module.exports = forecast;
