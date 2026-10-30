# 🥗 FoodVerse AI — Autonomous Food Intelligence Platform

**FoodVerse AI** is an advanced, multimodal real-time computer vision and nutritional analysis platform. Powered by state-of-the-art vision models (ViT-B16/YOLO), it performs item recognition, volumetric mass estimation, freshness detection, HACCP safety compliance checks, and real-time glycemic index simulations.

---

## 📸 Interface Screenshots

### 👁️ Multimodal Sensor Stream & Plate Recognition
![Food Recognition & Nutri-Vision](docs/images/food_recognition_screenshot.png)
*Real-time object detection, attention heatmaps, 3D mesh volume estimation, and cooking texture analysis.*

### 📊 Metabolic Analytics & Micronutrient Dashboard
![Nutritional & Glycemic Analytics](docs/images/nutrition_dashboard_screenshot.png)
*Macronutrient ratios, 2-hour postprandial glucose spike prediction, and detailed RDA micronutrient breakdown.*

---

## ✨ Key Features

### 👁️ 1. Food Recognition & Nutri-Vision

* **Real-time Bounding Box Detection:** Detects multiple ingredients simultaneously with high confidence scores.
* **Attention Heatmaps & 3D Mesh:** Visualizes spatial attention and generates 3D volumetric meshes for accurate portion/mass estimation ($g / cm^3$).
* **Maillard & Texture Analysis:** Evaluates cooking quality, crust browning scores, and ingredient-specific properties (e.g., crispy skin side up, rich in EPA/DHA).

### 📊 2. Deep Nutritional & Metabolic Analytics

* **Macronutrient Split:** Real-time breakdown of Energy ($kcal$), Protein Density, Carbohydrates (Net/Fiber), and Healthy Lipids.
* **Glycemic Load & Glucose Simulation:** Predicts postprandial glucose curves over a 2-hour window using simulated metabolic response models.
* **Micronutrient & Phytonutrient Profile:** Tracks Vitamin D, B12, Selenium, Omega-3s, Iron, and Potassium against daily recommended allowances (RDA).
* **Dietary Compatibility Flags:** Instant tagging for Keto/Low-Carb, Mediterranean, Pescetarian, Gluten-Free, and Diabetic-Friendly diets.

### 🛡️ 3. Safety & Smart Cooking Suite

* **Freshness & Spoilage AI:** Real-time percentage tracking of food freshness.
* **Restaurant Hygiene & HACCP Safety:** Automated safety and compliance grading (e.g., Grade A checks).
* **Smart Cooking Coach:** Live thermal/heat map analysis for culinary perfection.
* **Voice Readout & AI Reasoning:** Hands-free accessibility and step-by-step reasoning logs.

---

## 🛠️ Architecture Overview

```
                          ┌───────────────────────────┐
                          │    Live Camera / Upload   │
                          └─────────────┬─────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │   Multimodal Sensor Stream │
                          └─────────────┬─────────────┘
                                        │
             ┌──────────────────────────┴──────────────────────────┐
             ▼                                                     ▼
┌─────────────────────────┐                               ┌─────────────────────────┐
│ ViT-B16 / Vision Models │                               │ Volumetric & Mass Engine│
│  - Object Detection     │                               │  - 3D Mesh Reconstruction│
│  - Attention Heatmaps   │                               │  - Density Estimation    │
└────────────┬────────────┘                               └────────────┬────────────┘
             │                                                         │
             └──────────────────────────┬──────────────────────────────┘
                                        │
                                        ▼
                          ┌───────────────────────────┐
                          │  Nutritional & Metabolic  │
                          │     Inference Engine      │
                          └─────────────┬─────────────┘
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
  ┌────────────────────┐      ┌────────────────────┐     ┌───────────────────┐
  │ Glycemic Response  │      │ Micronutrient Map │     │ Safety & HACCP    │
  │ Curve Simulation   │      │ & RDA Calculation  │     │ Freshness Grade   │
  └────────────────────┘      └────────────────────┘     └───────────────────┘
```

---

## 💻 Tech Stack

* **Frontend / UI:** React, Tailwind CSS, Lucide Icons, Recharts
* **Computer Vision:** PyTorch, Vision Transformer (ViT-B16), OpenCV, YOLOv8
* **Volumetric Processing:** Open3D, Trimesh
* **Backend:** FastAPI, Python

---

## 🚀 Getting Started

### Prerequisites

* Python 3.10+
* CUDA 11.8+ (for GPU acceleration)
* OpenCV & PyTorch

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/foodverse-ai.git
   cd foodverse-ai
   ```

2. **Create a virtual environment:**

   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

4. **Launch the Application:**

   ```bash
   python main.py
   ```

---

## 📖 Usage Examples

### Running Real-time Video Stream Inference

```python
from foodverse import MultimodalPipeline

# Initialize Vision Pipeline
pipeline = MultimodalPipeline(model_version="v4.2", device="cuda")

# Run inference on input image/stream
results = pipeline.process_frame("path/to/dish.jpg")

print(f"Detected Items: {results.items}")
print(f"Total Energy: {results.nutrition.total_kcal} kcal")
print(f"Glycemic Load Score: {results.metabolic.gl_score}")
```

---

## 🤝 Contributing

Contributions are always welcome! Please read our [CONTRIBUTING.md](CONTRIBUTING.md) guide before submitting pull requests.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AwesomeFeature`)
3. Commit your Changes (`git commit -m 'Add some AwesomeFeature'`)
4. Push to the Branch (`git push origin feature/AwesomeFeature`)
5. Open a Pull Request

---

## 📜 License

Distributed under the MIT License. See `LICENSE` for more information.