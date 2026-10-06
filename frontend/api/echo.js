export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({
      error: "Method not allowed",
    });
  }

  try {
    const { mood, journal } = req.body;

    if (!mood || !journal) {
      return res.status(400).json({
        error: "Mood and journal are required.",
      });
    }
    const riskTerms = [
  "suicide",
  "kill myself",
  "end my life",
  "hurt myself",
  "self harm",
  "self-harm",
];

const lowerJournal = journal.toLowerCase();

const hasHighRiskLanguage = riskTerms.some((term) =>
  lowerJournal.includes(term)
);

if (hasHighRiskLanguage) {
  return res.status(200).json({
    response:
      "I'm really glad you shared this instead of keeping it to yourself. If you may be in immediate danger, please contact local emergency services. In the U.S., you can also call or text 988 for immediate crisis support.",
    safetyFallback: true,
  });
}

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-3.8-flash:generateContent",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-goog-api-key": process.env.GEMINI_API_KEY,
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `You are Echo, a calm and supportive reflection companion in a wellness app.

The user selected the mood: ${mood}

The user wrote:
"${journal}"

Respond to what the user actually shared.

Rules:
- Be warm, concise, and human.
- Make the user feel heard.
- Reflect one meaningful detail from their message.
- Do not diagnose mental health conditions.
- Do not give medical advice.
- Do not tell the user what they should do.
- Do not overreact or assume a crisis.
- Keep the response to 2-3 sentences.
`,
                },
              ],
            },
          ],
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
  console.error("Gemini API error:", data);

  return res.status(200).json({
    response:
      "Thank you for sharing this with me. I'm glad you took a moment to check in with yourself today.",
    fallback: true,
  });
}

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      return res.status(500).json({
        error: "Gemini returned an empty response.",
      });
    }

    return res.status(200).json({
      response: text,
    });
  } catch (error) {
    console.error("Echo API error:", error);

    return res.status(200).json({
  response:
    "Thank you for sharing this with me. I'm glad you took a moment to check in with yourself today.",
  fallback: true,
});
  }
}