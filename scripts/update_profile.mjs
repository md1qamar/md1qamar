import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT_DIR = path.resolve(__dirname, '..');
const DEFAULT_OWNER = 'md1qamar';

/**
 * Escapes XML special characters for safe SVG rendering.
 * @param {string} value
 * @returns {string}
 */
export function escapeXml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

/**
 * Filters and sorts owned public software repositories (excluding forks and profile repo).
 * @param {Array<Record<string, any>>} repos
 * @param {string} [owner]
 */
export function selectOwnedRepos(repos, owner = DEFAULT_OWNER) {
  const lowerOwner = owner.toLowerCase();
  return (repos || [])
    .filter(
      (r) =>
        r &&
        !r.fork &&
        !r.private &&
        String(r.name || '').toLowerCase() !== lowerOwner
    )
    .sort((a, b) => String(b.created_at || '').localeCompare(String(a.created_at || '')));
}

/**
 * Computes summary metrics from owned public repositories.
 * @param {Array<Record<string, any>>} ownedRepos
 * @param {Record<string, any>} [userProfile]
 */
export function computeProfileStats(ownedRepos, userProfile = {}) {
  const totalStars = ownedRepos.reduce((sum, r) => sum + (Number(r.stargazers_count) || 0), 0);
  const totalForks = ownedRepos.reduce((sum, r) => sum + (Number(r.forks_count) || 0), 0);

  const langCounts = new Map();
  for (const r of ownedRepos) {
    const lang = r.language || 'Other';
    langCounts.set(lang, (langCounts.get(lang) || 0) + 1);
  }
  const topLanguages = [...langCounts.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 4)
    .map(([name, count]) => ({ name, count }));

  const latestRepo = ownedRepos[0] || null;
  return {
    repoCount: ownedRepos.length,
    totalStars,
    totalForks,
    followers: Number(userProfile.followers) || 0,
    topLanguages,
    latestRepo: latestRepo
      ? {
          name: latestRepo.name,
          createdDate: String(latestRepo.created_at || '').slice(0, 10),
        }
      : null,
  };
}

/**
 * Generates the Markdown table for the auto-updated shipped repositories block.
 * @param {Array<Record<string, any>>} ownedRepos
 * @returns {string}
 */
export function buildReposTable(ownedRepos) {
  if (!ownedRepos || ownedRepos.length === 0) {
    return '_No public tool repositories published yet._';
  }

  const rows = [
    '| Repository | What It Does | Stack | License | Stars | Shipped |',
    '| --- | --- | --- | --- | ---: | --- |',
  ];

  for (const repo of ownedRepos) {
    const name = String(repo.name || '');
    const url = repo.html_url || `https://github.com/${DEFAULT_OWNER}/${name}`;
    const rawDesc = String(repo.description || 'Open-source developer utility')
      .replace(/\|/g, '\\|')
      .replace(/\s+/g, ' ')
      .trim();
    const desc = rawDesc.length > 135 ? `${rawDesc.slice(0, 132)}...` : rawDesc;
    const lang = repo.language || '—';
    const license = repo.license?.spdx_id && repo.license.spdx_id !== 'NOASSERTION'
      ? repo.license.spdx_id
      : '—';
    const stars = Number(repo.stargazers_count) || 0;
    const created = String(repo.created_at || '').slice(0, 10) || '—';

    rows.push(`| [**${name}**](${url}) | ${desc} | ${lang} | ${license} | ${stars} | ${created} |`);
  }

  return rows.join('\n');
}

/**
 * Generates a repo-local SVG card reflecting live GitHub stats without third-party SVG hosts.
 * @param {ReturnType<typeof computeProfileStats>} stats
 * @param {string} dateStr
 * @returns {string}
 */
export function buildStatsSvg(stats, dateStr) {
  const latestText = stats.latestRepo
    ? `${stats.latestRepo.name} (${stats.latestRepo.createdDate})`
    : 'None yet';
  const primaryLang = stats.topLanguages[0]?.name || 'TypeScript';
  const langBreakdown = stats.topLanguages
    .map((l) => `${l.name}: ${l.count}`)
    .join(' · ') || 'No repositories yet';

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 180" width="1200" height="180" role="img" aria-label="Live GitHub Open-Source Snapshot">
  <defs>
    <linearGradient id="sbg" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" stop-color="#0B1120" />
      <stop offset="100%" stop-color="#111827" />
    </linearGradient>
  </defs>
  <rect width="1200" height="180" rx="14" fill="url(#sbg)" stroke="#1E293B" stroke-width="1.5" />

  <text x="36" y="34" fill="#94A3B8" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="12" font-weight="600" letter-spacing="1.2">LIVE GITHUB TELEMETRY · SYNCED ${escapeXml(dateStr)} UTC</text>

  <!-- Card 1: Public Tools -->
  <rect x="36" y="52" width="262" height="96" rx="10" fill="#0F172A" stroke="#1E293B" />
  <text x="56" y="82" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13">Public Tool Repos</text>
  <text x="56" y="124" fill="#38BDF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="32" font-weight="800">${stats.repoCount}</text>

  <!-- Card 2: Stars -->
  <rect x="318" y="52" width="262" height="96" rx="10" fill="#0F172A" stroke="#1E293B" />
  <text x="338" y="82" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13">Total Repo Stars</text>
  <text x="338" y="124" fill="#FBBF24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="32" font-weight="800">${stats.totalStars}</text>

  <!-- Card 3: Primary Language -->
  <rect x="600" y="52" width="262" height="96" rx="10" fill="#0F172A" stroke="#1E293B" />
  <text x="620" y="82" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13">Primary Language</text>
  <text x="620" y="122" fill="#818CF8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="26" font-weight="700">${escapeXml(primaryLang)}</text>

  <!-- Card 4: Latest Shipped -->
  <rect x="882" y="52" width="282" height="96" rx="10" fill="#0F172A" stroke="#1E293B" />
  <text x="902" y="82" fill="#94A3B8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" font-size="13">Latest Shipped Repo</text>
  <text x="902" y="120" fill="#34D399" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="18" font-weight="700">${escapeXml(latestText)}</text>

  <text x="36" y="168" fill="#64748B" font-family="ui-monospace, SFMono-Regular, Menlo, Consolas, monospace" font-size="11.5">Stack mix: ${escapeXml(langBreakdown)} · Auto-refreshed via GitHub Actions</text>
</svg>
`;
}

/**
 * Replaces content between HTML comment markers `<!-- key:start -->` and `<!-- key:end -->`.
 * @param {string} markdown
 * @param {string} markerName
 * @param {string} replacement
 * @returns {string}
 */
export function replaceMarkerBlock(markdown, markerName, replacement) {
  const startTag = `<!-- ${markerName}:start -->`;
  const endTag = `<!-- ${markerName}:end -->`;
  const startIdx = markdown.indexOf(startTag);
  const endIdx = markdown.indexOf(endTag);

  if (startIdx === -1 || endIdx === -1 || endIdx < startIdx) {
    throw new Error(`Missing or malformed marker pair for "${markerName}"`);
  }

  const before = markdown.slice(0, startIdx + startTag.length);
  const after = markdown.slice(endIdx);
  return `${before}\n${replacement}\n${after}`;
}

async function fetchJson(url, token) {
  const headers = {
    'User-Agent': 'md1qamar-profile-updater/1.0',
    Accept: 'application/vnd.github+json',
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const res = await fetch(url, { headers, signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${url}`);
  return res.json();
}

/**
 * Updates README.md and assets/stats-card.svg using live or fixture data.
 */
export async function updateProfileFiles({
  owner = DEFAULT_OWNER,
  rootDir = ROOT_DIR,
  fixtureData = null,
  dateStr = new Date().toISOString().slice(0, 10),
} = {}) {
  const token = process.env.GITHUB_TOKEN || '';
  const userProfile = fixtureData
    ? fixtureData.user
    : await fetchJson(`https://api.github.com/users/${encodeURIComponent(owner)}`, token);
  const allRepos = fixtureData
    ? fixtureData.repos
    : await fetchJson(
        `https://api.github.com/users/${encodeURIComponent(owner)}/repos?per_page=100&sort=updated`,
        token
      );

  const owned = selectOwnedRepos(allRepos, owner);
  const stats = computeProfileStats(owned, userProfile);
  const tableMd = buildReposTable(owned);
  const statsSummary = `<sub>Showing **${stats.repoCount}** public repositories (**${stats.totalStars}** stars total) · Auto-synced via GitHub Actions on **${dateStr} UTC**</sub>`;

  const readmePath = path.join(rootDir, 'README.md');
  let readme = fs.readFileSync(readmePath, 'utf8');
  readme = replaceMarkerBlock(readme, 'shipped-stats', statsSummary);
  readme = replaceMarkerBlock(readme, 'daily-repos', tableMd);
  fs.writeFileSync(readmePath, readme, 'utf8');

  const statsSvgPath = path.join(rootDir, 'assets', 'stats-card.svg');
  fs.mkdirSync(path.dirname(statsSvgPath), { recursive: true });
  fs.writeFileSync(statsSvgPath, buildStatsSvg(stats, dateStr), 'utf8');

  return { stats, ownedCount: owned.length };
}

if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const fixtureIdx = process.argv.indexOf('--fixture');
  const fixtureData =
    fixtureIdx !== -1 && process.argv[fixtureIdx + 1]
      ? JSON.parse(fs.readFileSync(process.argv[fixtureIdx + 1], 'utf8'))
      : null;

  const result = await updateProfileFiles({ fixtureData });
  console.log(JSON.stringify(result, null, 2));
}
