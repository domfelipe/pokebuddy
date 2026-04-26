import { creatures, rarityColors } from './creatures.js';
import { paint, strong, dim, stripAnsi } from './ansi.js';

export function banner() {
  return `${paint('╭──────────────────────────────────────────────╮', 'green')}\n` +
    `${paint('│', 'green')} ${strong('PokeBuddy', 'white')} ${strong('CLI', 'green')} ${dim('· tiny terminal companions')} ${paint('│', 'green')}\n` +
    `${paint('│', 'green')} ${paint('POKE', 'green')} = Programmable Open-source Kinetic Entities ${paint('│', 'green')}\n` +
    `${paint('╰──────────────────────────────────────────────╯', 'green')}`;
}

export function helpText(version) {
  return `${banner()}\n\n` +
    `${strong('Usage', 'green')}\n` +
    `  pokebuddy <command> [options]\n\n` +
    `${strong('Core commands', 'green')}\n` +
    `  hatch [--all] [--force]     Hatch a companion\n` +
    `  list                       List discovered companions\n` +
    `  dex                        Show every known companion\n` +
    `  show [name]                Show one companion card\n` +
    `  poke [name]                Interact with a companion\n` +
    `  feed [name] [thing]        Feed context, cache or a snack\n` +
    `  status                     Show local companion status\n` +
    `  rename <name> <alias>      Rename a discovered companion\n` +
    `  banner                     Print the project banner\n` +
    `  legal                      Print legal notice\n` +
    `  reset --yes                Reset local state\n\n` +
    `${strong('Examples', 'green')}\n` +
    `  pokebuddy hatch\n` +
    `  pokebuddy poke zapbit\n` +
    `  pokebuddy feed cachegoblin ./build/cache\n` +
    `  pokebuddy show nullwisp\n\n` +
    `${dim(`v${version} · local-first · offline-ready`)}`;
}

export function legalText() {
  return `${strong('Legal notice', 'green')}\n\n` +
    `PokeBuddy CLI is an independent open-source project.\n` +
    `It is not affiliated with, endorsed by, sponsored by, authorized by,\n` +
    `or officially connected with Nintendo, The Pokémon Company, Game Freak,\n` +
    `Creatures Inc., Anthropic, or Claude Code.\n\n` +
    `POKE means Programmable Open-source Kinetic Entities.\n` +
    `All companions, names, lore, ASCII art, and code in this repository are original.\n` +
    `Do not submit official characters, sprites, names, logos, music, or derivative assets.\n`;
}

export function listCompanions(state) {
  const discovered = Object.values(state.companions);
  if (discovered.length === 0) {
    return `${paint('No companions discovered yet.', 'yellow')} Run ${strong('pokebuddy hatch', 'green')} to begin.`;
  }

  const rows = discovered.map((entry) => {
    const creature = creatures.find((item) => item.id === entry.id);
    const color = creature?.color ?? 'green';
    const active = state.active === entry.id ? paint('●', 'green') : ' ';
    return ` ${active} ${paint(entry.alias.padEnd(14), color)} ${paint(creature.emoji, color)}  ${entry.mood.padEnd(12)} lv.${entry.level}  xp.${entry.xp}`;
  });

  return `${strong('$ pokebuddy list', 'green')}\n${rows.join('\n')}`;
}

export function dex() {
  return creatures.map((creature) => compactCreatureLine(creature)).join('\n');
}

export function compactCreatureLine(creature) {
  const rarityColor = rarityColors[creature.rarity] ?? creature.color;
  return `${paint(creature.name.padEnd(13), creature.color)} ${paint(creature.emoji, creature.color)}  ${creature.type.join(' / ').padEnd(18)} ${paint(creature.rarity, rarityColor)}  ${dim(creature.flavor)}`;
}

export function creatureCard(creature, entry = null) {
  const title = `${creature.emoji}  ${creature.name}`;
  const alias = entry && entry.alias !== creature.name ? ` aka ${entry.alias}` : '';
  const stats = Object.entries(creature.stats)
    .map(([label, value]) => `  ${label.padEnd(7)} ${bar(value)} ${String(value).padStart(3)}`)
    .join('\n');

  const meta = [
    `Type: ${paint(creature.type.join(' / '), creature.color)}`,
    `Rarity: ${paint(creature.rarity, rarityColors[creature.rarity] ?? creature.color)}`,
    entry ? `Level: ${entry.level}   XP: ${entry.xp}   Mood: ${entry.mood}` : null
  ].filter(Boolean).join('\n');

  return `${strong(title, creature.color)}${dim(alias)}\n${paint(creature.ascii, creature.color)}\n\n${meta}\n\n${creature.personality}\n\n${paint(`“${creature.quote}”`, creature.color)}\n\n${stats}`;
}

export function statusView(state) {
  const discovered = Object.values(state.companions);
  const active = discovered.find((item) => item.id === state.active) ?? discovered[0];
  const activeCreature = active ? creatures.find((item) => item.id === active.id) : null;

  return `${strong('$ pokebuddy status', 'green')}\n` +
    `Companions discovered: ${paint(String(discovered.length), 'green')} / ${creatures.length}\n` +
    `Active companion:      ${activeCreature ? paint(active.alias, activeCreature.color) : dim('none')}\n` +
    `State file:            ${dim('~/.pokebuddy/state.json')}\n` +
    `Recent events:         ${state.events.length}\n` +
    (activeCreature ? `\n${creatureCard(activeCreature, active)}` : `\nRun ${strong('pokebuddy hatch', 'green')} to hatch your first companion.`);
}

export function bar(value, width = 10) {
  const filled = Math.max(0, Math.min(width, Math.round((value / 100) * width)));
  return `${paint('█'.repeat(filled), 'green')}${dim('░'.repeat(width - filled))}`;
}

export function boxed(message, color = 'green') {
  const lines = String(message).split('\n');
  const width = Math.max(...lines.map((line) => stripAnsi(line).length));
  const top = `╭${'─'.repeat(width + 2)}╮`;
  const bottom = `╰${'─'.repeat(width + 2)}╯`;
  const body = lines.map((line) => {
    const pad = ' '.repeat(width - stripAnsi(line).length);
    return `│ ${line}${pad} │`;
  });
  return [paint(top, color), ...body.map((line) => paint(line, color)), paint(bottom, color)].join('\n');
}
