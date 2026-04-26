import test from 'node:test';
import assert from 'node:assert/strict';
import { creatures, getCreatureByName } from '../src/creatures.js';
import { creatureCard, dex } from '../src/render.js';

test('ships the six launch companions', () => {
  assert.equal(creatures.length, 6);
  assert.ok(getCreatureByName('Zapbit'));
  assert.ok(getCreatureByName('diskettex'));
});

test('renders creature cards', () => {
  const card = creatureCard(getCreatureByName('NullWisp'));
  assert.match(card, /NullWisp/);
  assert.match(card, /Void/);
});

test('renders dex output', () => {
  const output = dex();
  assert.match(output, /PromptMoth/);
  assert.match(output, /MergeDrake/);
});
