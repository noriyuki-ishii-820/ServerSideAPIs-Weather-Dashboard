//api keys
var apiKey = "d9b320bb362508aced86c6462e027c00";
var citySearched;

// retrives the data in local storage

var rawStoredArr = localStorage.getItem("cities");
var storedArr = JSON.parse(rawStoredArr);
var cityArr = storedArr;
var today = moment().format("MMM Do YY");

// if the local storage is empty, load an empty array
if (!storedArr) {
  var cityArr = [];
}

//load any data in the local storage

$(document).ready(function () {
  if (storedArr !== false) {
    for (var i = 0; i < storedArr.length; i++) {
      var li = $("<li>");
      li.addClass("list-group-item");
      li.text(storedArr[i]);
      $(".list-group").append(li);
    }
  }

  if (cityArr.length - 1) {
    var citySearched = cityArr[cityArr.length - 1];
    displayWeather(citySearched);
  }

  localStorage.setItem("cities", JSON.stringify(cityArr));
});

// retrieve the weather info and display

function displayWeather(citySearched) {
  var queryURL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    citySearched +
    "&appid=" +
    apiKey;

  $.ajax({
    url: queryURL,
    method: "GET",
    statusCode: {
      404: function () {
        alert("Error: the city does not seem to exist. please try again.");
        $("#userInput").val("");
        cityArr.splice(-1);
        console.log(cityArr);
        $(".list-group-item:last-child").remove();
        localStorage.setItem("cities", JSON.stringify(cityArr));
        return;
      },
    },
  }).then(function (response) {
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
    $("#temperature").text("Temperature : " + temperature + " Celsius");
    $("#humidity").text("Humidity : " + humidity + " %");
    $("#windSpeed").text("Wind Speed : " + windSpeed + " meters/second(s)");

    // lon and lat info for retriving UV index

    var lon = response.coord.lon;
    var lat = response.coord.lat;

    var uvQueryURL2 =
      "https://api.openweathermap.org/data/2.5/uvi?appid=" +
      apiKey +
      "&lat=" +
      lat +
      "&lon=" +
      lon;

    $.ajax({
      url: uvQueryURL2,
      method: "GET",
    }).then(function (response2) {
      var uvIndexValue = response2.value;
      $("#uvIndex").html(
        "UV Index: " + '<span class="uvIndex">' + uvIndexValue + "</span>"
      );

      if (uvIndexValue < 2) {
        // when low
        $(".uvIndex").css("background-color", "green");
      } else if (uvIndexValue < 8) {
        // when medium
        $(".uvIndex").css("background-color", "yellowgreen");
      } else if (uvIndexValue < 20) {
        // when high
        $(".uvIndex").css("background-color", "red");
      }
    });
  });

  var queryURL3 =
    "https://api.openweathermap.org/data/2.5/forecast?q=" +
    citySearched +
    "&appid=" +
    apiKey;

  $.ajax({
    url: queryURL3,
    method: "GET",
  }).then(function (response) {
    $("#forecastHeader").text("5-Day Forecast");

    //day1
    var day1 = moment().add(1, "days");
    var day1 = moment(day1).format("DD-MM-YYYY");
    $("#day1").text(day1);

    var day1Icon = response.list[0].weather[0].icon;
    var day1IconURL = "https://openweathermap.org/img/wn/" + day1Icon + ".png";
    var iconImg = $("<img>");
    iconImg.attr("src", day1IconURL);
    $("#day1").append(iconImg);

    var day1Temp = (response.list[0].main.temp - 273.15).toFixed(2);
    $("#day1").append("<br />" + "Temp : " + day1Temp + "C");

    var day1humidity = response.list[0].main.humidity;
    $("#day1").append("<br />" + "Humidity : " + day1humidity + "%");

    //day2
    var day2 = moment().add(2, "days");
    var day2 = moment(day2).format("DD-MM-YYYY");
    $("#day2").text(day2);

    var day2Icon = response.list[8].weather[0].icon;
    var day2IconURL = "https://openweathermap.org/img/wn/" + day2Icon + ".png";
    var iconImg = $("<img>");
    iconImg.attr("src", day2IconURL);
    $("#day2").append(iconImg);

    var day2Temp = (response.list[8].main.temp - 273.15).toFixed(2);
    $("#day2").append("<br />" + "Temp : " + day2Temp + "C");

    var day2humidity = response.list[8].main.humidity;
    $("#day2").append("<br />" + "Humidity : " + day2humidity + "%");

    //day3
    var day3 = moment().add(3, "days");
    var day3 = moment(day3).format("DD-MM-YYYY");
    $("#day3").text(day3);

    var day3Icon = response.list[16].weather[0].icon;
    var day3IconURL = "https://openweathermap.org/img/wn/" + day3Icon + ".png";
    var iconImg = $("<img>");
    iconImg.attr("src", day3IconURL);
    $("#day3").append(iconImg);

    var day3Temp = (response.list[16].main.temp - 273.15).toFixed(2);
    $("#day3").append("<br />" + "Temp : " + day3Temp + "C");

    var day3humidity = response.list[16].main.humidity;
    $("#day3").append("<br />" + "Humidity : " + day3humidity + "%");

    // day4
    var day4 = moment().add(4, "days");
    var day4 = moment(day4).format("DD-MM-YYYY");
    $("#day4").text(day4);

    var day4Icon = response.list[24].weather[0].icon;
    var day4IconURL = "https://openweathermap.org/img/wn/" + day4Icon + ".png";
    var iconImg = $("<img>");
    iconImg.attr("src", day4IconURL);
    $("#day4").append(iconImg);

    var day4Temp = (response.list[24].main.temp - 273.15).toFixed(2);
    $("#day4").append("<br />" + "Temp : " + day4Temp + "C");

    var day4humidity = response.list[24].main.humidity;
    $("#day4").append("<br />" + "Humidity : " + day4humidity + "%");

    //day5
    var day5 = moment().add(5, "days");
    var day5 = moment(day5).format("DD-MM-YYYY");
    $("#day5").text(day5);

    var day5Icon = response.list[32].weather[0].icon;
    var day5IconURL = "https://openweathermap.org/img/wn/" + day5Icon + ".png";
    var iconImg = $("<img>");
    iconImg.attr("src", day5IconURL);
    $("#day5").append(iconImg);

    var day5Temp = (response.list[32].main.temp - 273.15).toFixed(2);
    $("#day5").append("<br />" + "Temp : " + day5Temp + "C");

    var day5humidity = response.list[32].main.humidity;
    $("#day5").append("<br />" + "Humidity : " + day5humidity + "%");
  });

  $("#currentWeather").css("display", "block");
  $(".col").css("display", "block");
}

$("#search").on("click", function (event) {
  event.preventDefault();
  var citySearched = $("#userInput").val().trim();

  if (!citySearched) {
    // when the input is empty/invalid, return false
    alert("Your input is not valid. Please try again!");
    $("#userInput").val("");
    return false;
  } else {
    // if valid, push the value into the array
    cityArr.push(citySearched);
  }

  // save in local storage

  localStorage.setItem("cities", JSON.stringify(cityArr));

  // clears the list before adding the loop

  $(".list-group").empty();

  //create the list of cities searched
  for (var i = 0; i < cityArr.length; i++) {
    var li = $("<li>");
    li.addClass("list-group-item");
    li.text(cityArr[i]);
    $(".list-group").append(li);

    // run the function to display weather
    displayWeather(citySearched);

    // clears the text input
    $("#userInput").val("");
  }
});

// search the weather from the history

$(".list-group").on("click", "li", function (event) {
  event.preventDefault();
  var citySearched = $(this).text();
  displayWeather(citySearched);
});

// delete button

$("#delete").on("click", function (event) {
  event.preventDefault();

  if (confirm("Would you like to delete all the search results?")) {
    localStorage.clear();
    location.reload();
  } else {
    return false;
  }
});
