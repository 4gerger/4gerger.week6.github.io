function displayWeatherInfo() {

    event.preventDefault();
    var city = $("#city-input").val().trim();
    var queryURL = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=55f1ac175bb9b52cef1535d895557542"
    var today = new Date();
    var date = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear();

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {

        $("#city-date").text(response.city.name + " " + "(" + date + ")");
        $("#current-temp").text("Temperature: " + response.list[0].main.temp);
        $("#current-humidity").text("Humidity: " + response.list[0].main.humidity + "%");
        $("#current-wind-speed").text("Wind Speed: " + response.list[0].wind.speed + "MPH");

        var latitude = response.city.coord.lat;
        var longitude = response.city.coord.lon;
        var uvURL = "http://api.openweathermap.org/data/2.5/uvi?appid=55f1ac175bb9b52cef1535d895557542&lat=" + latitude + "&lon=" + longitude

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {

            $("#current-uv").text("UV Index: " + response.value);
        });
    });

}
$(document).on("click", ".search-btn", displayWeatherInfo);

