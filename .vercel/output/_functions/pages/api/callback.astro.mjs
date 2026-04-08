export { renderers } from '../../renderers.mjs';

const prerender = false;
const GET = async ({ url }) => {
  const code = url.searchParams.get("code");
  if (!code) return new Response("Missing code", { status: 400 });
  {
    return new Response("Missing OAuth env vars", { status: 500 });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
