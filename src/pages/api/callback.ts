import type { APIRoute } from 'astro';

export const prerender = false;

export const GET: APIRoute = async ({ url }) => {
  const code = url.searchParams.get('code');
  if (!code) return new Response('Missing code', { status: 400 });

  const clientId = import.meta.env.OAUTH_CLIENT_ID;
  const clientSecret = import.meta.env.OAUTH_CLIENT_SECRET;
  if (!clientId || !clientSecret) {
    return new Response('Missing OAuth env vars', { status: 500 });
  }

  const tokenRes = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
    }),
  });

  const data = (await tokenRes.json()) as { access_token?: string; error?: string };
  const status = data.error ? 'error' : 'success';
  const payload = data.error
    ? { error: data.error }
    : { token: data.access_token, provider: 'github' };

  const payloadJson = JSON.stringify(payload).replace(/</g, '\\u003c');

  const html = `<!doctype html>
<html><head><meta charset="utf-8"><title>Authorizing…</title></head><body>
<script>
(function() {
  var content = ${payloadJson};
  var status = ${JSON.stringify(status)};
  function send(e) {
    if (e.data === 'authorizing:github') {
      window.opener.postMessage(
        'authorization:github:' + status + ':' + JSON.stringify(content),
        e.origin
      );
    }
  }
  window.addEventListener('message', send, false);
  window.opener && window.opener.postMessage('authorizing:github', '*');
})();
</script>
<p>Autorizzazione in corso… puoi chiudere questa finestra.</p>
</body></html>`;

  return new Response(html, {
    headers: { 'Content-Type': 'text/html; charset=utf-8' },
  });
};
