// retrives the data in local storage

var rawStoredArr = localStorage.getItem("cities");
var storedArr = JSON.parse(rawStoredArr);
var cityArr = storedArr;

var today = moment().format("MMM Do YY");     

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
    }}
    localStorage.setItem("cities", JSON.stringify(cityArr));
})


function displayForecast(){
    var apiKey = "d9b320bb362508aced86c6462e027c00";
    var citySearched = $("#userInput").val().trim();

    $(".col-2").css("display","block");
    

    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + citySearched + "&appid=" + apiKey;
    console.log(queryURL);
    
    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){
    
            $("#forecastHeader").text("5-Day Forecast");

            //day1
            var day1 = moment().add(1, 'days');
            var day1 = moment(day1).format("DD-MM-YYYY");
            $("#day1").text(day1);
            
            var day1Icon = response.list[0].weather[0].icon;
            var day1IconURL = "http://openweathermap.org/img/wn/" + day1Icon + ".png";
            var iconImg = $("<img>"); 
            iconImg.attr("src", day1IconURL);
            $("#day1").append(iconImg);

            var day1Temp = (response.list[0].main.temp - 273.15).toFixed(2);
            $("#day1").append("<br />" + "Temp : " + day1Temp + "C");

            var day1humidity = response.list[0].main.humidity;
            $("#day1").append("<br />" +  "Humidity : " + day1humidity + "%")

            //day2
            var day2 = moment().add(2, 'days');
            var day2 = moment(day2).format("DD-MM-YYYY");
            console.log(day2);
            $("#day2").text(day2);

            var day2Icon = response.list[8].weather[0].icon;
            var day2IconURL = "http://openweathermap.org/img/wn/" + day2Icon + ".png";
            var iconImg = $("<img>"); 
            iconImg.attr("src", day2IconURL);
            $("#day2").append(iconImg);

            var day2Temp = (response.list[8].main.temp - 273.15).toFixed(2);
            $("#day2").append("<br />" + "Temp : " + day2Temp + "C")

            var day2humidity = response.list[8].main.humidity;
            $("#day2").append("<br />" +  "Humidity : " + day2humidity + "%")

            //day3
            var day3 = moment().add(3, 'days');
            var day3 = moment(day3).format("DD-MM-YYYY");
            console.log(day3);
            $("#day3").text(day3);

            var day3Icon = response.list[16].weather[0].icon;
            var day3IconURL = "http://openweathermap.org/img/wn/" + day3Icon + ".png";
            var iconImg = $("<img>"); 
            iconImg.attr("src", day3IconURL);
            $("#day3").append(iconImg);

            var day3Temp = (response.list[16].main.temp - 273.15).toFixed(2);
            $("#day3").append("<br />" + "Temp : " + day3Temp + "C");

            var day3humidity = response.list[16].main.humidity;
            $("#day3").append("<br />" +  "Humidity : " + day3humidity + "%")

            // day4
            var day4 = moment().add(4, 'days');
            var day4 = moment(day4).format("DD-MM-YYYY");
            console.log(day4);
            $("#day4").text(day4);

            var day4Icon = response.list[24].weather[0].icon;
            var day4IconURL = "http://openweathermap.org/img/wn/" + day4Icon + ".png";
            var iconImg = $("<img>"); 
            iconImg.attr("src", day4IconURL);
            $("#day4").append(iconImg);

            var day4Temp = (response.list[24].main.temp - 273.15).toFixed(2);
            $("#day4").append("<br />" + "Temp : " + day4Temp + "C")

            var day4humidity = response.list[24].main.humidity;
            $("#day4").append("<br />" +  "Humidity : " + day4humidity + "%")


            //day5
            var day5 = moment().add(5, 'days');
            var day5 = moment(day5).format("DD-MM-YYYY");
            console.log(day5);
            $("#day5").text(day5);

            var day5Icon = response.list[32].weather[0].icon;
            var day5IconURL = "http://openweathermap.org/img/wn/" + day5Icon + ".png";
            var iconImg = $("<img>"); 
            iconImg.attr("src", day5IconURL);
            $("#day5").append(iconImg);

            var day5Temp = (response.list[32].main.temp - 273.15).toFixed(2);
            $("#day5").append("<br />" + "Temp : " + day5Temp + "C");

            var day5humidity = response.list[32].main.humidity;
            $("#day5").append("<br />" +  "Humidity : " + day5humidity + "%")
    })
}


// retrieve the weather info and display

function buildQueryURL(){
    var apiKey = "d9b320bb362508aced86c6462e027c00"
    var citySearched = $("#userInput").val().trim();

    $("#currentWeather").css("display","block");

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + citySearched + "&appid=" + apiKey;

    $.ajax({
        url:queryURL,
        method:"GET"
    }).then(function(response){

        // console.log(citySearched);
        //console.log(queryURL);

        // weather info except UV index
        var countryName = response.sys.country;
        var weatherIcon = response.weather[0].icon;
        var iconURL = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
        var temperature = (response.main.temp - 273.15).toFixed(2); // from kelvin (K) to celcius (C)
        var humidity = response.main.humidity;
        var windSpeed = response.wind.speed;
        
        var iconImg = $("<img>"); //create image tag for the weather icon

        //display weather info
        $("#cityName").text(citySearched + ", " + countryName + " (" + today + ")");
        iconImg.attr("src", iconURL);
        $("#cityName").append(iconImg);
        $("#temperature").text("Temperature : "+ temperature + " Celsius");
        $("#humidity").text("Humidity : " + humidity + " %");
        $("#windSpeed").text("Wind Speed : " + windSpeed + " meters/second(s)");

        // lon and lat info for retriving UV index

        var lon = response.coord.lon;
        var lat = response.coord.lat;

        var uvQueryURL = "http://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "&lat=" + lat + "&lon=" + lon;
    
            $.ajax({
                url:uvQueryURL,
                method:"GET"
            }).then(function(response){
                var uvIndexValue = response.value;
                $("#uvIndex").prepend("UV Index : ");
                $("#uvText").text(uvIndexValue);  

                if(uvIndexValue < 2) {  // when low
                    $("#uvText").css("background-color", "green");
                } else if (uvIndexValue < 8) {   // when medium
                    $("#uvText").css("background-color", "rgb(168, 166, 50)");
                } else if (uvIndexValue < 12) { // when high
                    $("#uvText").css("background-color", "red");
                }
            })         
    })

    displayForecast();

};


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
        buildQueryURL();

         // clears the text input 
        $("#userInput").val('');
       
})

// $("#delete").on("click", function(event){
//     event.preventDefault();
//     localStorage.clear();
//     $(".list-group").empty();
    

// });

