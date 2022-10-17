// Include the express module package START.
const express = require ("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
//END



// Implement Home Route and https for API URL. 
app.get('/', function(req, res){
    //html file to the browser
    res.sendFile(__dirname + "/index.html")
});

app.post("/", function(req, res){ //catch html form POST request.

    const query = req.body.cityName; //const to hold the input value "location" from the html form.
    const apiKey = "553f47ec766a394bd28d51ed3c1d3ea9";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units=" + unit; //API URL
    
    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            const weatherData = JSON.parse(data)
            const temp = weatherData.main.temp //get the temperature "temp" data from the weather API.
            const weatherDescription = weatherData.weather[0].description //get specific data "description" from the API and displ;ay it on Hyper.
            const icon = weatherData.weather[0].icon
            const imageURL = "http://openweathermap.org/img/wn/" + icon +"d@2x.png"
            // console.log(description);
            
            //send fetched data to frontend.
            res.write("<h1>The weather is currently " + weatherDescription + "</h1>")
            res.write("<h1>The temperature in " + query + " is " + temp + " degrees Celcius.</h1>")
            res.write("<img src=" + imageURL +">");
            res.send()
            
        })
    })
    
})



app.listen(3000, function(){
    console.log("Server is running on port 3000.");
})