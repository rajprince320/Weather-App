let api = "c9b906ed2302440f1da83c2d681335c6";
let container = document.getElementById("weather-data");
let arr = [];

// async function search(e) {
//   e.preventDefault();
//   let city = document.getElementById("input").value;
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
//   )
//     .then((res) => (document.querySelector("main").innerText = res.weather))
//     .catch((err) => console.log(err));
//   alert(city);
// }

document
  .getElementById("search-box")
  .addEventListener("submit", async function (e) {
    e.preventDefault();
    let city = document.getElementById("input").value.trim();
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}&units=metric`
    )
      .then((res) => res.json())
      .then((res) => {
        display(res);
        reset();
      })
      .catch((err) => console.log(err));
  });

function display(res) {
  if (res.message === "city not found") {
    alert("City Not Found");
    return;
  }
  for (let i = 0; i < arr.length; i++) {
    const ele = arr[i];
    if (res.name === ele.name) {
      insert = !insert;
      return;
    }
  }
  arr.push(res);
  arr.sort((a, b) => {
    return a.main.temp - b.main.temp;
  });
  container.innerHTML = "";
  arr.forEach((ele) => {
    makeCard(ele);
  });
}

function makeCard(data) {
  const card = document.createElement("div");
  card.className = "weather-card";
  const info = weatherIcon(data);
  let logo = info[0];
  let desc = info[1];
  let myCard = `
    
        <img class="img" src="${"./Resources/Rectangle1.png"}" alt="" srcset="">
        <div class="card-top">
            <h1>${Math.round(data.main.temp)}°</h1>
            <img class="png" src="${logo}" alt="">
            
        </div>
        <div class="card-bottom">
            <div class="city">
                <p>Hi: ${Math.round(data.main.temp_max)}° lo: ${Math.round(
    data.main.temp_min
  )}°</p>
                <h4>${data.name},${data.sys.country}</h4>
            </div>
            <h4 class="weather">${desc}</h4>
        </div>
    `;
  card.innerHTML = myCard;
  container.appendChild(card);
}

function weatherIcon(data) {
  let imageUrl = "";
  let desc = "";
  if (data.weather[0].main === "Clear" || data.weather[0].main === "Sunny") {
    imageUrl = "./Resources/icons/Sun cloud angled rain.png";
    desc = "Sunny";
  } else if (
    data.weather[0].main === "Storm" ||
    Math.round(data.wind.speed) >= 15
  ) {
    imageUrl = "Resources/icons/Moon cloud mid rain.png";
    desc = "Windy";
  } else if (data.weather[0].main === "Rain" || Math.round(data.rain) >= 10) {
    imageUrl = "Resources/icons/Tornado.png";
    desc = "Rainy";
  } else if (
    data.weather[0].main === "Haze" ||
    data.weather[0].main === "Cloud" ||
    Math.round(data.clouds) >= 65
  ) {
    imageUrl = "Resources/icons/Moon cloud fast wind.png";
    desc = "Cloudy";
  } else {
    imageUrl = "Resources/icons/Sun cloud angled rain.png";
    desc = "Partially Cloudy";
  }
  let info = [imageUrl, desc];
  return info;
}
