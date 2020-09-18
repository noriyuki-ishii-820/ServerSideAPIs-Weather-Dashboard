var cityArr = [];

function displayWeather(){
    alert("Hi!");

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

        localStorage.setItem("cities", cityArr);

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

        displayWeather();
})


