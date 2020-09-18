var cityArr = [];

 $("#search").on("click", function(event){
        event.preventDefault();
        var citySearched = $("#userInput").val().trim();
       
        cityArr.push(citySearched);
        
        console.log(cityArr);
        console.log(cityArr.length);

        // save in local storage

        localStorage.setItem("cities", cityArr);

        // clears the list before adding the loop
        
        $(".list-group").empty();

        //create the list of cities searched

        for (var i = 0; i < cityArr.length; i++){
            var li = $("<li>");
            li.addClass("list-group-item");
            li.text(cityArr[i]);
            $(".list-group").append(li);
        };

        $("#userInput").val('');

})


