import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

const portfolio = JSON.parse(readFileSync(new URL('../src/data/portfolio.json', import.meta.url), 'utf8'));
const projects = portfolio.sections.flatMap(section => section.projects);
const https = value => {
  const url = new URL(value);
  assert.equal(url.protocol, 'https:');
  assert.equal(url.username + url.password, '');
};
const realDate = value => {
  assert.match(value, /^\d{4}-\d{2}-\d{2}$/);
  assert.equal(new Date(`${value}T00:00:00Z`).toISOString().slice(0, 10), value);
  assert.ok(value <= new Date().toISOString().slice(0, 10), 'No future public event dates');
};

test('one shared portfolio, unique project anchors and 3–4 featured cards', () => {
  assert.equal(new Set(projects.map(p => p.id)).size, projects.length);
  assert.ok(projects.filter(p => p.featured).length >= 3);
  assert.ok(projects.filter(p => p.featured).length <= 4);
  for (const project of projects) {
    assert.match(project.id, /^[a-z0-9-]+$/);
    assert.ok(project.title && project.summary);
    assert.ok([null, 'Exploring', 'Building', 'Evaluating', 'Public release'].includes(project.stage));
    if (project.href) { https(project.href); assert.ok(project.linkLabel); }
    else assert.equal(project.linkLabel, null);
  }
});

test('every milestone has a real date, project and public source', () => {
  assert.equal(new Set(portfolio.milestones.map(m => m.id)).size, portfolio.milestones.length);
  for (const milestone of portfolio.milestones) {
    assert.ok(projects.some(p => p.id === milestone.projectId));
    realDate(milestone.date);
    https(milestone.href);
    assert.ok(milestone.kind && milestone.title && milestone.summary);
    if (milestone.href.includes('arxiv.org')) assert.equal(milestone.kind, 'Preprint');
  }
});

test('Now dates are optional, not generated from a review clock', () => {
  assert.ok(portfolio.now.text);
  if (portfolio.now.updated !== null) realDate(portfolio.now.updated);
  const home = readFileSync(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
  assert.ok(home.includes('portfolio.now.updated &&'));
  assert.ok(!home.includes('new Date()'));
});

test('both pages use the same card and preserve all existing project anchors', () => {
  for (const page of ['index', 'projects']) {
    const source = readFileSync(new URL(`../src/pages/${page}.astro`, import.meta.url), 'utf8');
    assert.ok(source.includes('<ProjectCard'));
    assert.ok(source.includes("../data/portfolio.json"));
  }
  for (const id of ['ascend', 'orca', 'phenotype-fingerprinting', 'nexus', 'physarum', 'glucose-ai', 'pi-cog']) {
    assert.ok(projects.some(p => p.id === id));
  }
});
