const request = require("postman-request");
//  Geocoding
//  Location -> Lat/Longitude -> Weather info

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoicmFodWwwNzEwOSIsImEiOiJja3VndDMybjYxcmgwMnJtdHcycHZ1aXUzIn0.LGI-cRKnITAlTBHJ-Nv9pg&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback(
        {
          Error:
            "Unable to Connect to server , Please Check Your internet Connection .",
        },
        undefined
      );
    } else if (body.features.length === 0) {
      callback(
        { Error: "Please Check if you have entered the correct Location" },
        undefined
      );
    } else {
      const { center, place_name } = body.features[0]; //Current data
      callback(undefined, {
        latitude: center[1],
        longitude: center[0],
        location: place_name,
      });
    }
  });
};

module.exports = geocode;
