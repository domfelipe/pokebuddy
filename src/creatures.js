export const rarityColors = {
  Uncommon: 'green',
  Rare: 'yellow',
  Epic: 'magenta',
  Mythic: 'cyan'
};

export const creatures = [
  {
    id: 'zapbit',
    name: 'Zapbit',
    emoji: '⚡',
    type: ['Logic', 'Spark'],
    rarity: 'Rare',
    color: 'yellow',
    personality: 'Energetic, clever, and always ready to spark an idea.',
    flavor: 'Hyper-charged logic companion.',
    quote: 'I will light the way.',
    likes: ['clean commits', 'passing tests', 'short functions'],
    dislikes: ['flaky tests', 'mystery globals', 'panic refactors'],
    stats: { DEBUG: 74, FOCUS: 82, CHAOS: 61, WISDOM: 58, SNARK: 77 },
    reactions: {
      poke: 'Zapbit sparks happily. Great commit. Clean and efficient.',
      feed: 'Zapbit crunches the input into tiny bright logic crumbs.',
      status: 'Every circuit is humming. Slightly smug, but useful.',
      idle: 'Zapbit watches your cursor like it owes money.'
    },
    ascii: String.raw`
        ✦   ⚡     ✦
          /\__/\
      ___/  ◉  ◉\___
     /   \   ▽   /   \
    /____/\_0101_/\\____\
          /  ||  \
       ⚡/___||___\⚡`
  },
  {
    id: 'diskettex',
    name: 'Diskettex',
    emoji: '💾',
    type: ['Storage', 'Memory'],
    rarity: 'Epic',
    color: 'cyan',
    personality: 'Reliable, nostalgic, and never forgets a byte.',
    flavor: 'Never forgets a byte.',
    quote: 'Old school. Always in sync.',
    likes: ['backups', 'version tags', 'good changelogs'],
    dislikes: ['force-push accidents', 'unnamed files', 'lost context'],
    stats: { DEBUG: 63, FOCUS: 91, CHAOS: 28, WISDOM: 85, SNARK: 52 },
    reactions: {
      poke: 'Diskettex blinks, saves your current vibe, and waves politely.',
      feed: 'Diskettex archives the offering under /memories/useful-things.',
      status: 'Diskettex is calm. Suspiciously organized.',
      idle: 'Diskettex labels a tiny folder called maybe-important.'
    },
    ascii: String.raw`
        ╔════════╗
        ║ ▣    ↑ ║
        ║        ║
        ║  ◉  ◉  ║
        ║   ▿    ║
        ║ ┌────┐ ║
        ╚═╧════╧═╝
          ╱    ╲`
  },
  {
    id: 'nullwisp',
    name: 'NullWisp',
    emoji: '⌁',
    type: ['Void', 'Debug'],
    rarity: 'Mythic',
    color: 'cyan',
    personality: 'Ethereal, mysterious, and very good at finding what is missing.',
    flavor: 'Haunts hidden bugs.',
    quote: 'I see what others cannot.',
    likes: ['null checks', 'stack traces', 'quiet terminals'],
    dislikes: ['undefined behavior', 'silent failures', 'empty promises'],
    stats: { DEBUG: 96, FOCUS: 68, CHAOS: 88, WISDOM: 82, SNARK: 41 },
    reactions: {
      poke: 'NullWisp ripples through the terminal and points at a suspicious variable.',
      feed: 'NullWisp absorbs the fragment and whispers: not null anymore.',
      status: 'NullWisp is present, allegedly. The logs disagree.',
      idle: 'NullWisp quietly haunts your TODO comments.'
    },
    ascii: String.raw`
          0   1   0
        .─────────.
      .╯  ◉     ◉ ╰.
     (      NULL     )
      ╲    ─────    ╱
       ╰──╮     ╭──╯
          ╰╮   ╭╯
        1  ╰───╯  0`
  },
  {
    id: 'promptmoth',
    name: 'PromptMoth',
    emoji: '✦',
    type: ['AI', 'Prompt'],
    rarity: 'Epic',
    color: 'magenta',
    personality: 'Curious, expressive, and thriving on context.',
    flavor: 'Drawn to glowing context.',
    quote: 'Ask nicely. I will help you fly.',
    likes: ['clear instructions', 'examples', 'structured prompts'],
    dislikes: ['vague tasks', 'empty specs', 'context starvation'],
    stats: { DEBUG: 55, FOCUS: 79, CHAOS: 64, WISDOM: 92, SNARK: 63 },
    reactions: {
      poke: 'PromptMoth flutters around your request and improves the phrasing.',
      feed: 'PromptMoth drinks the context window like neon nectar.',
      status: 'PromptMoth is glowing. It has probably read too much.',
      idle: 'PromptMoth circles a blinking cursor with dramatic intent.'
    },
    ascii: String.raw`
       ╲\   ││   /╱
     ╭──╲\──╳──/╱──╮
    ╱     ◉     ◉     ╲
   │          ▽          │
    ╲    ┌────────┐    ╱
     ╰───│PROMPT  │───╯
         └──┬──┬──┘
            ╱__╲`
  },
  {
    id: 'cachegoblin',
    name: 'CacheGoblin',
    emoji: '🧩',
    type: ['Cache', 'Chaos'],
    rarity: 'Uncommon',
    color: 'green',
    personality: 'Greedy for speed and hiding things in all the right places.',
    flavor: 'Makes fast things suspicious.',
    quote: 'Fast things stay in my pockets.',
    likes: ['warm caches', 'tiny shortcuts', 'build artifacts'],
    dislikes: ['cache invalidation', 'cold starts', 'clean installs'],
    stats: { DEBUG: 49, FOCUS: 57, CHAOS: 95, WISDOM: 45, SNARK: 88 },
    reactions: {
      poke: 'CacheGoblin grins and returns an answer from somewhere it refuses to explain.',
      feed: 'CacheGoblin snatches the cache and scatters fragments everywhere.',
      status: 'CacheGoblin is fast today. That should make everyone nervous.',
      idle: 'CacheGoblin is hoarding .tmp files under the floorboards.'
    },
    ascii: String.raw`
          .-""""-.
      .-╯ ◉   ◉ ╰-.
     /       ▿       \
    │   ┌────────┐   │
    │   │ CACHE  │   │
     ╲  └──┬──┬──┘  ╱
       ╲___│__│___╱
          ╱    ╲`
  },
  {
    id: 'mergedrake',
    name: 'MergeDrake',
    emoji: '🔥',
    type: ['Git', 'Fire'],
    rarity: 'Rare',
    color: 'orange',
    personality: 'Protective, loyal, and deeply invested in clean merges.',
    flavor: 'Guardian of branches.',
    quote: 'I guard your branches.',
    likes: ['rebases that end well', 'small pull requests', 'green CI'],
    dislikes: ['merge conflicts', 'stale branches', 'Friday deploys'],
    stats: { DEBUG: 71, FOCUS: 88, CHAOS: 67, WISDOM: 76, SNARK: 70 },
    reactions: {
      poke: 'MergeDrake puffs a tiny flame and promises to guard the branch.',
      feed: 'MergeDrake burns away conflict markers with theatrical dignity.',
      status: 'MergeDrake is perched on main, judging all branches equally.',
      idle: 'MergeDrake curls around a pull request and sleeps with one eye open.'
    },
    ascii: String.raw`
            /\___/\
        ___/ ◉   ◉ \___
       /       ╱╲       \
      │     ┌─╯╰─┐      │
       ╲____│ GIT│____╱
            └─┬──┘
          🔥  /_\  🔥`
  }
];

export function getCreatureByIdOrName(value) {
  if (!value) return null;
  const key = String(value).toLowerCase();
  return creatures.find((creature) => creature.id === key || creature.name.toLowerCase() === key) ?? null;
}

export function getCreatureByName(value) {
  return getCreatureByIdOrName(value);
}
