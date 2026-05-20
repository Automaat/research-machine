/**
 * nofluffjobs.com scraper — direct POST API
 * Usage: node scrape-nofluffjobs.mjs [keyword] [max_pages]
 *   keyword: e.g. "Golang", "Kotlin", "Platform Engineer"
 * Output: JSON array to stdout, logs to stderr
 *
 * CRITICAL: Content-Type must be "application/postingSearch+json" (not application/json).
 * CRITICAL: Query params salaryCurrency + salaryPeriod are mandatory (Angular interceptor injects them).
 * Body: { criteriaSearch: { requirement: [keyword], more: ["remote"] }, page: N }
 * The "more" field accepts: "remote", "partlyRemote", "onsite"
 * Pagination: page-based (starts at 1). Stops when postings array is empty.
 */

const KEYWORD = process.argv[2] || 'Golang';
const MAX_PAGES = parseInt(process.argv[3] || '5', 10);

const API_URL = 'https://nofluffjobs.com/api/search/posting';
const BASE_URL = 'https://nofluffjobs.com';

// Angular HttpInterceptor injects these as mandatory query params
const QUERY_PARAMS = new URLSearchParams({
  salaryCurrency: 'EUR',
  salaryPeriod: 'month',
}).toString();

const jobs = [];
const seen = new Set();

try {
  for (let page = 1; page <= MAX_PAGES; page++) {
    const url = `${API_URL}?${QUERY_PARAMS}`;
    process.stderr.write(`[nofluffjobs] Page ${page}: POST ${url}\n`);

    const body = {
      criteriaSearch: {
        requirement: [KEYWORD],
        more: ['remote'],
      },
      page,
    };

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        // Custom media type required — "application/json" returns 500
        'Content-Type': 'application/postingSearch+json',
        'Accept': 'application/json, text/plain, */*',
        'Referer': `${BASE_URL}/pl/jobs/${KEYWORD.toLowerCase()}/remote`,
        'Origin': BASE_URL,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      process.stderr.write(`[nofluffjobs] HTTP ${response.status}: ${await response.text()}\n`);
      break;
    }

    const data = await response.json();
    const postings = data?.postings ?? [];
    process.stderr.write(`[nofluffjobs] Got ${postings.length} postings (totalCount: ${data?.totalCount})\n`);

    if (postings.length === 0) break;

    for (const posting of postings) {
      // posting.url is a relative path like "/pl/job/golang-developer-company-1234"
      const jobUrl = posting.url
        ? `${BASE_URL}${posting.url.startsWith('/') ? posting.url : '/' + posting.url}`
        : `${BASE_URL}/pl/job/${posting.id}`;

      if (seen.has(jobUrl)) continue;
      seen.add(jobUrl);

      let salary = null;
      if (posting.salary) {
        const { from, to, currency, type } = posting.salary;
        const fmt = v => v >= 1000 ? `${Math.round(v / 1000)}k` : String(v);
        salary = `${currency || ''} ${fmt(from)}–${fmt(to)} (${type || 'month'})`.trim();
      }

      const isRemote = posting.location?.fullyRemote === true;
      const city = posting.location?.places?.[0]?.city;

      jobs.push({
        company: posting.name || 'Unknown',
        role: posting.title || posting.technology || 'Unknown',
        url: jobUrl,
        salary,
        remote: isRemote,
        location: isRemote ? 'Remote' : (city || 'Unknown'),
      });
    }
  }
} catch (e) {
  process.stderr.write(`[nofluffjobs] Fatal error: ${e.message}\n`);
}

process.stderr.write(`[nofluffjobs] Found ${jobs.length} listings for "${KEYWORD}"\n`);
process.stdout.write(JSON.stringify(jobs) + '\n');
