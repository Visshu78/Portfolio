/**
 * Vishal Dhawal — Computer Vision & Applied AI Projects
 * SEE Section (Computer Vision) & BUILD Section (Systems & Applied AI)
 * Sourced directly from Vishal's GitHub repositories (@Visshu78).
 */

export const cvProjects = [
  {
    id: "gcp-marker-localization",
    title: "GCP Marker Localization & Pose Estimation",
    subtitle: "Multi-task EfficientNet-B3 architecture for localizing and classifying GCP markers in 4096×3000 aerial drone imagery.",
    category: "Aerial Computer Vision · Photogrammetry",
    confidence: "99.8%",
    featured: true,
    feedImage: "/feed_aerial.jpg",
    feedTitle: "ORTHOPHOTO_UAV // 4096x3000_RAW",
    tags: ["PyTorch", "EfficientNet-B3", "OpenCV", "Keypoint Localization", "Albumentations", "Tiled Inference"],
    metrics: [
      { label: "Mean Localization Error", value: "20.32 px", detail: "Tested across 300 unlabeled aerial orthophoto tiles" },
      { label: "Shape Classification", value: "99.8%", detail: "Cross, Square, L-Shape with Macro-F1 ≈ 1.0" },
      { label: "Inference Strategy", value: "Tiled 512×512", detail: "Keypoint-aware crop-based sampling pipeline" }
    ],
    demoBoxes: [
      { top: "18%", left: "28%", width: "16%", height: "20%", label: "GCP_CROSS_01", confValue: 99.4, confidence: "99.4%", status: "LOCKED" },
      { top: "42%", left: "46%", width: "15%", height: "18%", label: "GCP_SQUARE_02", confValue: 97.8, confidence: "97.8%", status: "LOCKED" },
      { top: "68%", left: "22%", width: "14%", height: "17%", label: "GCP_L_SHAPE_03", confValue: 92.5, confidence: "92.5%", status: "LOCKED" },
      { top: "35%", left: "76%", width: "15%", height: "18%", label: "CANDIDATE_04", confValue: 84.0, confidence: "84.0%", status: "WARN" },
      { top: "72%", left: "62%", width: "13%", height: "16%", label: "LOW_CONF_05", confValue: 69.5, confidence: "69.5%", status: "REJECT" },
    ],
    keypoints: [
      { t: "28%", l: "36%", conf: 99 },
      { t: "51%", l: "53%", conf: 97 },
      { t: "76%", l: "29%", conf: 92 },
      { t: "44%", l: "83%", conf: 84 },
      { t: "80%", l: "68%", conf: 69 },
      { t: "18%", l: "74%", conf: 75 },
    ],
    caseStudy: {
      problem: "In ultra-high-resolution 4096×3000 aerial drone surveys, small ground control point (GCP) markers occupied less than 0.05% of the total pixel area, causing full-image CNN backbones to struggle with vanishing gradient and coarse localization.",
      context: "Survey orthophotos covered diverse terrain (quarries, agricultural fields, coastal zones) under severe sun glare and shadow gradients. Markers required sub-pixel geometric localization and concurrent multi-class shape classification.",
      approach: "Built a two-head multi-task EfficientNet-B3 architecture with strategic 512×512 keypoint-centered crop sampling during training, keypoint-aware Albumentations augmentation, and sliding-window tiled inference during production deployment.",
      architecture: [
        "4096×3000 Aerial Drone Orthophoto Stream",
        "Keypoint-Aware 512×512 Crop Sampler",
        "EfficientNet-B3 Multi-Task Backbone",
        "Keypoint Regression Head (MSE Loss)",
        "Shape Classification Head (Cross / Square / L-Shape)",
        "Tiled Sliding Window Inference & Re-projection"
      ],
      experiment: "Validated using GroupKFold cross-validation grouped strictly by survey flight ID and GCP cluster to eliminate cross-split visual data leakage. Evaluated against 300 test orthophoto scenes.",
      result: "Achieved 20.32 px mean localization error with ~100% shape classification accuracy and ~1.0 Macro-F1 score across diverse environmental conditions.",
      failure: "Initial random image-level train/val splitting yielded deceptively high validation scores because overlapping frames from the same drone flight leaked background features into the validation set.",
      lesson: "Dataset design is part of model design. GroupKFold by project/flight grouping produced an honest evaluation baseline and drove the decision to use crop-based training over full-image downsampling.",
      artifactUrl: "https://github.com/Visshu78/Aerial_GCP_Pose"
    }
  },
  {
    id: "realtime-crime-detection",
    title: "Real-Time Crime & Anomaly Vision Pipeline",
    subtitle: "Deep learning vision pipeline for detecting anomalous activities, theft, and violent gestures in real-time camera streams.",
    category: "Real-Time Vision · Surveillance AI",
    confidence: "98.7%",
    featured: true,
    feedImage: "/feed_surveillance.jpg",
    feedTitle: "CCTV_SURVEILLANCE // CAM_04_LIVE",
    tags: ["PyTorch", "OpenCV", "YOLO", "Temporal Attention", "CUDA", "FastAPI"],
    metrics: [
      { label: "Detection Latency", value: "14.2 ms", detail: "Per frame on RTX / CUDA acceleration" },
      { label: "Anomaly F1-Score", value: "98.1%", detail: "Weapon, theft, and intrusion events" },
      { label: "Throughput", value: "60+ FPS", detail: "Multi-stream RTSP camera processing" }
    ],
    demoBoxes: [
      { top: "48%", left: "21%", width: "9%", height: "26%", label: "PEDESTRIAN_01", confValue: 98.4, confidence: "98.4%", status: "LOCKED" },
      { top: "46%", left: "59%", width: "16%", height: "24%", label: "VEHICLE_TAXI", confValue: 96.8, confidence: "96.8%", status: "LOCKED" },
      { top: "56%", left: "77%", width: "9%", height: "26%", label: "PERSON_ALERT", confValue: 95.2, confidence: "95.2%", status: "LOCKED" },
      { top: "58%", left: "68%", width: "9%", height: "22%", label: "SCOOTER_TRACK", confValue: 88.0, confidence: "88.0%", status: "WARN" },
      { top: "48%", left: "46%", width: "8%", height: "18%", label: "SUSPECT_MOTION", confValue: 71.5, confidence: "71.5%", status: "REJECT" },
    ],
    keypoints: [
      { t: "54%", l: "25%", conf: 98 },
      { t: "56%", l: "66%", conf: 96 },
      { t: "64%", l: "81%", conf: 95 },
      { t: "68%", l: "72%", conf: 88 },
      { t: "55%", l: "49%", conf: 71 },
    ],
    caseStudy: {
      problem: "Automated CCTV surveillance requires instant, high-confidence detection of hostile actions, weapon possession, and physical theft without flooding human monitoring stations with false alarms.",
      context: "Video feeds suffered from low nighttime illumination, compression artifacts from RTSP streams, and occlusions in crowded public or retail spaces.",
      approach: "Formulated a two-stage spatio-temporal pipeline: an optimized YOLO object detector for real-time bounding box localization coupled with a temporal feature queue to recognize action dynamics over time.",
      architecture: [
        "RTSP Camera Video Ingestion",
        "CUDA Accelerated Frame Preprocessing",
        "Deep Learning Object & Threat Detection",
        "Temporal Action Coherence Buffer",
        "Real-Time Alert Dispatch & Telemetry"
      ],
      experiment: "Trained and benchmarked across custom CCTV crime datasets, testing robustness under variable camera angles and lighting drops.",
      result: "Achieved sub-15ms inference latency at 60 FPS with 98.1% F1-score on verified security incident captures.",
      failure: "Early static-frame detectors generated false alarms whenever individuals carried ordinary elongated objects (umbrellas, tripods) due to lack of temporal motion context.",
      lesson: "Static spatial features alone are insufficient for behavioral vision. Incorporating multi-frame temporal reasoning completely eliminates false positives caused by ambiguous single-frame snapshots.",
      artifactUrl: "https://github.com/Visshu78/Realtime_Crime_detection"
    }
  },
  {
    id: "visioncontrol",
    title: "VisionControl — Hands-Free Perceptual HCI",
    subtitle: "Computer-vision-driven interactive control system using eye tracking, gaze estimation, and hand gesture recognition.",
    category: "Perceptual Computing · Human-Computer Interaction",
    confidence: "97.4%",
    featured: true,
    feedImage: "/feed_hci.jpg",
    feedTitle: "PERCEPTUAL_HCI // GESTURE_AND_GAZE",
    tags: ["Python", "OpenCV", "MediaPipe", "Gaze Estimation", "Gesture Kinematics", "HCI"],
    metrics: [
      { label: "Interaction Latency", value: "<12 ms", detail: "Instantaneous gesture-to-action execution" },
      { label: "Tracking Precision", value: "Sub-pixel", detail: "Iris centroid and finger landmark tracking" },
      { label: "Hardware Requirement", value: "Standard Webcam", detail: "Zero specialized wearable sensors needed" }
    ],
    demoBoxes: [
      { top: "14%", left: "18%", width: "36%", height: "70%", label: "HAND_SKELETON", confValue: 98.6, confidence: "98.6%", status: "LOCKED" },
      { top: "34%", left: "67%", width: "26%", height: "26%", label: "EYE_GAZE_VECTOR", confValue: 96.5, confidence: "96.5%", status: "LOCKED" },
      { top: "16%", left: "32%", width: "8%", height: "18%", label: "INDEX_PINCH", confValue: 91.0, confidence: "91.0%", status: "LOCKED" },
      { top: "18%", left: "40%", width: "8%", height: "18%", label: "PALM_ORIENTATION", confValue: 82.5, confidence: "82.5%", status: "WARN" },
      { top: "45%", left: "62%", width: "8%", height: "12%", label: "PUPIL_DILATION", confValue: 68.0, confidence: "68.0%", status: "REJECT" },
    ],
    keypoints: [
      { t: "76%", l: "32%", conf: 98 }, // Wrist
      { t: "52%", l: "31%", conf: 98 }, // Palm center
      { t: "17%", l: "33%", conf: 96 }, // Middle tip
      { t: "22%", l: "27%", conf: 96 }, // Index tip
      { t: "49%", l: "47%", conf: 91 }, // Thumb tip
      { t: "38%", l: "70%", conf: 97 }, // Right pupil
      { t: "38%", l: "80%", conf: 96 }, // Left pupil
      { t: "47%", l: "64%", conf: 68 }, // Gaze vector endpoint
    ],
    caseStudy: {
      problem: "Traditional mouse and keyboard inputs create accessibility barriers and are impractical in sterile medical environments or touchless industrial workstations.",
      context: "Contactless vision systems often suffer from jitter, cursor drift, and latency lag that make precise user interaction frustrating and inaccurate.",
      approach: "Combined MediaPipe hand landmark tracking with OpenCV pupil-gaze estimation and an adaptive exponential smoothing filter to eliminate cursor jitter without introducing perceived latency.",
      architecture: [
        "Webcam Video Capture Stream",
        "21-Point 3D Hand Landmark Extraction",
        "Iris Centroid Gaze Angle Estimator",
        "Adaptive Exponential Jitter Filter",
        "OS-Level Event Synthesizer (Cursor, Volume, Brightness)"
      ],
      experiment: "Evaluated across multiple desktop interaction tasks (Fitts's Law pointing, volume dragging, virtual clicking) under varying ambient light conditions.",
      result: "Enabled smooth, responsive hands-free desktop control including precision clicking, scrolling, and system brightness adjustments.",
      failure: "Raw landmark coordinates exhibited micro-vibrations from camera noise, causing the virtual mouse cursor to shake when the user was holding their hand still.",
      lesson: "Real-time human-computer interaction requires signal processing as much as machine learning. Adaptive smoothing filters turn raw noisy ML predictions into delightful, usable software.",
      artifactUrl: "https://github.com/Visshu78/VisionControl"
    }
  }
];

export const systemProjects = [
  {
    id: "cyborg-rag-assistant",
    title: "CYBORG — On-Device Cybercrime RAG Assistant",
    subtitle: "Fully offline mobile RAG assistant for grounded cybercrime investigation, legal analysis, and SOP execution.",
    category: "On-Device AI · Hybrid RAG",
    tags: ["Gemma 3 1B", "llama.rn", "MiniLM-L6-v2", "ONNX", "BM25", "Dense Retrieval", "RRF", "Mobile AI"],
    architectureNodes: [
      { id: "query", name: "Investigation Query", tech: "Mobile UI / React Native", role: "Law-enforcement incident and statutory query input" },
      { id: "retrieval", name: "Hybrid Retrieval", tech: "BM25 + MiniLM-L6-v2 + FAISS", role: "Dual lexical + dense vector search over legal SOP corpus" },
      { id: "rrf", name: "RRF Fusion Layer", tech: "Reciprocal Rank Fusion", role: "Merges keyword statutory hits with semantic context" },
      { id: "llm", name: "Local On-Device LLM", tech: "4-bit Gemma 3 1B · llama.rn", role: "Offline inference generating grounded investigation steps" },
      { id: "stream", name: "Progressive Streaming", tech: "Token-Streaming Output", role: "~50ms first-token SOP response on mobile devices" }
    ],
    highlights: [
      "4-bit quantized Gemma 3 1B running entirely on-device with <1.2 GB peak RAM — zero cloud dependence.",
      "Hybrid BM25 + dense embedding retrieval fused with Reciprocal Rank Fusion (RRF) for strict legal grounding.",
      "~50 ms initial SOP response in tested fast path; 0% refusal rate on specialized law-enforcement benchmark."
    ],
    github: "https://github.com/Visshu78/CYBORG"
  },
  {
    id: "telewire-intelligence",
    title: "TeleWire — Real-Time Threat Intelligence Platform",
    subtitle: "SOCMINT threat intelligence platform combining asynchronous ingestion, NLP entity extraction, OCR, and threat risk scoring.",
    category: "Threat Intelligence · Applied NLP",
    tags: ["Python", "Telegram APIs", "Sentence Transformers", "FAISS", "Zero-Shot NLP", "OCR", "Streamlit"],
    architectureNodes: [
      { id: "telegram", name: "Telegram Channels", tech: "Telegram APIs / MTProto", role: "Live stream of suspect group and channel messages" },
      { id: "ingest", name: "Async Ingestion Pool", tech: "Python asyncio + Workers", role: "High-throughput non-blocking message ingestion" },
      { id: "nlp", name: "NLP & OCR Worker", tech: "Sentence Transformers + EasyOCR", role: "Entity extraction, image text extraction, vector indexing" },
      { id: "scoring", name: "Threat Risk Engine", tech: "Composite Scoring Algorithm", role: "Evaluates threat level, urgency, and actor centrality" },
      { id: "interface", name: "Analyst Dashboard", tech: "Streamlit + FAISS Search", role: "Interactive intelligence exploration and alert views" }
    ],
    highlights: [
      "Real-time asynchronous ingestion processing concurrent message and media streams across Telegram channels.",
      "Semantic similarity search powered by FAISS vector indexes, zero-shot entity classification, and embedded OCR.",
      "Composite threat-risk scoring providing automated severity indicators for cyber intelligence analysts."
    ],
    github: "https://github.com/Visshu78/TeleWire"
  },
  {
    id: "aether-voice-pipeline",
    title: "Aether-Voice — Real-Time AI Voice Pipeline",
    subtitle: "Real-time voice interaction pipeline connecting browser audio, WebRTC signaling, speech recognition, and AI inference.",
    category: "Real-Time Systems · Voice AI",
    tags: ["WebRTC", "Socket.IO", "Python", "ASR / Whisper", "LLM Inference", "TTS", "Docker", "Streamlit"],
    architectureNodes: [
      { id: "browser", name: "Browser Client", tech: "WebRTC MediaStream API", role: "Low-latency bidirectional audio capture and playback" },
      { id: "signaling", name: "Signaling Server", tech: "Node.js + Socket.IO", role: "ICE/SDP exchange and session lifecycle management" },
      { id: "backend", name: "Audio Engine", tech: "Python Async Service", role: "Audio chunking, noise suppression, and pipeline routing" },
      { id: "ai", name: "AI Voice Pipeline", tech: "Whisper ASR + LLM + FastTTS", role: "Speech-to-text, neural reasoning, and speech synthesis" },
      { id: "infra", name: "Container Deployment", tech: "Docker + ngrok Tunnels", role: "Containerized deployment with secure remote access" }
    ],
    highlights: [
      "Full-duplex real-time audio communication bridging browser WebRTC streams to backend neural models.",
      "Integrated pipeline chaining speech recognition (ASR), conversational reasoning, and tool execution.",
      "Containerized deployment with Docker and automated tunneling infrastructure for remote demonstrations."
    ],
    github: "https://github.com/Visshu78/Aether-Voice"
  },
  {
    id: "ipc-predictor",
    title: "IPC Section Predictor & Legal AI Classifier",
    subtitle: "NLP classification engine predicting applicable legal sections and penalties from natural language crime narratives.",
    category: "Applied NLP · Legal AI",
    tags: ["Python", "NLP", "Scikit-Learn", "Transformers", "Streamlit", "Text Preprocessing"],
    architectureNodes: [
      { id: "input", name: "Incident Narrative", tech: "Analyst Text Input", role: "Raw unstructured description of criminal incident" },
      { id: "clean", name: "Text Preprocessing", tech: "NLTK + Lemmatization", role: "Stopword removal, tokenization, and legal term parsing" },
      { id: "model", name: "Classification Model", tech: "TF-IDF + Linear Classifier / BERT", role: "Multi-label probability distribution over IPC sections" },
      { id: "output", name: "Legal Breakdown", tech: "Streamlit UI Interface", role: "Predicted sections, offense categories, and statutory penalties" }
    ],
    highlights: [
      "Automated mapping of complex unstructured police reports to relevant statutory penal sections.",
      "Multi-label classification evaluating overlapping charges and procedural requirements.",
      "Interactive Streamlit interface enabling legal professionals and investigators to rapidly verify charges."
    ],
    github: "https://github.com/Visshu78/IPC_predictor"
  }
];
