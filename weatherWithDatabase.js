const express = require("express");

const app = express();
const fs = require("fs");
let rawData = fs.readFileSync("myCities.json");
let myCities2 = JSON.parse(rawData);
app.use(express.urlencoded());
app.use(express.json());

const saveCities = (cities) => {
  let text = JSON.stringify(cities);
  fs.writeFileSync("myCities.json", text);
};
const port = 3002;

app.get("/citycrud/:id", (req, res) => {
  let id = parseFloat(req.params.id);
  let data = myCities2.filter((city) => city.id === id);

  res.send(data[0]);
});

app.post("/citycrud", (req, res) => {
  console.log(req.body); // your JSON
  let newCity = req.body;
  newCity.id = myCities2.length + 1;
  myCities2.push(newCity);
  saveCities(myCities2);
  res.send(newCity);
});
app.put("/citycrud/:id", (req, res) => {
  let id = parseFloat(req.params.id);
  let data = myCities2.filter((city) => city.id !== id);
  let newCity = req.body;
  newCity.id = id;
  data.push(newCity);
  console.log(data);
  saveCities(data);
  res.send(data);
});

app.delete("/citycrud/:id", (req, res) => {
  let id = parseFloat(req.params.id);
  let data = myCities2.filter((city) => city.id !== id);
  console.log(data);
  saveCities(data);
  res.send(data);
});

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);
