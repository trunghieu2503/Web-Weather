const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');
const input = document.querySelector('.search-box input');

const weatherDescriptions = {
    'Clear': 'Trời quang',
    'Rain': 'Mưa',
    'Snow': 'Tuyết',
    'Clouds': 'Mây',
    'Mist': 'Sương mù'
};

const weatherImages = {
    'Clear': 'images/clear.png',
    'Rain': 'images/rain.png',
    'Snow': 'images/snow.png',
    'Clouds': 'images/cloud.png',
    'Mist': 'images/mist.png',
    'Default': 'images/404.png'
};

function fetchWeather() {
    const APIKey = '3a60b35f0af3dffaf7ecacf9bcbee87e';
    const city = input.value.trim();

    if (city === '') return;

    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}&units=metric`)
        .then(response => response.json())
        .then(json => {
            if (json.cod === '404') {
                container.style.height = '400px';
                weatherBox.style.display = 'none';
                weatherDetails.style.display = 'none';
                error404.style.display = 'block';
                error404.classList.add('fadeIn');
                return;
            }

            error404.style.display = 'none';
            error404.classList.remove('fadeIn');

            const image = document.querySelector('.weather-box img');
            const temperature = document.querySelector('.weather-box .temperature');
            const description = document.querySelector('.weather-box .description');
            const humidity = document.querySelector('.weather-details .humidity span');
            const wind = document.querySelector('.weather-details .wind span');

            const weatherMain = json.weather[0].main;
            const weatherImage = weatherImages[weatherMain] || weatherImages['Default'];

            image.src = weatherImage;
            temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
            description.innerHTML = weatherDescriptions[weatherMain] || 'Kiểu thời tiết không xác định';
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

            weatherBox.style.display = '';
            weatherDetails.style.display = '';
            weatherBox.classList.add('fadeIn');
            weatherDetails.classList.add('fadeIn');
            container.style.height = '590px';

            // Clear the input field after a successful search
            //input.value = '';
        })
        .catch(error => {
            console.error('Error:', error);
            container.style.height = '400px';
            weatherBox.style.display = 'none';
            weatherDetails.style.display = 'none';
            error404.style.display = 'block';
            error404.innerHTML = '<p>Oops! Đã xảy ra lỗi. Vui lòng thử lại sau.</p>';
            error404.classList.add('fadeIn');
        });
}

// Add event listener for the search button
search.addEventListener('click', fetchWeather);

// Add event listener for Enter key in the input field
input.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        fetchWeather();
    }
});
