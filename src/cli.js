import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { creatures, getCreatureByName } from './creatures.js';
import { nextCreature } from './hatch.js';
import { addEvent, ensureCompanionState, loadState, resetState, saveState } from './state.js';
import { banner, boxed, compactCreatureLine, creatureCard, dex, helpText, legalText, listCompanions, statusView } from './render.js';
import { paint, strong, dim } from './ansi.js';

const dirname = path.dirname(fileURLToPath(import.meta.url));
const pkg = JSON.parse(fs.readFileSync(path.join(dirname, '..', 'package.json'), 'utf8'));

export async function run(argv) {
  const [command = 'help', ...args] = argv;

  switch (command) {
    case 'hatch':
      return hatch(args);
    case 'list':
      return output(listCompanions(loadState()));
    case 'dex':
      return output(`${strong('PokeBuddy Creature Dex', 'green')}\n${dex()}`);
    case 'show':
      return show(args);
    case 'poke':
      return interact('poke', args);
    case 'feed':
      return interact('feed', args);
    case 'status':
      return output(statusView(loadState()));
    case 'rename':
      return rename(args);
    case 'banner':
      return output(banner());
    case 'legal':
      return output(legalText());
    case 'reset':
      return reset(args);
    case '--version':
    case '-v':
    case 'version':
      return output(pkg.version);
    case '--help':
    case '-h':
    case 'help':
      return output(helpText(pkg.version));
    default:
      return output(`${paint(`Unknown command: ${command}`, 'red')}\n\n${helpText(pkg.version)}`, 1);
  }
}

function hatch(args) {
  const state = loadState();
  const force = args.includes('--force');
  const all = args.includes('--all');

  if (all) {
    for (const creature of creatures) {
      ensureCompanionState(state, creature);
    }
    state.active = state.active ?? creatures[0].id;
    addEvent(state, 'hatch:all', { count: creatures.length });
    saveState(state);
    return output(`${boxed('All companions joined your terminal.', 'green')}\n\n${listCompanions(state)}`);
  }

  const discoveredIds = Object.keys(state.companions);
  if (discoveredIds.length > 0 && !force) {
    return output(`${paint('You already have a companion.', 'yellow')} Use ${strong('pokebuddy hatch --force', 'green')} to discover another.\n\n${listCompanions(state)}`);
  }

  const creature = nextCreature(discoveredIds);
  if (!creature) {
    return output(`${paint('Every known companion has already joined you.', 'yellow')}\n\n${listCompanions(state)}`);
  }

  const entry = ensureCompanionState(state, creature);
  state.active = creature.id;
  addEvent(state, 'hatch', { id: creature.id });
  saveState(state);

  return output(
    `${boxed('The terminal hums. A companion signal appears.', creature.color)}\n\n` +
    `${strong(`You hatched ${creature.name}!`, creature.color)}\n\n` +
    `${creatureCard(creature, entry)}`
  );
}

function show(args) {
  const name = args[0];
  const state = loadState();

  if (!name) {
    if (!state.active) return output(`Run ${strong('pokebuddy hatch', 'green')} first.`);
    const active = state.companions[state.active];
    const creature = getCreatureByName(active.id);
    return output(creatureCard(creature, active));
  }

  const creature = getCreatureByName(name);
  if (!creature) return output(notFound(name), 1);
  return output(creatureCard(creature, state.companions[creature.id] ?? null));
}

function interact(kind, args) {
  const maybeName = args[0];
  const state = loadState();
  let creature = maybeName ? getCreatureByName(maybeName) : null;

  if (!creature && state.active) {
    creature = getCreatureByName(state.active);
  }
  if (!creature) {
    return output(`No companion selected. Run ${strong('pokebuddy hatch', 'green')} first.`, 1);
  }

  const entry = ensureCompanionState(state, creature);
  const item = kind === 'feed' ? args.slice(1).join(' ') || 'context crumbs' : null;

  if (kind === 'poke') {
    entry.pokes += 1;
    entry.energy = Math.min(100, entry.energy + 10);
    entry.xp += 12;
    entry.mood = entry.energy > 85 ? 'overclocked' : 'happy';
  }

  if (kind === 'feed') {
    entry.feeds += 1;
    entry.energy = Math.min(100, entry.energy + 6);
    entry.xp += 18;
    entry.mood = 'focused';
  }

  entry.level = 1 + Math.floor(entry.xp / 100);
  state.active = creature.id;
  addEvent(state, kind, { id: creature.id, item });
  saveState(state);

  const reaction = kind === 'feed'
    ? `${creature.reactions.feed}\n${dim(`Offering: ${item}`)}`
    : creature.reactions.poke;

  return output(
    `${strong(`$ pokebuddy ${kind} ${creature.id}`, 'green')}\n` +
    `${paint(reaction, creature.color)}\n\n` +
    `Energy: ${entry.energy}%   Mood: ${paint(entry.mood, 'green')}   XP: ${entry.xp}   Level: ${entry.level}`
  );
}

function rename(args) {
  const [name, ...aliasParts] = args;
  const alias = aliasParts.join(' ').trim();
  if (!name || !alias) {
    return output(`Usage: ${strong('pokebuddy rename <name> <alias>', 'green')}`, 1);
  }

  const creature = getCreatureByName(name);
  if (!creature) return output(notFound(name), 1);

  const state = loadState();
  const entry = ensureCompanionState(state, creature);
  entry.alias = alias;
  addEvent(state, 'rename', { id: creature.id, alias });
  saveState(state);
  return output(`${paint(creature.name, creature.color)} is now known as ${strong(alias, creature.color)}.`);
}

function reset(args) {
  if (!args.includes('--yes')) {
    return output(`This will remove local PokeBuddy state. Re-run with ${strong('pokebuddy reset --yes', 'red')} to confirm.`, 1);
  }

  resetState();
  return output(`${paint('Local PokeBuddy state reset.', 'green')} Run ${strong('pokebuddy hatch', 'green')} to begin again.`);
}

function notFound(name) {
  return `${paint(`Unknown companion: ${name}`, 'red')}\n\nKnown companions:\n${creatures.map(compactCreatureLine).join('\n')}`;
}

function output(message, code = 0) {
  console.log(message);
  if (code !== 0) process.exitCode = code;
}
