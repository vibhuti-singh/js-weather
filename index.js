const form = document.querySelector("form");
const input = document.querySelector("input");
const h1 = document.querySelector("h1");
const h2 = document.querySelector("h2");
const p = document.querySelector("p");
const image = document.querySelector("img");
const card = document.querySelector(".card");
const alertPlaceholder = document.getElementById("liveAlertPlaceholder");
const appendAlert = (message, type) => {
  const wrapper = document.createElement("div");
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    "</div>",
  ].join("");

  alertPlaceholder.append(wrapper);
};

const getWeather = async (e) => {
  e.preventDefault();
  try {
    const res =
      await fetch(`https://api.weatherapi.com/v1/current.json?key=ef48b3dcd7ca4027b1e134559233108&q=${input.value}&aqi=yes
  `);
    const data = await res.json();
    h2.innerText = data.location.name;
    h1.innerText = data.current.temp_c + "°C";
    p.innerText = data.current.condition.text;
    image.setAttribute("src", data.current.condition.icon);
    card.className = "card p-3 shadow-lg rounded-0";
  } catch (error) {
    appendAlert("Enter Valid City Name!", "danger");
  }
  form.reset();
};

form.addEventListener("submit", getWeather);

