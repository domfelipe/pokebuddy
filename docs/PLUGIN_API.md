# Plugin API Draft

The plugin API is planned for a future release. This document is a draft.

## Goals

Plugins should be able to:

- listen to PokeBuddy events;
- add reactions;
- add custom commands;
- create companion packs;
- integrate with Git hooks, CI, editors and terminals.

## Draft shape

```js
export default {
  name: 'my-plugin',
  version: '0.1.0',
  onEvent(event, context) {
    if (event.type === 'commit') {
      return context.say('Nice commit. Tiny goblin approved.');
    }
  }
};
```

## Safety rules

- Plugins must be explicit.
- No hidden network calls.
- No arbitrary shell execution by default.
- Plugin permissions should be visible to users.
