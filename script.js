const qrText = document.getElementById('qr-text');
const sizes = document.getElementById('sizes');
const generateBtn = document.getElementById('generateBtn');
const downloadBtn = document.getElementById('downloadBtn');
const qrContainer = document.querySelector('.qr-body');
const message = document.querySelector('.message');
const resetBtn = document.createElement('button'); // Create a reset button

let size = sizes.value;

// Add reset button to the UI
resetBtn.textContent = 'Reset';
resetBtn.id = 'resetBtn';
resetBtn.classList.add('btn');
qrContainer.parentNode.insertBefore(resetBtn, qrContainer.nextSibling);

// Event Listeners
generateBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isEmptyInput();
});

sizes.addEventListener('change', (e) => {
    size = e.target.value;
    isEmptyInput();
});

downloadBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let img = document.querySelector('.qr-body img');

    if (img !== null) {
        let imgAtrr = img.getAttribute('src');
        downloadImage(imgAtrr);
    } else {
        let canvas = document.querySelector('canvas');
        if (canvas) {
            downloadImage(canvas.toDataURL());
        } else {
            showMessage("No QR code available to download.", "error");
        }
    }
});

resetBtn.addEventListener('click', () => {
    qrText.value = '';
    qrContainer.innerHTML = '';
    downloadBtn.setAttribute('href', '#');
    showMessage("Input and QR code cleared.", "success");
});

// Functions
function isEmptyInput() {
    if (qrText.value.length > 0) {
        showMessage("Generating QR code...", "info");
        generateQRCode();
    } else {
        showMessage("Enter the text or URL to generate your QR code.", "error");
    }
}

function generateQRCode() {
    qrContainer.innerHTML = '';
    showLoadingSpinner(true);

    setTimeout(() => {
        new QRCode(qrContainer, {
            text: qrText.value,
            height: size,
            width: size,
            colorLight: "#fff",
            colorDark: "#000",
        });

        showLoadingSpinner(false);
        showMessage("QR code generated successfully!", "success");
    }, 1000); // Simulate a delay for the loading spinner
}

function downloadImage(url) {
    const link = document.createElement('a');
    link.href = url;
    link.download = 'QR_Code.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

function showLoadingSpinner(show) {
    if (show) {
        const spinner = document.createElement('div');
        spinner.className = 'loading-spinner';
        qrContainer.appendChild(spinner);
    } else {
        const spinner = document.querySelector('.loading-spinner');
        if (spinner) {
            spinner.remove();
        }
    }
}

function showMessage(text, type) {
    message.textContent = text;
    message.className = `message ${type}`;
    message.style.display = "block";

    // Hide the message after 3 seconds
    setTimeout(() => {
        message.style.display = "none";
    }, 3000);
}