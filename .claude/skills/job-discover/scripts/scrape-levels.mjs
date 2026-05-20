/**
 * Levels.fyi jobs scraper
 * Usage: node scrape-levels.mjs [level] [max_pages]
 *   level: "Staff Engineer" | "Senior Engineer" | "Principal Engineer"
 * Output: JSON array to stdout, logs to stderr
 *
 * Targets staff/senior remote roles with compensation data.
 * Uses __NEXT_DATA__ extraction as primary strategy, with DOM fallback.
 */
import { chromium } from 'playwright';

const LEVEL = process.argv[2] || 'Staff Engineer';
const MAX_PAGES = parseInt(process.argv[3] || '2', 10);
const TIMEOUT = 45_000;
const DEBUG = process.env.DEBUG === '1';

const BASE_URL = 'https://www.levels.fyi';
const SEARCH_URL = `${BASE_URL}/jobs/?jobFamily=Software+Engineer&country=REMOTE&level=${encodeURIComponent(LEVEL)}`;

const UA = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36';

const jobs = [];
const seen = new Set();

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext({
  userAgent: UA,
  viewport: { width: 1280, height: 900 },
  locale: 'en-US',
});

// Intercept non-encrypted API responses
const apiJobs = [];
const page = await context.newPage();
page.on('response', async (response) => {
  const url = response.url();
  if (!url.includes('levels.fyi') || response.status() !== 200) return;
  try {
    const ct = response.headers()['content-type'] || '';
    if (!ct.includes('json')) return;
    const json = await response.json();
    // Skip encrypted payloads
    if (json.payload && typeof json.payload === 'string') return;
    const items = json.jobs || json.data || json.results || json.items || [];
    if (!Array.isArray(items) || items.length === 0) return;
    // Skip loading-state placeholders
    const real = items.filter(i => i.title !== 'refreshing' && i.title !== 'loading');
    if (real.length > 0) apiJobs.push(...real);
  } catch {
    // not parseable
  }
});

try {
  process.stderr.write(`[levels] Fetching: ${SEARCH_URL}\n`);
  await page.goto(SEARCH_URL, { waitUntil: 'networkidle', timeout: TIMEOUT });

  // Wait longer for React hydration + scroll to trigger lazy load
  await page.waitForTimeout(5000);
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(2000);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.waitForTimeout(1000);

  // Strategy 1: __NEXT_DATA__ (most reliable for Next.js apps)
  const nextData = await page.evaluate(() => {
    const script = document.getElementById('__NEXT_DATA__');
    if (!script) return null;
    try { return JSON.parse(script.textContent); } catch { return null; }
  });

  if (nextData) {
    process.stderr.write(`[levels] Found __NEXT_DATA__\n`);
    const pageProps = nextData?.props?.pageProps;

    // Structure: pageProps.initialJobsData.results[].jobs[]
    const companyResults = pageProps?.initialJobsData?.results || [];
    if (companyResults.length > 0) {
      process.stderr.write(`[levels] Found ${companyResults.length} companies in __NEXT_DATA__\n`);
      for (const companyEntry of companyResults) {
        const company = companyEntry.companyName || 'Unknown';
        const jobList = companyEntry.jobs || [];
        for (const item of jobList) {
          const role = item.title || item.job_title || 'Unknown';
          if (role === 'refreshing' || role === 'loading') continue;
          const url = item.applicationUrl || item.url || item.apply_url || '';
          const location = item.locations?.[0] || 'Remote';
          const salary = item.salary || item.compensation || null;
          if (url && !seen.has(url)) {
            seen.add(url);
            jobs.push({ company, role, url, salary, remote: true, location });
          }
        }
      }
    }

    // Fallback: flat arrays in pageProps
    if (jobs.length === 0) {
      const flatCandidates = [
        pageProps?.jobs,
        pageProps?.initialJobs,
        pageProps?.data?.jobs,
        pageProps?.jobListings,
      ].filter(Array.isArray);
      for (const list of flatCandidates) {
        process.stderr.write(`[levels] Processing ${list.length} jobs from flat pageProps\n`);
        for (const item of list) {
          const role = item.title || item.job_title || item.name || 'Unknown';
          if (role === 'refreshing' || role === 'loading') continue;
          const company = item.company_name || item.company?.name || item.employer || 'Unknown';
          const url = item.applicationUrl || item.url || item.apply_url || item.job_url || '';
          const salary = item.salary || item.compensation || null;
          if (url && !seen.has(url)) {
            seen.add(url);
            jobs.push({ company, role, url, salary, remote: true, location: 'Remote' });
          }
        }
      }
    }
  }

  // Strategy 2: API intercepted data
  if (jobs.length === 0 && apiJobs.length > 0) {
    process.stderr.write(`[levels] Got ${apiJobs.length} jobs from API intercept\n`);
    for (const item of apiJobs) {
      const company = item.company_name || item.company || 'Unknown';
      const role = item.title || item.job_title || item.name || 'Unknown';
      const url = item.url || item.apply_url || item.job_url || '';
      const salary = item.salary || item.compensation ||
        (item.salary_min && item.salary_max
          ? `$${Math.round(item.salary_min / 1000)}k–$${Math.round(item.salary_max / 1000)}k`
          : null);
      if (url && !seen.has(url)) {
        seen.add(url);
        jobs.push({ company, role, url, salary, remote: true, location: 'Remote' });
      }
    }
  }

  // Strategy 3: DOM extraction
  if (jobs.length === 0) {
    const cardSelectors = [
      '[data-testid*="job"]',
      '[class*="JobCard"]',
      '[class*="job-card"]',
      '[class*="JobListing"]',
      '[class*="jobListing"]',
      'li[class*="job"]',
      'article',
      '[role="listitem"]',
    ];

    let cards = [];
    for (const sel of cardSelectors) {
      cards = await page.$$(sel);
      if (cards.length > 0) {
        process.stderr.write(`[levels] Found ${cards.length} cards with: ${sel}\n`);
        break;
      }
    }

    for (const card of cards) {
      const linkEl = await card.$('a[href]');
      const href = linkEl ? await linkEl.getAttribute('href') : null;
      const url = href ? (href.startsWith('http') ? href : `${BASE_URL}${href}`) : null;
      if (!url || seen.has(url)) continue;
      seen.add(url);

      const role = await card.$eval(
        'h2, h3, h4, [class*="title"], [class*="role"], [class*="position"]',
        el => el.textContent?.trim()
      ).catch(() => 'Unknown');

      if (role === 'refreshing') continue;

      const company = await card.$eval(
        '[class*="company"], [class*="employer"], [class*="org"]',
        el => el.textContent?.trim()
      ).catch(() => 'Unknown');

      const salary = await card.$eval(
        '[class*="salary"], [class*="comp"], [class*="pay"], [class*="tc"]',
        el => el.textContent?.trim()
      ).catch(() => null);

      jobs.push({ company, role, url, salary, remote: true, location: 'Remote' });
    }
  }

  if (jobs.length === 0 && DEBUG) {
    process.stderr.write(`[levels] No jobs found. Page content:\n${await page.content()}\n`);
  }
} catch (e) {
  process.stderr.write(`[levels] Fatal error: ${e.message}\n`);
} finally {
  await browser.close();
}

process.stderr.write(`[levels] Found ${jobs.length} listings for level "${LEVEL}"\n`);
process.stdout.write(JSON.stringify(jobs) + '\n');
