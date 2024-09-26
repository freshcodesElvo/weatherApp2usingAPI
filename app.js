const api_key ="a177ad7b9d11fa3153e032b6de67cfaf";
const api_url = "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
let city_name = document.querySelector(".city-name");
let temperature = document.querySelector(".temperature");
let humidity = document.querySelector(".humidity");
let wind_speed = document.querySelector(".wind-speed");
let user_input = document.querySelector("input");
let enter_btn = document.querySelector("button");
let weather_icon = document.querySelector(".main-weather-icon") 
let weather_description = document.querySelector(".weather-description");
let error_body;

async function check_weather(city) {
    const response = await fetch(api_url + city + `&appid=${api_key}`);
    if(response.status == 404) {
     
        error_body = document.createElement("div");
        error_body.classList.add("error-message");
        error_body.innerHTML = 
        `
        <p style = "color: black"> ${user_input.value} is not a valid city, try again</P>
        `
        document.querySelector("nav").appendChild(error_body);
        document.querySelector("main").style.display = "none";
        return;
    }   
    else{
    
    let data = await response.json();
    console.log(data)

    city_name.textContent = data.name;
    temperature.textContent = Math.round(data.main.temp ) + `° C`; 
    humidity.textContent = data.main.humidity + `%`;
    wind_speed.textContent = data.wind.speed + `km/hr`;
    weather_description.textContent = data.weather[0].description;

    if(data.weather[0].main == "Clouds"){
        weather_icon.src = `images/clouds.png`

    }
    else if(data.weather[0].main == "Clear"){
        weather_icon.src = `images/clear.png`
    }
    else if(data.weather[0].main == "Rain"){
        weather_icon.src = `images/rain.png`
    }
    else if(data.weather[0].main == "Drizzle"){
        weather_icon.src = `images/drizzle.png`
    }
    else if(data.weather[0].main == "Mist"){
        weather_icon.src = `images/mist.png`
    }
    

    error_body.style.display = "none";
    document.querySelector("main").style.display = "block";
 }
}
enter_btn.addEventListener("click", ()=>{
    if(user_input.value == ""){
        alert("Please enter a city name")
        return;
    }
    else{
        check_weather(user_input.value)

        setTimeout(() => {
            user_input.value = '';
        }, 3000);
        

    }
    
    

})
let geocode = {
    reverseGeocode: function(latitude, longitude) {

  var api_key = '52c111c6f6304ed2a45f75b90e8b0e75';

  // reverse geocoding example (coordinates to address)
  
  var query = latitude + ',' + longitude;

  // forward geocoding example (address to coordinate)
  // var query = 'Philipsbornstr. 2, 30165 Hannover, Germany';
  // note: query needs to be URI encoded (see below)

  var api_url = 'https://api.opencagedata.com/geocode/v1/json'

  var request_url = api_url
    + '?'
    + 'key=' + api_key
    + '&q=' + encodeURIComponent(query)
    + '&pretty=1'
    + '&no_annotations=1';

  // see full list of required and optional parameters:
  // https://opencagedata.com/api#required-params

  var request = new XMLHttpRequest();
  request.open('GET', request_url, true);

  request.onload = function() {
    // see full list of possible response codes:
    // https://opencagedata.com/api#codes

    if (request.status === 200){
      // Success!
      var data = JSON.parse(request.responseText);
      console.log(); // print the location
     //check_weather(data.results[0].components.city)
      check_weather("nairobi")
      

    } else if (request.status <= 500){
      // We reached our target server, but it returned an error

      console.log("unable to geocode! Response code: " + request.status);
      var data = JSON.parse(request.responseText);
      console.log('error msg: ' + data.status.message);
    } else {
      console.log("server error");
    }
  };

  request.onerror = function() {
    // There was a connection error of some sort
    console.log("unable to connect to server");
  };

  request.send();  // make the request

    },
    get_location: function() {
        function success(data) {
            geocode.reverseGeocode(data.coords.latitude, data.coords.longitude);
        }
        if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(success, console.error);
        } else {
            check_weather("Nairobi")
        }
    }
}
geocode.get_location();


