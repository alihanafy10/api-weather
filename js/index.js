
let navLink = document.querySelectorAll(".nav-item .nav-link")
navLink.forEach(function (e) {
  e.addEventListener("click", function (e) {
    navLink.forEach(function (e) {
      e.classList.remove("active");
    })
    e.target.classList.add("active")
    console.log(e.target)
   })
})



const btn = document.getElementById("btn");
const searching = document.getElementById("searching");
const row=document.getElementById("row");

weatherApi("cairo");
searching.addEventListener("click", function () {
  weatherApi(btn.value);
  btn.value = "";
})
async function weatherApi(data) {
  let weather=await fetch(`https://api.weatherapi.com/v1/forecast.json?key=4fa3f5f597364c019ad151656240701&q=${data}&days=3`)
  let dataWeather = await weather.json();
  if (!dataWeather.error) {
    displayWeather(dataWeather)
  }
}
const daysInWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const mL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
function displayWeather(dat) {
  let dateOfDay = new Date(dat.forecast.forecastday[0].date);
  let dateOfDayTwo = new Date(dat.forecast.forecastday[1].date);
  let dateOfDayThree = new Date(dat.forecast.forecastday[2].date);
  console.log(dat)
  let cartona = `
  <div class="col-md-4">
      <div class="layer rounded-4 p-4 contentDayOne">
        <div class="dayOne days d-flex justify-content-between p-2 rounded-4">
          <p class="m-0">${daysInWeek[dateOfDay.getDay()]}</p>
          <p class="m-0">${dateOfDay.getDate()}${mL[dateOfDay.getMonth()]}</p>
        </div>
        <div >
          <p class="mt-3 fs-4 mb-3">${dat.location.name}</p>
          <div class="d-flex justify-content-between align-items-center mb-4">
            <p class="text-white display-4 fw-bold">${dat.current.temp_c}&deg;C</p>
            <img src="${dat.current.condition.icon}" alt="icon">
          </div>
          <div class="stat mb-4">${dat.current.condition.text}</div>
          <ul class="contentUl align-items-center mb-4">
            <li class="d-flex align-items-center"><img class="me-1" src="imge/icon-umberella (1).png" alt="umbrella">${dat.current.wind_mph}%</li>
            <li class="d-flex align-items-center"><img class="me-1" src="imge/icon-wind.png" alt="wind">${dat.current.wind_kph}km/h</li>
            <li class="d-flex align-items-center"><img class="me-1" src="imge/icon-compass.png" alt="compass">${dat.current.wind_dir}</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="col-md-4 ">
      <div class="layer rounded-4 p-4 contentDayTwo">
        <div class="dayTwo days p-2 rounded-4 text-center mb-4">${daysInWeek[dateOfDayTwo.getDay()]}</div>
          <div class="d-flex justify-content-center align-items-center flex-column mt-4 ">
            <img class="mb-4" src="${dat.forecast.forecastday[1].day.condition.icon}" alt="icon">
            <p class="text-white fs-4 mb-4">${dat.forecast.forecastday[1].day.maxtemp_c}&deg;C</p>
            <p class="mb-4">${dat.forecast.forecastday[1].day.mintemp_c}&deg;</p>
            <div class="stat mb-4">${dat.forecast.forecastday[1].day.condition.text}</div>
          </div>
      </div>
    </div>
    <div class="col-md-4 ">
      <div class="layer rounded-4 p-4 contentDayThree">
        <div class="dayThree days p-2 rounded-4 text-center mb-4">${daysInWeek[dateOfDayThree.getDay()]}</div>
          <div class="d-flex justify-content-center align-items-center flex-column mt-4">
            <img class="mb-4" src="${dat.forecast.forecastday[2].day.condition.icon}" alt="icon">
            <p class="text-white fs-4 mb-4">${dat.forecast.forecastday[2].day.maxtemp_c}&deg;C</p>
            <p class="mb-4">${dat.forecast.forecastday[2].day.mintemp_c}&deg;</p>
            <div class="stat mb-4">${dat.forecast.forecastday[2].day.condition.text}</div>
          </div>
      </div>
    </div>
  `
  row.innerHTML = cartona;
}


let pos = document.getElementById("pos")
let tath = document.getElementById("tath")

pos.addEventListener("click", () => {

  let liveMap;
if (navigator.geolocation) {
  liveMap = navigator.geolocation.watchPosition(function (position) {
    tath.innerHTML = `
    <iframe class="w-100 rounded-4" src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d27628.787945417647!2d${position.coords.longitude}!3d${position.coords.latitude}!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sar!2seg!4v1704648149440!5m2!1sar!2seg" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
    `
    console.log(position)
   })
}
 })
