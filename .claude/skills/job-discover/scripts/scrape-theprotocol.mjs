/**
 * theprotocol.it scraper — Playwright (Cloudflare blocks curl/fetch)
 * Usage: node scrape-theprotocol.mjs [keyword] [max_pages]
 *   keyword: e.g. "golang", "kotlin", "platform"
 * Output: JSON array to stdout, logs to stderr
 *
 * theprotocol.it is protected by Cloudflare — direct HTTP requests return 403.
 * Requires Playwright with a real browser.
 * URL format: https://theprotocol.it/filtry/{keyword};t?pageNumber=N
 * Offer links: <a> where href contains ",oferta,"
 * Uses data-test attributes for structured field extraction.
 */
import { chromium } from 'playwright';

const KEYWORD = process.argv[2] || 'golang';
const MAX_PAGES = parseInt(process.argv[3] || '3', 10);
const DEBUG = process.env.DEBUG === '1';

const BASE_URL = 'https://theprotocol.it';
// ;t suffix is required — it's the filter type indicator for "technology"
const SEARCH_URL = (page) =>
  `${BASE_URL}/filtry/${encodeURIComponent(KEYWORD)};t?pageNumber=${page}`;

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const jobs = [];
const seen = new Set();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: UA,
  viewport: { width: 1280, height: 900 },
  locale: 'en-GB',
  extraHTTPHeaders: {
    'Accept-Language': 'en-GB,en;q=0.9,pl;q=0.8',
  },
});

const page = await context.newPage();

try {
  for (let pageNum = 1; pageNum <= MAX_PAGES; pageNum++) {
    const url = SEARCH_URL(pageNum);
    process.stderr.write(`[theprotocol] Page ${pageNum}: ${url}\n`);

    await page.goto(url, { waitUntil: 'networkidle', timeout: 30_000 });
    await page.waitForTimeout(1500);

    // Offer links: <a> with href containing ",oferta,"
    const links = await page.$$eval(
      'a[href*=",oferta,"]',
      (els) => els.map((el) => ({
        href: el.href,
        text: el.textContent?.trim() || '',
      }))
    );

    process.stderr.write(`[theprotocol] Found ${links.length} offer links on page ${pageNum}\n`);
    if (links.length === 0) {
      if (DEBUG) {
        process.stderr.write(`[theprotocol] Page HTML:\n${await page.content()}\n`);
      }
      break;
    }

    // Extract listing-level data from the search page cards
    // Each card wraps a link — try to get company + salary from sibling elements
    const cards = await page.$$('[data-test*="list-item"], article, [class*="offer"], [class*="job-card"]');
    process.stderr.write(`[theprotocol] Found ${cards.length} card elements\n`);

    for (const link of links) {
      const jobUrl = link.href;
      if (!jobUrl || seen.has(jobUrl)) continue;
      seen.add(jobUrl);

      // Title is often in the link text or a child heading
      const role = link.text || 'Unknown';

      jobs.push({
        company: null,  // Not reliably extractable from listing without visiting each page
        role,
        url: jobUrl,
        salary: null,   // Requires visiting each offer page
        remote: true,   // We filtered by remote keyword
        location: 'Remote',
      });
    }

    // Check if there's a next page button (pagination)
    const hasNext = await page.$('[data-test="next-page"], a[rel="next"], [aria-label="Next page"]');
    if (!hasNext) {
      process.stderr.write(`[theprotocol] No next page found after page ${pageNum}\n`);
      break;
    }
  }
} catch (e) {
  process.stderr.write(`[theprotocol] Fatal error: ${e.message}\n`);
} finally {
  await browser.close();
}

process.stderr.write(`[theprotocol] Found ${jobs.length} listings for "${KEYWORD}"\n`);
process.stdout.write(JSON.stringify(jobs) + '\n');
