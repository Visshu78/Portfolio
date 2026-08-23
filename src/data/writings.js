/**
 * Vishal Dhawal — The Human Layer: Technical writing, Paper Deconstructions & Personal poetry.
 * Essays, research paper breakdowns with visual analogies, reflections, and observations.
 */

export const technicalNotes = [
  {
    id: "tech-01",
    title: "Teaching Machines to See",
    category: "Computer Vision · Personal Essay",
    date: "2025",
    readTime: "7 min read",
    summary: "Why visual intelligence is genuinely interesting — the difference between recognizing an image and understanding it, how the field evolved, what practical projects revealed, and why Computer Vision remains a core specialization worth going deep on.",
    body: `There's something almost philosophical about the problem of machine vision. An image is just a matrix of integers. A model trained long enough on enough labeled examples will, at some point, start predicting the right labels. But recognizing something is not the same as seeing it.

### The Difference Between Recognition and Understanding
The first time I saw a YOLO model detect objects in real time, it felt like a trick. Draw a box, assign a label, move on to the next frame. The model had no idea what the thing was — it had pattern-matched against enough training examples that the weights happened to fire in the right configuration.

Understanding implies something more: knowing where something is relative to other things, what it's doing, whether it's moving, what it means in context. Computer Vision moves slowly toward this, not with a single architecture, but with systems — detection, tracking, depth, geometry, temporal context, semantic understanding — layered carefully.

### What Practical Projects Revealed
GCP marker localization in aerial drone imagery taught me something I didn't expect: the model's accuracy was primarily bounded by how I designed the dataset, not the model architecture. Crop-based training, leakage-safe evaluation groupings, keypoint-aware augmentation — each of these mattered more than switching from EfficientNet-B3 to something more complex.

Real-time surveillance and anomaly detection taught me something harder: that static frames are insufficient for dynamic actions. You can't detect a crime from an isolated snapshot without understanding temporal continuity across frames.

### Why This Remains the Core
Language models are impressive. RAG systems are useful. But there's something about the visual modality — the density of information in a single frame, the challenge of making sense of it in real time, the connection to how we ourselves experience the world — that keeps pulling me back.

I build things that see. And the better I understand what 'seeing' actually requires — mathematically, physically, practically — the more interesting the problem becomes.`
  },
  {
    id: "tech-02",
    title: "A Model Is Not a System",
    category: "Applied AI · Engineering Practice",
    date: "2025",
    readTime: "6 min read",
    summary: "A high validation accuracy does not guarantee a useful real-world AI system. On industrial inspection, high-resolution imagery, camera selection, edge deployment, latency, memory, data leakage, and the gap between benchmarks and reality.",
    body: `There is a specific kind of overconfidence that comes from a strong validation score. You've done your train/test split, your metrics look excellent, and the model feels ready. Then you deploy it, and something goes wrong that the metrics never hinted at.

### The Benchmark-to-Reality Gap
Validation accuracy measures generalization within the distribution of your validation set. It says nothing about:
- Whether your validation set is actually different from your training set (data leakage)
- Whether your real deployment conditions match your data collection conditions
- Whether your inference latency fits within your real-world time budget
- Whether your model's RAM footprint fits on the target device

All of these are system problems, not model problems. And in practice, they kill deployments more often than model architecture choices do.

### Real-Time Video & On-Device AI: Real Engineering Challenges
In the real-time crime detection pipeline and on-device CYBORG assistant, the real bottlenecks were never just the raw neural model architecture:

**Temporal motion context**: Single-frame detectors produced frequent false alarms because static snapshots lacked directional velocity and multi-frame motion continuity.

**Edge compute & RAM budgets**: Deploying 4-bit Gemma 3 1B on mobile devices required sub-1.2 GB RAM footprint isolation and hybrid retrieval caching to deliver ~50ms initial SOP responses without draining mobile battery.

**Signal processing & jitter**: In hands-free VisionControl, raw ML landmark predictions suffered from sensor micro-noise. Adaptive exponential filtering was necessary to turn jittery raw predictions into fluid, accurate cursor movements.

### Dataset Design Is Model Design
In the aerial GCP project, random image-level train/validation splitting gave inflated validation metrics. Images from the same aerial survey are visually correlated — the model was effectively leaking context across the split boundary.

Switching to GroupKFold by project/survey/GCP ID dropped the validation scores and changed which model configurations looked best. The model hadn't gotten worse; the evaluation had gotten more honest.

### The Takeaway
A model is a component. A system is what you actually deploy. The gap between them — camera physics, deployment constraints, data quality, evaluation integrity, latency budgets — is where most real engineering work actually lives.

High validation accuracy is necessary but not sufficient. Build the system first; the model is one part of it.`
  }
];

export const paperDeconstructions = [
  {
    id: "paper-01",
    title: "Attention Is All You Need — Explained with Analogies",
    originalPaper: "Vaswani et al., NeurIPS 2017",
    category: "Foundational Architecture · Analogy Breakdown",
    date: "2024",
    readTime: "8 min read",
    pdfUrl: "/research_papers/ATTENTION_IS_ALL_YOU_NEED_explained.pdf",
    originalPaperUrl: "https://arxiv.org/abs/1706.03762",
    repoUrl: "https://github.com/Visshu78/Research_Papers",
    summary: "Breaking down the Transformer breakthrough into a beginner-friendly classroom analogy: Professor Transformer, group inquiry over rigid sequential turns, Queries/Keys/Values, and multi-head thinking caps.",
    body: `### The Classroom Analogy: Escaping Sequential Bottlenecks

**Traditional Teaching (RNNs & CNNs):**
Imagine a classroom where the teacher is translating English to German:
- The old-school teacher (like an RNN) is strict: they go one student at a time, front bench to back bench.
- If someone didn't understand a word, they couldn't ask others directly—they had to depend on the teacher remembering and passing notes back.
- If you have a sentence like *"The girl who lived in Paris loved croissants"*, "girl" and "loved" are related but far apart! The RNN lost the signal along the way.

**Enter Professor Transformer:**
Professor Transformer believes in group learning. Instead of waiting student-by-student, everyone in class listens and talks to each other simultaneously. If a student hears a confusing word, they can immediately look at or *attend to* any classmate across the room who holds the context.

---

### Key Architectural Mechanisms

1. **Scaled Dot-Product Attention ($Q, K, V$)**:
   - **Query ($Q$)**: The question a student is asking.
   - **Key ($K$)**: The label/badge of what knowledge each classmate holds.
   - **Value ($V$)**: The actual content of the answer.
   - You take the dot product $\\frac{Q K^T}{\\sqrt{d_k}}$, apply softmax, and compute a weighted average of all values.

2. **Multi-Head Attention (8 Thinking Caps)**:
   - Instead of listening with one mindset, each token wears 8 different "thinking caps" simultaneously: one for grammar, one for subject-verb agreement, one for semantic tone, etc.

3. **Positional Encodings (Knowing the Order)**:
   - Because all students talk in parallel, words lose natural sequential order. Sine and cosine wave frequencies are added to token embeddings to give each word an innate sense of position without needing step-by-step recurrence.

4. **WMT Benchmark Results**:
   - Outperformed ensemble methods on English-to-German (**28.4 BLEU**) and English-to-French (**41.0 BLEU**) while requiring only a fraction of previous training compute.`
  },
  {
    id: "paper-02",
    title: "BERT and the Chamber of Language Secrets",
    originalPaper: "Devlin et al., NAACL 2019",
    category: "Bidirectional Pre-training · Wizarding World Analogy",
    date: "2024",
    readTime: "7 min read",
    pdfUrl: "/research_papers/BERT_explained.pdf",
    originalPaperUrl: "https://aclanthology.org/N19-1423/",
    repoUrl: "https://github.com/Visshu78/Research_Papers",
    summary: "A Harry Potter themed deconstruction of BERT: overcoming directional blindness, Masked Language Modeling (15% blanked runes), Next Sentence Prediction, and swappable fine-tuning wand tips.",
    body: `### The Wizarding World of Language Models

**The Problem with Old Magic (Pre-BERT Era):**
Wizards like ELMo and OpenAI GPT could only read spell scrolls one way:
- **ELMo**: Like a two-headed owl—one head read left-to-right, the other right-to-left, but the heads never talked to each other mid-flight!
- **GPT**: Stubbornly read left-to-right only. In a spell like *"The [MASK] flew over Hogwarts"*, GPT guessed *"owl"* because it couldn't peek ahead to see *"dragon"* revealed later in the scroll!

**BERT: The Dual-Wand Breakthrough:**
BERT entered the Room of Requirement with true **bidirectional self-attention**—reading words from all directions simultaneously like a time-turner for text.

---

### How BERT Was Forged (Pre-training Rituals)

1. **Masked Language Modeling (MLM — Blank-Rune Divination)**:
   - 15% of words are blanked out: 80% replaced with \`[MASK]\`, 10% swapped with random tokens, and 10% kept unchanged.
   - The model must reconstruct the erased word using full bidirectional context from both left and right.

2. **Next Sentence Prediction (NSP — Scroll Linking)**:
   - Evaluates whether Sentence B genuinely follows Sentence A (*"Expecto Patronum"* $\\to$ *"A silver stag appears"* = ✅ vs mismatch = ❌).
   - The special \`[CLS]\` token absorbs the whole-scroll representation.

3. **One Wand, All Magic (Universal Fine-Tuning)**:
   - Instead of inventing new architectures from scratch for every task:
     - For Classification? Add a Sorting Hat pin to \`[CLS]\`.
     - For Question Answering (SQuAD)? Add a span-highlighter to output tokens.
     - For Named Entity Recognition (NER)? Add a dark-artifact tagger.
   - Result: 11 NLP state-of-the-art records shattered with just a few epochs of fine-tuning.`
  }
];

export const poetryWritings = [
  {
    id: "poem-01",
    title: "Some Nights",
    date: "2025",
    type: "Reflection",
    body: `Some nights, we don't want answers—
we just want the noise inside us to become quiet.

Not solved.
Not explained.
Just quiet.

There are questions that don't have destinations,
feelings that don't resolve into understanding,
memories that stay soft and unfinished
no matter how long we sit with them.

And maybe that's alright.

Maybe some things are not problems to be solved
but landscapes to be moved through slowly—
grief that doesn't need a conclusion,
longing that doesn't need an object,
the strange ache of growing up
without anyone announcing that it's happening.

Some nights, I think healing is less about arrival
and more about learning to stay in the room
with all the things that haven't settled yet—

the questions without answers,
the love that changed shape,
the version of yourself you thought you'd be by now.

You are allowed to not be finished.
You are allowed to still be in the middle of it.

Some nights, that is enough.`
  },
  {
    id: "poem-02",
    title: "What the Camera Ignores",
    date: "2024",
    type: "Poem",
    body: `A pixel is only an integer between zero and two hundred fifty-five.
It does not know the warmth of the sun that struck the sensor,
nor the silence of the room where the photograph was taken.

I build systems that see every contour,
that draw green boxes around faces,
that measure distances across aerial maps.

Yet the most important things in any room
are the things with zero spatial dimensions:
the hesitation before someone speaks,
the quiet between two notes,
and the understanding that needs no detection frame.`
  },
  {
    id: "poem-03",
    title: "Observation / Frame 000",
    date: "2024",
    type: "Poem",
    body: `Before the first frame is captured,
before the weights are initialized to random normal values,
there is only the intention of the observer.

We see what we are looking for.
A detector trained on cars will never notice the flight of a bird.
A model trained on certainty will never understand curiosity.

Stay uncalibrated sometimes.
Let the world arrive in soft focus.`
  }
];
