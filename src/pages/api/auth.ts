import type { APIRoute } from 'astro';

export const prerender = false;

const SITE_URL = 'https://dart-production.vercel.app';

export const GET: APIRoute = ({ redirect }) => {
  const clientId = import.meta.env.OAUTH_CLIENT_ID;
  if (!clientId) {
    return new Response('Missing OAUTH_CLIENT_ID env var', { status: 500 });
  }

  const redirectUri = `${SITE_URL}/api/callback`;
  const scope = 'repo,user';
  const state = Math.random().toString(36).substring(2);

  const ghUrl =
    'https://github.com/login/oauth/authorize' +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&scope=${encodeURIComponent(scope)}` +
    `&state=${encodeURIComponent(state)}`;

  return redirect(ghUrl);
};
