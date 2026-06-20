/**
 * Cloudflare Worker — serves the Calliope "work" update page on
 * work.calliope-interpreters.org by proxying the GitHub Pages origin.
 * Adds a noindex header so the page stays unlisted.
 *
 * 1. Replace PAGES_ORIGIN with your GitHub Pages URL (keep the trailing slash).
 * 2. Deploy, then add a route: work.calliope-interpreters.org/*
 */
const PAGES_ORIGIN = "https://YOUR-GITHUB-USERNAME.github.io/calliope-work/";

export default {
  async fetch(request) {
    const res = await fetch(PAGES_ORIGIN, { cf: { cacheTtl: 300, cacheEverything: true } });
    const headers = new Headers(res.headers);
    headers.set("X-Robots-Tag", "noindex, nofollow");
    headers.set("X-Frame-Options", "SAMEORIGIN");
    headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
    headers.set("Cache-Control", "public, max-age=300");
    return new Response(res.body, { status: res.status, statusText: res.statusText, headers });
  }
};
