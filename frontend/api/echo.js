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

      return res.status(500).json({
        error:
          data?.error?.message ||
          "Unable to generate an Echo response.",
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

    return res.status(500).json({
      error: error?.message || "Something went wrong.",
    });
  }
}