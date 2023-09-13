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
