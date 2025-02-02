let show = document.getElementById("show");
let search = document.getElementById("search");
let cityVal = document.getElementById("city");

//Make sure you have your own key.
let key = "2f745fa85d563da5adb87b6cd4b81caf";

let getWeather = () => {
  let cityValue = cityVal.value;
  if (cityValue.length == 0) {
    show.innerHTML = `<h3 class="error">Please enter a city name</h3>`;
  }
  else {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`;
    let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${cityValue}&appid=${key}&units=metric`; 
    cityVal.value = "";
    fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        show.innerHTML = `
        <h2>${data.name}, ${data.sys.country}</h2>
        <h4 class="weather">${data.weather[0].main}</h4>
        <h4 class="desc">${data.weather[0].description}</h4>
        <img src="https://openweathermap.org/img/w/${data.weather[0].icon}.png">
        <h1>${data.main.temp} &#176;</h1>
        <div class="temp_container">
         <div>
            <h4 class="title">min</h4>
            <h4 class="temp">${data.main.temp_min}&#176;</h4>
         </div>
         <div>
            <h4 class="title">max</h4>
            <h4 class="temp">${data.main.temp_max}&#176;</h4>
         </div>   
        </div>
        `;
      })
      .catch(error => {
        console.error('Error fetching current weather data:', error);
        show.innerHTML = '<h3 class="error">City not found</h3>';
      });
      fetch(forecastUrl)
      .then((resp) => resp.json())
      .then((data) => {
        const forecast = data.list.filter((_, index) => index % 8 === 0).slice(0, 5);
        const forecastContainer = document.getElementById('forecast');
        forecastContainer.innerHTML = '';
        forecast.forEach(day => {
          const date = new Date(day.dt * 1000);
          const temp = day.main.temp;
          const description = day.weather[0].description;
          forecastContainer.innerHTML += `<div class="weather"><strong>${date.toLocaleDateString()}</strong>: ${description} with temperatures ranging from ${temp}°C to ${temp}°C.</div>`;
         }); 
        })
      .catch(error => { 
        console.error('Error fetching data:', error);
         document.getElementById('forecast').innerHTML = `<h3 class="error">City not found</h3>`;
      });
  }
};
search.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);