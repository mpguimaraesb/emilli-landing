const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Logs demo chat messages for later review. Uses the service_role key
// (server-only, bypasses RLS) — never expose this key to the browser.
// Fails silently: a logging hiccup should never break the chat response.
async function logChatMessages(rows) {
  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) return;
  try {
    const res = await fetch(`${SUPABASE_URL}/rest/v1/demo_chat_messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': SUPABASE_SERVICE_ROLE_KEY,
        'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY}`,
        'Prefer': 'return=minimal',
      },
      body: JSON.stringify(rows),
    });
    if (!res.ok) {
      const err = await res.text();
      console.error('Supabase chat log error:', res.status, err);
    }
  } catch (err) {
    console.error('Supabase chat log fetch error:', err);
  }
}

module.exports = { logChatMessages };
