const key = "64f2ee2a8261daa4d9f780f5b365f275";
let city = "Irvine";

//get current time and date
const date = moment().format("dddd, MMMM Do YYYY");
const dateTime = moment().format("YYYY-MM-DD HH:MM:SS");

const cityHistory = [];
//Will save the text value of the search and save it to an array and storage
$(".search").on("click", function (event) {
  event.preventDefault();
  city = $(this).parent(".btnPar").siblings(".textVal").val().trim();
  if (city === "") {
    return;
  }

  cityHistory.push(city);

  localStorage.setItem("city", JSON.stringify(cityHist));
  fiveForecastEl.empty();
  getHistory();
  getWeatherToday();
});

//Will create buttons based on search history

//Will create buttons based on search history
var contHistEl = $(".cityHist");
function getHistory() {
  contHistEl.empty();

  for (let i = 0; i < cityHist.length; i++) {
    let rowEl = $("<row>");
    let btnEl = $("<button>").text(`${cityHist[i]}`);

    rowEl.addClass("row histBtnRow");
    btnEl.addClass("btn btn-outline-secondary histBtn");
    btnEl.attr("type", "button");

    contHistEl.prepend(rowEl);
    rowEl.append(btnEl);
  }
  if (!city) {
    return;
  }
  //Allows the buttons to start a search as well
  $(".histBtn").on("click", function (event) {
    event.preventDefault();
    city = $(this).text();
    fiveForecastEl.empty();
    getWeatherToday();
  });
}

//Grab the main 'Today' card body.
let cardTodayBody = $(".cardBodyToday");

//Applies the weather data to the today card and then launches the five day forecast
function getWeatherToday() {
  var getUrlCurrent = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${key}`;

  $(cardTodayBody).empty();

  $.ajax({
    url: getUrlCurrent,
    method: "GET",
  }).then(function (response) {
    $(".cardTodayCityName").text(response.name);
    $(".cardTodayDate").text(date);
    //Icons
    $(".icons").attr(
      "src",
      `https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`
    );
    // Temperature
    let pEl = $("<p>").text(`Temperature: ${response.main.temp} °F`);
    cardTodayBody.append(pEl);
    //Feels Like
    let pElTemp = $("<p>").text(`Feels Like: ${response.main.feels_like} °F`);
    cardTodayBody.append(pElTemp);
    //Humidity
    let pElHumid = $("<p>").text(`Humidity: ${response.main.humidity} %`);
    cardTodayBody.append(pElHumid);
    //Wind Speed
    let pElWind = $("<p>").text(`Wind Speed: ${response.wind.speed} MPH`);
    cardTodayBody.append(pElWind);
    //Set the lat and long from the searched city
    let cityLon = response.coord.lon;
    // console.log(cityLon);
    let cityLat = response.coord.lat;
    // console.log(cityLat);

    let getUrlUvi = `https://api.openweathermap.org/data/2.5/onecall?lat=${cityLat}&lon=${cityLon}&exclude=hourly,daily,minutely&appid=${key}`;

    $.ajax({
      url: getUrlUvi,
      method: "GET",
    }).then(function (response) {
      let pElUvi = $("<p>").text(`UV Index: `);
      let uviSpan = $("<span>").text(response.current.uvi);
      let uvi = response.current.uvi;
      pElUvi.append(uviSpan);
      cardTodayBody.append(pElUvi);
      //set the UV index to match an exposure chart severity based on color
      if (uvi >= 0 && uvi <= 2) {
        uviSpan.attr("class", "green");
      } else if (uvi > 2 && uvi <= 5) {
        uviSpan.attr("class", "yellow");
      } else if (uvi > 5 && uvi <= 7) {
        uviSpan.attr("class", "orange");
      } else if (uvi > 7 && uvi <= 10) {
        uviSpan.attr("class", "red");
      } else {
        uviSpan.attr("class", "purple");
      }
    });
  });
  getFiveDayForecast();
}

// git
