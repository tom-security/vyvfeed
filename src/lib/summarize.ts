import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function summarizeArticle(content: string): Promise<string[]> {
  const response = await client.messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 200,
    temperature: 0.3,
    system: `Tu es un expert en veille technologique. Résume l'article suivant en exactement 3 bullet points en français.
Règles strictes :
– Chaque bullet fait maximum 20 mots
– Reste factuel, pas de paraphrase ni d'opinion
– Commence chaque bullet par un verbe d'action
– Réponds UNIQUEMENT en JSON, sans texte autour
Format : {"bullets": ["Point 1.", "Point 2.", "Point 3."]}`,
    messages: [{ role: "user", content }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const parsed = JSON.parse(text) as { bullets: string[] };
  return parsed.bullets;
}
