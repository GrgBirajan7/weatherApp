// # Getting references
const searchBtn = document.querySelector(".submit"); //Search button
const cityName = document.querySelector("#city-name"); // City name input
const currenLocation = document.querySelector(".location"); // Location
const time = document.querySelector(".time"); // Time
const windSpeed = document.querySelector(".wind-speed p"); // Wind speed
const humidityPct = document.querySelector(".humidity-pct p"); // Humidity %
const cloudPct = document.querySelector(".cloud-pct p"); // Cloud %
const temperature = document.querySelector(".temperature"); // Temperature in Celsius
const weatherStatus = document.querySelector(".middle-layer"); // Weather Status i.e Clear, Clouds, Rain, etc
const hideCard = document.querySelector(".hide"); // Hide weather details card
const alertBox = document.querySelector(".alert"); // Alert box when no city found.
const xIcon = document.querySelector(".x-icon"); // X icon to remove alert box

/* 
# Weather condtion function
	- Getting status like whether weather is clear , clouds or rain.
*/
const getWeather = (weatherCondition) => {
	if (weatherCondition === "Clear") {
		weatherStatus.innerHTML = `<i class="fa-solid fa-sun"></i>`;
	} else if (weatherCondition === "Clouds") {
		weatherStatus.innerHTML = `<i class="fa-solid fa-cloud"></i>`;
	} else if (weatherCondition === "Rain") {
		weatherStatus.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`;
	} else {
		weatherStatus.innerHTML = `<i class="fa-solid fa-sun"></i>`;
	}
};

// # Getting curren local time
const getTime = () => {
	let now = new Date();
	let hours = now.getHours();
	let mins = now.getMinutes();
	if (hours < 10) {
		hours = "0" + hours;
	}
	if (mins < 10) {
		mins = "0" + mins;
	}
	time.textContent = `${hours}:${mins}`;
};

// # Driver function
const getInfo = async (event) => {
	event.preventDefault();
	if (cityName.value === "") {
		alert("Enter city name");
		hideCard.classList.add("hide"); // Hiding weather details card
	} else {
		try {
			const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.value}&appid=b1f39a4d1419d936ac8dc7cf83e5bbba&units=metric`;
			const response = await fetch(URL);
			if (response.ok) {
				alertBox.style.display = "none"; // Hiding alert box
				const responseData = await response.json();
				const arrData = [responseData];

				// * Getting data from api
				currenLocation.textContent = `${arrData[0].name}, ${arrData[0].sys.country}`; // • Location: Dharan, Np
				windSpeed.textContent = `${arrData[0].wind.speed}m/s`; // • Wind Speed: 1.85m/s
				humidityPct.textContent = `${arrData[0].main.humidity}%`; // • E.g Humidity %: 57%
				cloudPct.textContent = `${arrData[0].clouds.all}%`; // • Cloud %: 1.85m/s
				temperature.textContent = `${Math.floor(arrData[0].main.temp)}°c`; // • Tempertature: 25°c
				const weatherCondition = arrData[0].weather[0].main; // • Weather Condtion: Clear
				getWeather(weatherCondition);
				getTime();
				hideCard.classList.remove("hide"); // Displaying weather details card
			} else {
				throw new Error("Enter proper city name");
			}
		} catch (err) {
			alertBox.style.display = "flex"; // Displaying alert box
			hideCard.classList.add("hide"); // Hiding weather details card
		}
	}
};

searchBtn.addEventListener("click", getInfo); // Calling Driver function
xIcon.addEventListener("click", () => {
	alertBox.style.display = "none"; // Hiding alert Box
	cityName.value = ""; // Clearing city name input
});
