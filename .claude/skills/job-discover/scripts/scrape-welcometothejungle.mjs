/**
 * Welcome to the Jungle scraper — direct Algolia API
 * Usage: node scrape-welcometothejungle.mjs [keyword] [max_pages]
 * Output: JSON array to stdout, logs to stderr
 *
 * Uses Algolia search API directly — no Playwright needed.
 * Credentials are public (embedded in the WTTJ frontend bundle).
 * Filter: remote:fulltime (fully remote jobs only).
 * Note: remote_worldwide field does not exist in this index.
 */

const KEYWORD = process.argv[2] || 'golang';
const MAX_PAGES = parseInt(process.argv[3] || '3', 10);

const ALGOLIA_APP_ID = 'CSEKHVMS53';
const ALGOLIA_API_KEY = '4bd8f6215d0cc52b26430765769e65a0';
const ALGOLIA_URL = `https://${ALGOLIA_APP_ID.toLowerCase()}-dsn.algolia.net/1/indexes/*/queries?x-algolia-agent=Algolia%20for%20JavaScript%20(4.20.0)%3B%20Browser&search_origin=job_search_client`;
const INDEX = 'wttj_jobs_production_en';
const BASE_URL = 'https://www.welcometothejungle.com';
const HITS_PER_PAGE = 30;

const jobs = [];
const seen = new Set();

try {
  for (let page = 0; page < MAX_PAGES; page++) {
    process.stderr.write(`[wttj] Searching page ${page + 1} for "${KEYWORD}"\n`);

    // params is a URL-encoded query string (Algolia SDK format)
    const params = new URLSearchParams({
      query: KEYWORD,
      hitsPerPage: String(HITS_PER_PAGE),
      page: String(page),
      filters: 'remote:fulltime',
      attributesToRetrieve: 'name,organization,slug,salary_minimum,salary_maximum,salary_currency,offices',
    }).toString();

    const body = { requests: [{ indexName: INDEX, params }] };

    const response = await fetch(ALGOLIA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'X-Algolia-Application-Id': ALGOLIA_APP_ID,
        'X-Algolia-API-Key': ALGOLIA_API_KEY,
        'Referer': 'https://www.welcometothejungle.com/',
        'Origin': 'https://www.welcometothejungle.com',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      process.stderr.write(`[wttj] Algolia error ${response.status}: ${await response.text()}\n`);
      break;
    }

    const data = await response.json();
    const hits = data.results?.[0]?.hits ?? [];
    process.stderr.write(`[wttj] Got ${hits.length} hits on page ${page + 1}\n`);

    if (hits.length === 0) break;

    for (const hit of hits) {
      const company = hit.organization?.name || 'Unknown';
      const role = hit.name || 'Unknown';
      const companySlug = hit.organization?.slug || '';
      const jobSlug = hit.slug || hit.objectID;
      const url = companySlug && jobSlug
        ? `${BASE_URL}/en/companies/${companySlug}/jobs/${jobSlug}`
        : '';

      if (!url || seen.has(url)) continue;
      seen.add(url);

      const currency = hit.salary_currency === 'EUR' ? '€' : (hit.salary_currency || '');
      let salary = null;
      if (hit.salary_minimum && hit.salary_maximum) {
        // Some WTTJ entries store salary in cents — normalize to yearly euros
        const toK = v => v > 500_000 ? Math.round(v / 100_000) : Math.round(v / 1000);
        const minK = toK(hit.salary_minimum);
        const maxK = toK(hit.salary_maximum);
        salary = `${currency}${minK}k–${currency}${maxK}k`;
      }
      const location = hit.offices?.[0]?.city || 'Remote';

      jobs.push({ company, role, url, salary, remote: true, location });
    }

    // Stop if fewer hits than requested (last page)
    if (hits.length < HITS_PER_PAGE) break;
  }
} catch (e) {
  process.stderr.write(`[wttj] Fatal error: ${e.message}\n`);
}

process.stderr.write(`[wttj] Found ${jobs.length} listings for "${KEYWORD}"\n`);
process.stdout.write(JSON.stringify(jobs) + '\n');
