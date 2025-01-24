function updateInputFields() {
    const scenario = document.getElementById('scenario').value;
    const magnitudeInput = document.getElementById('magnitude-input');
    const axInput = document.getElementById('ax-input');
    const ayInput = document.getElementById('ay-input');

    // Hide all inputs first
    magnitudeInput.classList.add('hidden');
    axInput.classList.add('hidden');
    ayInput.classList.add('hidden');

    // Show relevant inputs based on scenario
    switch (scenario) {
        case 'magnitude_angle':
            magnitudeInput.classList.remove('hidden');
            break;
        case 'ax_angle':
            axInput.classList.remove('hidden');
            break;
        case 'ay_angle':
            ayInput.classList.remove('hidden');
            break;
    }
}

function calculate() {
    // Show modal instead of calculating
    document.getElementById('adminModal').style.display = 'block';
}

function checkPassword() {
    const password = document.getElementById('adminPassword').value;
    if (password.toLowerCase() === 'kausthubhisgreat') {
        document.getElementById('adminModal').style.display = 'none';
        calculateResults();
    } else {
        alert('Wrong password!');
    }
}

function calculateResults() {
    const scenario = document.getElementById('scenario').value;
    const angle = parseFloat(document.getElementById('angle').value);
    let result = {};

    if (isNaN(angle)) {
        showError("Please enter a valid angle");
        return;
    }

    try {
        switch (scenario) {
            case 'magnitude_angle':
                const magnitude = parseFloat(document.getElementById('magnitude').value);
                if (isNaN(magnitude)) {
                    showError("Please enter a valid magnitude");
                    return;
                }
                result = vectorFromMagnitudeAndAngle(magnitude, angle);
                break;

            case 'ax_angle':
                const ax = parseFloat(document.getElementById('ax').value);
                if (isNaN(ax)) {
                    showError("Please enter a valid Ax value");
                    return;
                }
                result = vectorFromAxAndAngle(ax, angle);
                break;

            case 'ay_angle':
                const ay = parseFloat(document.getElementById('ay').value);
                if (isNaN(ay)) {
                    showError("Please enter a valid Ay value");
                    return;
                }
                result = vectorFromAyAndAngle(ay, angle);
                break;
        }

        displayResults(result);
    } catch (error) {
        showError(error.message);
    }
}

function vectorFromMagnitudeAndAngle(magnitude, angle) {
    const angleRad = angle * Math.PI / 180;
    const ax = magnitude * Math.cos(angleRad);
    const ay = magnitude * Math.sin(angleRad);
    const oppositeAngle = (angle + 180) % 360;
    
    return {
        Ax: round(ax),
        Ay: round(ay),
        "Opposite Angle": round(oppositeAngle)
    };
}

function vectorFromAxAndAngle(ax, angle) {
    const angleRad = angle * Math.PI / 180;
    const magnitude = Math.abs(ax / Math.cos(angleRad));
    const ay = magnitude * Math.sin(angleRad);
    const oppositeAngle = (angle + 180) % 360;
    
    return {
        Magnitude: round(magnitude),
        Ay: round(ay),
        "Opposite Angle": round(oppositeAngle)
    };
}

function vectorFromAyAndAngle(ay, angle) {
    const angleRad = angle * Math.PI / 180;
    const magnitude = Math.abs(ay / Math.sin(angleRad));
    const ax = magnitude * Math.cos(angleRad);
    const oppositeAngle = (angle + 180) % 360;
    
    return {
        Magnitude: round(magnitude),
        Ax: round(ax),
        "Opposite Angle": round(oppositeAngle)
    };
}

function round(number) {
    return Math.round(number * 100) / 100;
}

function showError(message) {
    const resultsDiv = document.getElementById('results');
    resultsDiv.innerHTML = `<div style="color: red;">Error: ${message}</div>`;
}

function displayResults(result) {
    const resultsDiv = document.getElementById('results');
    let html = '<div style="color: #333;">';
    
    for (const [key, value] of Object.entries(result)) {
        html += `<div><strong>${key}:</strong> ${value}</div>`;
    }
    
    html += '</div>';
    resultsDiv.innerHTML = html;
}

// Initialize the input fields on page load
document.addEventListener('DOMContentLoaded', updateInputFields); 