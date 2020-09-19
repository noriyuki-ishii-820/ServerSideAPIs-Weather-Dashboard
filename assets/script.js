// retrives the data in local storage

var rawStoredArr = localStorage.getItem("cities");
var storedArr = JSON.parse(rawStoredArr);
var cityArr = storedArr;

// if the local storage is empty, load an empty array
if (!storedArr){
    var cityArr = []
};

//load any data in the local storage

$(document).ready(function(){

    // console.log(rawStoredArr);
    // console.log(storedArr);
    if (storedArr !== false) {
    for (var i = 0; i < storedArr.length; i++){
        var li = $("<li>");
        li.addClass("list-group-item");
        li.text(storedArr[i]);
        $(".list-group").append(li);
    }
    }

    localStorage.setItem("cities", JSON.stringify(cityArr));
})


// retrieve the weather info and display

function buildQueryURL(){
    var apiKey = "d9b320bb362508aced86c6462e027c00"
    var citySearched = $("#userInput").val().trim();

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=" + apiKey;

    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){

        console.log(citySearched);
        console.log(queryURL);

        var countryName = response.sys.country
        var temperature = (response.main.temp - 273.15).toFixed(2) // from kelvin (K) to celcius (C)
    
        var humidity = response.main.humidity
        var windSpeed = response.wind.speed
        //var uvIndex =  

        $("#cityName").text(citySearched + " , " + countryName);
        $("#temperature").text("Temperature : "+ temperature + " Celsius");
        $("#humidity").text("Humidity : " + humidity + " %");
        $("#windSpeed").text("Wind Speed : " + windSpeed + " meters/second(s)");


       


    

    



})};


function generateURL(){
    var queryURL = buildQueryURL();

    
 
}

 $("#search").on("click", function(event){
        event.preventDefault();
        var citySearched = $("#userInput").val().trim();

        if(!citySearched){
            alert("Your input is not valid. Please try again!");
        } else {
        cityArr.push(citySearched);
        
        // console.log(cityArr);
        // console.log(cityArr.length);

        // save in local storage

        localStorage.setItem("cities", JSON.stringify(cityArr));

        // clears the list before adding the loop
        
        $(".list-group").empty();

        //create the list of cities searched
        if (!citySearched) {
            alert("Your input is not valid. Please try again!");
        } else {
            for (var i = 0; i < cityArr.length; i++){
                var li = $("<li>");
                li.addClass("list-group-item");
                li.text(cityArr[i]);
                $(".list-group").append(li);
        }};
        }
       
        // run the function to display weather
        generateURL();

         // clears the text input 
        $("#userInput").val('');
       
})


