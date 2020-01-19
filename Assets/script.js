let savedCitySearch = JSON.parse(localStorage.getItem("cities-searched")) || [];

console.log(savedCitySearch);

function displayWeatherInfo() {

    event.preventDefault();

    let city = $("#city-input").val().trim();
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=55f1ac175bb9b52cef1535d895557542";

    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        $("#current-temp").text("Temperature: " + response.main.temp + String.fromCharCode(176) + "F");
        $("#current-humidity").text("Humidity: " + response.main.humidity + "%");
        $("#current-wind-speed").text("Wind Speed: " + response.wind.speed + "MPH");

    });

    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=55f1ac175bb9b52cef1535d895557542";

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        saveSearch(response);

        let currentDateTime = response.list[0].dt_txt;
        let currentYear = currentDateTime.slice(0, 4);
        let currentMonth = currentDateTime.slice(5, 7);
        let currentDay = currentDateTime.slice(8, 10);
        let iconURL = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png"

        console.log(response.list[0].weather.icon);

        $("#city-date").text(response.city.name + " " + currentDay + "/" + currentMonth + "/" + currentYear);

        $("#current-icon").attr({"src": iconURL, "alt": "weather-icon"});

        $("#weather-forecast").text("5-Day Forecast");

        let i = 0;

        $("div[id^='card-']").each(function () {
            let dailyIncr = 7 + (8 * i);

            let dateTime = response.list[dailyIncr].dt_txt;
            let year = dateTime.slice(0, 4);
            let month = dateTime.slice(5, 7);
            let day = dateTime.slice(8, 10);

            let ddMMYYYY = day + "/" + month + "/" + year
            let weatherCondURL = "http://openweathermap.org/img/wn/" + response.list[dailyIncr].weather[0].icon + ".png";
            let temp = "Temp: " + response.list[dailyIncr].main.temp + String.fromCharCode(176) + "F";
            let humidity = "Humidity: " + response.list[dailyIncr].main.humidity + "%";
            let weatherIcon = $("<img>").attr({"src": weatherCondURL, "alt": "weathercond-icon"});


            $(this).first().html(ddMMYYYY + "<br/>" + temp + "<br/>" + humidity);
            $(this).append(weatherIcon);
            i += 1;
        });

        let latitude = response.city.coord.lat;
        let longitude = response.city.coord.lon;
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=55f1ac175bb9b52cef1535d895557542&lat=" + latitude + "&lon=" + longitude

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#current-uv").text("UV Index: " + response.value);
        });
    });
}

$(document).on("click", ".search-btn", displayWeatherInfo);

function saveSearch(response) {

    let city = response.city.name;


    savedCitySearch.push(city);
    console.log("pushed");

    localStorage.setItem("cities-searched", JSON.stringify(savedCitySearch));

}

function renderButtons() {
    let searchHistory = $("#search-history");
    for (let i = 0; i < savedCitySearch.length; i++) {
        let historyButton = $("<li>");
        searchHistory.append(historyButton.text(savedCitySearch[i]));
    }
}

renderButtons();

window.onload = lastSearch

function lastSearch() {
    let city = savedCitySearch[savedCitySearch.length-1];
    let currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=55f1ac175bb9b52cef1535d895557542";

    $.ajax({
        url: currentWeatherURL,
        method: "GET"
    }).then(function (response) {

        console.log(response);
        $("#current-temp").text("Temperature: " + response.main.temp + String.fromCharCode(176) + "F");
        $("#current-humidity").text("Humidity: " + response.main.humidity + "%");
        $("#current-wind-speed").text("Wind Speed: " + response.wind.speed + "MPH");

    });

    let forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=imperial&appid=55f1ac175bb9b52cef1535d895557542";

    $.ajax({
        url: forecastURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        let currentDateTime = response.list[0].dt_txt;
        let currentYear = currentDateTime.slice(0, 4);
        let currentMonth = currentDateTime.slice(5, 7);
        let currentDay = currentDateTime.slice(8, 10);
        let iconURL = "http://openweathermap.org/img/wn/" + response.list[0].weather[0].icon + "@2x.png"

        console.log(response.city.name);

        $("#city-date").text(response.city.name + " " + currentDay + "/" + currentMonth + "/" + currentYear);

        $("#current-icon").attr({"src": iconURL, "alt": "weather-icon"});

        $("#weather-forecast").text("5-Day Forecast");

        let i = 0;

        $("div[id^='card-']").each(function () {
            let dailyIncr = 7 + (8 * i);

            let dateTime = response.list[dailyIncr].dt_txt;
            let year = dateTime.slice(0, 4);
            let month = dateTime.slice(5, 7);
            let day = dateTime.slice(8, 10);

            let ddMMYYYY = day + "/" + month + "/" + year
            let weatherCondURL = "http://openweathermap.org/img/wn/" + response.list[dailyIncr].weather[0].icon + ".png";
            let temp = "Temp: " + response.list[dailyIncr].main.temp + String.fromCharCode(176) + "F";
            let humidity = "Humidity: " + response.list[dailyIncr].main.humidity + "%";
            let weatherIcon = $("<img>").attr({"src": weatherCondURL, "alt": "weathercond-icon"});

            $(this).first().html(ddMMYYYY + "<br/>" + temp + "<br/>" + humidity);
            $(this).append(weatherIcon);
            i += 1;
        });

        let latitude = response.city.coord.lat;
        let longitude = response.city.coord.lon;
        let uvURL = "https://api.openweathermap.org/data/2.5/uvi?appid=55f1ac175bb9b52cef1535d895557542&lat=" + latitude + "&lon=" + longitude

        $.ajax({
            url: uvURL,
            method: "GET"
        }).then(function (response) {
            $("#current-uv").text("UV Index: " + response.value);
        });
    });
}