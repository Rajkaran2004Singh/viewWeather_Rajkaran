const BASE_URL_LOC = 'https://geocoding-api.open-meteo.com/v1/search?name=Berlin&count=10&language=en&format=json';

const BASE_URL_WEATHER = "https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&hourly=temperature_2m";

let city = document.querySelector(".input input");
const btn = document.querySelector(".input button");
let msg = document.querySelector(".output p");

const result = async ()=>{
    currCity = city.value[0].toUpperCase();
    for(let i=1; i<city.value.length; i++){
        currCity = currCity + city.value[i].toLowerCase();
    }
    console.log(currCity);
    URL = `https://geocoding-api.open-meteo.com/v1/search?name=${currCity}&count=10&language=en&format=json`;
    let response = await fetch(URL);
    let data = await response.json();
    let ans = data.results[0];
    let lat = ans['latitude'];
    let long = ans["longitude"];

    URL_WEATHER = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&hourly=temperature_2m`;
    let newResponse = await fetch(URL_WEATHER);
    let newData = await newResponse.json();
    for(let i=0; i<24;i++){
        let text = document.createElement("p");
        text.textContent = `${newData.hourly.time[i]} : ${newData.hourly.temperature_2m[i]}°C`
        msg.append(text);
    }

}

city.addEventListener('input' , ()=>{
    msg.textContent = " ";
})

btn.addEventListener("click" , ()=>{
    result();
})


