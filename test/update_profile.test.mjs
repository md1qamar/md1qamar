import assert from 'node:assert/strict';
import test from 'node:test';
import {
  buildReposTable,
  buildStatsSvg,
  computeProfileStats,
  escapeXml,
  replaceMarkerBlock,
  selectOwnedRepos,
} from '../scripts/update_profile.mjs';

test('selectOwnedRepos excludes forks, private repos, and the profile repo itself', () => {
  const input = [
    { name: 'md1qamar', fork: false, private: false, created_at: '2026-08-14T00:00:00Z' },
    { name: 'some-fork', fork: true, private: false, created_at: '2026-11-25T00:00:00Z' },
    { name: 'smokeproof', fork: false, private: false, created_at: '2026-11-25T05:00:00Z' },
    { name: 'skillvet', fork: false, private: false, created_at: '2026-11-25T15:00:00Z' },
  ];
  const out = selectOwnedRepos(input, 'md1qamar');
  assert.deepEqual(
    out.map((r) => r.name),
    ['skillvet', 'smokeproof']
  );
});

test('computeProfileStats aggregates counts and picks latest repo', () => {
  const owned = [
    {
      name: 'skillvet',
      stargazers_count: 2,
      forks_count: 1,
      language: 'TypeScript',
      created_at: '2026-11-25T15:41:24Z',
    },
    {
      name: 'bugcast',
      stargazers_count: 1,
      forks_count: 0,
      language: 'TypeScript',
      created_at: '2026-11-25T02:56:27Z',
    },
  ];
  const stats = computeProfileStats(owned, { followers: 5 });
  assert.equal(stats.repoCount, 2);
  assert.equal(stats.totalStars, 3);
  assert.equal(stats.followers, 5);
  assert.deepEqual(stats.latestRepo, { name: 'skillvet', createdDate: '2026-11-25' });
});

test('buildReposTable and buildStatsSvg escape markdown pipes and XML characters', () => {
  const owned = [
    {
      name: 'tool-x',
      html_url: 'https://github.com/md1qamar/tool-x',
      description: 'Fast A | B scanner & linter <v1>',
      language: 'TypeScript',
      license: { spdx_id: 'MIT' },
      stargazers_count: 4,
      created_at: '2026-11-25T00:00:00Z',
    },
  ];
  const md = buildReposTable(owned);
  assert.ok(md.includes('Fast A \\| B scanner'));
  assert.ok(md.includes('[**tool-x**](https://github.com/md1qamar/tool-x)'));

  const svg = buildStatsSvg(computeProfileStats(owned), '2026-11-25');
  assert.ok(svg.includes('<svg'));
  assert.ok(svg.includes('tool-x (2026-11-25)'));
  assert.equal(escapeXml('a & "b" <c>'), 'a &amp; &quot;b&quot; &lt;c&gt;');
});

test('replaceMarkerBlock replaces only target section cleanly', () => {
  const md = '# Top\n<!-- daily-repos:start -->\nold\n<!-- daily-repos:end -->\n# End\n';
  const next = replaceMarkerBlock(md, 'daily-repos', '| new |');
  assert.equal(next, '# Top\n<!-- daily-repos:start -->\n| new |\n<!-- daily-repos:end -->\n# End\n');
});
