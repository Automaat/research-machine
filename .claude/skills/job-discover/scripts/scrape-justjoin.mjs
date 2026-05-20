/**
 * justjoin.it scraper — direct API via Next.js proxy
 * Usage: node scrape-justjoin.mjs [keyword] [max_pages]
 *   keyword: e.g. "go", "kotlin", "devops"
 * Output: JSON array to stdout, logs to stderr
 *
 * Uses the internal Next.js candidate-api proxy.
 * No auth required. Cursor-based pagination via `from` offset.
 * Array params must use "repeat" format (not bracket format).
 * Category is a string key (e.g. "go"), NOT a numeric coreId.
 */

const KEYWORD = process.argv[2] || 'go';
const MAX_PAGES = parseInt(process.argv[3] || '5', 10);
const ITEMS_PER_PAGE = 50;

const BASE_URL = 'https://justjoin.it';
const API_BASE = `${BASE_URL}/api/candidate-api`;

const jobs = [];
const seen = new Set();

try {
  for (let page = 0; page < MAX_PAGES; page++) {
    const from = page * ITEMS_PER_PAGE;

    // Array params must use "repeat" format: categories=go&remoteWorkOptions=remote
    // NOT bracket format: categories[]=go (returns all ~9000 results unfiltered)
    const params = new URLSearchParams({
      from: String(from),
      itemsCount: String(ITEMS_PER_PAGE),
      remoteWorkOptions: 'remote',
    });
    // Append category as repeat format (URLSearchParams.append keeps both values)
    params.append('categories', KEYWORD);

    const url = `${API_BASE}/offers?${params}`;
    process.stderr.write(`[justjoin] Page ${page + 1}: GET ${url}\n`);

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Referer': `${BASE_URL}/job-offers/remote/${KEYWORD}`,
      },
    });

    if (!response.ok) {
      process.stderr.write(`[justjoin] HTTP ${response.status}: ${await response.text()}\n`);
      break;
    }

    const data = await response.json();
    const offers = data?.data ?? [];
    process.stderr.write(`[justjoin] Got ${offers.length} offers (totalItems: ${data?.meta?.totalItems})\n`);

    if (offers.length === 0) break;

    for (const offer of offers) {
      const url = `${BASE_URL}/job-offer/${offer.slug}`;
      if (seen.has(url)) continue;
      seen.add(url);

      // Salary: pick first employmentType entry with from/to defined
      let salary = null;
      // Only use salary entry if at least one bound is >= 1000 (filters out bad data like "130 PLN")
      const salaryEntry = offer.employmentTypes?.find(e => (e.from >= 1000) || (e.to >= 1000));
      if (salaryEntry) {
        const currency = salaryEntry.currency?.toUpperCase() || '';
        const from = salaryEntry.from >= 1000 ? `${Math.round(salaryEntry.from / 1000)}k` : '?';
        const to = salaryEntry.to >= 1000 ? `${Math.round(salaryEntry.to / 1000)}k` : '?';
        const type = salaryEntry.type || '';
        salary = `${currency} ${from}–${to} (${type})`.trim();
      }

      jobs.push({
        company: offer.companyName || 'Unknown',
        role: offer.title || 'Unknown',
        url,
        salary,
        remote: offer.workplaceType === 'remote' || offer.workplaceType === 'partly_remote',
        location: offer.locations?.[0]?.city || 'Remote',
      });
    }

    // Stop if fewer items than requested (last page)
    if (offers.length < ITEMS_PER_PAGE) break;

    // Respect cursor from meta if present
    if (!data?.meta?.nextCursor && page > 0) break;
  }
} catch (e) {
  process.stderr.write(`[justjoin] Fatal error: ${e.message}\n`);
}

process.stderr.write(`[justjoin] Found ${jobs.length} listings for "${KEYWORD}"\n`);
process.stdout.write(JSON.stringify(jobs) + '\n');
