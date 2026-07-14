module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email, name, source, wtp } = req.body;

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }

  // Create or update a Person record in Attio by email address.
  // Uses PUT with matching_attribute so duplicate submissions are idempotent.
  const response = await fetch(
    'https://api.attio.com/v2/objects/people/records?matching_attribute=email_addresses',
    {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${process.env.ATTIO_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        data: {
          values: {
            email_addresses: [{ email_address: email }],
          },
        },
      }),
    }
  );

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    console.error('Attio error:', err);
    return res.status(500).json({ error: 'Failed to save' });
  }

  const record = await response.json().catch(() => ({}));
  const recordId = record?.data?.id?.record_id;
  const existingDescription = record?.data?.values?.description?.[0]?.value ?? '';

  // Log the interaction to the Person's own description field rather than a
  // separate Note — the API key only has People write access, not Notes, and
  // this avoids needing an extra scope. Appended (not overwritten) so repeat
  // touches (mandate today, general interest tomorrow) build a history.
  if (recordId && source) {
    const entry = `Source: ${source}${name ? `, Name: ${name}` : ''}${wtp ? `, Would pay: ${wtp}` : ''} — ${new Date().toISOString()}`;
    const newDescription = existingDescription ? `${existingDescription}\n${entry}` : entry;
    try {
      const updateRes = await fetch(
        `https://api.attio.com/v2/objects/people/records/${recordId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${process.env.ATTIO_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            data: { values: { description: newDescription } },
          }),
        }
      );
      if (!updateRes.ok) {
        const updateErr = await updateRes.json().catch(() => ({}));
        console.error('Attio description update error:', updateErr);
        // TEMP: remove once confirmed working.
        return res.status(200).json({ success: true, debug: { updateStatus: updateRes.status, updateErr } });
      }
    } catch (err) {
      console.error('Attio description update fetch error:', err);
      return res.status(200).json({ success: true, debug: { updateException: String(err) } });
    }
  }

  return res.status(200).json({ success: true });
};
