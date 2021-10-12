const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const app = express();

// Define paths for Express Config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Set up handel bar and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Set up static directory to serve
app.use(express.static(publicDirPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather Report",
    name: "Rahul",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Rahul",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Rahul",
  });
});
// Setting up query string
// Endpoint
// An "exposed JSON endpoint" is a publicly available URL (sometimes with query or path parameters added by you) which you can send an HTTP request to and it will return JSON from the remote server that is related to the request you sent.
app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ Error: "Address must be provided in query " });
  }
  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send(error);
      }
      forecast(
        latitude,
        longitude,
        (error, { description, temperature, feelslike } = {}) => {
          if (error) {
            return res.send(error);
          }
          res.send({
            forecast: `${description} , it is ${temperature} degree C but it feels like ${feelslike} degree C`,
            location,
            address: req.query.address,
          });
        }
      );
    }
  );
});

// My 404 Page
// It should always be at last
app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rahul",
    errorMessage: "Help Article not found",
  });
});
app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Rahul",
    errorMessage: "Page not found",
  });
});

app.listen(3000, () => {
  console.log("Server is up on localhost:3000");
}); // start the server at port 3000
