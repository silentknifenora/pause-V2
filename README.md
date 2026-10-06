# PAUSE V2

### An AI-powered reflection companion designed to help people slow down, check in with themselves, and feel heard.

[Live Demo](https://pause-v2-focb74p1y-neha-46bf.vercel.app) · [GitHub Repository](https://github.com/silentknifenora/pause-V2)

---

## Why I Built This

PAUSE started as a wellness concept focused on daily reflection, mood check-ins, and preserving small meaningful moments.

While working on the first version, I became interested in a deeper question:

> **Could a simple AI interaction make digital reflection feel more personal without turning the experience into a clinical mental-health tool?**

PAUSE V2 explores that question through **Echo**, an AI reflection companion that responds to what the user actually writes.

The goal isn't to replace human support or provide therapy.

The goal is much simpler:

**Help the user feel heard for a moment.**

---

## The Product Problem

Many wellness applications focus on tracking:

* Mood
* Habits
* Streaks
* Goals
* Metrics

Tracking can be useful, but reflection can feel different.

When someone writes about their day, a static prompt or predefined response may not acknowledge what they actually said.

PAUSE V2 explores whether a lightweight conversational response can make that moment feel more personal.

---

## Product Hypothesis

> **If Echo responds directly to the user's reflection in a warm, concise, non-clinical way, users may perceive the reflection experience as more personal and supportive than a static response.**

This became the core product hypothesis behind PAUSE V2.

---

## User Flow

```text
         PAUSE
           │
           ▼
     Mood Check-In
           │
           ▼
     Share with Echo
           │
           ▼
     Safety Check
           │
           ▼
       Echo AI
           │
           ▼
       Reflection
           │
           ▼
   "Was Echo helpful?"
           │
           ▼
      Save Memory
```

The experience is intentionally short so the AI interaction supports reflection rather than becoming the entire product.

---

## Echo — AI Feature

Echo receives two pieces of context:

1. The user's selected mood
2. The user's written reflection

The prompt instructs Echo to:

* Respond to what the user actually shared
* Reflect a meaningful detail
* Be warm and concise
* Avoid diagnosis
* Avoid medical advice
* Avoid unsolicited instructions
* Avoid assuming a crisis
* Respond in 2–3 sentences

### Example

**User:**

> Nothing special happened today, but I got through everything I needed to do.

**Echo:**

> Even on days that feel completely ordinary, getting through everything you needed to do takes steady effort. There is a quiet accomplishment in simply handling what was on your plate today.

The response acknowledges the user's specific reflection rather than simply repeating their selected mood.

---

## AI Architecture

The AI request is handled through a server-side API endpoint rather than exposing the Gemini API key in the frontend.

```text
React Frontend
      │
      │ POST /api/echo
      ▼
Server-side API
      │
      ├── Validate input
      │
      ├── Basic safety check
      │
      ▼
Gemini API
      │
      ▼
Echo response
      │
      ▼
Reflection screen
```

### Why this approach?

Keeping the API request server-side prevents the Gemini API key from being exposed directly in the client-side application.

It also provides a place to implement:

* Input validation
* Safety checks
* Error handling
* AI-specific product logic

---

## Safety & Graceful Failure

Because PAUSE is a wellness product, AI failure and safety behavior were treated as product concerns rather than purely technical errors.

### Safety fallback

A lightweight keyword-based check runs before the reflection is sent to Gemini.

Clearly high-risk phrases trigger a predefined safety response instead of being sent to the model.

The current prototype includes guidance toward immediate support, including emergency services and 988 in the U.S.

**Important:** This is a prototype safeguard, not comprehensive crisis detection.

### AI failure fallback

AI services can experience:

* Temporary unavailability
* Rate limits
* Quota restrictions
* Empty responses

Instead of exposing technical errors to the user, PAUSE returns a calm fallback response and allows the reflection flow to continue.

The system retries temporary `503` service errors once, while quota errors such as `429` are not repeatedly retried.

---

## User Feedback Signal

After Echo responds, the user can answer:

**Was Echo helpful?**

* 👍 Yes
* 👎 Not really

The prototype records:

```text
Mood
Feedback
Echo response
Timestamp
```

This creates a simple feedback signal that could later help evaluate whether changes to the AI experience improve perceived usefulness.

---

## Lightweight AI Evaluation

I evaluated five representative reflections covering:

* Ordinary days
* Accomplishment
* Calm moments
* Loneliness
* Performance anxiety

### What I found

One test produced a successful personalized AI response that directly reflected the user's message.

The remaining tests encountered Gemini availability/quota limitations during evaluation.

This surfaced an important product insight:

> **An AI feature is only useful if the experience remains reliable when the model is unavailable.**

The application was therefore designed to degrade gracefully rather than exposing technical errors to the user.

See the full evaluation:

[`docs/echo-evaluation.md`](docs/echo-evaluation.md)

---

## Product Decisions & Trade-offs

### AI vs. predefined responses

**Decision:** Use generative AI for Echo.

**Why:** Predefined responses are predictable but cannot meaningfully respond to the user's unique reflection.

**Trade-off:** Generative AI introduces variability, cost, latency, and availability dependencies.

---

### Safety vs. simplicity

**Decision:** Use a lightweight server-side keyword safeguard for the prototype.

**Why:** The goal was to introduce a basic safety layer without turning a small portfolio project into a complex safety system.

**Trade-off:** Keyword matching can miss context and produce false positives/negatives.

---

### Reliability vs. AI availability

**Decision:** Provide a graceful fallback when Gemini is unavailable.

**Why:** The reflection experience should not completely break because an external AI service is temporarily unavailable.

**Trade-off:** The fallback is less personalized than a successful Echo response.

---

### Feedback vs. overbuilding analytics

**Decision:** Capture a simple helpful/not-helpful signal.

**Why:** It creates a foundation for measuring user perception without building an unnecessary analytics system.

**Future opportunity:** Aggregate anonymized feedback and compare response quality across different prompt versions.

---

## What I Would Build Next

If PAUSE moved beyond the prototype stage, I would prioritize:

### 1. Better AI evaluation

Test a larger set of reflections and evaluate:

* Relevance
* Supportiveness
* Conciseness
* Unwanted advice
* User helpfulness

### 2. Stronger safety architecture

Move beyond keyword matching toward a more robust safety strategy with additional review and testing.

### 3. Privacy controls

Define:

* Data retention
* User consent
* AI provider data handling
* Deletion behavior
* Data minimization

### 4. Product analytics

Track anonymized product signals such as:

* Check-in completion
* Echo response success rate
* Helpful vs. not-helpful feedback
* Return usage
* Fallback frequency

These metrics would help answer whether Echo is actually improving the product experience.

---

## Tech Stack

### Frontend

* React
* Vite
* JavaScript
* CSS
* Lucide React

### AI

* Google Gemini API
* Server-side API integration
* Prompt-based response generation

### Deployment

* Vercel
* GitHub

### Storage

* Browser `localStorage` for prototype feedback and reflection-related data

---

## Design Direction

PAUSE uses a calm, minimal visual language inspired by:

* Lavender tones
* Cherry blossoms
* Soft rounded surfaces
* Short reflection moments
* Mobile-first interaction patterns

The interface intentionally avoids the visual language of clinical dashboards.

The goal is to make reflection feel approachable rather than medical.

---

## Project Evolution

PAUSE V2 builds on an earlier wellness application prototype.

The first version focused primarily on:

* Mood check-ins
* Reflection
* Habit/streak concepts
* Memory and gratitude

V2 shifted the focus toward a specific product experiment:

> **Can a small, carefully constrained AI interaction make reflection feel more personal?**

That shift changed the project from simply building features to testing a product hypothesis.

---

## What This Project Demonstrates

PAUSE V2 represents my approach to building AI-enabled products:

**Identify a user problem → form a hypothesis → build a focused experiment → add safety and failure handling → collect feedback → evaluate → iterate.**

Rather than treating AI as a feature added for its own sake, I wanted to explore where it could provide meaningful value while being transparent about its limitations.

---

## Limitations

PAUSE V2 is a portfolio prototype and should not be considered:

* A medical device
* A therapy application
* A crisis detection system
* A replacement for professional mental-health support

The AI responses are generated and may be imperfect or inconsistent.

The safety layer is intentionally limited for this prototype.

---

## Author

**Neha Raut**

MSIS · Product Analytics · UX · AI Product Experiments

Background in VFX and digital production, transitioning into product and data-focused technology roles.

---

## License

This project is intended primarily as a portfolio project and learning experiment.
