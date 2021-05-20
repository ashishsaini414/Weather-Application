const api = {
    key: "795da2764b6e1a0fab2d2d4afc9d72a6",
    base: "https://api.openweathermap.org/data/2.5/"
    
}
// Showing current location weather
    const currentlocation = document.querySelector('.currentlocation');
    currentlocation.addEventListener("click",()=> {
        let lon;
        let lat;
        if(navigator.geolocation)
        {
            navigator.geolocation.getCurrentPosition((position)=> {
                lon= position.coords.longitude;
                lat=position.coords.latitude;
                const proxy = "https://cors-anywhere.herokuapp.com/"
                const api=`${proxy}api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=795da2764b6e1a0fab2d2d4afc9d72a6`;
                fetch(api)
                    .then((response) => {
                    return response.json();
                })
                .then(displayResults1)
            })
        }
        
    })

    function displayResults1 (weather) {
        // console.log(weather);
        let city = document.querySelector('.location .city');
        city.innerText = `${weather.name}, ${weather.sys.country}`;
    
        let now = new Date();
        let date = document.querySelector('.location .date');
        date.innerText = dateBuilder(now);
    
        let temp = document.querySelector('.current .temp');
        temp.innerHTML = `${Math.round(weather.main.temp-273)}<span>°C</span>`;
    
        let weather_el = document.querySelector('.current .weather');
        weather_el.innerText= weather.weather[0].main;
    
        let hilow = document.querySelector('.hi-low')
        hilow.innerText= `${Math.floor(weather.main.temp_min-273)}°C (min) / ${Math.floor(weather.main.temp_max-273)}°C (max)`;
    }
// showing the searched location weather

const searchbox = document.querySelector('.search-box');
searchbox.addEventListener('keypress',setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchbox.value);
        // console.log(searchbox.value);
    }
}

function getResults (query) {
    fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
    .then(weather => {
        return weather.json();
    }).then(displayResults)
}

function displayResults (weather) {
    // console.log(weather);
    let city = document.querySelector('.location .city');
    city.innerText = `${weather.name}, ${weather.sys.country}`;

    let now = new Date();
    let date = document.querySelector('.location .date');
    date.innerText = dateBuilder(now);

    let temp = document.querySelector('.current .temp');
    temp.innerHTML = `${Math.round(weather.main.temp)}<span>°C</span>`;

    let weather_el = document.querySelector('.current .weather');
    weather_el.innerText= weather.weather[0].main;

    let hilow = document.querySelector('.hi-low')
    hilow.innerText= `${Math.floor(weather.main.temp_min)}°C (min) / ${Math.floor(weather.main.temp_max)}°C (max)`;
}

function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month= months[d.getMonth()];
    let year= d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}