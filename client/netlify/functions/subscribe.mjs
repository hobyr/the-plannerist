// netlify/functions/subscribe.mjs
// Netlify Function v2 (Web API): receives audit lead data from the client
// and forwards it to Brevo. Served at /.netlify/functions/subscribe
// (no config.path — default filename routing, matches the client fetch URL).

export default async (req) => {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  const { nom, email, poste, boite, poles } = await req.json();

  // Sépare prénom et nom
  const parts = nom.trim().split(' ');
  const prenom = parts[0] || '';
  const nomFamille = parts.slice(1).join(' ') || '';

  try {
    const res = await fetch('https://api.brevo.com/v3/contacts', {
      method: 'POST',
      headers: {
        'api-key': process.env.BREVO_API_KEY,  // variable d'env Netlify
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        email,
        attributes: {
          FIRSTNAME: prenom,
          LASTNAME: nomFamille,
          JOB_TITLE: poste,
          COMPANY: boite,
          POLES_AUDITES: poles,
        },
        listIds: [parseInt(process.env.BREVO_LIST_ID)], // ID de ta liste Brevo
        updateEnabled: true, // met à jour si le contact existe déjà
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('Brevo error:', err);
      return new Response(JSON.stringify({ ok: false, error: err }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true }), { status: 200 });

  } catch (e) {
    console.error('Subscribe error:', e);
    return new Response(JSON.stringify({ ok: false }), { status: 500 });
  }
};
