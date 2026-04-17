function closePopup() {
    document.getElementById('popupOverlay').style.display = 'none';
    document.body.style.overflow = 'auto'; // Re-enable scrolling
}

function redirectToPaper() {
    window.location.href = 'https://doi.org/10.1109/ICST62969.2025.10989003';
}

function redirectToRP() {
    window.location.href = 'https://anonymous.4open.science/r/rp-evaluation-coverage-metrics-B76F/README.md';
}

function toggleInfoPanel() {
    document.getElementById('popupOverlay').style.display = 'flex';
    document.body.style.overflow = 'hidden'; // Re-enable scrolling
}
