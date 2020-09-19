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

    console.log(rawStoredArr);
    console.log(storedArr);

    for (var i = 0; i < storedArr.length; i++){
        var li = $("<li>");
        li.addClass("list-group-item");
        li.text(storedArr[i]);
        $(".list-group").append(li);

    // jQuery.each(storedArr, function(){
    //     var li = $("<li>");
    //     li.addClass("list-group-item");
    //     li.text(storedArr);
    //     $(".list-group").append(li);    
    }
    localStorage.setItem("cities", JSON.stringify(cityArr));
})
// })



function displayWeather(){
 
}

 $("#search").on("click", function(event){
        event.preventDefault();
        var citySearched = $("#userInput").val().trim();

        if(!citySearched){
            alert("Your input is not valid. Please try again!");
        } else {
        cityArr.push(citySearched);
        
        console.log(cityArr);
        console.log(cityArr.length);

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
        // clears the text input 

        $("#userInput").val('');

        // run the function to display weather
        displayWeather();
})


