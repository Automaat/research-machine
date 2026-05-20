/**
 * Himalayas.app scraper
 * Usage: node scrape-himalayas.mjs [keyword]
 *   keyword: e.g. "golang", "kotlin", "platform"
 * Output: JSON array to stdout, logs to stderr
 *
 * Note: Himalayas uses path-based routing — ?q= query param is ignored by SSR.
 * Use /jobs/{keyword} path instead.
 */
import { chromium } from 'playwright';

const KEYWORD = process.argv[2] || 'golang';
const TIMEOUT = 30_000;
const DEBUG = process.env.DEBUG === '1';

const BASE_URL = 'https://himalayas.app';
// Path-based routing — SSR ignores ?q= query param
const SEARCH_URL = `${BASE_URL}/jobs/${encodeURIComponent(KEYWORD)}`;

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const jobs = [];
const seen = new Set();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: UA,
  viewport: { width: 1280, height: 900 },
  locale: 'en-US',
});

const page = await context.newPage();

try {
  process.stderr.write(`[himalayas] Fetching: ${SEARCH_URL}\n`);
  await page.goto(SEARCH_URL, { waitUntil: 'networkidle', timeout: TIMEOUT });
  await page.waitForTimeout(2500);

  // Job cards are <article> elements on Himalayas
  const cards = await page.$$('article');
  process.stderr.write(`[himalayas] Found ${cards.length} article cards\n`);

  for (const card of cards) {
    // Role: prominent job title link
    const roleEl = await card.$('a.text-xl, a[class*="font-medium"][class*="text-gray-900"]');
    const role = roleEl ? (await roleEl.textContent())?.trim() : null;
    const href = roleEl ? await roleEl.getAttribute('href') : null;
    const url = href ? (href.startsWith('http') ? href : `${BASE_URL}${href}`) : null;

    if (!url || seen.has(url)) continue;
    seen.add(url);

    // Company: link to /companies/{slug} without /jobs/ (exclude job links)
    const company = await card.$eval(
      'a[href^="/companies/"]:not([href*="/jobs/"])',
      el => el.textContent?.trim()
    ).catch(() => 'Unknown');

    // Salary: various salary/comp indicators
    const salary = await card.$eval(
      '[class*="salary"], [class*="pay"], [class*="compensation"]',
      el => el.textContent?.trim()
    ).catch(() => null);

    // Location badge
    const location = await card.$eval(
      '[class*="location"], [class*="country"], [class*="badge"][class*="gray"]',
      el => el.textContent?.trim()
    ).catch(() => 'Remote');

    jobs.push({
      company,
      role: role || 'Unknown',
      url,
      salary,
      remote: true,
      location,
    });
  }

  if (jobs.length === 0 && DEBUG) {
    process.stderr.write(`[himalayas] No jobs found. Page content:\n${await page.content()}\n`);
  }
} catch (e) {
  process.stderr.write(`[himalayas] Fatal error: ${e.message}\n`);
} finally {
  await browser.close();
}

process.stderr.write(`[himalayas] Found ${jobs.length} listings for "${KEYWORD}"\n`);
process.stdout.write(JSON.stringify(jobs) + '\n');
