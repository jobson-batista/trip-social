// CONFIGS
const CONVOY_ID = "123e4567-e89b-12d3-a456-426614174000"; // Fake UUID
const USER_ID = "999e4567-e89b-12d3-a456-426614174999";

let stompClient = null;
let watchId = null;

const connIndicator = document.getElementById('conn-indicator');
const carsCountEl = document.getElementById('cars-count');
const mapMock = document.getElementById('map-mock');

// ----- WEBSOCKET CONNECTION -----
function connect() {
    console.log("Connecting to WebSocket...");
    const socket = new SockJS('/ws/travel');
    stompClient = Stomp.over(socket);

    // Disable debug logs on production
    stompClient.debug = null;

    stompClient.connect({}, function (frame) {
        console.log('Connected: ' + frame);
        setOnlineStatus(true);

        // Assina o tópico deste comboio
        stompClient.subscribe(`/topic/convoy/${CONVOY_ID}`, function (message) {
            handlePingReceived(JSON.parse(message.body));
        });

        // Iniciar rastreio GPS simulado
        startGpsTracking();
    }, function (error) {
        console.error("STOMP error", error);
        setOnlineStatus(false);
        // Tenta reconectar a cada 5 segundos
        setTimeout(connect, 5000);
    });
}

// ----- LOCATIONS & PINGS -----
function startGpsTracking() {
    if (watchId) return;

    // Usando Mock por enquanto (Se tivéssemos HTTPS, usaríamos navigator.geolocation)
    console.log("GPS Tracker started.");
    watchId = setInterval(() => {
        if (stompClient && stompClient.connected) {
            const ping = {
                userId: USER_ID,
                lat: -23.5505 + (Math.random() * 0.01),
                lon: -46.6333 + (Math.random() * 0.01),
                speed: 80 + Math.random() * 20, // 80 a 100 km/h
                timestamp: new Date().toISOString()
            };
            stompClient.send(`/app/convoy/${CONVOY_ID}/location`, {}, JSON.stringify(ping));

            // Auto Update da minha bolinha no mapa (Vai e volta pra simular)
            document.querySelector('.my-car').style.left = `${10 + Math.random() * 10}%`;
        }
    }, 3000);
}

const activeCars = new Map();

function handlePingReceived(ping) {
    if (ping.userId === USER_ID) return; // Ignora o próprio eco

    activeCars.set(ping.userId, Date.now());
    renderOtherCars();

    // Atualiza contador
    carsCountEl.innerText = `${activeCars.size + 1} / 4`;
}

function renderOtherCars() {
    // Remove os velhos do DOM
    document.querySelectorAll('.other-car').forEach(e => e.remove());

    // Cria novas posições randomicas apenas para a imersão visual Theatrics
    let count = 1;
    activeCars.forEach((lastSeen, id) => {
        const dot = document.createElement('div');
        dot.className = 'car-dot other-car';
        dot.innerText = `C${count}`;
        dot.style.left = `${30 + (count * 15)}%`; // Distribui no radar
        mapMock.appendChild(dot);
        count++;
    });
}

// ----- OFFLINE/ONLINE STATE UI -----
function setOnlineStatus(isOnline) {
    if (isOnline) {
        document.body.classList.remove('is-offline');
        document.getElementById('offline-banner').classList.add('hidden');
        connIndicator.classList.add('online');
    } else {
        document.body.classList.add('is-offline');
        document.getElementById('offline-banner').classList.remove('hidden');
        connIndicator.classList.remove('online');
    }
}

// Inicia conexão caso o Window carregue
window.addEventListener('load', () => {
    connect();
});
