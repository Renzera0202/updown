// Modal Selectors
const pairingModal = document.getElementById('pairingModal');
const roomModal = document.getElementById('roomModal');

document.getElementById('pairingBtn').addEventListener('click', () => {
    pairingModal.classList.remove('hidden');
});

document.getElementById('roomBtn').addEventListener('click', () => {
    roomModal.classList.remove('hidden');
});

document.querySelectorAll('.close-modal').forEach(btn => {
    btn.addEventListener('click', () => {
        pairingModal.classList.add('hidden');
        roomModal.classList.add('hidden');
    });
});

// Room join simulation
document.getElementById('joinRoomBtn').addEventListener('click', () => {
    alert("Joined temporary public room successfully!");
    roomModal.classList.add('hidden');
});

document.getElementById('pairSubmitBtn').addEventListener('click', () => {
    alert("Device pairing request sent!");
    pairingModal.classList.add('hidden');
});