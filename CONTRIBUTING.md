# Contributing to PokeBuddy CLI

Thanks for helping improve PokeBuddy CLI.

This project is meant to feel delightful, original and developer-native. We welcome code, docs, companion ideas, ASCII/ANSI art, plugins and bug reports.

## Development setup

```bash
git clone https://github.com/pokebuddy-cli/pokebuddy.git
cd pokebuddy
npm install
npm link
pokebuddy hatch
```

Run checks:

```bash
npm test
npm run lint
```

## Contribution areas

You can contribute:

- original companion names;
- original ASCII/ANSI art;
- new commands;
- Git hook integrations;
- docs and examples;
- tests;
- plugin ideas;
- bug fixes.

## Not allowed

Do not contribute:

- official character names from third-party franchises;
- modified or derivative character names;
- official sprites;
- modified sprites;
- ASCII art recreating protected characters;
- logos or logo-like artwork from third-party franchises;
- copyrighted music, sound effects or game assets;
- language that suggests official affiliation with Nintendo, The Pokémon Company, Game Freak, Creatures Inc., Anthropic or Claude Code.

## Creature naming rules

Good examples:

- Zapbit
- Diskettex
- NullWisp
- PromptMoth
- CacheGoblin
- MergeDrake

Avoid names that are too close to existing characters or brands.

When in doubt, make it weirder, more original and more developer-focused.

## Pull request checklist

Before opening a PR:

- [ ] I ran `npm test`.
- [ ] I ran `npm run lint`.
- [ ] My contribution is original.
- [ ] I did not include protected third-party assets or derivative names.
- [ ] I updated docs when needed.

## Tone

PokeBuddy should feel:

- playful;
- useful;
- terminal-native;
- not annoying;
- respectful of user privacy;
- local-first by default.

Tiny friends. Big commits.
