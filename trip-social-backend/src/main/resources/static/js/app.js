// ----- SERVICE WORKER REGISTRATION -----
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
            .then((registration) => {
                console.log('SW Registered with scope:', registration.scope);
            })
            .catch((error) => {
                console.log('SW Registration failed:', error);
            });
    });
}

// ----- NETWORK LISTENER (Fallbacks pro UI) -----
window.addEventListener('online', () => {
    console.log("Navigator is Online. Will let STOMP re-connect naturally.");
    if (typeof connect === "function") connect();
});

window.addEventListener('offline', () => {
    console.warn("Navigator is Offline.");
    if (typeof setOnlineStatus === "function") setOnlineStatus(false);
});

// ----- UI INTERACTIONS (Audio Mock & Buttons) -----
const btnPtt = document.getElementById('btn-ptt');
let isRecording = false;

// Eventos de Touch para o botão gigante
btnPtt.addEventListener('mousedown', startPtt);
btnPtt.addEventListener('touchstart', startPtt);
btnPtt.addEventListener('mouseup', stopPtt);
btnPtt.addEventListener('touchend', stopPtt);
btnPtt.addEventListener('mouseleave', stopPtt);

function startPtt(e) {
    e.preventDefault();
    if (isRecording) return;
    isRecording = true;

    btnPtt.style.backgroundColor = 'var(--color-danger)';
    btnPtt.style.color = '#fff';
    btnPtt.innerHTML = `<svg viewBox="0 0 24 24" fill="none" class="icon-mic" stroke="currentColor" stroke-width="2">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="16"></line>
        <line x1="8" y1="12" x2="16" y2="12"></line>
    </svg><br/>GRAVANDO...`;

    // Haptic feedback se suportado
    if (navigator.vibrate) navigator.vibrate(100);
}

function stopPtt(e) {
    e.preventDefault();
    if (!isRecording) return;
    isRecording = false;

    btnPtt.style.backgroundColor = '';
    btnPtt.style.color = '';
    btnPtt.innerHTML = `<svg viewBox="0 0 24 24" fill="none" class="icon-mic" stroke="currentColor" stroke-width="2">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"></path>
        <line x1="12" y1="19" x2="12" y2="23"></line>
        <line x1="8" y1="23" x2="16" y2="23"></line>
    </svg><br/>SEGURE PARA<br/>FALAR`;

    if (navigator.vibrate) navigator.vibrate([50, 50, 50]); // Vibração dupla confirmando envio

    // TODO: Enviar blob via rest ou indexdb
    console.log("Áudio gravado!");
}

// Botões cegos de alerta
document.getElementById('btn-hazard').addEventListener('click', () => {
    alert("ALERTA EMITIDO AO COMBOIO: PERIGO NA VIA DETECTADO.");
    if (navigator.vibrate) navigator.vibrate([200, 100, 200, 100, 200]);
});

document.getElementById('btn-stop').addEventListener('click', () => {
    alert("NOTIFICAÇÃO ENVIADA: O LÍDER SUGERIU UMA PARADA EM BREVE.");
});
