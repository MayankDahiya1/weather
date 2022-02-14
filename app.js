const express = require("express");
const https = require("https");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));



app.get("/", function(req, res){
    res.sendFile(__dirname+"/index.html");


});
app.post("/",function(req,  res){
        const city = req.body.cityName;
    const api = "653299d37a487b1e04e4ac421af71b40"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&APPID="+api+"&units=metric";
    https.get(url, function(response)
{
    response.on("data",function(data){
        console.log(data);
        const weatherData = JSON.parse(data);
        console.log(weatherData);
        const temprature = weatherData.main.temp;
        const item = weatherData.weather[0].icon;
        const url2 = "http://openweathermap.org/img/wn/"+item+"@2x.png";
        res.write("<h1>Current Weather in "+city +" is "+temprature+" celcius</h1>");
        res.write("<img src="+url2+">");
    })
    console.log(response.status);
});

});




app.listen(3000, function(){
    console.log("Server at 3000 port running");
});

