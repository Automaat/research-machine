/**
 * talent.io scraper — Playwright (site is geo-restricted / unreachable from some IPs)
 * Usage: node scrape-talentio.mjs [keyword] [max_pages]
 *   keyword: e.g. "golang", "platform engineer"
 * Output: JSON array to stdout, logs to stderr
 *
 * talent.io has NO public API. The site:
 * - Resolves to 35.157.87.44 (AWS eu-central-1, Frankfurt)
 * - Times out completely from non-EU IPs / certain AWS ranges
 * - No CDX-archived API endpoints found
 * - Requires a real browser session (SPA, React-based)
 *
 * URL format: https://talent.io/p/en-gb/jobs?query={keyword}&remote=true
 * Job cards: look for [data-testid*="job"] or article/li elements in the SPA
 * Salary: talent.io shows salary ranges prominently on each card
 *
 * PREREQUISITE: Run from an EU-based machine or use a proxy.
 *   HTTPS_PROXY=http://eu-proxy:port node scrape-talentio.mjs golang
 *
 * If the site becomes reachable, intercept XHR requests to find the actual API:
 *   page.on('response', r => r.url().includes('/api') && console.error(r.url()))
 */
import { chromium } from 'playwright';

const KEYWORD = process.argv[2] || 'golang';
const MAX_PAGES = parseInt(process.argv[3] || '3', 10);
const DEBUG = process.env.DEBUG === '1';
const PROXY = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || null;

const BASE_URL = 'https://talent.io';
// en-gb locale has the most remote EU jobs
const SEARCH_URL = (page) => {
  const params = new URLSearchParams({
    query: KEYWORD,
    remote: 'true',
    ...(page > 1 ? { page: String(page) } : {}),
  });
  return `${BASE_URL}/p/en-gb/jobs?${params}`;
};

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const jobs = [];
const seen = new Set();

// Track XHR responses to discover the real API endpoint
const discoveredApiCalls = [];

const launchOptions = { headless: true };
if (PROXY) {
  launchOptions.proxy = { server: PROXY };
  process.stderr.write(`[talentio] Using proxy: ${PROXY}\n`);
}

const browser = await chromium.launch(launchOptions);
const context = await browser.newContext({
  userAgent: UA,
  viewport: { width: 1280, height: 900 },
  locale: 'en-GB',
});

const page = await context.newPage();

// Intercept API calls — talent.io is a React SPA that makes XHR requests
// This captures the real API endpoints for future use without Playwright
page.on('response', async (response) => {
  const url = response.url();
  if (url.includes('/api/') && response.headers()['content-type']?.includes('json')) {
    try {
      const body = await response.json().catch(() => null);
      if (body) {
        discoveredApiCalls.push({ url, body });
        process.stderr.write(`[talentio] XHR captured: ${url}\n`);
      }
    } catch (_) {}
  }
});

try {
  for (let pageNum = 1; pageNum <= MAX_PAGES; pageNum++) {
    const url = SEARCH_URL(pageNum);
    process.stderr.write(`[talentio] Page ${pageNum}: ${url}\n`);

    const response = await page.goto(url, {
      waitUntil: 'networkidle',
      timeout: 45_000,
    });

    if (!response?.ok()) {
      process.stderr.write(`[talentio] HTTP ${response?.status()} — site may be unreachable from this IP\n`);
      process.stderr.write(`[talentio] talent.io resolves to 35.157.87.44 (AWS eu-central-1)\n`);
      process.stderr.write(`[talentio] Use an EU-based machine or set HTTPS_PROXY env var\n`);
      break;
    }

    await page.waitForTimeout(2000);

    // talent.io React SPA — job cards are likely in a list/grid
    // Selectors derived from SPA structure (adjust if DOM changes)
    const cardLinks = await page.$$eval(
      // Try common patterns: data-testid job links, article > a, li > a with /jobs/ in href
      'a[href*="/jobs/"][href*="/p/en"]',
      (els) => els.map((el) => ({
        href: el.href,
        text: el.textContent?.trim() || '',
      }))
    );

    process.stderr.write(`[talentio] Found ${cardLinks.length} job links on page ${pageNum}\n`);

    if (cardLinks.length === 0) {
      if (DEBUG) {
        process.stderr.write(`[talentio] Page HTML (first 3000 chars):\n${(await page.content()).slice(0, 3000)}\n`);
      }
      break;
    }

    for (const link of cardLinks) {
      const jobUrl = link.href;
      if (!jobUrl || seen.has(jobUrl)) continue;
      seen.add(jobUrl);

      jobs.push({
        company: null,
        role: link.text || 'Unknown',
        url: jobUrl,
        salary: null,
        remote: true,
        location: 'Remote',
      });
    }
  }

  if (discoveredApiCalls.length > 0) {
    process.stderr.write(`[talentio] Discovered ${discoveredApiCalls.length} API calls:\n`);
    for (const call of discoveredApiCalls) {
      process.stderr.write(`  ${call.url}\n`);
    }
  }
} catch (e) {
  if (e.message.includes('net::ERR_') || e.message.includes('timeout')) {
    process.stderr.write(`[talentio] Connection failed: ${e.message}\n`);
    process.stderr.write(`[talentio] Site unreachable — use EU proxy or EU-based machine\n`);
  } else {
    process.stderr.write(`[talentio] Fatal error: ${e.message}\n`);
  }
} finally {
  await browser.close();
}

process.stderr.write(`[talentio] Found ${jobs.length} listings for "${KEYWORD}"\n`);
process.stdout.write(JSON.stringify(jobs) + '\n');
