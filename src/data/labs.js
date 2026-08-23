/**
 * Vishal Dhawal — Living Experiments Archive.
 * Intentionally unfinished active explorations, status-tagged.
 */

export const labExperiments = [
  {
    id: "LAB_001",
    name: "Vision Transformers",
    status: "EXPERIMENTING",
    statusColor: "cyan",
    timestamp: "Active // 2025",
    description: "Exploring transformer-based visual representations — patch embeddings, attention maps, CLS token behavior — and comparing them systematically with conventional CNN approaches on real vision tasks.",
    tech: ["PyTorch", "Transformers", "Hugging Face", "ViT", "Computer Vision"],
    notes: "Currently probing how attention heads behave differently from convolutional feature maps on fine-grained localization tasks. Not yet a conclusion.",
    github: "https://github.com/Visshu78"
  },
  {
    id: "LAB_002",
    name: "3D CNN / Spatiotemporal Vision",
    status: "EXPERIMENTING",
    statusColor: "cyan",
    timestamp: "Active // 2025",
    description: "Exploring spatial and temporal representation learning using 3D convolutional architectures — how models can understand not just what is in a frame, but how things are moving across time.",
    tech: ["PyTorch", "3D CNNs", "Temporal Attention", "Video Understanding"],
    notes: "Investigating (2+1)D factorized convolutions as a memory-efficient alternative to full 3D convolutions for spatiotemporal feature extraction.",
    github: "https://github.com/Visshu78"
  },
  {
    id: "LAB_003",
    name: "RAG Retrieval Experiments",
    status: "IMPROVING",
    statusColor: "emerald",
    timestamp: "Active // 2025",
    description: "Exploring hybrid retrieval, semantic search, reranking, chunking strategies, embedding quality, and grounding quality for RAG systems — with a focus on specialized domains where exact language matters.",
    tech: ["Sentence Transformers", "FAISS", "BM25", "LLMs", "Hybrid Retrieval", "RRF"],
    notes: "Moving beyond basic cosine similarity. Currently testing chunk overlap strategies and late-interaction reranking models against BM25+dense baselines.",
    github: "https://github.com/Visshu78"
  },
  {
    id: "LAB_004",
    name: "Edge AI & Model Deployment",
    status: "BUILDING",
    statusColor: "amber",
    timestamp: "WIP // 2025",
    description: "Exploring how to move models from notebooks to real hardware — NVIDIA Jetson, mobile, embedded — under actual latency, memory, and deployment constraints that don't appear in benchmarks.",
    tech: ["PyTorch", "ONNX", "CUDA", "Jetson Orin", "Quantization", "TensorRT"],
    notes: "Quantizing models from FP32 → FP16 → INT8 and measuring accuracy vs. latency vs. RAM tradeoffs on actual edge hardware rather than simulated environments.",
    github: "https://github.com/Visshu78"
  }
];
