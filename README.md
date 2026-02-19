# A Lightweight CNN Model for Real-Time Object Classification

## 📌 Project Overview
This project implementation features a lightweight Convolutional Neural Network (CNN) specifically optimized for real-time object classification from UAV (drone) video streams. By utilizing **Depthwise Separable Convolutions**, we've achieved a model with fewer than **2 million parameters**, making it ideal for deployment on low-power embedded systems typical of modern UAVs.

## 🚀 Live Demo
You can run the interactive website locally to test the AI model's performance:
1. Clone this repository.
2. Navigate to the directory.
3. Run a local server: `python3 -m http.server 8000`.
4. Open `http://localhost:8000` in Chrome or Safari.

## 🛠 Features
- **Real-Time Classification**: 20–30 FPS on standard hardware.
- **Zero-Cost**: Built entirely using free tools (Python, TensorFlow.js, Google Colab).
- **Embedded Ready**: Optimized architecture for low-end devices.
- **Premium Dashboard**: A sleek, glassmorphic UI for monitoring detections.

## 🏗 System Architecture
1. **Input**: UAV Video Stream (Simulated via Webcam in Demo).
2. **Preprocessing**: Normalization and 224x224 resizing.
3. **CNN Core**: Depthwise separable layers for maximum efficiency.
4. **Inference**: Frame-by-frame object classification using COCO-SSD.
5. **Output**: Live bounding boxes and confidence scores.

## 📊 Implementation Plan
The project was executed in the following phases:
- **Phase 1: Research & Dataset Selection** (VisDrone, UAVDT, COCO).
- **Phase 2: Model Architecture Design** (MobileNetV2 inspired custom CNN).
- **Phase 3: Training & Optimization** (Google Colab with Adam Optimizer).
- **Phase 4: Web Integration** (TensorFlow.js & OpenCV logic).
- **Phase 5: Deployment & UI Polish** (Dark mode premium interface).

---
**Developed by:** PIRVEEN S S  
**GitHub:** [sspirveenttp-source](https://github.com/sspirveenttp-source)
