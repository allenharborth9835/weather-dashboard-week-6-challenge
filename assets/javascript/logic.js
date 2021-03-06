//var to store the past city that have been searched
var citysArr = [];

//search button takes in input
function searchButtonHandler(){
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
}

//city button that shows past city already searched
function cityButtonHandler(){
    let city = $(this).text();
    search(city);
}

//fetch that pulls in weather data
function search(city){
    $("#daily").html("")
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=df58c4381be6ff126a86743012407847&units=imperial`;
    fetch(apiUrl).then(response => response.json())
        .then(
            data => {getWeather(data)}
    )
}

//function that handles data that is taken in
function getWeather(data){
    if(data.cod > 300){
        alert(data.message);
        return false;
    }else{
        let date = moment().format("l") 
        let name = data.name;
        let temp = data.main.temp;
        let wind = data.wind.speed;
        let humidity = data.main.humidity;
        let lat = data.coord.lat;
        let lon = data.coord.lon;
        let source = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
        let info = `<h1>${name} (${date})<img src=${source}></h1>
            <p>temp:${temp}°F</p>
            <p>wind:${wind} MPH</p>
            <p>humidity:${humidity}%</p>`;
        $("#weather").html(info);
        buildButton(name)
        apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=df58c4381be6ff126a86743012407847&units=imperial`;
        return fetch(apiUrl).then(response=> response.json())
        .then(
            data =>{getFive(data)}
        )
    }
}

//function that takes in 5 day weather data
function getFive(data){
    let uv = data.daily[0].uvi;
    let uvIndex = ""
    if(uv<=3)
        {uvIndex = "uvLow";}
    else if(uv<=5 & uv>3)
        {uvIndex = "uvMed";}
    else if(uv<=8 & uv>5)
        {uvIndex = "uvHi";}
    else if(uv<=11 & uv>8)
        {uvIndex = "uvEh";}
    else
        {uvIndex = "uvEx";}
    $("#weather").append(`<p>uv:<span class="badge badge-pill ${uvIndex}">${uv}<span></p>`);
    for(let i = 0; i<5; i++){
        let date = moment().add((i+1), 'days').format('l');
        let source = `http://openweathermap.org/img/wn/${data.daily[i].weather[0].icon}@2x.png`;
        let temp = data.daily[i].temp.day;
        let wind = data.daily[i].wind_speed;
        let Humidity = data.daily[i].humidity;
        let info = `<div class='col-12 col-lg-12 col-xl-2 mb-3 cardCont'>
            <div class='card forcastCard'>
            <h3>${date}</h3>
            <img width="50" height="50" src=${source}>
            <p>Temp:${temp}°F</p>
            <p>Wind:${wind} MPH</p>
            <p>Humidity:${Humidity}%</p>
            </div></div>`
        $("#daily").append(info)
    }
    return false;
}

//function that makes button of succesful city searches
function buildButton(city){
    if(!(citysArr.includes(city))){
        let cityButtonEl = document.createElement("button");
        $(cityButtonEl).text(city);
        $(cityButtonEl).addClass("col-12 cityBtn");
        $("#citys").append(cityButtonEl);
        citysArr+=city;
        return;
    }
    else{
        return false;
    }
}
//button actions for both search button and city buttons
$("#search").on("click", searchButtonHandler)
$("#citys").on("click",".cityBtn", cityButtonHandler)

