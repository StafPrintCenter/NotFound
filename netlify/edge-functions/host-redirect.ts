export default async (request: Request) => {
  const url = new URL(request.url);
  const host = url.hostname;

  // Laisse passer normalement les requêtes déjà sur notfound (SPA fallback via _redirects)
  if (host === "notfound.stafprint.com") {
    return;
  }

  const target = new URL(`https://notfound.stafprint.com${url.pathname}`);
  target.searchParams.set("host", host);

  return Response.redirect(target.toString(), 301);
};

export const config = { path: "/*" };