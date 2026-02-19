const video = document.getElementById('webcam');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const modelStatus = document.getElementById('model-status');
const loader = document.getElementById('loader');
const objectCount = document.getElementById('object-count');
const resultsBox = document.getElementById('results');

let model = undefined;
let stream = undefined;
let isDetecting = false;

// Load the COCO-SSD model
async function loadModel() {
    try {
        model = await cocoSsd.load();
        modelStatus.textContent = "Ready";
        modelStatus.className = "status-badge ready";
        loader.style.display = 'none';
        console.log("Model loaded successfully");
    } catch (error) {
        console.error("Error loading model:", error);
        modelStatus.textContent = "Error";
        modelStatus.className = "status-badge error";
    }
}

// Start detection loop
async function predictLoop() {
    if (!isDetecting) return;

    // Detect objects in the video frame
    const predictions = await model.detect(video);
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Draw results
    drawPredictions(predictions);
    updateResultsList(predictions);
    
    // Loop
    requestAnimationFrame(predictLoop);
}

function drawPredictions(predictions) {
    objectCount.textContent = predictions.length;
    
    predictions.forEach(prediction => {
        // Draw bounding box
        ctx.strokeStyle = '#00f2ff';
        ctx.lineWidth = 3;
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#00f2ff';
        
        ctx.strokeRect(
            prediction.bbox[0], 
            prediction.bbox[1], 
            prediction.bbox[2], 
            prediction.bbox[3]
        );
        
        // Draw label background
        ctx.fillStyle = '#00f2ff';
        const textWidth = ctx.measureText(`${prediction.class} (${Math.round(prediction.score * 100)}%)`).width;
        ctx.fillRect(prediction.bbox[0], prediction.bbox[1] - 25, textWidth + 10, 25);
        
        // Draw text
        ctx.fillStyle = '#0a0a0f';
        ctx.font = 'bold 14px Inter';
        ctx.fillText(
            `${prediction.class} (${Math.round(prediction.score * 100)}%)`, 
            prediction.bbox[0] + 5, 
            prediction.bbox[1] - 7
        );
    });
}

function updateResultsList(predictions) {
    if (predictions.length === 0) {
        resultsBox.innerHTML = '<p class="placeholder">Scanning environment...</p>';
        return;
    }

    resultsBox.innerHTML = predictions.map(p => `
        <div class="result-item">
            <span>${p.class}</span>
            <span>${Math.round(p.score * 100)}%</span>
        </div>
    `).join('');
}

// Button Events
startBtn.addEventListener('click', async () => {
    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: 'environment' },
            audio: false
        });
        video.srcObject = stream;
        
        video.onloadedmetadata = () => {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            isDetecting = true;
            predictLoop();
            
            startBtn.disabled = true;
            stopBtn.disabled = false;
        };
    } catch (err) {
        alert("Camera access denied or not available. Please ensure you are on HTTPS or localhost.");
        console.error(err);
    }
});

stopBtn.addEventListener('click', () => {
    isDetecting = false;
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }
    video.srcObject = null;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    resultsBox.innerHTML = '<p class="placeholder">Awaiting live feed...</p>';
    objectCount.textContent = '0';
    
    startBtn.disabled = false;
    stopBtn.disabled = true;
});

// Initialize
loadModel();
