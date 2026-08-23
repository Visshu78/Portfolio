/**
 * Vishal Dhawal — The Human Layer: Technical writing & Personal poetry.
 * Essays, reflections, and observations.
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
