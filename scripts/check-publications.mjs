#!/usr/bin/env node
import { readFile, writeFile } from 'node:fs/promises';
import process from 'node:process';

const profileUrl = 'https://scholar.google.co.uk/citations?hl=en&user=6zfnq1kAAAAJ&view_op=list_works&sortby=pubdate';
const dataPath = new URL('../src/data/publications.json', import.meta.url);
const outputPath = process.env.PUBLICATION_UPDATE_REPORT || 'publication_updates.md';

function decodeHtml(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&#38;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function normalise(value) {
  return value
    .toLowerCase()
    .replace(/[\u2010-\u2015]/g, '-')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

async function main() {
  const known = JSON.parse(await readFile(dataPath, 'utf8'));
  let html;

  try {
    const res = await fetch(profileUrl, {
      headers: {
        'user-agent': 'Mozilla/5.0 publication-update-check (+https://csainsbury.github.io/)'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    html = await res.text();
  } catch (error) {
    await writeFile(outputPath, `# Publication update check\n\nCould not fetch Google Scholar profile: ${error.message}\n`, 'utf8');
    console.log('has_updates=false');
    return;
  }

  const titleMatches = [...html.matchAll(/<a[^>]*class="gsc_a_at"[^>]*>([\s\S]*?)<\/a>/g)];
  const titles = titleMatches.map((match) => decodeHtml(match[1])).filter(Boolean);

  if (titles.length === 0) {
    await writeFile(outputPath, '# Publication update check\n\nNo publication titles could be extracted. Google Scholar may have changed the page or presented a challenge page.\n', 'utf8');
    console.log('has_updates=false');
    return;
  }

  const knownTitles = new Set(known.items.map((item) => normalise(item.title)));
  const unseen = titles.filter((title) => !knownTitles.has(normalise(title)));

  const report = [
    '# Publication update check',
    '',
    `Source: ${profileUrl}`,
    `Checked: ${new Date().toISOString()}`,
    '',
    `Extracted ${titles.length} recent titles from the public Google Scholar profile.`,
    unseen.length ? `Found ${unseen.length} title(s) not present in src/data/publications.json:` : 'No new titles detected against src/data/publications.json.',
    '',
    ...unseen.map((title) => `- ${title}`),
    '',
    'This check is intentionally review-only: update src/data/publications.json manually after verifying the profile entry and preferred citation wording.'
  ].join('\n');

  await writeFile(outputPath, report, 'utf8');
  console.log(`has_updates=${unseen.length > 0 ? 'true' : 'false'}`);
}

main().catch(async (error) => {
  await writeFile(outputPath, `# Publication update check\n\nUnexpected error: ${error.stack || error.message}\n`, 'utf8');
  console.log('has_updates=false');
});
