export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = ({ url, redirect }) => {
  {
    return new Response("Missing OAUTH_CLIENT_ID env var", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
