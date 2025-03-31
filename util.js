function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function redirectToLink() {
    alert("This link does not exist yet");
    // window.location.href = 'https://www.example.com';
}

function redirectToRP() {
    window.location.href = 'https://anonymous.4open.science/r/rp-evaluation-coverage-metrics-B76F/README.md';
}

function toggleInfoPanel() {
    document.getElementById('popupOverlay').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Re-enable scrolling
}