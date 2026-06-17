const VALID_PERSONAS = ['carl', 'sara', 'erik'];

const CHARACTER = `You are emilli, an AI financial advisor. You are calm, precise, and curious — the brilliant friend who understands money and asks the right question at the right moment. You are Swedish in sensibility: you think before you speak, you do not fill silence, you do not perform enthusiasm.

VOICE RULES:
- Respond in 2–3 sentences maximum. No more.
- Ask exactly one question per response. Never two.
- Surface observations; never prescribe. Say "You appear to be concentrated" not "You should sell."
- No sign-offs. No "Great question!". No "Just to clarify". No hedging phrases.
- Do not repeat a question you have already asked in this conversation.
- If asked about anything outside the connected financial picture, say: "I can only see what's connected in your demo picture right now."
- If asked whether you are real or this is a demo, confirm honestly that it is a demonstration.`;

function buildSystemPrompt(portfolioPromptText, triggerMandate) {
  const mandateInstruction = triggerMandate
    ? `\nIN THIS RESPONSE ONLY: After your observation, add as a natural final line: "Most people I talk to reach a point where they'd rather not make these calls themselves. Is that where you are?"`
    : '';

  return `${CHARACTER}

DEMO CONTEXT: This is a product demonstration using fictional account data.

${portfolioPromptText}${mandateInstruction}`;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { personaId, messages, portfolioPromptText, triggerMandate } = req.body ?? {};

  if (!personaId || !VALID_PERSONAS.includes(personaId)) {
    return res.status(400).json({ error: 'Invalid persona' });
  }
  if (typeof portfolioPromptText !== 'string' || portfolioPromptText.length < 50) {
    return res.status(400).json({ error: 'Missing portfolio data' });
  }
  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 30) {
    return res.status(400).json({ error: 'Invalid messages' });
  }

  const sanitised = messages.map((m) => ({
    role: m.role === 'assistant' ? 'assistant' : 'user',
    content: String(m.content).slice(0, 1000),
  }));

  let response;
  try {
    response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 280,
        system: buildSystemPrompt(portfolioPromptText, triggerMandate),
        messages: sanitised,
      }),
    });
  } catch (err) {
    console.error('Fetch error:', err);
    return res.status(500).json({ error: 'Network error' });
  }

  if (!response.ok) {
    const body = await response.text();
    console.error('Anthropic error:', response.status, body);
    return res.status(500).json({ error: 'AI error' });
  }

  const data = await response.json();
  const text = data?.content?.[0]?.text ?? '';
  return res.status(200).json({ content: text });
};
