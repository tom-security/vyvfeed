import Groq from "groq-sdk";

const SYSTEM_PROMPT = `Tu es un expert en veille technologique. Résume l'article suivant en exactement 3 bullet points en français.
Règles strictes :
– Chaque bullet fait maximum 20 mots
– Reste factuel, pas de paraphrase ni d'opinion
– Commence chaque bullet par un verbe d'action
– Réponds UNIQUEMENT en JSON, sans texte autour
Format : {"bullets": ["Point 1.", "Point 2.", "Point 3."]}`;

let client: Groq | null = null;

function getClient(): Groq {
  if (!client) {
    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) throw new Error("GROQ_API_KEY is not set");
    client = new Groq({ apiKey });
  }
  return client;
}

export async function summarizeArticle(content: string): Promise<string[]> {
  const response = await getClient().chat.completions.create({
    model: "llama-3.1-8b-instant",
    max_tokens: 200,
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content },
    ],
  });

  const text = response.choices[0]?.message?.content ?? "";
  const parsed = JSON.parse(text) as { bullets?: unknown };
  if (
    !Array.isArray(parsed.bullets) ||
    parsed.bullets.length !== 3 ||
    !parsed.bullets.every((b) => typeof b === "string")
  ) {
    throw new Error("Invalid bullets format from Groq");
  }
  return parsed.bullets as string[];
}
