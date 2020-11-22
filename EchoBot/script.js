const input = document.querySelector('.input');
const btnSend = document.querySelector('.btn-send');
const btnGeolocation = document.querySelector('.btn-location');
const container = document.querySelector('.message-container');
const url = 'wss://echo.websocket.org/';
const websocket = new WebSocket(url);

function writeToScreen(text, event) {
  if (text) {
    const el = document.createElement('div');
    el.classList.add('message');
    el.classList.add(`${event}`);
    el.innerHTML = text;
    container.insertBefore(el, container.firstChild);
  }
}

websocket.onopen = function(event) {
  writeToScreen('Привет, я - эхо бот!', 'to-me');
};
websocket.onmessage = function(event) {
  writeToScreen(event.data, 'to-me');
};
websocket.onerror = function(event) {
  console.log('ERROR');
};

btnSend.addEventListener('click', () => {
  writeToScreen(input.value, 'from-me');
  websocket.send(input.value);
  input.value = '';
});

input.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    writeToScreen(input.value, 'from-me');
    websocket.send(input.value);
    input.value = '';
  }
});

btnGeolocation.addEventListener('click', () => {
  if ("geolocation" in navigator) {
  navigator.geolocation.getCurrentPosition((position) => {
    const { coords } = position;
    writeToScreen(`<a href="https://www.openstreetmap.org/#map=16/${coords.latitude}/${coords.longitude}" class="geolocation-link">Гео-локация</a>`, 'from-me')
  });
}
});