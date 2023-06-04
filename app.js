const express= require("express");
const app=express();
const https=require("https");
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }))


app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
  });

  app.post("/", (req, res) => {
    cityName=req.body.city;
    console.log(cityName)
    url = "https://api.openweathermap.org/data/2.5/weather?q="+cityName+"&units=metric&appid=cd1dbcbc7126cfae108263a99bcdd383";
    https.get(url, (apiRes) => { // <-- Use a different variable name for the response object
      apiRes.on("data", (data) => {
        var ourdata = JSON.parse(data);
        var upd = ourdata.main.temp;
        var icon=ourdata.weather[0].icon;
        const iconapi="https://openweathermap.org/img/wn/"+icon+"@2x.png";
        console.log(iconapi);
        // res.write(`The current temperature is ${upd}C`);
        // res.write(`<img src="${iconapi}">`);
        // res.send();
        res.send(`
        <h1>The current temperature is ${upd}°C</h1>
        <img src="${iconapi}">
      `);

      });
    });
  });
  
app.listen(3000,()=>{
    console.log("Server is listening on port 3000");
})