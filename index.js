const API_KEY = 'ab766d4f24b38ce7661d6c497b696c2c';

const elIconWeather = document.getElementById('icon-weather');
const elTemperature = document.getElementById('temperature');
const elLocal = document.getElementById('local');
const elHumidity = document.getElementById('humidity');
const elWindSpeed = document.getElementById('wind-speed');
const elCard = document.querySelector('.card');

function getData(city) {
    const route = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=pt_br&units=metric&appid=${API_KEY}`;
    return fetch(route).then(response => response.json());
}

function loadInformation() {
    const value = document.querySelector('[name="local"]').value;

    getData(value).then(data => {
        elCard.classList.add('active');

        if (data.cod == '404') {
            elCard.classList.remove('active');
            return;
        }

        elTemperature.innerHTML = Math.floor(data.main.temp) + '°C';
        elLocal.innerHTML = data.name;
        elHumidity.innerHTML = data.main.humidity + '%';
        elWindSpeed.innerHTML = data.wind.speed + ' km/h';

        const icon = data.weather[0].main.toLocaleLowerCase();
        const src = `./assets/icons/${icon}.png`;
        elIconWeather.setAttribute('src', src);

        fadeIn();
    });
}

function handleSubmit(event) {
    event.preventDefault();
    fadeOut();
}

function fadeIn() {
    const timeline = gsap.timeline();
    const configFrom = { y: -50 };
    const configTo = { y: 0, duration: 0.4, opacity: 0.5, ease: 'back' };

    timeline.fromTo('#icon-weather', configFrom, configTo);
    timeline.fromTo('#temperature', configFrom, configTo, 0.1);
    timeline.fromTo('#local', configFrom, configTo, 0.2);
    timeline.fromTo('footer', configFrom, configTo, 0.3);
}

function fadeOut() {
    const timeline = gsap.timeline({ onComplete: loadInformation });
    const config = { y: 50, duration: 1, opacity: 0, ease: 'slow' };

    timeline.to('footer', config);
    timeline.to('#local', config, 0.1);
    timeline.to('#temperature', config, 0.2);
    timeline.to('#icon-weather', config, 0.3);
}

document.querySelector('form').addEventListener('submit', handleSubmit);
