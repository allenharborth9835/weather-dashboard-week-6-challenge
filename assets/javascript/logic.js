//create a var to store the current city
var city;
//var to store the past city that have been searched
var cityArr = [];
//var to see if city exist
var cityExhist = false;

function buttonHandler(){
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    searchHandler(city)
}

function searchHandler(city){
    let currentDate = new Date();
    let cDay = currentDate.getDate()
    let cMonth = currentDate.getMonth() + 1
    let cYear = currentDate.getFullYear()
    let date = `${cMonth}/${cDay}/${cYear}`
    apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=df58c4381be6ff126a86743012407847&units=imperial`;
    fetch(apiUrl).then(response => response.json())
        .then(function(data){
            console.log(data)
            if(data.cod > 300){
                cityExhist = false;
                alert(data.message);
                return false;
            }else{
                cityExhist = true;
                let name = data.name;
                let temp = data.main.temp;
                let wind = data.wind.speed;
                let humidity = data.main.humidity;
                let lat = data.coord.lat;
                let lon = data.coord.lat;
                let info = `<h1>${name} ${date}</h1><p>temp:${temp}°F<p><p>wind:${wind} MPH</p><p>humidity:${humidity}%</p>`;
                $("#weather").html(info);
                apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=df58c4381be6ff126a86743012407847`;
                return fetch(apiUrl);
            }
        }).then(response=> response.json())
        .then(function(data){
            let uv= data.daily[0].uvi;
            $("#weather").append(`<p>uv:${uv}</p>`);
        })
    
    
}

$("#search").on("click", buttonHandler)

