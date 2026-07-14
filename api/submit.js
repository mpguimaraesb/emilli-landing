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

  // TEMP debug scaffolding — remove once the note path is confirmed working.
  const debug = { recordId, recordShape: record, noteAttempted: false };

  // Log the interaction as a note rather than a custom attribute, so repeat
  // touches (mandate today, general interest tomorrow) build a history
  // instead of overwriting a single field. Failure here shouldn't fail the
  // request — the person record itself already saved above.
  if (recordId && source) {
    debug.noteAttempted = true;
    try {
      const noteRes = await fetch('https://api.attio.com/v2/notes', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${process.env.ATTIO_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          data: {
            format: 'plaintext',
            parent_object: 'people',
            parent_record_id: recordId,
            title: `Demo interest — ${source}`,
            content: `Source: ${source}${name ? `\nName: ${name}` : ''}${wtp ? `\nWould pay: ${wtp}` : ''}\nSubmitted: ${new Date().toISOString()}`,
          },
        }),
      });
      debug.noteStatus = noteRes.status;
      if (!noteRes.ok) {
        const noteErr = await noteRes.json().catch(() => ({}));
        console.error('Attio note error:', noteErr);
        debug.noteError = noteErr;
      } else {
        debug.noteOk = true;
      }
    } catch (err) {
      console.error('Attio note fetch error:', err);
      debug.noteException = String(err);
    }
  }

  return res.status(200).json({ success: true, debug });
};
