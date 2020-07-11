const express = require("express");
const app = express();

const port = 3001;

const myCities = [
  {
    id: 1,
    cityName: "Valencia",
    country: "Spain",
    latitude: 39.46,
    longitude: -0.37,
    weather: 28.5,
  },
  {
    id: 2,
    cityName: "Paris",
    country: "france",
    latitude: 48.85,
    longitude: 2.27,
    weather: 24.5,
  },
  {
    id: 3,
    cityName: "Estambul",
    country: "Turkey",
    latitude: 41.04,
    longitude: 28.99,
    weather: 34.5,
  },
  {
    id: 4,
    cityName: "Tokyo",
    country: "Japan",
    latitude: 35.5,
    longitude: 138.64,
    weather: 29.5,
  },
];

app.get("/", (req, res) => {
  console.log("a client connected to the endpoint /");
  let data = myCities.map((city) => {
    return {
      Name: city.cityName,
      Temperature: city.weather,
    };
  });
  res.json(data);
});

app.get("/city/:cityName", (req, res) => {
  const name = req.params.cityName;
  let data = myCities
    .filter((city) => city.cityName.toLowerCase() === name.toLowerCase())
    .map((city) => {
      return {
        Name: city.cityName,
        Temperature: city.weather,
      };
    });
  res.send(data[0]);
});

app.get("/city", (req, res) => {
  const name = req.query.name;
  let data = myCities
    .filter((city) => city.cityName.toLowerCase() === name.toLowerCase())
    .map((city) => {
      return {
        Name: city.cityName,
        Temperature: city.weather,
      };
    });
  res.send(data[0]);
});
app.get("/citybyposition", (req, res) => {
  let lot = parseFloat(req.query.lat);
  let lon = parseFloat(req.query.lon);
  let data = myCities
    .filter((city) => city.latitude === lot && city.longitude === lon)
    .map((city) => {
      return {
        Name: city.cityName,
        Temperature: city.weather,
      };
    });
  res.send(data[0]);
});

app.get("/citybyid", (req, res) => {
  let id = parseFloat(req.query.id);

  let data = myCities
    .filter((city) => city.id === id)
    .map((city) => {
      return {
        Name: city.cityName,
        Temperature: city.weather,
      };
    });
  res.send(data[0]);
});

app.get("/country/:countryName", (req, res) => {
  const nameCountry = req.params.countryName;
  let data = myCities
    .filter((city) => city.country.toLowerCase() === nameCountry.toLowerCase())
    .map((city) => {
      return {
        Name: city.cityName,
        Temperature: city.weather,
      };
    });
  res.send(data);
});

app.get("/search/:text", (req, res) => {
  let myText = req.params.text.toLowerCase();

  let data = myCities
    .filter((city) => city.cityName.toLowerCase().includes(myText))
    .map((city) => {
      return {
        Name: city.cityName,
        Temperature: city.weather,
      };
    });
  res.send(data);
});

app.get("/citycrud/:id", (req, res) => {
  let id = parseFloat(req.params.id);
  let data = myCities
    .filter((city) => city.id === id)
    .map((city) => {
      return {
        Name: city.cityName,
        Temperature: city.weather,
      };
    });
  res.send(data[0]);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
